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
      .select("content, confirmed, confirmed_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .eq("date", date)
      .maybeSingle();

    return NextResponse.json({
      content: data?.content ?? "",
      confirmed: data?.confirmed ?? false,
      confirmed_at: data?.confirmed_at ?? null,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { date: string; content?: string; confirmed?: boolean };

    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (body.content !== undefined) updates.content = body.content;
    if (body.confirmed !== undefined) {
      updates.confirmed = body.confirmed;
      updates.confirmed_at = body.confirmed ? new Date().toISOString() : null;
    }

    const { data, error } = await supabase
      .from("journal_notes")
      .upsert(
        {
          workspace_id: workspaceId,
          user_id: user.id,
          date: body.date,
          content: body.content ?? "",
          ...updates,
        },
        { onConflict: "workspace_id,user_id,date" },
      )
      .select("content, confirmed, confirmed_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, note: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
