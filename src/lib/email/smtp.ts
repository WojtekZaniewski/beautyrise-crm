import nodemailer from "nodemailer";

export interface SmtpAccount {
  email: string;
  displayName: string;
  password: string;
}

export function createTransport(account: SmtpAccount) {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST ?? "mail-serwer359077.lh.pl",
    port: Number(process.env.EMAIL_SMTP_PORT ?? 465),
    secure: true,
    auth: { user: account.email, pass: account.password },
  });
}

export interface SendMailOptions {
  account: SmtpAccount;
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
  headers?: Record<string, string>;
}

export async function sendMail(opts: SendMailOptions) {
  const transport = createTransport(opts.account);
  const info = await transport.sendMail({
    from: `"${opts.account.displayName}" <${opts.account.email}>`,
    to: opts.toName ? `"${opts.toName}" <${opts.to}>` : opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
    inReplyTo: opts.inReplyTo,
    references: opts.references,
    headers: opts.headers,
  });
  return info.messageId as string;
}
