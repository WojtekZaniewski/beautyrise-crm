import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Allow long-running streaming responses (Vercel Pro: up to 300s)
export const maxDuration = 300;

const POLL_INTERVAL_MS = 3_000;
const POLL_MAX_ATTEMPTS = 30; // 30 × 3s = 90 seconds max wait per SMS

function sseEvent(data: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ConfirmResult = "sent" | "failed" | "timeout";

/**
 * Polls SMSMobileAPI getsms until the message is confirmed sent or failed.
 * Returns "timeout" if the phone is offline / slow and hasn't processed it yet.
 * Never returns "sent" without an explicit confirmation from SMSMobileAPI.
 *
 * SMSMobileAPI status values observed in production:
 *   "Success" → phone sent it ✓
 *   "Pending" → queued, phone hasn't picked it up yet
 *   "Error"   → phone tried and failed ✗
 */
async function pollGetsmsUntilConfirmed(apikey: string, guid: string): Promise<ConfirmResult> {
  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    await sleep(POLL_INTERVAL_MS);

    let raw: unknown = null;
    try {
      const url = `https://api.smsmobileapi.com/getsms/?apikey=${encodeURIComponent(apikey)}&guid=${encodeURIComponent(guid)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      if (res.ok) {
        raw = await res.json().catch(() => null);
      }
    } catch {
      // network error — keep polling
      continue;
    }

    if (!raw || typeof raw !== "object") continue;

    const data = raw as Record<string, unknown>;

    // SMSMobileAPI may nest status inside a messages array
    const msg = Array.isArray(data.messages) && data.messages.length > 0
      ? (data.messages[0] as Record<string, unknown>)
      : null;

    const rawStatus = String(
      msg?.status ?? msg?.Status ?? data.status ?? data.Status ?? data.result ?? "",
    ).toLowerCase().trim();

    console.log(`[SMS execute] getsms attempt ${attempt + 1}/${POLL_MAX_ATTEMPTS} guid=${guid} rawStatus="${rawStatus}" raw=${JSON.stringify(raw)}`);

    // ── Success statuses (phone confirmed it sent) ───────────────────────────
    if (
      rawStatus === "success" ||   // SMSMobileAPI's actual value (capital S → lowercase)
      rawStatus === "sent"    ||
      rawStatus === "delivered" ||
      rawStatus === "ok"      ||
      rawStatus === "1"
    ) {
      return "sent";
    }

    // ── Failure statuses (phone tried and failed) ────────────────────────────
    if (
      rawStatus === "error"  ||
      rawStatus === "failed" ||
      rawStatus === "nok"    ||
      rawStatus === "-1"
    ) {
      return "failed";
    }

    // "pending" / "queued" / "sending" / "" / unrecognised → keep polling
  }

  // Phone didn't confirm within POLL_MAX_ATTEMPTS × POLL_INTERVAL_MS (90s).
  // The message IS in SMSMobileAPI's queue (API returned a GUID) — the phone
  // is offline or slow. This is "queued", not a hard failure.
  console.warn(`[SMS execute] getsms timeout after ${POLL_MAX_ATTEMPTS} attempts guid=${guid} — phone offline/slow, marking as queued`);
  return "timeout";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Verify campaign belongs to this workspace
  const { data: campaign } = await supabase
    .from("sms_campaigns")
    .select("id, status")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!campaign) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Get SMS gateway API key
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .eq("status", "connected")
    .maybeSingle();

  const apikey = (integration?.credentials as Record<string, string>)?.apikey;
  if (!apikey) {
    return NextResponse.json({ error: "SMS not configured" }, { status: 400 });
  }

  // Only fetch recipients still pending or sending (safe reconnect — resumes where left off)
  const { data: recipients } = await supabase
    .from("sms_campaign_recipients")
    .select("id, phone, name, message_body, lead_id")
    .eq("campaign_id", id)
    .eq("workspace_id", workspaceId)
    .in("status", ["pending", "sending"])
    .order("created_at", { ascending: true });

  const pending = recipients ?? [];
  const total = pending.length;

  let sentCount = 0;
  let failedCount = 0;

  const stream = new ReadableStream({
    async start(controller) {
      const emit = (data: object) => {
        try {
          controller.enqueue(sseEvent(data));
        } catch {
          // client disconnected — continue processing in background
        }
      };

      emit({ type: "start", total });

      for (const r of pending) {
        // ── Step 1: Call sendsms — just queues it, does NOT confirm delivery ──
        const smsParams = new URLSearchParams({
          apikey,
          recipients: r.phone,
          message: r.message_body,
          sendsms: "1",
        });

        let externalId: string | null = null;
        let apiAccepted = false;

        try {
          const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${smsParams}`, {
            method: "GET",
            signal: AbortSignal.timeout(15_000),
          });
          const data = await res.json().catch(() => ({}));

          if (res.ok && data?.status !== "ERROR" && data?.result !== "NOK") {
            externalId = data?.message_id ?? data?.guid ?? data?.id ?? null;
            apiAccepted = true;
          }
          console.log(`[SMS execute] sendsms phone=${r.phone} accepted=${apiAccepted} guid=${externalId} response=${JSON.stringify(data)}`);
        } catch (err) {
          console.error(`[SMS execute] sendsms network error phone=${r.phone}`, err);
        }

        if (!apiAccepted) {
          // API rejected the request outright — mark failed immediately
          await supabase
            .from("sms_campaign_recipients")
            .update({ status: "failed" })
            .eq("id", r.id);
          failedCount++;
          emit({ type: "progress", done: sentCount + failedCount, total, sent: sentCount, failed: failedCount, phone: r.phone, status: "failed", reason: "api_rejected" });
          continue;
        }

        // ── Step 2: Mark as "sending" — waiting for real confirmation ─────────
        await supabase
          .from("sms_campaign_recipients")
          .update({ status: "sending" })
          .eq("id", r.id);

        emit({ type: "confirming", phone: r.phone, total, done: sentCount + failedCount });

        // ── Step 3: Poll getsms until phone confirms, fails, or times out ─────
        // "queued" = API accepted + GUID stored, but phone is offline/slow (not a hard failure)
        let finalStatus: "sent" | "failed" | "queued";

        if (externalId) {
          const pollResult = await pollGetsmsUntilConfirmed(apikey, externalId);

          if (pollResult === "sent") {
            finalStatus = "sent";
          } else if (pollResult === "failed") {
            finalStatus = "failed";
          } else {
            // timeout: SMSMobileAPI has the message (we have the GUID), phone just hasn't
            // sent it yet. Mark as "queued" — not a failure, not a fake-sent.
            finalStatus = "queued";
          }
        } else {
          // API accepted but returned no GUID — cannot track delivery
          finalStatus = "failed";
          console.warn(`[SMS execute] sendsms returned no GUID for phone=${r.phone}`);
        }

        // ── Step 4: Persist final status to DB ────────────────────────────────
        const now = new Date().toISOString();

        if (finalStatus === "sent" || finalStatus === "queued") {
          // Upsert conversation for both "sent" and "queued" — message was submitted
          const { data: conv } = await supabase
            .from("sms_conversations")
            .upsert(
              {
                workspace_id: workspaceId,
                phone: r.phone,
                lead_id: r.lead_id ?? null,
                campaign_id: id,
                last_message_at: now,
                last_message_preview: r.message_body.slice(0, 120),
              },
              { onConflict: "workspace_id,phone" },
            )
            .select("id")
            .single();

          const conversationId = conv?.id ?? null;

          await supabase.from("sms_messages").insert({
            workspace_id: workspaceId,
            lead_id: r.lead_id ?? null,
            to: r.phone,
            body: r.message_body,
            status: finalStatus, // "sent" or "queued"
            direction: "outbound",
            campaign_id: id,
            conversation_id: conversationId,
            external_id: externalId,
            sent_at: finalStatus === "sent" ? now : null,
          });

          await supabase
            .from("sms_campaign_recipients")
            .update({
              status: finalStatus,
              sent_at: finalStatus === "sent" ? now : null,
            })
            .eq("id", r.id);

          if (r.lead_id && finalStatus === "sent") {
            await supabase.from("lead_events").insert({
              lead_id: r.lead_id,
              type: "sms_sent",
              payload: { to: r.phone, body: r.message_body },
            });
          }

          sentCount++;
        } else {
          await supabase
            .from("sms_campaign_recipients")
            .update({ status: "failed" })
            .eq("id", r.id);

          failedCount++;
        }

        emit({
          type: "progress",
          done: sentCount + failedCount,
          total,
          sent: sentCount,
          failed: failedCount,
          phone: r.phone,
          status: finalStatus,
        });
      }

      // ── Finalise campaign ────────────────────────────────────────────────────
      await supabase
        .from("sms_campaigns")
        .update({ status: "sent", total_sent: sentCount })
        .eq("id", id)
        .eq("workspace_id", workspaceId);

      emit({ type: "done", total, sent: sentCount, failed: failedCount });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
