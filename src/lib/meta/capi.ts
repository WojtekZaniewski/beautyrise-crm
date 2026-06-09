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

/**
 * Resolve CAPI config: prefer capi_clients table (gateway-style, full EMQ),
 * fall back to integrations.credentials for workspaces that haven't migrated yet.
 */
async function resolveCapiConfig(
  workspaceId: string,
): Promise<{ pixelId: string; accessToken: string; testEventCode?: string | null; clientName?: string } | null> {
  const supabase = createServiceClient();

  // 1) Check capi_clients table (gateway approach)
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

  // 2) Fall back to integrations table
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

// Stage-name → Meta standard event mapping
const STAGE_EVENT_MAP: Record<string, string> = {
  "Umówiony na call":            "Schedule",
  "Wysłany link do calla":       "Lead",
  "Po rozmowie":                 "Lead",
  "Zamknięty":                   "CompleteRegistration",
  "Lidy przekazane do prawnika": "Lead",
};

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

  const result = await sendEvents({
    pixelId: config.pixelId,
    accessToken: config.accessToken,
    events: [serverEvent],
    testEventCode: config.testEventCode,
    matchKeys: keys,
  });

  // Log to capi_logs (non-blocking)
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

// Legacy export for any existing callers
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
