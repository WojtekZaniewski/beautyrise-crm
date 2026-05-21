import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sendMail } from "@/lib/email/smtp";
import { decryptPassword } from "@/lib/email/crypto";
import fs from "fs";
import path from "path";

const PRESALE_LANDING_URL = "https://beautyrise.pl/oferta";

function loadAsset(filename: string): Buffer | null {
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
    if (/a$/i.test(name)) return name.slice(0, -1) + "o";
    return name;
  }
  const l = name.toLowerCase();
  if (l.endsWith("sz")) return name + "u";
  if (l.endsWith("cz")) return name + "u";
  if (l.endsWith("ek")) return name.slice(0, -2) + "ku";
  if (l.endsWith("al")) return name.slice(0, -2) + "ale";
  if (l.endsWith("el")) return name + "u";
  if (l.endsWith("j"))  return name + "u";
  if (l.endsWith("k"))  return name + "u";
  if (l.endsWith("b"))  return name + "ie";
  if (l.endsWith("p"))  return name + "ie";
  if (l.endsWith("n"))  return name + "ie";
  if (l.endsWith("m"))  return name + "ie";
  if (l.endsWith("r"))  return name + "ze";
  if (l.endsWith("t"))  return name.slice(0, -1) + "cie";
  if (l.endsWith("d"))  return name.slice(0, -1) + "dzie";
  if (l.endsWith("s"))  return name + "ie";
  return name;
}

function buildHtml(leadName: string, landingUrl: string): string {
  const firstName = leadName.trim().split(/\s+/)[0] ?? leadName;
  const gender = detectGender(firstName);
  const firstNameVoc = toVocative(firstName, gender);
  const salutation = gender === "female" ? "Szanowna Pani" : "Szanowny Panie";
  const pronounNom = gender === "female" ? "Pani" : "Pan";    // mianownik: Pani/Pan zrobi
  const pronounGen = gender === "female" ? "Pani" : "Pana";   // dopełniacz: salon Pani/Pana
  const pronounDat = gender === "female" ? "Pani" : "Panu";   // celownik: powiedzieć Pani/Panu

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nasze spotkanie - Beauty Rise</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header z logo -->
          <tr>
            <td style="background:#ffffff;padding:16px 40px 12px;border-bottom:3px solid #ff6b00;">
              <img src="cid:logo-beautyrise" alt="Beauty Rise" width="160" height="160" style="display:block;width:160px;height:160px;object-fit:contain;" />
            </td>
          </tr>

          <!-- Klikalny GIF z wideo -->
          <tr>
            <td style="padding:0;">
              <a href="${landingUrl}" target="_blank" style="display:block;line-height:0;">
                <img src="cid:presale-video-gif" alt="Kliknij aby umówić spotkanie ▶" width="600" style="display:block;width:100%;max-width:600px;border:0;" />
              </a>
            </td>
          </tr>

          <!-- Treść -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                ${salutation} <strong>${firstNameVoc}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                chcieliśmy w skrócie powiedzieć ${pronounDat}, czego może się ${pronounNom} spodziewać podczas naszego spotkania i co warto mieć ze sobą - a właściwie to jest bardzo dobra wiadomość.
              </p>

              <!-- Co się dzieje na spotkaniu -->
              <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.6;font-weight:700;">
                Co zrobimy razem podczas spotkania?
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Przeanalizujemy razem potrzeby ${pronounGen} salonu i dobierzemy usługi skrojone dokładnie pod ${pronounGen} sytuację. Na koniec ustalimy konkretny plan działania - co, kiedy i jak.
              </p>

              <!-- Separator -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                <tr><td style="height:1px;background:#f3f4f6;"></td></tr>
              </table>

              <!-- Co przygotować -->
              <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.6;font-weight:700;">
                Co ${pronounNom} musi przygotować?
              </p>
              <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.6;">
                Żadnych raportów, liczb ani statystyk - absolutnie nic z tych rzeczy. Potrzebuję od ${pronounGen} tylko dwóch rzeczy:
              </p>

              <!-- Lista 2 rzeczy -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 20px;width:100%;">
                <tr>
                  <td style="padding:14px 20px;background:#fff7f0;border-radius:10px;border-left:4px solid #ff6b00;">
                    <p style="margin:0 0 10px;font-size:15px;color:#374151;line-height:1.6;">
                      <strong style="color:#ff6b00;">1.</strong> &nbsp;<strong>Marzenie</strong> - jak ma wyglądać ${pronounGen} salon? Jak chce się ${pronounNom} tam czuć? Jak mają czuć się ${pronounGen} klientki?
                    </p>
                    <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
                      <strong style="color:#ff6b00;">2.</strong> &nbsp;<strong>Wizja</strong> - co ${pronounNom} zrobi, gdy ten problem zostanie rozwiązany? Co się wtedy zmieni w ${pronounGen} życiu i biznesie?
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.6;">
                To wszystko. Resztą zajmiemy się razem. 🙂
              </p>

              <!-- Separator -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr><td style="height:1px;background:#f3f4f6;"></td></tr>
              </table>

              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Kliknij w filmik powyżej lub w przycisk poniżej - tam ${pronounNom} wybierze termin naszego spotkania i znajdzie wszystkie szczegóły, jak się przygotować.
              </p>

              <!-- Przycisk CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:8px;background:#ff6b00;">
                    <a href="${landingUrl}" target="_blank"
                      style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:0.02em;">
                      Umów termin spotkania →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;line-height:1.5;">
                Jeśli przycisk nie działa, skopiuj poniższy link do przeglądarki:
              </p>
              <p style="margin:0;font-size:12px;color:#6b7280;">
                <a href="${landingUrl}" style="color:#ff6b00;text-decoration:none;">${landingUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Stopka -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;font-size:11.5px;color:#9ca3af;line-height:1.5;">
                Beauty Rise - dla Twojego biznesu
              </p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">
                Ta wiadomość została wysłana automatycznie z systemu CRM Beauty Rise.
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

    const logoBuffer = loadAsset("logo-beautyrise.png");
    const gifBuffer = loadAsset("presale-video.gif");

    const inlineAttachments = [
      ...(logoBuffer ? [{ cid: "logo-beautyrise", filename: "logo-beautyrise.png", content: logoBuffer, contentType: "image/png" }] : []),
      ...(gifBuffer ? [{ cid: "presale-video-gif", filename: "presale-video.gif", content: gifBuffer, contentType: "image/gif" }] : []),
    ];

    const password = decryptPassword(sendAccount.password_enc);
    const html = buildHtml(lead.full_name, PRESALE_LANDING_URL);

    await sendMail({
      account: { email: sendAccount.email, displayName: sendAccount.display_name, password },
      to: lead.email,
      toName: lead.full_name,
      subject: "Oferta Beauty Rise - przygotowaliśmy coś dla Ciebie",
      html,
      inlineAttachments,
    });

    const { error: eventError } = await supabase.from("lead_events").insert({
      lead_id: id,
      type: "presale_email_sent",
      payload: { email: lead.email, sent_at: new Date().toISOString() },
    });
    if (eventError) console.error("send-presale-email event insert error:", eventError);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("send-presale-email error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
