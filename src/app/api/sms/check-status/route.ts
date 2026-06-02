import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Single getsms call for one GUID.
// Called repeatedly by the frontend polling loop (each call < 10s).
// When delivery is confirmed, updates DB and returns final status.
//
// Query params:
//   guid         – SMSMobileAPI message GUID
//   campaign_id  – UUID of the campaign
//   phone        – recipient phone (to match the DB record)
//   lead_id      – optional UUID (for lead_events)
//   message_body – SMS body (for lead_events)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guid        = searchParams.get("guid");
  const campaignId  = searchParams.get("campaign_id");
  const phone       = searchParams.get("phone");
  const leadId      = searchParams.get("lead_id") ?? null;
  const messageBody = searchParams.get("message_body") ?? "";

  if (!guid || !campaignId || !phone) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
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

  // Check sent SMS status via /log/sent/sms/ — the correct endpoint for outbound tracking
  // (getsms is for incoming messages only)
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
        // Response: { result: { sms: [ { send_from_mobile, send_from_mobile_erreur, error_api, ... } ] } }
        const result = d.result as Record<string, unknown> | null;
        const smsList = Array.isArray(result?.sms) ? result!.sms as Record<string, unknown>[] : [];
        const msg = smsList.length > 0 ? smsList[0] : null;
        sentFromMobile = String(msg?.send_from_mobile ?? "").trim();
        mobileError    = String(msg?.send_from_mobile_erreur ?? "").trim();
        // Only read error_api from the message row itself — not from result.error
        // (result.error is non-empty even when the log entry just doesn't exist yet)
        apiError       = String(msg?.error_api ?? "").trim();
        console.log(`[check-status] guid=${guid} send_from_mobile="${sentFromMobile}" mobileError="${mobileError}" apiError="${apiError}" raw=${JSON.stringify(data)}`);
      }
    }
  } catch (err) {
    console.error(`[check-status] log/sent/sms error guid=${guid}`, err);
    return NextResponse.json({ status: "pending" });
  }

  // ── Confirmed sent ────────────────────────────────────────────────────────
  if (sentFromMobile === "1" && mobileError === "") {
    const now = new Date().toISOString();

    await supabase
      .from("sms_campaign_recipients")
      .update({ status: "sent", sent_at: now })
      .eq("campaign_id", campaignId)
      .eq("phone", phone);

    await supabase
      .from("sms_messages")
      .update({ status: "sent", sent_at: now })
      .eq("campaign_id", campaignId)
      .eq("to", phone)
      .eq("external_id", guid);

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
      .eq("campaign_id", campaignId)
      .eq("phone", phone);

    await supabase
      .from("sms_messages")
      .update({ status: "failed" })
      .eq("campaign_id", campaignId)
      .eq("to", phone)
      .eq("external_id", guid);

    return NextResponse.json({ status: "failed" });
  }

  // "pending" / message not yet in log → caller will retry after 3s
  return NextResponse.json({ status: "pending" });
}
