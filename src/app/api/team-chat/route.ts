import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(request: Request) {
  try {
    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({})) as { text?: string };
    const text = (body.text ?? "").trim();
    if (!text) {
      return NextResponse.json({ error: "Pusta wiadomość" }, { status: 400 });
    }
    if (text.length > 4000) {
      return NextResponse.json({ error: "Wiadomość za długa (max 4000 znaków)" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();

    const displayName =
      (user.user_metadata as { full_name?: string; name?: string } | null)?.full_name ??
      (user.user_metadata as { full_name?: string; name?: string } | null)?.name ??
      null;

    const { data, error } = await supabase
      .from("team_messages")
      .insert({
        workspace_id: workspaceId,
        user_id: user.id,
        user_email: user.email ?? null,
        user_name: displayName,
        text,
      })
      .select("id, user_id, user_email, user_name, text, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
