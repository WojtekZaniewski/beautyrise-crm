import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { fetchInbox } from "@/lib/email/imap";
import { decryptPassword } from "@/lib/email/crypto";

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
      .select("*")
      .eq("id", accountId)
      .eq("workspace_id", workspaceId)
      .single();

    if (!account) return NextResponse.json({ error: "Nie znaleziono konta" }, { status: 404 });

    const password = decryptPassword(account.password_enc);

    if (sync) {
      // Fetch from IMAP and sync to DB
      const messages = await fetchInbox({ email: account.email, password }, { limit: 100 });

      for (const msg of messages) {
        // Check if message already exists
        const { data: existing } = await supabase
          .from("email_thread_messages")
          .select("id")
          .eq("message_id", msg.messageId)
          .maybeSingle();

        if (existing) continue;

        // Find or create thread by subject
        const baseSubject = msg.subject.replace(/^(Re:|Fwd?:)\s*/gi, "").trim();
        let { data: thread } = await supabase
          .from("email_threads")
          .select("id")
          .eq("workspace_id", workspaceId)
          .eq("account_id", accountId)
          .ilike("subject", `%${baseSubject}%`)
          .maybeSingle();

        if (!thread) {
          const participants = Array.from(new Set([msg.from.email, ...msg.to]));
          const { data: newThread } = await supabase
            .from("email_threads")
            .insert({
              workspace_id: workspaceId,
              account_id: accountId,
              subject: msg.subject,
              participants,
              last_message_at: msg.date.toISOString(),
              is_read: msg.isRead,
            })
            .select("id")
            .single();
          thread = newThread;
        }

        if (!thread) continue;

        await supabase.from("email_thread_messages").insert({
          thread_id: thread.id,
          imap_uid: msg.uid,
          message_id: msg.messageId,
          from_email: msg.from.email,
          from_name: msg.from.name,
          to_emails: msg.to,
          subject: msg.subject,
          body_html: msg.bodyHtml,
          body_text: msg.bodyText,
          direction: "inbound",
          is_read: msg.isRead,
          sent_at: msg.date.toISOString(),
        });

        await supabase
          .from("email_threads")
          .update({
            last_message_at: msg.date.toISOString(),
            is_read: false,
          })
          .eq("id", thread.id);
      }
    }

    // Return threads from DB
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
