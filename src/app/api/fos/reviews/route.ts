import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const week = new URL(req.url).searchParams.get("week");
  let q = supabase
    .from("fos_weekly_reviews")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("week_start", { ascending: false });
  if (week) q = q.eq("week_start", week);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data: { user } } = await supabase.auth.getUser();
  const body = await req.json();
  const { week_start, done_this_week, not_done, blockers, focus_next_week, user_label } =
    body;
  if (!week_start)
    return NextResponse.json({ error: "week_start required" }, { status: 400 });

  const { data, error } = await supabase
    .from("fos_weekly_reviews")
    .upsert(
      {
        workspace_id: workspaceId,
        user_id: user?.id ?? "unknown",
        user_label: user_label ?? user?.email ?? null,
        week_start,
        done_this_week: done_this_week ?? null,
        not_done: not_done ?? null,
        blockers: blockers ?? null,
        focus_next_week: focus_next_week ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workspace_id,user_id,week_start" },
    )
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
