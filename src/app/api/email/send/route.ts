import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";

export async function POST(req: NextRequest) {
  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();
    const body = await req.json();
    const { account_id, to, to_name, subject, html, text, in_reply_to, references, thread_id } = body;

    if (!account_id || !to || !subject || !html) {
      return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
    }

    const { data: account } = await supabase
      .from("email_accounts")
      .select("*")
      .eq("id", account_id)
      .eq("workspace_id", workspaceId)
      .single();

    if (!account) return NextResponse.json({ error: "Nie znaleziono konta" }, { status: 404 });

    const password = decryptPassword(account.password_enc);

    const messageId = await sendMail({
      account: { email: account.email, displayName: account.display_name, password },
      to,
      toName: to_name,
      subject,
      html,
      text,
      inReplyTo: in_reply_to,
      references,
    });

    // Save outbound message to thread
    if (thread_id) {
      await supabase.from("email_thread_messages").insert({
        thread_id,
        message_id: messageId,
        from_email: account.email,
        from_name: account.display_name,
        to_emails: [to],
        subject,
        body_html: html,
        body_text: text ?? "",
        direction: "outbound",
        is_read: true,
        sent_at: new Date().toISOString(),
      });
      await supabase
        .from("email_threads")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", thread_id);
    }

    return NextResponse.json({ ok: true, message_id: messageId });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
