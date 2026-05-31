import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchInbox } from "@/lib/email/imap";
import { decryptPassword } from "@/lib/email/crypto";

export interface EmailAccountRow {
  id: string;
  workspace_id: string;
  email: string;
  display_name: string;
  password_enc: string;
}

export interface SyncResult {
  account_id: string;
  email: string;
  fetched: number;
  inserted: number;
  error?: string;
}

export async function syncEmailAccount(
  supabase: SupabaseClient,
  account: EmailAccountRow,
  opts: { limit?: number } = {},
): Promise<SyncResult> {
  const result: SyncResult = {
    account_id: account.id,
    email: account.email,
    fetched: 0,
    inserted: 0,
  };

  let password: string;
  try {
    password = decryptPassword(account.password_enc);
  } catch (err) {
    result.error = `decrypt: ${err instanceof Error ? err.message : String(err)}`;
    return result;
  }

  let messages;
  try {
    messages = await fetchInbox({ email: account.email, password }, { limit: opts.limit ?? 50 });
  } catch (err) {
    result.error = `imap: ${err instanceof Error ? err.message : String(err)}`;
    return result;
  }
  result.fetched = messages.length;

  for (const msg of messages) {
    const { data: existing } = await supabase
      .from("email_thread_messages")
      .select("id")
      .eq("message_id", msg.messageId)
      .maybeSingle();
    if (existing) continue;

    const baseSubject = msg.subject.replace(/^(Re:|Fwd?:)\s*/gi, "").trim();
    let { data: thread } = await supabase
      .from("email_threads")
      .select("id")
      .eq("workspace_id", account.workspace_id)
      .eq("account_id", account.id)
      .ilike("subject", `%${baseSubject}%`)
      .maybeSingle();

    if (!thread) {
      const participants = Array.from(new Set([msg.from.email, ...msg.to]));
      const { data: newThread } = await supabase
        .from("email_threads")
        .insert({
          workspace_id: account.workspace_id,
          account_id: account.id,
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
      is_read: false,
      sent_at: msg.date.toISOString(),
    });

    await supabase
      .from("email_threads")
      .update({ last_message_at: msg.date.toISOString(), is_read: false })
      .eq("id", thread.id);

    if (msg.from.email.toLowerCase() !== account.email.toLowerCase()) {
      const { data: acctCampaigns } = await supabase
        .from("email_outreach_campaigns")
        .select("id")
        .eq("account_id", account.id);

      if (acctCampaigns && acctCampaigns.length > 0) {
        await supabase
          .from("email_outreach_recipients")
          .update({ replied_at: msg.date.toISOString(), status: "replied" })
          .eq("email", msg.from.email)
          .in("campaign_id", acctCampaigns.map((c: { id: string }) => c.id))
          .is("replied_at", null)
          .not("sent_at", "is", null);
      }
    }
    result.inserted += 1;
  }

  return result;
}
