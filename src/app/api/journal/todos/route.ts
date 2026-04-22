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

    const { data } = await supabase
      .from("todo_items")
      .select("id, text, completed, waiting, completed_at, created_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .eq("date", date)
      .order("created_at", { ascending: true });

    return NextResponse.json({ todos: data ?? [] });
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

    const { data, error } = await supabase
      .from("todo_items")
      .insert({ workspace_id: workspaceId, user_id: user.id, date, text: text.trim() })
      .select("id, text, completed, waiting, completed_at, created_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ todo: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
