import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";

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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
    let sent = 0;
    let failed = 0;

    for (const recipient of recipients) {
      try {
        // Insert recipient row
        const { data: recipientRow } = await supabase
          .from("email_outreach_recipients")
          .insert({
            campaign_id: id,
            email: recipient.email,
            name: recipient.name,
            lead_id: recipient.lead_id,
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
