import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// 1×1 transparent GIF
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipientId = searchParams.get("r");
  const campaignId = searchParams.get("c");

  if (recipientId && campaignId) {
    try {
      const supabase = createServiceClient();
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
        user_agent: req.headers.get("user-agent"),
      });
    } catch {
      // Never fail — just return the pixel
    }
  }

  return new NextResponse(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
