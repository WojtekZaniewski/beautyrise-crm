import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { syncEmailAccount } from "@/lib/email/sync-account";

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("account_id");
    const sync = searchParams.get("sync") === "1";

    if (!accountId) return NextResponse.json({ error: "Brak account_id" }, { status: 400 });

    const { data: account } = await supabase
      .from("email_accounts")
      .select("id, workspace_id, email, display_name, password_enc")
      .eq("id", accountId)
      .eq("workspace_id", workspaceId)
      .single();

    if (!account) return NextResponse.json({ error: "Nie znaleziono konta" }, { status: 404 });

    if (sync) {
      await syncEmailAccount(supabase, account, { limit: 100 });
    }

    const { data: threads } = await supabase
      .from("email_threads")
      .select(`
        id, subject, participants, is_read, is_starred, last_message_at,
        email_thread_messages ( id, from_email, from_name, body_text, sent_at, direction, is_read )
      `)
      .eq("workspace_id", workspaceId)
      .eq("account_id", accountId)
      .order("last_message_at", { ascending: false })
      .limit(100);

    return NextResponse.json(threads ?? []);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
