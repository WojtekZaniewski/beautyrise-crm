import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data: { user } } = await supabase.auth.getUser();
  const body = await req.json();
  const { goal, force } = body;
  if (!goal) return NextResponse.json({ error: "goal required" }, { status: 400 });

  const { data: sprint, error: fetchErr } = await supabase
    .from("fos_sprints")
    .select("*")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();
  if (fetchErr || !sprint) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const daysActive = Math.floor(
    (Date.now() - new Date(sprint.start_date).getTime()) / 86400000,
  );

  if (daysActive < 7 && !force) {
    return NextResponse.json({ requiresConfirmation: true, daysActive }, { status: 200 });
  }

  // Log history
  await supabase.from("fos_sprint_goal_history").insert({
    sprint_id: id,
    old_goal: sprint.goal,
    new_goal: goal,
    changed_by: user?.id ?? null,
  });

  const { error } = await supabase
    .from("fos_sprints")
    .update({ goal, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("workspace_id", workspaceId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("fos_sprint_goal_history")
    .select("*")
    .eq("sprint_id", id)
    .order("changed_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
