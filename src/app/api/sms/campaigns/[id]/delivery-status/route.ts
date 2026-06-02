import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Single getsms check for one GUID.
// Called repeatedly by the frontend polling loop — each call is fast (< 10s).
// When confirmed, updates DB and returns final status.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: campaignId } = await params;
  const { searchParams } = new URL(req.url);
  const guid         = searchParams.get("guid");
  const recipientId  = searchParams.get("recipient_id");
  const phone        = searchParams.get("phone");
  const leadId       = searchParams.get("lead_id") ?? null;
  const messageBody  = searchParams.get("message_body") ?? "";

  const isTimeout = searchParams.get("timeout") === "true";

  if (!recipientId || !phone) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Frontend timed out waiting — mark recipient as "queued" and return immediately
  if (isTimeout) {
    await createServiceClient()
      .from("sms_campaign_recipients")
      .update({ status: "queued" })
      .eq("id", recipientId);
    return NextResponse.json({ status: "queued" });
  }

  if (!guid) {
    return NextResponse.json({ error: "Missing guid" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

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

  // Check via /log/sent/sms/ — correct endpoint for outbound delivery tracking
  let sentFromMobile = "";
  let mobileError = "";
  let apiError = "";
  try {
    const url = `https://api.smsmobileapi.com/log/sent/sms/?apikey=${encodeURIComponent(apikey)}&guid_message=${encodeURIComponent(guid)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && typeof data === "object") {
        const d = data as Record<string, unknown>;
        const result = d.result as Record<string, unknown> | null;
        const smsList = Array.isArray(result?.sms) ? result!.sms as Record<string, unknown>[] : [];
        const msg = smsList.length > 0 ? smsList[0] : null;
        sentFromMobile = String(msg?.send_from_mobile ?? "").trim();
        mobileError    = String(msg?.send_from_mobile_erreur ?? "").trim();
        apiError       = String(msg?.error_api ?? "").trim();
        console.log(`[delivery-status] guid=${guid} send_from_mobile="${sentFromMobile}" mobileError="${mobileError}" apiError="${apiError}" raw=${JSON.stringify(data)}`);
      }
    }
  } catch (err) {
    console.error(`[delivery-status] log/sent/sms error guid=${guid}`, err);
    return NextResponse.json({ status: "pending" });
  }

  // ── Confirmed sent ────────────────────────────────────────────────────────
  if (sentFromMobile === "1" && mobileError === "") {
    const now = new Date().toISOString();

    const { data: conv } = await supabase
      .from("sms_conversations")
      .upsert(
        {
          workspace_id: workspaceId,
          phone,
          lead_id: leadId,
          campaign_id: campaignId,
          last_message_at: now,
          last_message_preview: messageBody.slice(0, 120),
        },
        { onConflict: "workspace_id,phone" },
      )
      .select("id")
      .single();

    const conversationId = conv?.id ?? null;

    await supabase.from("sms_messages").insert({
      workspace_id: workspaceId,
      lead_id: leadId,
      to: phone,
      body: messageBody,
      status: "sent",
      direction: "outbound",
      campaign_id: campaignId,
      conversation_id: conversationId,
      external_id: guid,
      sent_at: now,
    });

    await supabase
      .from("sms_campaign_recipients")
      .update({ status: "sent", sent_at: now })
      .eq("id", recipientId);

    if (leadId) {
      await supabase.from("lead_events").insert({
        lead_id: leadId,
        type: "sms_sent",
        payload: { to: phone, body: messageBody },
      });
    }

    return NextResponse.json({ status: "sent" });
  }

  // ── Confirmed failed ──────────────────────────────────────────────────────
  if (mobileError !== "" || apiError !== "") {
    await supabase
      .from("sms_campaign_recipients")
      .update({ status: "failed" })
      .eq("id", recipientId);

    return NextResponse.json({ status: "failed" });
  }

  // ── Still pending / not yet in log ───────────────────────────────────────
  return NextResponse.json({ status: "pending" });
}
