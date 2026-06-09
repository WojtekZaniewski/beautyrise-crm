import { createServiceClient } from "@/lib/supabase/server";
import { buildUserData, matchKeys } from "./user-data";
import { buildServerEvent } from "./event";
import { sendEvents } from "./graph";
import type { SendResult } from "./graph";

export type { SendResult };

type CapiClientRow = {
  id: string;
  name: string;
  pixel_id: string;
  access_token: string;
  test_event_code: string | null;
  workspace_id: string | null;
  active: boolean;
};

type MetaIntegrationCreds = {
  access_token?: string;
  pixel_id?: string;
  pixel_name?: string;
  selected_ad_account_id?: string;
  [key: string]: unknown;
};

export async function resolveCapiConfig(
  workspaceId: string,
): Promise<{ pixelId: string; accessToken: string; testEventCode?: string | null; clientName?: string } | null> {
  const supabase = createServiceClient();

  const { data: client } = await supabase
    .from("capi_clients")
    .select("pixel_id, access_token, test_event_code, name, active")
    .eq("workspace_id", workspaceId)
    .eq("active", true)
    .maybeSingle();

  if (client) {
    const row = client as CapiClientRow;
    return {
      pixelId: row.pixel_id,
      accessToken: row.access_token,
      testEventCode: row.test_event_code,
      clientName: row.name,
    };
  }

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", workspaceId)
    .eq("type", "meta_ads")
    .maybeSingle();

  const creds = (integration?.credentials ?? null) as MetaIntegrationCreds | null;
  if (!creds?.access_token || !creds?.pixel_id) return null;

  return { pixelId: creds.pixel_id, accessToken: creds.access_token };
}

const STAGE_EVENT_MAP: Record<string, string> = {
  "Umówiony na call":            "Schedule",
  "Wysłany link do calla":       "Lead",
  "Po rozmowie":                 "Lead",
  "Zamknięty":                   "CompleteRegistration",
  "Lidy przekazane do prawnika": "Lead",
};

function nextAttemptAt(attempts: number): string {
  const delayMs = Math.pow(2, Math.min(attempts + 1, 7)) * 60 * 1000;
  return new Date(Date.now() + delayMs).toISOString();
}

export async function fireCapiForStageChange({
  leadId,
  stageId,
  workspaceId,
}: {
  leadId: string;
  stageId: string;
  workspaceId: string;
}): Promise<void> {
  const supabase = createServiceClient();

  const [leadRes, stageRes, config] = await Promise.all([
    supabase.from("leads").select("email, phone, value_pln, custom_fields").eq("id", leadId).maybeSingle(),
    supabase.from("pipeline_stages").select("name").eq("id", stageId).maybeSingle(),
    resolveCapiConfig(workspaceId),
  ]);

  if (!config) return;
  const lead = leadRes.data;
  const stageName = stageRes.data?.name ?? "";
  if (!lead) return;

  const metaLeadId = (lead.custom_fields as Record<string, unknown> | null)?.meta_lead_id;
  const isPurchase = stageName === "Zamknięty" && lead.value_pln;
  const eventName = isPurchase ? "Purchase" : (STAGE_EVENT_MAP[stageName] ?? "Lead");

  const rawUserData = {
    em: lead.email as string | undefined,
    ph: lead.phone as string | undefined,
    external_id: metaLeadId ? String(metaLeadId) : undefined,
  };
  const hashedUserData = buildUserData(rawUserData);
  const keys = matchKeys(hashedUserData);

  const serverEvent = buildServerEvent({
    event_name: eventName,
    action_source: "system_generated",
    user_data: hashedUserData,
    custom_data: isPurchase
      ? { value: parseFloat(lead.value_pln as string), currency: "PLN" }
      : undefined,
  });

  // Queue-first: insert with dedup (ON CONFLICT DO NOTHING via ignoreDuplicates)
  const { data: queueRow } = await supabase
    .from("capi_events")
    .upsert({
      workspace_id: workspaceId,
      event_id: serverEvent.event_id,
      event_name: eventName,
      status: "pending",
      payload: serverEvent,
      match_keys: keys,
      lead_id: leadId,
    }, {
      onConflict: "workspace_id,event_id,event_name",
      ignoreDuplicates: true,
    })
    .select("id")
    .maybeSingle();

  // Duplicate — idempotent, skip
  if (!queueRow) return;

  const rowId = (queueRow as { id: string }).id;

  // Attempt immediate send
  let result: SendResult;
  try {
    result = await sendEvents({
      pixelId: config.pixelId,
      accessToken: config.accessToken,
      events: [serverEvent],
      testEventCode: config.testEventCode,
      matchKeys: keys,
    });
  } catch {
    // Network error — leave as pending for cron retry
    await supabase
      .from("capi_events")
      .update({ attempts: 1, next_attempt_at: nextAttemptAt(0), last_error: "Network error" })
      .eq("id", rowId);
    return;
  }

  const isFatal = result.error ? result.error.retryable === false : false;

  await supabase
    .from("capi_events")
    .update({
      status: result.ok ? "sent" : isFatal ? "failed" : "pending",
      attempts: 1,
      fbtrace_id: result.fbtraceId ?? null,
      events_received: result.eventsReceived ?? null,
      last_error: result.error?.message ?? null,
      sent_at: result.ok ? new Date().toISOString() : null,
      next_attempt_at: result.ok || isFatal ? null : nextAttemptAt(0),
    })
    .eq("id", rowId);

  // Mirror to capi_logs for dashboard (non-blocking)
  supabase.from("capi_logs").insert({
    workspace_id: workspaceId,
    lead_id: leadId,
    event_name: eventName,
    match_keys: result.matchKeys,
    ok: result.ok,
    events_received: result.eventsReceived ?? null,
    fbtrace_id: result.fbtraceId ?? null,
    error_message: result.error?.message ?? null,
  }).then(() => {}, () => {});
}

export async function getMetaIntegration(workspaceId: string): Promise<MetaIntegrationCreds | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", workspaceId)
    .eq("type", "meta_ads")
    .maybeSingle();
  return (data?.credentials ?? null) as MetaIntegrationCreds | null;
}
