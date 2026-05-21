import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export interface ImapAccount {
  email: string;
  password: string;
}

export interface FetchedMessage {
  uid: number;
  messageId: string;
  from: { email: string; name: string };
  to: string[];
  subject: string;
  bodyHtml: string;
  bodyText: string;
  date: Date;
  isRead: boolean;
}

export async function fetchInbox(
  account: ImapAccount,
  opts: { limit?: number; folder?: string } = {},
): Promise<FetchedMessage[]> {
  const client = new ImapFlow({
    host: process.env.EMAIL_IMAP_HOST ?? "mail-serwer440067.lh.pl",
    port: Number(process.env.EMAIL_IMAP_PORT ?? 993),
    secure: true,
    auth: { user: account.email, pass: account.password },
    logger: false,
  });

  await client.connect();
  const messages: FetchedMessage[] = [];

  try {
    const lock = await client.getMailboxLock(opts.folder ?? "INBOX");
    try {
      const mailbox = client.mailbox;
      const total = (mailbox && typeof mailbox === "object" && "exists" in mailbox ? mailbox.exists : 0) as number;
      if (total === 0) return [];

      const limit = opts.limit ?? 50;
      const start = Math.max(1, total - limit + 1);
      const range = `${start}:${total}`;

      for await (const msg of client.fetch(range, {
        uid: true,
        flags: true,
        bodyStructure: true,
        envelope: true,
        source: true,
      })) {
        try {
          if (!msg.source) continue;
          const parsed = await simpleParser(msg.source as Buffer);
          const fromAddr = parsed.from?.value?.[0];
          const toField = parsed.to;
          const toAddrs = toField
            ? Array.isArray(toField)
              ? toField.flatMap((a) => a.value.map((v: { address?: string }) => v.address ?? ""))
              : (toField as { value: { address?: string }[] }).value.map((v) => v.address ?? "")
            : [];
          messages.push({
            uid: msg.uid,
            messageId: parsed.messageId ?? `uid-${msg.uid}`,
            from: {
              email: fromAddr?.address ?? "",
              name: fromAddr?.name ?? fromAddr?.address ?? "",
            },
            to: toAddrs,
            subject: parsed.subject ?? "(Brak tematu)",
            bodyHtml: (parsed.html as string | false | undefined) || (parsed.textAsHtml ?? "") || "",
            bodyText: parsed.text ?? "",
            date: parsed.date ?? new Date(),
            isRead: (msg.flags ?? new Set<string>()).has("\\Seen"),
          });
        } catch {
          // skip unparseable messages
        }
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }

  return messages.reverse();
}

export async function fetchFolders(account: ImapAccount): Promise<string[]> {
  const client = new ImapFlow({
    host: process.env.EMAIL_IMAP_HOST ?? "mail-serwer440067.lh.pl",
    port: Number(process.env.EMAIL_IMAP_PORT ?? 993),
    secure: true,
    auth: { user: account.email, pass: account.password },
    logger: false,
  });
  await client.connect();
  try {
    const list = await client.list();
    return list.map((f) => f.path);
  } finally {
    await client.logout();
  }
}
