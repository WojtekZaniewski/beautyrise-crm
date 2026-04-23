import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") ?? new Date().toISOString().split("T")[0];

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    // Try with waiting column first; fall back if the migration hasn't run yet
    let data: unknown[] | null = null;
    const { data: withWaiting, error: e1 } = await supabase
      .from("todo_items")
      .select("id, text, completed, waiting, completed_at, created_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .eq("date", date)
      .order("created_at", { ascending: true });

    if (e1) {
      const { data: withoutWaiting } = await supabase
        .from("todo_items")
        .select("id, text, completed, completed_at, created_at")
        .eq("workspace_id", workspaceId)
        .eq("user_id", user.id)
        .eq("date", date)
        .order("created_at", { ascending: true });
      data = (withoutWaiting ?? []).map((t) => ({ ...t, waiting: false }));
    } else {
      data = withWaiting ?? [];
    }

    return NextResponse.json({ todos: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { date, text } = (await request.json()) as { date: string; text: string };
    if (!text?.trim()) return NextResponse.json({ error: "Puste zadanie" }, { status: 400 });

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    // Insert first, then fetch — avoids SELECT failing on missing 'waiting' column
    const { data: inserted, error: insertErr } = await supabase
      .from("todo_items")
      .insert({ workspace_id: workspaceId, user_id: user.id, date, text: text.trim() })
      .select("id, text, completed, completed_at, created_at")
      .single();

    if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });

    // Try to also get the waiting column value
    const { data: full } = await supabase
      .from("todo_items")
      .select("waiting")
      .eq("id", inserted.id)
      .maybeSingle();

    const todo = { ...inserted, waiting: (full as { waiting?: boolean } | null)?.waiting ?? false };
    return NextResponse.json({ todo });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
