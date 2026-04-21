import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: campaign, error } = await supabase
    .from("email_outreach_campaigns")
    .select(`
      *,
      email_accounts ( email, display_name ),
      email_outreach_recipients ( id, email, name, status, sent_at, opened_at, clicked_at, replied_at )
    `)
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  // Build daily stats from tracking events
  const { data: events } = await supabase
    .from("email_tracking_events")
    .select("type, created_at")
    .eq("campaign_id", id)
    .order("created_at");

  const dailyMap: Record<string, { opens: number; clicks: number }> = {};
  for (const ev of events ?? []) {
    const day = ev.created_at.slice(0, 10);
    if (!dailyMap[day]) dailyMap[day] = { opens: 0, clicks: 0 };
    if (ev.type === "open") dailyMap[day].opens++;
    if (ev.type === "click") dailyMap[day].clicks++;
  }
  const dailyStats = Object.entries(dailyMap)
    .map(([date, v]) => ({ date, ...v }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Count inbound reply messages per recipient email
  const allRecipients = (campaign.email_outreach_recipients ?? []) as Array<{
    id: string; email: string; name: string | null; status: string;
    sent_at: string | null; opened_at: string | null; clicked_at: string | null; replied_at: string | null;
  }>;
  const recipientEmails = allRecipients.map((r) => r.email);
  const replyCountMap: Record<string, number> = {};

  if (recipientEmails.length > 0 && campaign.account_id) {
    const { data: accountThreads } = await supabase
      .from("email_threads")
      .select("id")
      .eq("account_id", campaign.account_id)
      .eq("workspace_id", workspaceId);

    const threadIds = (accountThreads ?? []).map((t: { id: string }) => t.id);
    if (threadIds.length > 0) {
      const { data: inboundMsgs } = await supabase
        .from("email_thread_messages")
        .select("from_email")
        .eq("direction", "inbound")
        .in("thread_id", threadIds)
        .in("from_email", recipientEmails);

      for (const m of inboundMsgs ?? []) {
        replyCountMap[m.from_email] = (replyCountMap[m.from_email] ?? 0) + 1;
      }
    }
  }

  const recipients = allRecipients.map((r) => ({ ...r, reply_count: replyCountMap[r.email] ?? 0 }));
  const total = recipients.length;
  const sent = recipients.filter((r) => r.status === "sent").length;
  const opened = recipients.filter((r) => r.opened_at).length;
  const clicked = recipients.filter((r) => r.clicked_at).length;
  const replied = recipients.filter((r) => r.replied_at || r.reply_count > 0).length;

  return NextResponse.json({
    ...campaign,
    email_outreach_recipients: recipients,
    stats: {
      total,
      sent,
      opened,
      clicked,
      replied,
      openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
      clickRate: sent > 0 ? Math.round((clicked / sent) * 100) : 0,
      replyRate: sent > 0 ? Math.round((replied / sent) * 100) : 0,
    },
    dailyStats,
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();

  const { error } = await supabase
    .from("email_outreach_campaigns")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { error } = await supabase
    .from("email_outreach_campaigns")
    .delete()
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
