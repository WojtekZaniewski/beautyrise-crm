import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { fetchFolders, fetchInbox } from "@/lib/email/imap";
import { decryptPassword } from "@/lib/email/crypto";

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("account_id");
    const folder = searchParams.get("folder"); // if set, fetch messages from this folder

    if (!accountId) return NextResponse.json({ error: "Brak account_id" }, { status: 400 });

    const { data: account } = await supabase
      .from("email_accounts")
      .select("id, workspace_id, email, password_enc")
      .eq("id", accountId)
      .eq("workspace_id", workspaceId)
      .single();

    if (!account) return NextResponse.json({ error: "Nie znaleziono konta" }, { status: 404 });

    const password = decryptPassword(account.password_enc);
    const creds = { email: account.email, password };

    // Return messages for a specific folder (live IMAP)
    if (folder) {
      const messages = await fetchInbox(creds, { folder, limit: 50 });
      return NextResponse.json(messages);
    }

    // Return list of available folders
    const folders = await fetchFolders(creds);
    return NextResponse.json(folders);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
