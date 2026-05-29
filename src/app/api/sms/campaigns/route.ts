import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

async function getFirstStageId(supabase: ReturnType<typeof createServiceClient>, workspaceId: string): Promise<string | null> {
  const { data: pipeline } = await supabase
    .from("pipelines")
    .select("id")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!pipeline?.id) return null;

  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("id")
    .eq("pipeline_id", pipeline.id)
    .order("order", { ascending: true })
    .limit(1);
  return stages?.[0]?.id ?? null;
}

async function resolveLeadIdForSms(
  supabase: ReturnType<typeof createServiceClient>,
  workspaceId: string,
  campaignId: string,
  recipient: { phone: string; name?: string; lead_id?: string },
  firstStageId: string | null,
): Promise<string | null> {
  const now = new Date().toISOString();

  if (recipient.lead_id) {
    // Always update source_campaign_id (UUID, always valid)
    await supabase.from("leads")
      .update({ source_campaign_id: campaignId, updated_at: now })
      .eq("id", recipient.lead_id);
    if (firstStageId) {
      await supabase.from("leads")
        .update({ stage_id: firstStageId, updated_at: now })
        .eq("id", recipient.lead_id)
        .is("stage_id", null);
    }
    // Try "sms" source (may fail if enum not applied — ignored)
    await supabase.from("leads")
      .update({ source: "sms", updated_at: now })
      .eq("id", recipient.lead_id);
    return recipient.lead_id;
  }

  // Try to find existing lead by phone
  const { data: found } = await supabase
    .from("leads")
    .select("id, stage_id")
    .eq("workspace_id", workspaceId)
    .eq("phone", recipient.phone)
    .eq("archived", false)
    .limit(1)
    .maybeSingle();

  if (found) {
    await supabase.from("leads")
      .update({ source_campaign_id: campaignId, updated_at: now })
      .eq("id", found.id);
    if (firstStageId && !found.stage_id) {
      await supabase.from("leads")
        .update({ stage_id: firstStageId, updated_at: now })
        .eq("id", found.id);
    }
    await supabase.from("leads")
      .update({ source: "sms", updated_at: now })
      .eq("id", found.id);
    return found.id;
  }

  if (!firstStageId) return null;

  const basePayload = {
    workspace_id: workspaceId,
    full_name: recipient.name || recipient.phone,
    phone: recipient.phone,
    source_campaign_id: campaignId,
    stage_id: firstStageId,
  };

  // Try "sms" source first, fall back to "manual"
  const { data: withSms, error: smsErr } = await supabase
    .from("leads")
    .insert({ ...basePayload, source: "sms" })
    .select("id")
    .single();
  if (!smsErr && withSms) return withSms.id;

  const { data: withManual } = await supabase
    .from("leads")
    .insert({ ...basePayload, source: "manual" })
    .select("id")
    .single();
  return withManual?.id ?? null;
}

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: campaigns } = await supabase
    .from("sms_campaigns")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(50);

  const ids = (campaigns ?? []).map((c) => c.id);
  const replyCounts: Record<string, number> = {};
  if (ids.length > 0) {
    const { data: replied } = await supabase
      .from("sms_campaign_recipients")
      .select("campaign_id")
      .in("campaign_id", ids)
      .not("replied_at", "is", null);
    for (const r of replied ?? []) {
      replyCounts[r.campaign_id] = (replyCounts[r.campaign_id] ?? 0) + 1;
    }
  }

  return NextResponse.json((campaigns ?? []).map((c) => ({ ...c, replied: replyCounts[c.id] ?? 0 })));
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { name, template, recipients } = await req.json();

  const { data: campaign, error } = await supabase
    .from("sms_campaigns")
    .insert({
      workspace_id: workspaceId,
      name: name || `Kampania SMS ${new Date().toLocaleDateString("pl-PL")}`,
      template: template || "",
      status: "sending",
      total_sent: 0,
    })
    .select("id")
    .single();

  if (error || !campaign) {
    return NextResponse.json({ error: error?.message ?? "DB error" }, { status: 500 });
  }

  if (Array.isArray(recipients) && recipients.length > 0) {
    const firstStageId = await getFirstStageId(supabase, workspaceId);

    const resolvedRecipients = await Promise.all(
      recipients.map(async (r: { phone: string; name?: string; lead_id?: string; message_body?: string }) => {
        const leadId = await resolveLeadIdForSms(supabase, workspaceId, campaign.id, r, firstStageId);
        return {
          workspace_id: workspaceId,
          campaign_id: campaign.id,
          lead_id: leadId,
          phone: r.phone,
          name: r.name ?? "",
          message_body: r.message_body ?? "",
          status: "pending",
        };
      }),
    );

    await supabase.from("sms_campaign_recipients").insert(resolvedRecipients);
  }

  return NextResponse.json({ id: campaign.id });
}
