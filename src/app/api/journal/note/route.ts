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
      .from("journal_notes")
      .select("content")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .eq("date", date)
      .maybeSingle();

    return NextResponse.json({ content: data?.content ?? "" });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { date, content } = (await request.json()) as { date: string; content: string };

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const { error } = await supabase
      .from("journal_notes")
      .upsert(
        { workspace_id: workspaceId, user_id: user.id, date, content, updated_at: new Date().toISOString() },
        { onConflict: "workspace_id,user_id,date" },
      );

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
