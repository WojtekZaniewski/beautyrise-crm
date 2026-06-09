import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeEmail, normalizePhone } from "./normalize";

const CAPI_VERSION = "v21.0";
const CAPI_BASE = `https://graph.facebook.com/${CAPI_VERSION}`;
const PARTNER_AGENT = "beautyrise-crm-1.0";

export type SendResult = {
  ok: boolean;
  eventsReceived?: number;
  fbtraceId?: string;
  matchKeys: string[];
  error?: string;
};

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function buildMatchKeys(
  email: string | null | undefined,
  phone: string | null | undefined,
  leadId: unknown,
): string[] {
  const keys: string[] = [];
  if (normalizeEmail(email)) keys.push("em");
  if (normalizePhone(phone)) keys.push("ph");
  if (leadId != null && String(leadId).length > 0) keys.push("lead_id");
  return keys;
}

type MetaCredentials = {
  access_token?: string;
  pixel_id?: string;
  pixel_name?: string;
  selected_ad_account_id?: string;
  [key: string]: unknown;
};

export async function getMetaIntegration(workspaceId: string): Promise<MetaCredentials | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", workspaceId)
    .eq("type", "meta_ads")
    .maybeSingle();
  return (data?.credentials ?? null) as MetaCredentials | null;
}

export async function sendCapiEvent({
  pixelId,
  accessToken,
  eventName,
  email,
  phone,
  leadId,
  customData,
}: {
  pixelId: string;
  accessToken: string;
  eventName: string;
  email?: string | null;
  phone?: string | null;
  leadId?: string | number | null;
  customData?: Record<string, unknown>;
}): Promise<SendResult> {
  const normEmail = normalizeEmail(email);
  const normPhone = normalizePhone(phone);

  const userData: Record<string, unknown> = {};
  if (normEmail) userData.em = [sha256(normEmail)];
  if (normPhone) userData.ph = [sha256(normPhone)];
  if (leadId != null) userData.lead_id = leadId;

  const matchKeys = Object.keys(userData).filter((k) => k !== "lead_id");
  if (leadId != null) matchKeys.push("lead_id");

  const event: Record<string, unknown> = {
    action_source: "system_generated",
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
  };
  if (customData && Object.keys(customData).length > 0) event.custom_data = customData;

  const url = `${CAPI_BASE}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event], partner_agent: PARTNER_AGENT }),
      cache: "no-store",
    });

    const body = await res.json() as {
      events_received?: number;
      fbtrace_id?: string;
      messages?: unknown[];
      error?: { message?: string; code?: number };
    };

    if (!res.ok) {
      return {
        ok: false,
        matchKeys,
        error: body.error?.message ?? `HTTP ${res.status}`,
      };
    }

    return {
      ok: true,
      eventsReceived: body.events_received,
      fbtraceId: body.fbtrace_id,
      matchKeys,
    };
  } catch (err) {
    return {
      ok: false,
      matchKeys,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
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

  const [leadRes, stageRes, creds] = await Promise.all([
    supabase.from("leads").select("email, phone, value_pln, custom_fields").eq("id", leadId).maybeSingle(),
    supabase.from("pipeline_stages").select("name").eq("id", stageId).maybeSingle(),
    getMetaIntegration(workspaceId),
  ]);

  if (!creds?.access_token || !creds?.pixel_id) return;

  const lead = leadRes.data;
  const stageName = stageRes.data?.name ?? "";
  if (!lead) return;

  const metaLeadId = (lead.custom_fields as Record<string, unknown> | null)?.meta_lead_id;

  let result: SendResult;

  if (stageName === "Zamknięty" && lead.value_pln) {
    result = await sendCapiEvent({
      pixelId: creds.pixel_id,
      accessToken: creds.access_token,
      eventName: "Purchase",
      email: lead.email as string | null,
      phone: lead.phone as string | null,
      leadId: metaLeadId as string | number | null,
      customData: { value: parseFloat(lead.value_pln as string), currency: "PLN" },
    });
  } else {
    const eventName = STAGE_EVENT_MAP[stageName] ?? "Lead";
    result = await sendCapiEvent({
      pixelId: creds.pixel_id,
      accessToken: creds.access_token,
      eventName,
      email: lead.email as string | null,
      phone: lead.phone as string | null,
      leadId: metaLeadId as string | number | null,
    });
  }

  const eventName = stageName === "Zamknięty" && lead.value_pln
    ? "Purchase"
    : (STAGE_EVENT_MAP[stageName] ?? "Lead");

  supabase.from("capi_logs").insert({
    workspace_id: workspaceId,
    lead_id: leadId,
    event_name: eventName,
    match_keys: result.matchKeys,
    ok: result.ok,
    events_received: result.eventsReceived ?? null,
    fbtrace_id: result.fbtraceId ?? null,
    error_message: result.error ?? null,
  }).then(() => {}, () => {});
}
