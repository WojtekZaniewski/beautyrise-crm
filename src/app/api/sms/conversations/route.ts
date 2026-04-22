import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaign_id");

  let query = supabase
    .from("sms_conversations")
    .select("*, leads(full_name), sms_campaigns(name)")
    .eq("workspace_id", workspaceId)
    .order("last_message_at", { ascending: false })
    .limit(100);

  if (campaignId) query = query.eq("campaign_id", campaignId);

  const { data } = await query;
  return NextResponse.json(data ?? []);
}
