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
    campaign_id?: string;
    ad_id?: string;
    form_id: string;
  }>,
) {
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

  const workspaceIds = [
    ...new Set((campaignRows ?? []).map((c) => c.workspace_id)),
  ];
  const { data: integrationsRows } =
    workspaceIds.length > 0
      ? await supabase
          .from("integrations")
          .select("workspace_id, credentials")
          .in("workspace_id", workspaceIds)
          .eq("type", "meta_ads")
      : { data: [] };

  const tokenByWorkspace = new Map<string, string>();
  for (const int of integrationsRows ?? []) {
    const token = (int.credentials as { access_token?: string })?.access_token;
    if (token) tokenByWorkspace.set(int.workspace_id, token);
  }

  const processedResults = await Promise.all(
    changes.map(async (change) => {
      try {
        if (!change.campaign_id) return null;
        const campaign = campaignByExternal.get(change.campaign_id);
        if (!campaign) return null;

        const accessToken = tokenByWorkspace.get(campaign.workspace_id);
        if (!accessToken) return null;

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
            workspace_id: campaign.workspace_id,
            full_name: fullName,
            phone: fields.phone_number ?? fields.phone ?? null,
            email: fields.email ?? null,
            source: "meta_ads" as const,
            source_campaign_id: campaign.id,
            custom_fields: fields,
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

  const { data: inserted } = await supabase
    .from("leads")
    .insert(valid.map((v) => v.lead))
    .select("id");

  const eventRows = (inserted ?? []).map((row, i) => ({
    lead_id: row.id,
    type: "meta_form_submitted" as const,
    payload: valid[i].eventPayload,
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
    { workspaceId: string; pageToken: string }
  >();
  for (const int of integrations ?? []) {
    const creds = int.credentials as {
      pages?: Array<{ id: string; access_token: string }>;
    };
    for (const page of creds.pages ?? []) {
      if (pageIds.includes(page.id)) {
        pageToWorkspace.set(page.id, {
          workspaceId: int.workspace_id,
          pageToken: page.access_token,
        });
      }
    }
  }

  for (const event of events) {
    const mapping = pageToWorkspace.get(event.pageId);
    if (!mapping) continue;

    const { workspaceId, pageToken } = mapping;

    // Upsert conversation: check existence first for atomic unread_count increment
    const { data: existing } = await supabase
      .from("conversations")
      .select("id, unread_count")
      .eq("workspace_id", workspaceId)
      .eq("sender_psid", event.senderPsid)
      .eq("page_id", event.pageId)
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
          page_id: event.pageId,
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
