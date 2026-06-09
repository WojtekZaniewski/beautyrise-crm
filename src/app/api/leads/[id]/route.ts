import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { fireCapiForStageChange } from "@/lib/meta/capi";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data } = await supabase
    .from("leads")
    .select("id, full_name, phone, email, nip, dofinansowanie_typ, dofinansowanie_obsluga, source, created_at, potential_score")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!data) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const phone = data.phone as string | null;
  const email = data.email as string | null;

  // Parallel: detect integration membership by phone/email (not just lead_id)
  const [emailRecipients, smsCampaignRows, smsDirectRows, convRows, metaRows] = await Promise.all([
    email
      ? supabase
          .from("email_outreach_recipients")
          .select("email_outreach_campaigns(id, name)")
          .eq("email", email)
          .limit(10)
      : { data: [] as unknown[] },

    phone
      ? supabase
          .from("sms_campaign_recipients")
          .select("sms_campaigns(id, name)")
          .eq("phone", phone)
          .limit(10)
      : { data: [] as unknown[] },

    phone
      ? supabase
          .from("sms_messages")
          .select("id")
          .eq("to", phone)
          .limit(1)
      : { data: [] as unknown[] },

    supabase
      .from("conversations")
      .select("channel")
      .eq("lead_id", id)
      .limit(10),

    supabase
      .from("lead_events")
      .select("type")
      .eq("lead_id", id)
      .eq("type", "meta_form_submitted")
      .limit(1),
  ]);

  type CampaignRef = { id: string; name: string };
  type Group = { name: string; campaigns: CampaignRef[] };
  const groups: Group[] = [];

  const hasSms =
    (smsDirectRows.data ?? []).length > 0 ||
    (smsCampaignRows.data ?? []).length > 0;

  if (hasSms) {
    const campaigns = (smsCampaignRows.data ?? [])
      .map((r) => {
        const c = (r as { sms_campaigns: CampaignRef | null }).sms_campaigns;
        return c ? { id: c.id, name: c.name } : null;
      })
      .filter((c): c is CampaignRef => c !== null);
    const uniq = [...new Map(campaigns.map((c) => [c.id, c])).values()];
    groups.push({ name: "SMS", campaigns: uniq });
  }

  if ((emailRecipients.data ?? []).length > 0) {
    const campaigns = (emailRecipients.data ?? [])
      .map((r) => {
        const c = (r as { email_outreach_campaigns: CampaignRef | null }).email_outreach_campaigns;
        return c ? { id: c.id, name: c.name } : null;
      })
      .filter((c): c is CampaignRef => c !== null);
    const uniq = [...new Map(campaigns.map((c) => [c.id, c])).values()];
    groups.push({ name: "Email", campaigns: uniq });
  }

  if (data.source === "meta_ads" || (metaRows.data ?? []).length > 0) {
    groups.push({ name: "Meta Ads", campaigns: [] });
  }

  const channels = new Set((convRows.data ?? []).map((c: { channel: string }) => c.channel));
  if (channels.has("messenger")) groups.push({ name: "Messenger", campaigns: [] });
  if (channels.has("instagram")) groups.push({ name: "Instagram", campaigns: [] });

  const SOURCE_LABELS: Record<string, string> = {
    manual:   "Dodany manualnie",
    import:   "Dodany przez import",
    meta_ads: "Dodany z Meta Ads",
    webhook:  "Dodany przez webhook",
  };
  const sourceLabel = SOURCE_LABELS[data.source as string] ?? "Dodany manualnie";

  return NextResponse.json({ ...data, groups, sourceLabel });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const body = await req.json();
  const stringFields = ["full_name", "phone", "email", "nip", "dofinansowanie_typ", "dofinansowanie_obsluga"] as const;
  const update: Record<string, string | number | boolean | null> = {};

  for (const key of stringFields) {
    if (key in body) {
      const val = typeof body[key] === "string" ? body[key].trim() || null : null;
      update[key] = val;
    }
  }

  if ("potential_score" in body) {
    const s = body.potential_score;
    update.potential_score = (typeof s === "number" && s >= 0 && s <= 10) ? Math.floor(s) : null;
  }

  if ("archived" in body && typeof body.archived === "boolean") {
    update.archived = body.archived;
    update.deleted_at = body.archived ? new Date().toISOString() : null;
    if (body.archived) update.value_pln = null;
  }

  if ("stage_id" in body && (typeof body.stage_id === "string" || body.stage_id === null)) {
    update.stage_id = body.stage_id;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Brak pól do aktualizacji" }, { status: 400 });
  }

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { error } = await supabase
    .from("leads")
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fire CAPI event when stage changes (non-blocking — don't await)
  if (typeof update.stage_id === "string") {
    fireCapiForStageChange({ leadId: id, stageId: update.stage_id, workspaceId }).catch(() => {});
  }

  // Detect potential duplicates by new phone/email
  type DupeLead = { id: string; full_name: string; phone: string | null; email: string | null };

  const [byPhone, byEmail] = await Promise.all([
    update.phone
      ? supabase.from("leads").select("id, full_name, phone, email")
          .eq("workspace_id", workspaceId).eq("phone", update.phone).neq("id", id).limit(3)
          .then((r) => (r.data ?? []) as DupeLead[])
      : Promise.resolve([] as DupeLead[]),
    update.email
      ? supabase.from("leads").select("id, full_name, phone, email")
          .eq("workspace_id", workspaceId).ilike("email", update.email as string).neq("id", id).limit(3)
          .then((r) => (r.data ?? []) as DupeLead[])
      : Promise.resolve([] as DupeLead[]),
  ]);

  const dupeResults = [byPhone, byEmail];
  const duplicates = [
    ...new Map(
      dupeResults.flat().map((l) => [l.id, l]),
    ).values(),
  ];

  return NextResponse.json({ ok: true, duplicates });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
