import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();

    const [convsRes, smsRes, emailRes] = await Promise.all([
      supabase
        .from("conversations")
        .select("channel, unread_count")
        .eq("workspace_id", workspaceId)
        .gt("unread_count", 0),
      supabase
        .from("sms_conversations")
        .select("unread_count")
        .eq("workspace_id", workspaceId)
        .gt("unread_count", 0),
      supabase
        .from("email_threads")
        .select("id, account_id")
        .eq("workspace_id", workspaceId)
        .eq("is_read", false),
    ]);

    let messenger = 0;
    let instagram = 0;
    for (const row of convsRes.data ?? []) {
      const r = row as { channel: string; unread_count: number };
      if (r.channel === "messenger") messenger += r.unread_count ?? 0;
      else if (r.channel === "instagram") instagram += r.unread_count ?? 0;
    }

    const sms = (smsRes.data ?? []).reduce(
      (s, r) => s + ((r as { unread_count: number }).unread_count ?? 0),
      0,
    );

    const emailByAccount: Record<string, number> = {};
    for (const row of emailRes.data ?? []) {
      const r = row as { account_id: string };
      emailByAccount[r.account_id] = (emailByAccount[r.account_id] ?? 0) + 1;
    }
    const email = (emailRes.data ?? []).length;

    return NextResponse.json({
      messenger,
      instagram,
      sms,
      email,
      emailByAccount,
      total: messenger + instagram + sms + email,
    });
  } catch {
    return NextResponse.json({
      messenger: 0,
      instagram: 0,
      sms: 0,
      email: 0,
      emailByAccount: {},
      total: 0,
    });
  }
}
