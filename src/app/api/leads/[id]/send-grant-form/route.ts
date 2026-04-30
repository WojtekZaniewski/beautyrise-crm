import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";
import fs from "fs";
import path from "path";

function loadLogo(filename: string): Buffer | null {
  try {
    return fs.readFileSync(path.join(process.cwd(), "public", filename));
  } catch {
    return null;
  }
}

function detectGender(firstName: string): "female" | "male" {
  return firstName.toLowerCase().endsWith("a") ? "female" : "male";
}

function toVocative(name: string, gender: "female" | "male"): string {
  if (gender === "female") {
    // Replace final 'a' with 'o': Marzena->Marzeno, Anna->Anno, Monika->Moniko
    if (/a$/i.test(name)) return name.slice(0, -1) + "o";
    return name;
  }
  const l = name.toLowerCase();
  // Male vocative by suffix
  if (l.endsWith("sz")) return name + "u";          // Tomasz->Tomaszu, Lukasz->Lukaszu
  if (l.endsWith("cz")) return name + "u";          // Lech... edge case
  if (l.endsWith("ek")) return name.slice(0, -2) + "ku"; // Marek->Marku, Darek->Darku
  if (l.endsWith("al")) return name.slice(0, -2) + "ale"; // Michal->Michale
  if (l.endsWith("el") || l.endsWith("el")) return name + "u"; // Daniel->Danielu
  if (l.endsWith("j"))  return name + "u";          // Maciej->Macieju
  if (l.endsWith("k"))  return name + "u";          // Patryk->Patryku, Dominik->Dominiku
  if (l.endsWith("b"))  return name + "ie";         // Jakub->Jakubie
  if (l.endsWith("p"))  return name + "ie";         // Filip->Filipie
  if (l.endsWith("n"))  return name + "ie";         // Marcin->Marcinie, Jan->Janie
  if (l.endsWith("m"))  return name + "ie";         // Adam->Adamie
  if (l.endsWith("r"))  return name + "ze";         // Piotr->Piotrze, Igor->Igorze
  if (l.endsWith("t"))  return name.slice(0, -1) + "cie"; // Robert->Robercie
  if (l.endsWith("d"))  return name.slice(0, -1) + "dzie"; // Edward->Edwardzie
  if (l.endsWith("s"))  return name + "ie";         // Tadeusz->Tadeuszie (approx)
  return name;
}

function buildHtml(leadName: string, trackingUrl: string): string {
  const firstName = leadName.trim().split(/\s+/)[0] ?? leadName;
  const gender = detectGender(firstName);
  const firstNameVoc = toVocative(firstName, gender);
  const salutation = gender === "female" ? "Szanowna Pani" : "Szanowny Panie";
  const pronoun = gender === "female" ? "Pani" : "Panu";

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
            <td style="background:#ffffff;padding:16px 40px 12px;border-bottom:3px solid #ff6b00;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:50%;" align="left" valign="middle">
                    <img src="cid:logo-beautyrise" alt="Beauty Rise" width="160" height="160" style="display:block;width:160px;height:160px;object-fit:contain;" />
                  </td>
                  <td style="width:10%;text-align:center;color:#d1d5db;font-size:20px;" valign="middle">×</td>
                  <td style="width:40%;" align="right" valign="middle">
                    <img src="cid:logo-conpro" alt="Con.pro" width="140" height="140" style="display:block;width:140px;height:140px;object-fit:contain;margin-left:auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Treść -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.6;">
                ${salutation} <strong>${firstNameVoc}</strong>,
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
                    <a href="${trackingUrl}" target="_blank"
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
                <a href="${trackingUrl}" style="color:#ff6b00;text-decoration:none;">
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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
    const trackingUrl = `${appUrl}/api/leads/${id}/track-grant-click`;

    const inlineAttachments = [
      { cid: "logo-beautyrise", filename: "logo-beautyrise.png", content: loadLogo("logo-beautyrise.png") ?? Buffer.alloc(0), contentType: "image/png" },
      { cid: "logo-conpro",     filename: "logo-conpro.png",     content: loadLogo("logo-conpro.png")     ?? Buffer.alloc(0), contentType: "image/png" },
    ];

    const sendAccount = account ?? await (async () => {
      const { data: fallback } = await supabase
        .from("email_accounts")
        .select("email, display_name, password_enc")
        .eq("workspace_id", workspaceId)
        .limit(1)
        .maybeSingle();
      return fallback;
    })();

    if (!sendAccount) return NextResponse.json({ error: "Brak skonfigurowanego konta e-mail" }, { status: 500 });

    const password = decryptPassword(sendAccount.password_enc);
    const html = buildHtml(lead.full_name, trackingUrl);

    await sendMail({
      account: { email: sendAccount.email, displayName: sendAccount.display_name, password },
      to: lead.email,
      toName: lead.full_name,
      subject: "Formularz dotacyjny - Beauty Rise",
      html,
      inlineAttachments,
    });

    await supabase.from("lead_events").insert({
      lead_id: id,
      type: "grant_form_sent",
      payload: { email: lead.email, sent_at: new Date().toISOString() },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-grant-form error:", err);
    return NextResponse.json({ error: "Blad wysylania maila" }, { status: 500 });
  }
}
