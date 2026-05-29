import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaign_id");
  // inbox=all shows every conversation (used internally); default shows only replied
  const showAll = searchParams.get("inbox") === "all";

  let query = supabase
    .from("sms_conversations")
    .select("*, leads(full_name), sms_campaigns(name)")
    .eq("workspace_id", workspaceId)
    .order("last_message_at", { ascending: false })
    .limit(100);

  if (campaignId) query = query.eq("campaign_id", campaignId);

  const { data: allConvs } = await query;

  if (showAll || !allConvs?.length) {
    return NextResponse.json(allConvs ?? []);
  }

  // Only show conversations that have at least one inbound message
  const convIds = allConvs.map((c) => c.id);
  const { data: inboundMsgs } = await supabase
    .from("sms_messages")
    .select("conversation_id")
    .in("conversation_id", convIds)
    .eq("direction", "inbound")
    .eq("workspace_id", workspaceId);

  const inboundConvIds = new Set((inboundMsgs ?? []).map((m) => m.conversation_id));
  return NextResponse.json(allConvs.filter((c) => inboundConvIds.has(c.id)));
}
