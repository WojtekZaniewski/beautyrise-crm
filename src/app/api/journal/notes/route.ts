import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { broadcastActivity } from "@/lib/activity";
import { displayName } from "@/lib/display-name";

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
      .from("journal_notes")
      .select("id, content, confirmed, confirmed_at, created_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .eq("date", date)
      .order("created_at", { ascending: true });

    return NextResponse.json({ notes: data ?? [] });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { date, content } = (await request.json()) as { date: string; content: string };
    const trimmed = content?.trim();
    if (!trimmed) return NextResponse.json({ error: "Pusta notatka" }, { status: 400 });

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("journal_notes")
      .insert({
        workspace_id: workspaceId,
        user_id: user.id,
        date,
        content: trimmed,
      })
      .select("id, content, confirmed, confirmed_at, created_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    await broadcastActivity(workspaceId, { actor: displayName(user), message: "dodał(a) notatkę w dzienniku" });
    return NextResponse.json({ note: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
