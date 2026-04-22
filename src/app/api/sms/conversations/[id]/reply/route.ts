import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Brak treści" }, { status: 400 });

  const { data: conv } = await supabase
    .from("sms_conversations")
    .select("id, phone, lead_id, campaign_id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!conv) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials, status")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .maybeSingle();

  if (!integration || integration.status !== "connected") {
    return NextResponse.json({ error: "SMS nie skonfigurowany" }, { status: 400 });
  }

  const apikey = (integration.credentials as Record<string, string>)?.apikey;
  if (!apikey) return NextResponse.json({ error: "Brak API Key" }, { status: 400 });

  const smsParams = new URLSearchParams({
    apikey,
    recipients: conv.phone,
    message: text.trim(),
    sendsms: "1",
  });

  let externalId: string | null = null;
  let status = "sent";

  try {
    const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${smsParams}`, {
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

  if (status === "failed") {
    return NextResponse.json({ error: "Nie udało się wysłać SMS" }, { status: 500 });
  }

  const now = new Date().toISOString();

  const [{ data: msg }] = await Promise.all([
    supabase
      .from("sms_messages")
      .insert({
        workspace_id: workspaceId,
        lead_id: conv.lead_id ?? null,
        to: conv.phone,
        body: text.trim(),
        status: "sent",
        direction: "outbound",
        campaign_id: conv.campaign_id ?? null,
        conversation_id: conv.id,
        external_id: externalId,
        sent_at: now,
      })
      .select("id, direction, body, status, created_at, sent_at")
      .single(),
    supabase
      .from("sms_conversations")
      .update({
        last_message_at: now,
        last_message_preview: text.trim().slice(0, 120),
        unread_count: 0,
      })
      .eq("id", conv.id),
  ]);

  if (conv.lead_id) {
    await supabase.from("lead_events").insert({
      lead_id: conv.lead_id,
      type: "sms_sent",
      payload: { to: conv.phone, body: text.trim() },
    });
  }

  return NextResponse.json({ ok: true, message: msg });
}
