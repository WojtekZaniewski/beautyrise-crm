import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data, error } = await supabase
    .from("leads")
    .select("id, full_name, phone, email, source")
    .eq("workspace_id", workspaceId)
    .eq("archived", false)
    .not("phone", "is", null)
    .order("full_name");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
