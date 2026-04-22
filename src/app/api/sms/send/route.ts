import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { to, message, lead_id } = await req.json();
  if (!to?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Brak numeru lub treści" }, { status: 400 });
  }

  // Fetch API key
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials, status")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .maybeSingle();

  if (!integration || integration.status !== "connected") {
    return NextResponse.json({ error: "SMS nie skonfigurowany" }, { status: 400 });
  }

  const creds = integration.credentials as Record<string, string>;
  const apikey = creds?.apikey;
  if (!apikey) return NextResponse.json({ error: "Brak API Key" }, { status: 400 });

  // Send via SMSMobileAPI
  const params = new URLSearchParams({
    apikey,
    recipients: to.trim(),
    message: message.trim(),
    sendsms: "1",
  });

  let externalId: string | null = null;
  let status = "sent";

  try {
    const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${params}`, {
      method: "GET",
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.status === "ERROR" || data?.result === "NOK") {
      status = "failed";
    } else {
      externalId = data?.message_id ?? data?.id ?? null;
    }
  } catch {
    status = "failed";
  }

  // Save to sms_messages
  const { data: msg } = await supabase
    .from("sms_messages")
    .insert({
      workspace_id: workspaceId,
      lead_id: lead_id ?? null,
      to: to.trim(),
      body: message.trim(),
      status,
      external_id: externalId,
      sent_at: status === "sent" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  // Log event on lead timeline
  if (lead_id && status === "sent") {
    await supabase.from("lead_events").insert({
      lead_id,
      type: "sms_sent",
      payload: { to: to.trim(), body: message.trim() },
    });
  }

  if (status === "failed") {
    return NextResponse.json({ error: "Nie udało się wysłać SMS" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: msg?.id });
}
