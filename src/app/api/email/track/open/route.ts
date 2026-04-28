import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// 1×1 transparent GIF
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

// User-agent patterns known to be email scanners / security bots
const BOT_PATTERNS = [
  /\bbot\b/i, /spider/i, /crawl/i, /\bscan/i,
  /\bpreview\b/i, /validator/i, /checker/i, /monitor/i,
  /curl\//i, /wget\//i, /python-requests/i, /libwww/i,
  /java\//i, /go-http-client/i, /node-fetch/i, /axios/i,
  /postfix/i, /exim/i, /sendmail/i,
  /barracuda/i, /proofpoint/i, /mimecast/i, /symantec/i,
  /sophos/i, /cisco/i, /fortinet/i, /trend\s*micro/i,
];

function isBotUA(ua: string | null): boolean {
  if (!ua) return false;
  return BOT_PATTERNS.some(p => p.test(ua));
}

function pixelResponse() {
  return new NextResponse(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}

// Minimum seconds between send and a valid open (filters immediate delivery scans)
const MIN_OPEN_DELAY_MS = 60_000; // 60 seconds

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipientId = searchParams.get("r");
  const campaignId  = searchParams.get("c");
  const ua          = req.headers.get("user-agent");

  // Reject known bots / scanners
  if (isBotUA(ua)) return pixelResponse();

  if (recipientId && campaignId) {
    try {
      const supabase = createServiceClient();

      // Fetch recipient to check sent_at and already-opened status
      const { data: recipient } = await supabase
        .from("email_outreach_recipients")
        .select("sent_at, opened_at")
        .eq("id", recipientId)
        .maybeSingle();

      // Already tracked — skip
      if (recipient?.opened_at) return pixelResponse();

      // Too soon after delivery — likely a security scanner, not a real open
      if (recipient?.sent_at) {
        const sentMs = new Date(recipient.sent_at as string).getTime();
        if (Date.now() - sentMs < MIN_OPEN_DELAY_MS) return pixelResponse();
      }

      const now = new Date().toISOString();
      await supabase
        .from("email_outreach_recipients")
        .update({ opened_at: now, status: "opened" })
        .eq("id", recipientId)
        .is("opened_at", null);

      await supabase.from("email_tracking_events").insert({
        campaign_id: campaignId,
        recipient_id: recipientId,
        type: "open",
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip"),
        user_agent: ua,
      });
    } catch {
      // Never fail — always return the pixel
    }
  }

  return pixelResponse();
}
