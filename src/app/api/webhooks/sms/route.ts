import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  return handleInbound(req);
}

export async function GET(req: NextRequest) {
  return handleInbound(req);
}

async function handleInbound(req: NextRequest) {
  const supabase = createServiceClient();

  let apikey: string | null = null;
  let phone: string | null = null;
  let messageText: string | null = null;
  let externalId: string | null = null;

  const contentType = req.headers.get("content-type") ?? "";

  if (req.method === "GET") {
    const { searchParams } = new URL(req.url);
    console.log("[SMS webhook] GET params:", Object.fromEntries(searchParams.entries()));
    apikey = searchParams.get("watoken") ?? searchParams.get("apikey");
    phone = searchParams.get("number") ?? searchParams.get("from");
    messageText = searchParams.get("message");
    externalId = searchParams.get("message_id");
  } else if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    console.log("[SMS webhook] POST JSON body:", JSON.stringify(body));
    apikey = body.watoken ?? body.apikey;
    phone = body.number ?? body.from;
    messageText = body.message;
    externalId = body.message_id;
  } else {
    const text = await req.text();
    console.log("[SMS webhook] POST form body:", text, "| content-type:", contentType);
    const p = new URLSearchParams(text);
    apikey = p.get("watoken") ?? p.get("apikey");
    phone = p.get("number") ?? p.get("from");
    messageText = p.get("message");
    externalId = p.get("message_id");
  }

  console.log("[SMS webhook] parsed: phone=", phone, "message=", messageText, "apikey=", apikey);

  if (!phone || !messageText) {
    console.log("[SMS webhook] REJECTED - missing phone or message");
    return NextResponse.json({ ok: false, error: "Missing params" }, { status: 400 });
  }

  const normalizedPhone = phone.replace(/\s+/g, "");

  // Find workspace: by API key if provided, otherwise use the first connected SMS gateway
  const { data: integrations } = await supabase
    .from("integrations")
    .select("workspace_id, credentials")
    .eq("type", "sms_gateway")
    .eq("status", "connected");

  const integration = apikey
    ? (integrations ?? []).find(
        (i) => (i.credentials as Record<string, string>)?.apikey === apikey,
      )
    : (integrations ?? [])[0];

  if (!integration) {
    return NextResponse.json({ ok: false, error: "Unknown workspace" }, { status: 401 });
  }

  const workspaceId = integration.workspace_id;
  const now = new Date().toISOString();

  // Find lead by phone
  const { data: lead } = await supabase
    .from("leads")
    .select("id, full_name")
    .eq("workspace_id", workspaceId)
    .eq("phone", normalizedPhone)
    .maybeSingle();

  // Upsert conversation
  const { data: existingConv } = await supabase
    .from("sms_conversations")
    .select("id, campaign_id, lead_id, unread_count")
    .eq("workspace_id", workspaceId)
    .eq("phone", normalizedPhone)
    .maybeSingle();

  let conversationId: string;

  if (existingConv) {
    conversationId = existingConv.id;
    await supabase
      .from("sms_conversations")
      .update({
        last_message_at: now,
        last_message_preview: messageText.slice(0, 120),
        unread_count: (existingConv.unread_count ?? 0) + 1,
        lead_id: existingConv.lead_id ?? lead?.id ?? null,
      })
      .eq("id", conversationId);
  } else {
    const { data: newConv } = await supabase
      .from("sms_conversations")
      .insert({
        workspace_id: workspaceId,
        phone: normalizedPhone,
        lead_id: lead?.id ?? null,
        last_message_at: now,
        last_message_preview: messageText.slice(0, 120),
        unread_count: 1,
      })
      .select("id")
      .single();

    if (!newConv) return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
    conversationId = newConv.id;
  }

  // Save inbound message
  await supabase.from("sms_messages").insert({
    workspace_id: workspaceId,
    lead_id: lead?.id ?? null,
    to: normalizedPhone,
    body: messageText,
    status: "received",
    direction: "inbound",
    conversation_id: conversationId,
    external_id: externalId,
    sent_at: now,
  });

  // Mark campaign recipient as replied
  const campaignId = existingConv?.campaign_id;
  if (campaignId) {
    await supabase
      .from("sms_campaign_recipients")
      .update({ replied_at: now })
      .eq("campaign_id", campaignId)
      .eq("phone", normalizedPhone)
      .is("replied_at", null);
  }

  // Log on lead timeline
  if (lead?.id) {
    await supabase.from("lead_events").insert({
      lead_id: lead.id,
      type: "sms_received",
      payload: { from: normalizedPhone, body: messageText },
    });
  }

  return NextResponse.json({ ok: true });
}
