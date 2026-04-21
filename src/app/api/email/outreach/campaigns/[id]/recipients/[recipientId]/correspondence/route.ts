import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string; recipientId: string }> }
) {
  const { id, recipientId } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Verify campaign belongs to workspace
  const { data: campaign } = await supabase
    .from("email_outreach_campaigns")
    .select("id, account_id, subject, body_text, body_html")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!campaign) return NextResponse.json({ error: "Nie znaleziono kampanii" }, { status: 404 });

  // Get recipient
  const { data: recipient } = await supabase
    .from("email_outreach_recipients")
    .select("*")
    .eq("id", recipientId)
    .eq("campaign_id", id)
    .single();

  if (!recipient) return NextResponse.json({ error: "Nie znaleziono odbiorcy" }, { status: 404 });

  // Find email threads involving this recipient for this account
  const { data: threads } = await supabase
    .from("email_threads")
    .select(`
      id, subject, participants, is_read, last_message_at,
      email_thread_messages (
        id, from_email, from_name, to_emails, subject,
        body_html, body_text, direction, is_read, sent_at
      )
    `)
    .eq("workspace_id", workspaceId)
    .eq("account_id", campaign.account_id)
    .contains("participants", [recipient.email])
    .order("last_message_at", { ascending: false });

  // Mark all inbound messages in these threads as read
  const threadIds = (threads ?? []).map((t) => t.id);
  if (threadIds.length > 0) {
    await supabase
      .from("email_thread_messages")
      .update({ is_read: true })
      .in("thread_id", threadIds)
      .eq("direction", "inbound")
      .eq("is_read", false);
  }

  return NextResponse.json({
    recipient,
    campaign: {
      id: campaign.id,
      account_id: campaign.account_id,
      subject: campaign.subject,
      body_text: campaign.body_text,
      body_html: campaign.body_html,
    },
    threads: threads ?? [],
  });
}
