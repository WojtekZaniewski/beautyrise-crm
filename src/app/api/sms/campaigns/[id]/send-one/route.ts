import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Sends ONE SMS for a campaign recipient and returns the GUID for delivery polling.
// Marks the recipient as "sending" (not "sent") — confirmation happens via /delivery-status.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: campaignId } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { recipient_id, phone: rawPhone, message } = await req.json();
  if (!rawPhone || !message) {
    return NextResponse.json({ error: "Brak phone lub message" }, { status: 400 });
  }
  let phone = rawPhone.replace(/[\s\-().]/g, "");
  if (/^\d{9}$/.test(phone))        phone = "+48" + phone;
  else if (/^0\d{9}$/.test(phone))  phone = "+48" + phone.slice(1);
  else if (/^48\d{9}$/.test(phone)) phone = "+" + phone;

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials, status")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .eq("status", "connected")
    .maybeSingle();

  const apikey = (integration?.credentials as Record<string, string>)?.apikey;
  if (!apikey) {
    return NextResponse.json({ error: "SMS nie skonfigurowany" }, { status: 400 });
  }

  const smsParams = new URLSearchParams({
    apikey,
    recipients: phone,
    message,
    sendsms: "1",
  });

  let guid: string | null = null;
  let accepted = false;

  try {
    const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${smsParams}`, {
      method: "GET",
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json().catch(() => ({}));
    console.log(`[send-one] phone=${phone} response=${JSON.stringify(data)}`);

    if (res.ok && data?.result?.error === 0) {
      guid = data?.result?.id ?? data?.result?.message_id ?? data?.result?.guid
          ?? data?.message_id ?? data?.guid ?? data?.id ?? null;
      accepted = true;
    }
  } catch (err) {
    console.error(`[send-one] fetch error phone=${phone}`, err);
  }

  if (!accepted) {
    // API rejected — mark as failed immediately
    await supabase
      .from("sms_campaign_recipients")
      .update({ status: "failed" })
      .eq("id", recipient_id);

    return NextResponse.json({ ok: false, status: "failed", reason: "api_rejected" });
  }

  // Mark as "sending" — waiting for getsms confirmation from the client
  await supabase
    .from("sms_campaign_recipients")
    .update({ status: "sending" })
    .eq("id", recipient_id);

  return NextResponse.json({ ok: true, guid, status: "sending" });
}
