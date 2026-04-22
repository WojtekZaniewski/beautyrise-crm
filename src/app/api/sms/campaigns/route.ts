import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data } = await supabase
    .from("sms_campaigns")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { name, template, recipients } = await req.json();

  const { data: campaign, error } = await supabase
    .from("sms_campaigns")
    .insert({
      workspace_id: workspaceId,
      name: name || `Kampania SMS ${new Date().toLocaleDateString("pl-PL")}`,
      template: template || "",
      status: "sending",
      total_sent: 0,
    })
    .select("id")
    .single();

  if (error || !campaign) {
    return NextResponse.json({ error: error?.message ?? "DB error" }, { status: 500 });
  }

  if (Array.isArray(recipients) && recipients.length > 0) {
    await supabase.from("sms_campaign_recipients").insert(
      recipients.map((r: { phone: string; name?: string; lead_id?: string; message_body?: string }) => ({
        workspace_id: workspaceId,
        campaign_id: campaign.id,
        lead_id: r.lead_id ?? null,
        phone: r.phone,
        name: r.name ?? "",
        message_body: r.message_body ?? "",
        status: "pending",
      })),
    );
  }

  return NextResponse.json({ id: campaign.id });
}
