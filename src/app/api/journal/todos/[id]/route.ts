import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { completed?: boolean; waiting?: boolean; text?: string };

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const updates: Record<string, unknown> = {};

    if (body.text !== undefined) updates.text = body.text.trim();

    if (body.completed !== undefined) {
      updates.completed = body.completed;
      updates.completed_at = body.completed ? new Date().toISOString() : null;
      if (body.completed) updates.waiting = false;
    }

    if (body.waiting !== undefined) {
      updates.waiting = body.waiting;
      if (body.waiting) {
        updates.completed = false;
        updates.completed_at = null;
      }
    }

    const { data, error } = await supabase
      .from("todo_items")
      .update(updates)
      .eq("id", id)
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .select("id, text, completed, waiting, completed_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ todo: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const { error } = await supabase
      .from("todo_items")
      .delete()
      .eq("id", id)
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
