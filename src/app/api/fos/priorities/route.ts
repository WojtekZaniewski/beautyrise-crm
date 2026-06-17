import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { displayName } from "@/lib/display-name";
import { broadcastActivity } from "@/lib/activity";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const week = new URL(req.url).searchParams.get("week");
  let q = supabase
    .from("fos_weekly_priorities")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });
  if (week) q = q.eq("week_start", week);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Owner is ALWAYS the authenticated account — never taken from the client,
  // so nobody can attribute a task to someone else.
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const ownerName = displayName(user);

  const body = await req.json();
  const {
    title,
    description,
    deadline,
    week_start,
    is_company_goal,
    sprint_id,
    kind: kindRaw,
  } = body;
  if (!title || !week_start)
    return NextResponse.json({ error: "title and week_start required" }, { status: 400 });

  // 'task' = codzienny task (bez limitu) · 'priority' = priorytet tygodnia (maks 3).
  const kind: "task" | "priority" = kindRaw === "priority" ? "priority" : "task";

  // Count existing for this week
  const { data: existing } = await supabase
    .from("fos_weekly_priorities")
    .select("id, is_company_goal, kind")
    .eq("workspace_id", workspaceId)
    .eq("week_start", week_start);
  const existing_ = existing ?? [];

  if (is_company_goal) {
    const goalCount = existing_.filter((p) => p.is_company_goal).length;
    if (goalCount >= 1)
      return NextResponse.json(
        { error: "Można mieć tylko 1 Company Goal na tydzień.", code: "GOAL_LIMIT" },
        { status: 422 },
      );
  } else if (kind === "priority") {
    // Tylko priorytety tygodnia są limitowane do 3. Codzienne taski są bez limitu.
    const priorityCount = existing_.filter((p) => !p.is_company_goal && p.kind === "priority").length;
    if (priorityCount >= 3)
      return NextResponse.json(
        {
          error:
            "Zbyt wiele priorytetów obniża skuteczność wykonania. Maksimum to 3 priorytety tygodnia.",
          code: "LIMIT_EXCEEDED",
        },
        { status: 422 },
      );
  }

  const { data, error } = await supabase
    .from("fos_weekly_priorities")
    .insert({
      workspace_id: workspaceId,
      title,
      description: description ?? null,
      owner_id: is_company_goal ? null : user.id,
      owner_label: is_company_goal ? null : ownerName,
      deadline: deadline ?? null,
      week_start,
      is_company_goal: is_company_goal ?? false,
      kind,
      sprint_id: sprint_id ?? null,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await broadcastActivity(workspaceId, {
    actor: ownerName,
    message: is_company_goal
      ? `ustawił(a) cel tygodnia: „${title}”`
      : kind === "priority"
        ? `dodał(a) priorytet: „${title}”`
        : `dodał(a) zadanie: „${title}”`,
  });
  return NextResponse.json({ data });
}
