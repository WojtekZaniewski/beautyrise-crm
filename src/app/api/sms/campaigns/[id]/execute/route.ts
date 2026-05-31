import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Allow long-running streaming responses (Vercel Pro: up to 300s)
export const maxDuration = 300;

function sseEvent(data: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Poll SMSMobileAPI until the message is confirmed sent (or timeout).
// Returns true if confirmed, false if failed/timeout.
async function pollUntilSent(apikey: string, guid: string): Promise<"sent" | "failed" | "timeout"> {
  const MAX_ATTEMPTS = 20;
  const INTERVAL_MS = 3000;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await sleep(INTERVAL_MS);
    try {
      const url = `https://api.smsmobileapi.com/getsms/?apikey=${encodeURIComponent(apikey)}&guid=${encodeURIComponent(guid)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;

      const data = await res.json().catch(() => null);
      if (!data) continue;

      // SMSMobileAPI may return status in several shapes — normalise
      const msg = Array.isArray(data.messages) ? data.messages[0] : null;
      const rawStatus = (
        msg?.status ??
        msg?.Status ??
        data.status ??
        data.Status ??
        ""
      ).toString().toLowerCase();

      if (rawStatus === "sent" || rawStatus === "delivered" || rawStatus === "1") return "sent";
      if (rawStatus === "failed" || rawStatus === "error" || rawStatus === "-1") return "failed";
      // "pending" / "sending" / "" → keep polling
    } catch {
      // network error on status check — keep polling
    }
  }
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

  // Fetch pending recipients only — safe to reconnect (resumes where it left off)
  const { data: recipients } = await supabase
    .from("sms_campaign_recipients")
    .select("id, phone, name, message_body, lead_id")
    .eq("campaign_id", id)
    .eq("workspace_id", workspaceId)
    .eq("status", "pending")
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
          // client disconnected
        }
      };

      emit({ type: "start", total });

      for (const r of pending) {
        // ── 1. Send via SMSMobileAPI ──────────────────────────────────────────
        const smsParams = new URLSearchParams({
          apikey,
          recipients: r.phone,
          message: r.message_body,
          sendsms: "1",
        });

        let sendStatus: "sent" | "failed" = "failed";
        let externalId: string | null = null;

        try {
          const res = await fetch(`https://api.smsmobileapi.com/sendsms/?${smsParams}`, {
            method: "GET",
            signal: AbortSignal.timeout(15000),
          });
          const data = await res.json().catch(() => ({}));

          if (res.ok && data?.status !== "ERROR" && data?.result !== "NOK") {
            externalId = data?.message_id ?? data?.guid ?? data?.id ?? null;
            sendStatus = "sent"; // API accepted — will confirm below
          }
        } catch {
          sendStatus = "failed";
        }

        // ── 2. Poll until actually confirmed sent from phone ──────────────────
        if (sendStatus === "sent" && externalId) {
          emit({ type: "polling", phone: r.phone, guid: externalId });

          const pollResult = await pollUntilSent(apikey, externalId);

          if (pollResult === "failed") {
            sendStatus = "failed";
          }
          // "timeout" → we proceed treating as sent (API accepted, phone queued)
        }

        // ── 3. Update database ────────────────────────────────────────────────
        const now = new Date().toISOString();

        if (sendStatus === "sent") {
          // Upsert conversation
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
            status: "sent",
            direction: "outbound",
            campaign_id: id,
            conversation_id: conversationId,
            external_id: externalId,
            sent_at: now,
          });

          await supabase
            .from("sms_campaign_recipients")
            .update({ status: "sent", sent_at: now })
            .eq("id", r.id);

          if (r.lead_id) {
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
          status: sendStatus,
        });
      }

      // ── 4. Finalise campaign ──────────────────────────────────────────────
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
