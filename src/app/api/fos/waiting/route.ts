import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data, error } = await supabase
    .from("fos_waiting_for")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("resolved", false)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { from_label, for_label, description } = body;
  if (!from_label || !for_label || !description)
    return NextResponse.json({ error: "from_label, for_label, description required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_waiting_for")
    .insert({ workspace_id: workspaceId, from_label, for_label, description })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
