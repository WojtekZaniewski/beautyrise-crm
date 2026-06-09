import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";

const CAPI_VERSION = "v21.0";
const CAPI_BASE = `https://graph.facebook.com/${CAPI_VERSION}`;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

function sha256Phone(phone: string): string {
  return crypto.createHash("sha256").update(phone.replace(/\D/g, "")).digest("hex");
}

type MetaCredentials = {
  access_token?: string;
  pixel_id?: string;
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
}): Promise<void> {
  const userData: Record<string, unknown> = {};
  if (email) userData.em = [sha256(email)];
  if (phone) userData.ph = [sha256Phone(phone)];
  if (leadId != null) userData.lead_id = leadId;

  const event: Record<string, unknown> = {
    action_source: "system_generated",
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    user_data: userData,
  };
  if (customData && Object.keys(customData).length > 0) event.custom_data = customData;

  const url = `${CAPI_BASE}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [event] }),
    cache: "no-store",
  });
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
  const eventName = STAGE_EVENT_MAP[stageName] ?? "Lead";

  let customData: Record<string, unknown> | undefined;
  if (stageName === "Zamknięty" && lead.value_pln) {
    customData = { value: parseFloat(lead.value_pln as string), currency: "PLN" };
    // Purchase is more valuable to Meta than CompleteRegistration when there's revenue
    await sendCapiEvent({
      pixelId: creds.pixel_id,
      accessToken: creds.access_token,
      eventName: "Purchase",
      email: lead.email as string | null,
      phone: lead.phone as string | null,
      leadId: metaLeadId as string | number | null,
      customData,
    });
    return;
  }

  await sendCapiEvent({
    pixelId: creds.pixel_id,
    accessToken: creds.access_token,
    eventName,
    email: lead.email as string | null,
    phone: lead.phone as string | null,
    leadId: metaLeadId as string | number | null,
  });
}
