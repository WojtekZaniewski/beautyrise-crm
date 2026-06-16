import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data, error } = await supabase
    .from("fos_sprints")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data: { user } } = await supabase.auth.getUser();
  const body = await req.json();
  const { name, goal, start_date, end_date } = body;
  if (!name || !goal || !start_date || !end_date)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  // Mark any existing active sprint as completed
  await supabase
    .from("fos_sprints")
    .update({ status: "completed", updated_at: new Date().toISOString() })
    .eq("workspace_id", workspaceId)
    .eq("status", "active");

  const { data, error } = await supabase
    .from("fos_sprints")
    .insert({
      workspace_id: workspaceId,
      name,
      goal,
      start_date,
      end_date,
      status: "active",
      created_by: user?.id ?? null,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
