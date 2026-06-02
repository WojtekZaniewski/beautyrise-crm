import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const subscriber = digits.slice(-9);
  return "+48" + subscriber;
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { to: rawTo, message, lead_id, campaign_id } = await req.json();
  if (!rawTo?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Brak numeru lub treści" }, { status: 400 });
  }
  const to = normalizePhone(rawTo.trim());

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

  const params = new URLSearchParams({
    apikey,
    recipients: to,
    message: message.trim(),
    sendsms: "1",
  });

  // Idempotency: if this campaign already sent to this number, return existing record
  if (campaign_id) {
    const { data: existing } = await supabase
      .from("sms_messages")
      .select("id, external_id")
      .eq("campaign_id", campaign_id)
      .eq("to", to)
      .maybeSingle();
    if (existing) {
      console.log(`[sms/send] duplicate blocked phone=${to} campaign=${campaign_id}`);
      return NextResponse.json({ ok: true, id: existing.id, guid: existing.external_id, duplicate: true });
    }
  }

  let guid: string | null = null;
  let apiAccepted = false;

  try {
    const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${params}`, {
      method: "GET",
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json().catch(() => ({}));

    console.log(`[sms/send] phone=${to} response=${JSON.stringify(data)}`);

    if (res.ok && data?.result?.error === 0) {
      // SMSMobileAPI wraps the response: { result: { id: "...", error: 0, ... } }
      guid = data?.result?.id ?? data?.result?.message_id ?? data?.result?.guid
          ?? data?.message_id ?? data?.guid ?? data?.id ?? null;
      apiAccepted = true;
    }
  } catch (err) {
    console.error(`[sms/send] fetch error phone=${to}`, err);
  }

  if (!apiAccepted) {
    if (campaign_id) {
      await supabase
        .from("sms_campaign_recipients")
        .update({ status: "failed" })
        .eq("campaign_id", campaign_id)
        .eq("phone", to);
    }
    return NextResponse.json({ error: "Nie udało się wysłać SMS" }, { status: 500 });
  }

  const now = new Date().toISOString();

  // For campaign sends: mark as "sending" — the frontend will poll getsms to confirm.
  // For single sends: mark as "sent" immediately (no delivery tracking needed).
  const recipientStatus = campaign_id ? "sending" : "sent";

  // Upsert conversation
  let conversationId: string | null = null;
  const { data: conv } = await supabase
    .from("sms_conversations")
    .upsert(
      {
        workspace_id: workspaceId,
        phone: to,
        lead_id: lead_id ?? null,
        campaign_id: campaign_id ?? null,
        last_message_at: now,
        last_message_preview: message.trim().slice(0, 120),
      },
      { onConflict: "workspace_id,phone" },
    )
    .select("id")
    .single();
  conversationId = conv?.id ?? null;

  const { data: msg } = await supabase
    .from("sms_messages")
    .insert({
      workspace_id: workspaceId,
      lead_id: lead_id ?? null,
      to,
      body: message.trim(),
      status: recipientStatus,
      direction: "outbound",
      campaign_id: campaign_id ?? null,
      conversation_id: conversationId,
      external_id: guid,
      sent_at: campaign_id ? null : now, // campaign: set only after getsms confirms
    })
    .select("id")
    .single();

  if (campaign_id) {
    await supabase
      .from("sms_campaign_recipients")
      .update({ status: "sending" })
      .eq("campaign_id", campaign_id)
      .eq("phone", to);
  }

  if (lead_id && !campaign_id) {
    await supabase.from("lead_events").insert({
      lead_id,
      type: "sms_sent",
      payload: { to, body: message.trim() },
    });
  }

  return NextResponse.json({
    ok: true,
    id: msg?.id,
    guid,            // ← null if SMSMobileAPI didn't return one
    conversation_id: conversationId,
  });
}
