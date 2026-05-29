import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const [{ data: campaign }, { data: recipients }] = await Promise.all([
    supabase
      .from("sms_campaigns")
      .select("*")
      .eq("id", id)
      .eq("workspace_id", workspaceId)
      .maybeSingle(),
    supabase
      .from("sms_campaign_recipients")
      .select("*, leads(full_name)")
      .eq("campaign_id", id)
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: true }),
  ]);

  if (!campaign) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
  return NextResponse.json({ ...campaign, recipients: recipients ?? [] });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  await supabase.from("sms_campaign_recipients").delete().eq("campaign_id", id).eq("workspace_id", workspaceId);
  await supabase.from("sms_messages").delete().eq("campaign_id", id).eq("workspace_id", workspaceId);
  await supabase.from("sms_conversations").delete().eq("campaign_id", id).eq("workspace_id", workspaceId);
  await supabase.from("sms_campaigns").delete().eq("id", id).eq("workspace_id", workspaceId);

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const body = await req.json();
  const allowed = ["status", "total_sent"] as const;
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  await supabase
    .from("sms_campaigns")
    .update(update)
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  return NextResponse.json({ ok: true });
}
