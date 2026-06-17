import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { displayName } from "@/lib/display-name";
import { broadcastActivity } from "@/lib/activity";

async function actorName(): Promise<string | null> {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  return user ? displayName(user) : null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const allowed = ["title", "description", "owner_id", "owner_label", "deadline", "status", "is_fire"];
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const k of allowed) if (k in body) update[k] = body[k];
  if (body.status === "completed" && !body.completed_at)
    update["completed_at"] = new Date().toISOString();

  const { data, error } = await supabase
    .from("fos_weekly_priorities")
    .update(update)
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .select("title, owner_label, is_company_goal")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Notify the team when a task is completed.
  if (body.status === "completed" && data) {
    const actor = (await actorName()) ?? data.owner_label ?? null;
    await broadcastActivity(workspaceId, {
      actor,
      message: data.is_company_goal ? `ukończył(a) cel tygodnia: „${data.title}”` : `ukończył(a): „${data.title}”`,
    });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: existing } = await supabase
    .from("fos_weekly_priorities")
    .select("title")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  const { error } = await supabase
    .from("fos_weekly_priorities")
    .delete()
    .eq("id", id)
    .eq("workspace_id", workspaceId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (existing) {
    await broadcastActivity(workspaceId, {
      actor: await actorName(),
      message: `usunął(a) zadanie: „${existing.title}”`,
    });
  }
  return NextResponse.json({ ok: true });
}
