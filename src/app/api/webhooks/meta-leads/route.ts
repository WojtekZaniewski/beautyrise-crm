import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { fetchLeadFromMeta } from "@/lib/meta/sync";

export const maxDuration = 60;

// ─── GET: webhook verification ───────────────────────────────────────────────

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ─── Types ────────────────────────────────────────────────────────────────────

type WebhookPayload = {
  object: string;
  entry: Array<{
    id: string;
    time: number;
    changes?: Array<{
      field: string;
      value: {
        leadgen_id: string;
        page_id: string;
        form_id: string;
        campaign_id?: string;
        ad_id?: string;
        created_time: number;
      };
    }>;
    messaging?: Array<{
      sender: { id: string };
      recipient: { id: string };
      timestamp: number;
      message?: {
        mid: string;
        text?: string;
        attachments?: Array<{ type: string; payload: { url?: string } }>;
      };
    }>;
  }>;
};

type MessagingEvent = {
  channel: "messenger" | "instagram";
  pageId: string;
  senderPsid: string;
  mid: string;
  text: string | null;
  attachments: Array<{ type: string; url?: string }>;
  timestamp: number;
};

// ─── POST: leadgen + messaging events from Meta ──────────────────────────────

export async function POST(request: Request) {
  const appSecret = process.env.META_APP_SECRET;
  if (!appSecret) {
    return NextResponse.json({ error: "META_APP_SECRET not set" }, { status: 500 });
  }

  const signature = request.headers.get("x-hub-signature-256");
  const raw = await request.text();

  if (!signature || !verifySignature(raw, signature, appSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(raw) as WebhookPayload;

  if (payload.object !== "page" && payload.object !== "instagram") {
    return NextResponse.json({ ok: true, skipped: "not a page or instagram object" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // ─── Leadgen events ────────────────────────────────────────────────────────

  const changes: Array<{
    leadgen_id: string;
    page_id: string;
    campaign_id?: string;
    ad_id?: string;
    form_id: string;
  }> = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes ?? []) {
      if (change.field === "leadgen") changes.push(change.value);
    }
  }

  if (changes.length > 0) {
    await processLeadgenEvents(supabase, changes);
  }

  // ─── Messaging events ──────────────────────────────────────────────────────

  const messagingEvents: MessagingEvent[] = [];
  const channel: "messenger" | "instagram" =
    payload.object === "instagram" ? "instagram" : "messenger";

  for (const entry of payload.entry) {
    for (const msg of entry.messaging ?? []) {
      // Skip echo events (messages sent by the page itself)
      if (msg.sender.id === entry.id) continue;
      if (!msg.message?.mid) continue;

      messagingEvents.push({
        channel,
        pageId: entry.id,
        senderPsid: msg.sender.id,
        mid: msg.message.mid,
        text: msg.message.text ?? null,
        attachments: (msg.message.attachments ?? []).map((a) => ({
          type: a.type,
          url: a.payload?.url,
        })),
        timestamp: msg.timestamp,
      });
    }
  }

  if (messagingEvents.length > 0) {
    await processMessagingEvents(supabase, messagingEvents);
  }

  return NextResponse.json({ ok: true });
}

// ─── Leadgen processing (unchanged logic, extracted for clarity) ──────────────

async function processLeadgenEvents(
  supabase: SupabaseClient,
  changes: Array<{
    leadgen_id: string;
    page_id: string;
    campaign_id?: string;
    ad_id?: string;
    form_id: string;
  }>,
) {
  // Fetch all connected integrations once — needed for page_id → workspace lookup
  const { data: allIntegrations } = await supabase
    .from("integrations")
    .select("workspace_id, credentials")
    .eq("type", "meta_ads")
    .eq("status", "connected");

  // Build lookup maps from integrations
  type PageEntry = { workspaceId: string; accessToken: string; pageCampaignId?: string };
  const pageToWorkspace = new Map<string, PageEntry>();
  const tokenByWorkspace = new Map<string, string>();

  for (const int of allIntegrations ?? []) {
    const creds = int.credentials as {
      access_token?: string;
      pages?: Array<{ id: string; access_token: string }>;
      selected_page_id?: string | null;
    };
    if (creds.access_token) tokenByWorkspace.set(int.workspace_id, creds.access_token);
    for (const page of creds.pages ?? []) {
      // Only map the selected page (if set), otherwise map all pages
      const selectedOk = !creds.selected_page_id || page.id === creds.selected_page_id;
      if (selectedOk && page.access_token) {
        pageToWorkspace.set(page.id, {
          workspaceId: int.workspace_id,
          accessToken: page.access_token,
        });
      }
    }
  }

  // Build campaign lookup for changes that have campaign_id
  const campaignIds = [
    ...new Set(changes.map((c) => c.campaign_id).filter(Boolean) as string[]),
  ];
  const { data: campaignRows } =
    campaignIds.length > 0
      ? await supabase
          .from("campaigns")
          .select("id, workspace_id, external_id")
          .in("external_id", campaignIds)
      : { data: [] };

  const campaignByExternal = new Map(
    (campaignRows ?? []).map((c) => [
      c.external_id,
      { id: c.id, workspace_id: c.workspace_id },
    ]),
  );

  const processedResults = await Promise.all(
    changes.map(async (change) => {
      try {
        // Resolve workspace + token: prefer campaign_id path, fall back to page_id
        let workspaceId: string;
        let accessToken: string;
        let internalCampaignId: string | null = null;

        if (change.campaign_id && campaignByExternal.has(change.campaign_id)) {
          const campaign = campaignByExternal.get(change.campaign_id)!;
          workspaceId = campaign.workspace_id;
          internalCampaignId = campaign.id;
          const tok = tokenByWorkspace.get(workspaceId);
          if (!tok) return null;
          accessToken = tok;
        } else if (change.page_id && pageToWorkspace.has(change.page_id)) {
          const entry = pageToWorkspace.get(change.page_id)!;
          workspaceId = entry.workspaceId;
          accessToken = entry.accessToken;
        } else {
          // Cannot match to any workspace — skip
          return null;
        }

        const leadData = await fetchLeadFromMeta(change.leadgen_id, accessToken);

        const fields: Record<string, string> = {};
        for (const f of leadData.field_data) {
          fields[f.name] = f.values[0] ?? "";
        }

        const fullName =
          fields.full_name ||
          `${fields.first_name ?? ""} ${fields.last_name ?? ""}`.trim() ||
          fields.name ||
          "Bez nazwiska";

        return {
          lead: {
            workspace_id: workspaceId,
            full_name: fullName,
            phone: fields.phone_number ?? fields.phone ?? null,
            email: fields.email ?? null,
            source: "meta_ads" as const,
            source_campaign_id: internalCampaignId,
            custom_fields: { meta_lead_id: change.leadgen_id, form_id: change.form_id, ...fields },
          },
          eventPayload: {
            leadgen_id: change.leadgen_id,
            campaign_id: leadData.campaign_id,
            ad_id: leadData.ad_id,
            form_id: change.form_id,
          },
        };
      } catch {
        return null;
      }
    }),
  );

  const valid = processedResults.filter(
    (r): r is NonNullable<typeof r> => r !== null,
  );
  if (valid.length === 0) return;

  // Deduplicate: skip leads already in DB (by meta_lead_id in custom_fields)
  const { data: existing } = await supabase
    .from("leads")
    .select("custom_fields")
    .in("workspace_id", [...new Set(valid.map((v) => v.lead.workspace_id))]);

  const existingIds = new Set<string>();
  for (const l of existing ?? []) {
    const mid = (l.custom_fields as { meta_lead_id?: string } | null)?.meta_lead_id;
    if (mid) existingIds.add(mid);
  }

  const toInsert = valid.filter((v) => {
    const mid = (v.lead.custom_fields as { meta_lead_id?: string })?.meta_lead_id;
    return !mid || !existingIds.has(mid);
  });

  if (toInsert.length === 0) return;

  const { data: inserted } = await supabase
    .from("leads")
    .insert(toInsert.map((v) => v.lead))
    .select("id");

  const eventRows = (inserted ?? []).map((row, i) => ({
    lead_id: row.id,
    type: "meta_form_submitted" as const,
    payload: toInsert[i].eventPayload,
  }));

  if (eventRows.length > 0) {
    await supabase.from("lead_events").insert(eventRows);
  }
}

// ─── Messaging processing ─────────────────────────────────────────────────────

async function processMessagingEvents(
  supabase: SupabaseClient,
  events: MessagingEvent[],
) {
  // Find workspace + page token for each unique pageId
  const pageIds = [...new Set(events.map((e) => e.pageId))];

  const { data: integrations } = await supabase
    .from("integrations")
    .select("workspace_id, credentials")
    .eq("type", "meta_ads")
    .eq("status", "connected");

  const pageToWorkspace = new Map<
    string,
    { workspaceId: string; pageToken: string; fbPageId: string }
  >();
  for (const int of integrations ?? []) {
    const creds = int.credentials as {
      pages?: Array<{ id: string; access_token: string; instagram_account_id?: string | null }>;
      selected_page_id?: string | null;
    };
    for (const page of creds.pages ?? []) {
      const selectedOk = !creds.selected_page_id || page.id === creds.selected_page_id;
      if (!selectedOk) continue;

      // Messenger: entry.id === FB page ID
      if (pageIds.includes(page.id)) {
        pageToWorkspace.set(page.id, {
          workspaceId: int.workspace_id,
          pageToken: page.access_token,
          fbPageId: page.id,
        });
      }
      // Instagram: entry.id === IG account ID — map to FB page ID for storage
      if (page.instagram_account_id && pageIds.includes(page.instagram_account_id)) {
        pageToWorkspace.set(page.instagram_account_id, {
          workspaceId: int.workspace_id,
          pageToken: page.access_token,
          fbPageId: page.id,
        });
      }
    }
  }

  for (const event of events) {
    const mapping = pageToWorkspace.get(event.pageId);
    if (!mapping) continue;

    const { workspaceId, pageToken, fbPageId } = mapping;

    // Upsert conversation: check existence first for atomic unread_count increment
    const { data: existing } = await supabase
      .from("conversations")
      .select("id, unread_count")
      .eq("workspace_id", workspaceId)
      .eq("sender_psid", event.senderPsid)
      .eq("page_id", fbPageId)
      .maybeSingle();

    let conversationId: string;

    if (existing) {
      await supabase
        .from("conversations")
        .update({
          last_message_at: new Date(event.timestamp).toISOString(),
          last_message_preview: event.text?.slice(0, 100) ?? null,
          unread_count: (existing.unread_count ?? 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      conversationId = existing.id;
    } else {
      const { data: created } = await supabase
        .from("conversations")
        .insert({
          workspace_id: workspaceId,
          channel: event.channel,
          sender_psid: event.senderPsid,
          page_id: fbPageId,
          last_message_at: new Date(event.timestamp).toISOString(),
          last_message_preview: event.text?.slice(0, 100) ?? null,
          unread_count: 1,
        })
        .select("id")
        .single();

      if (!created) continue;
      conversationId = created.id;

      // Fire-and-forget: fetch sender name/pic from Meta
      fetchSenderProfile(supabase, event.senderPsid, pageToken, conversationId).catch(
        () => {},
      );
    }

    // Insert message — UNIQUE on meta_message_id makes this idempotent
    await supabase
      .from("messages")
      .upsert(
        {
          conversation_id: conversationId,
          workspace_id: workspaceId,
          meta_message_id: event.mid,
          direction: "inbound",
          text: event.text,
          attachments: event.attachments,
          created_at: new Date(event.timestamp).toISOString(),
        },
        { onConflict: "meta_message_id", ignoreDuplicates: true },
      );
  }
}

async function fetchSenderProfile(
  supabase: SupabaseClient,
  psid: string,
  pageToken: string,
  conversationId: string,
) {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${psid}?fields=name,profile_pic&access_token=${pageToken}`,
    { cache: "no-store" },
  );
  if (!res.ok) return;
  const data = (await res.json()) as {
    name?: string;
    profile_pic?: string;
  };
  await supabase
    .from("conversations")
    .update({
      sender_name: data.name ?? null,
      sender_profile_pic: data.profile_pic ?? null,
    })
    .eq("id", conversationId);
}

function verifySignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const expected =
    "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
