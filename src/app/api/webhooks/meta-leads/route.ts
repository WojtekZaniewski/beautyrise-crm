import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { fetchLeadFromMeta } from "@/lib/meta/sync";

export const maxDuration = 60;

// ─── GET: webhook verification (podczas konfigurowania w Meta App) ───────────

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

// ─── POST: leadgen events from Meta ──────────────────────────────────────────

type WebhookPayload = {
  object: string;
  entry: Array<{
    id: string;
    time: number;
    changes: Array<{
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
  }>;
};

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

  if (payload.object !== "page") {
    return NextResponse.json({ ok: true, skipped: "not a page object" });
  }

  // Use service role client — webhooks have no user session
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Flatten all leadgen changes from all entries
  const changes: Array<{
    leadgen_id: string;
    campaign_id?: string;
    ad_id?: string;
    form_id: string;
  }> = [];
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "leadgen") changes.push(change.value);
    }
  }

  if (changes.length === 0) {
    return NextResponse.json({ ok: true, processed: 0 });
  }

  // Pre-fetch all campaigns referenced in this batch in ONE query
  const campaignIds = [...new Set(changes.map((c) => c.campaign_id).filter(Boolean) as string[])];
  const { data: campaignRows } = campaignIds.length > 0
    ? await supabase
        .from("campaigns")
        .select("id, workspace_id, external_id")
        .in("external_id", campaignIds)
    : { data: [] };

  const campaignByExternal = new Map(
    (campaignRows ?? []).map((c) => [c.external_id, { id: c.id, workspace_id: c.workspace_id }]),
  );

  // Pre-fetch all access tokens for referenced workspaces in ONE query
  const workspaceIds = [...new Set((campaignRows ?? []).map((c) => c.workspace_id))];
  const { data: integrationsRows } = workspaceIds.length > 0
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

  const errors: string[] = [];

  // Process all leads in parallel
  const processedResults = await Promise.all(
    changes.map(async (change) => {
      try {
        if (!change.campaign_id) return null;
        const campaign = campaignByExternal.get(change.campaign_id);
        if (!campaign) return null;

        const accessToken = tokenByWorkspace.get(campaign.workspace_id);
        if (!accessToken) {
          errors.push(`no access_token for workspace ${campaign.workspace_id}`);
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
      } catch (e) {
        errors.push(e instanceof Error ? e.message : String(e));
        return null;
      }
    }),
  );

  const valid = processedResults.filter((r): r is NonNullable<typeof r> => r !== null);

  if (valid.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, errors });
  }

  // Batch insert all leads
  const { data: inserted, error: insertErr } = await supabase
    .from("leads")
    .insert(valid.map((v) => v.lead))
    .select("id");

  if (insertErr) {
    errors.push(insertErr.message);
    return NextResponse.json({ ok: false, processed: 0, errors });
  }

  // Batch insert all events
  const eventRows = (inserted ?? []).map((row, i) => ({
    lead_id: row.id,
    type: "meta_form_submitted" as const,
    payload: valid[i].eventPayload,
  }));

  if (eventRows.length > 0) {
    await supabase.from("lead_events").insert(eventRows);
  }

  return NextResponse.json({ ok: true, processed: inserted?.length ?? 0, errors });
}

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = "sha256=" +
    createHmac("sha256", secret).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
