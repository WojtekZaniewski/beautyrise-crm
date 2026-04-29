import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";

function detectGender(fullName: string): "female" | "male" {
  const firstName = fullName.trim().split(/\s+/)[0] ?? "";
  return firstName.toLowerCase().endsWith("a") ? "female" : "male";
}

function buildHtml(leadName: string, appUrl: string): string {
  const gender = detectGender(leadName);
  const salutation = gender === "female" ? "Szanowna Pani" : "Szanowny Panie";
  const pronoun = gender === "female" ? "Pani" : "Panu";
  const firstName = leadName.trim().split(/\s+/)[0] ?? leadName;

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formularz dotacyjny</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header z logami -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px 24px;border-bottom:3px solid #ff6b00;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:55%;" align="left" valign="middle">
                    <img src="${appUrl}/logo-beautyrise.png" alt="Beauty Rise" height="44" style="display:block;height:44px;max-width:200px;object-fit:contain;" />
                  </td>
                  <td style="width:10%;text-align:center;color:#d1d5db;font-size:20px;" valign="middle">×</td>
                  <td style="width:35%;" align="right" valign="middle">
                    <img src="${appUrl}/logo-conpro.png" alt="Con.pro" height="36" style="display:block;height:36px;max-width:130px;object-fit:contain;margin-left:auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Treść -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.6;">
                ${salutation} <strong>${firstName}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                dziękujemy za zainteresowanie naszą ofertą dofinansowań. Cieszymy się, że mogliśmy porozmawiać i chcielibyśmy pomoc ${pronoun} w skorzystaniu z dostępnych środków.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.6;">
                Poniżej znajdzie ${pronoun} formularz dotacyjny - prosimy o jego wypełnienie, abyśmy mogli jak najszybciej przystąpić do działania.
              </p>

              <!-- Przycisk CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:8px;background:#ff6b00;">
                    <a href="https://conpro.pl/formularz/dotacje/" target="_blank"
                      style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:0.02em;">
                      Wypelnij formularz dotacyjny
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;line-height:1.5;">
                Jesli przycisk nie dziala, skopiuj ponizszy link do przegladarki:
              </p>
              <p style="margin:0;font-size:12px;color:#6b7280;">
                <a href="https://conpro.pl/formularz/dotacje/" style="color:#ff6b00;text-decoration:none;">
                  https://conpro.pl/formularz/dotacje/
                </a>
              </p>
            </td>
          </tr>

          <!-- Stopka -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;line-height:1.5;">
                Beauty Rise &amp; Con.pro - wspólnie dla Twojego biznesu
              </p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">
                Ta wiadomosc zostala wyslana automatycznie z systemu CRM Beauty Rise.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();

    const { data: lead } = await supabase
      .from("leads")
      .select("id, full_name, email")
      .eq("id", id)
      .eq("workspace_id", workspaceId)
      .single();

    if (!lead) return NextResponse.json({ error: "Lead nie znaleziony" }, { status: 404 });
    if (!lead.email) return NextResponse.json({ error: "Lead nie ma adresu e-mail" }, { status: 400 });

    const { data: account } = await supabase
      .from("email_accounts")
      .select("email, display_name, password_enc")
      .eq("workspace_id", workspaceId)
      .eq("email", "kontakt@beautyrise.pl")
      .maybeSingle();

    if (!account) {
      // Fallback: use any active account
      const { data: fallback } = await supabase
        .from("email_accounts")
        .select("email, display_name, password_enc")
        .eq("workspace_id", workspaceId)
        .limit(1)
        .maybeSingle();
      if (!fallback) return NextResponse.json({ error: "Brak skonfigurowanego konta e-mail" }, { status: 500 });

      const password = decryptPassword(fallback.password_enc);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
      const html = buildHtml(lead.full_name, appUrl);

      await sendMail({
        account: { email: fallback.email, displayName: fallback.display_name, password },
        to: lead.email,
        toName: lead.full_name,
        subject: "Formularz dotacyjny - Beauty Rise",
        html,
      });

      return NextResponse.json({ ok: true });
    }

    const password = decryptPassword(account.password_enc);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
    const html = buildHtml(lead.full_name, appUrl);

    await sendMail({
      account: { email: account.email, displayName: account.display_name, password },
      to: lead.email,
      toName: lead.full_name,
      subject: "Formularz dotacyjny - Beauty Rise",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-grant-form error:", err);
    return NextResponse.json({ error: "Blad wysylania maila" }, { status: 500 });
  }
}
