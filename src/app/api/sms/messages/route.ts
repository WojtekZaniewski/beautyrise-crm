import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data, error } = await supabase
    .from("sms_messages")
    .select("id, to, body, status, external_id, sent_at, created_at, lead_id, leads(full_name)")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
