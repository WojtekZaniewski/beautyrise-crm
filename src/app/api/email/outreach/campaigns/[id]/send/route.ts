import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";

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

async function resolveLeadId(
  supabase: ReturnType<typeof createServiceClient>,
  workspaceId: string,
  campaignId: string,
  recipient: { email: string; name?: string; lead_id?: string },
  firstStageId: string | null,
): Promise<string | null> {
  if (recipient.lead_id) {
    // Lead already known — put it in the pipeline and mark as email source
    const updates: Record<string, unknown> = {
      source: "email",
      source_campaign_id: campaignId,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("leads").update(updates).eq("id", recipient.lead_id);
    if (firstStageId) {
      await supabase
        .from("leads")
        .update({ stage_id: firstStageId, updated_at: new Date().toISOString() })
        .eq("id", recipient.lead_id)
        .is("stage_id", null);
    }
    return recipient.lead_id;
  }

  // Try to find existing lead by email
  const { data: found } = await supabase
    .from("leads")
    .select("id, stage_id")
    .eq("workspace_id", workspaceId)
    .eq("email", recipient.email)
    .eq("archived", false)
    .limit(1)
    .maybeSingle();

  if (found) {
    const updates: Record<string, unknown> = {
      source: "email",
      source_campaign_id: campaignId,
      updated_at: new Date().toISOString(),
    };
    if (firstStageId && !found.stage_id) updates.stage_id = firstStageId;
    await supabase.from("leads").update(updates).eq("id", found.id);
    return found.id;
  }

  // Create a new lead
  if (!firstStageId) return null;
  const { data: created } = await supabase
    .from("leads")
    .insert({
      workspace_id: workspaceId,
      full_name: recipient.name || recipient.email,
      email: recipient.email,
      source: "email",
      source_campaign_id: campaignId,
      stage_id: firstStageId,
    })
    .select("id")
    .single();
  return created?.id ?? null;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();
    const body = await req.json();
    const { recipients } = body as {
      recipients: Array<{ email: string; name?: string; lead_id?: string }>;
    };

    if (!recipients?.length) {
      return NextResponse.json({ error: "Brak odbiorców" }, { status: 400 });
    }

    const { data: campaign } = await supabase
      .from("email_outreach_campaigns")
      .select("*, email_accounts(*)")
      .eq("id", id)
      .eq("workspace_id", workspaceId)
      .single();

    if (!campaign) return NextResponse.json({ error: "Nie znaleziono kampanii" }, { status: 404 });

    const account = campaign.email_accounts as {
      email: string; display_name: string; password_enc: string;
    };
    const password = decryptPassword(account.password_enc);
    const firstStageId = await getFirstStageId(supabase, workspaceId);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
    let sent = 0;
    let failed = 0;

    for (const recipient of recipients) {
      try {
        // Auto-create or update lead so it appears in Kanban
        const leadId = await resolveLeadId(supabase, workspaceId, id, recipient, firstStageId);

        // Insert recipient row
        const { data: recipientRow } = await supabase
          .from("email_outreach_recipients")
          .insert({
            campaign_id: id,
            email: recipient.email,
            name: recipient.name,
            lead_id: leadId,
            status: "pending",
          })
          .select("id")
          .single();

        const recipientId = recipientRow?.id;

        // Build HTML with tracking pixel
        const trackPixel = recipientId
          ? `<img src="${baseUrl}/api/email/track/open?r=${recipientId}&c=${id}" width="1" height="1" style="display:none" />`
          : "";

        const html = (campaign.body_html ?? "") + trackPixel;

        const messageId = await sendMail({
          account: { email: account.email, displayName: account.display_name, password },
          to: recipient.email,
          toName: recipient.name,
          subject: campaign.subject,
          html,
          text: campaign.body_text,
        });

        if (recipientId) {
          await supabase
            .from("email_outreach_recipients")
            .update({ status: "sent", message_id: messageId, sent_at: new Date().toISOString() })
            .eq("id", recipientId);
        }
        sent++;
      } catch {
        failed++;
        if (recipients.length === 1) {
          return NextResponse.json({ error: `Błąd wysyłki` }, { status: 500 });
        }
      }
    }

    await supabase
      .from("email_outreach_campaigns")
      .update({
        status: "sent",
        total_sent: sent,
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ ok: true, sent, failed });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
