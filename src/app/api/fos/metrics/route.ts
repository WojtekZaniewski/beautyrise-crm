import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const weekStart = getWeekStart();
  const todayStr = new Date().toISOString().split("T")[0];

  const weekStartDate = `${weekStart}T00:00:00`;

  const [sprintRes, prioritiesRes, allPrioritiesRes, leadsRes, reviewRes] = await Promise.all([
    supabase
      .from("fos_sprints")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("status", "active")
      .maybeSingle(),
    supabase
      .from("fos_weekly_priorities")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("week_start", weekStart),
    supabase
      .from("fos_weekly_priorities")
      .select("id, deadline, status, completed_at, owner_id")
      .eq("workspace_id", workspaceId),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .gte("created_at", weekStartDate),
    supabase
      .from("fos_weekly_reviews")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .eq("week_start", weekStart),
  ]);

  const sprint = sprintRes.data;
  const weekPriorities = prioritiesRes.data ?? [];
  const allPriorities = allPrioritiesRes.data ?? [];

  const nonGoalWeek = weekPriorities.filter((p) => !p.is_company_goal);
  const tasksCompletedThisWeek = nonGoalWeek.filter((p) => p.status === "completed").length;
  const tasksOverdue = nonGoalWeek.filter(
    (p) => p.status !== "completed" && p.deadline && p.deadline < todayStr,
  ).length;
  const blockedTasks = nonGoalWeek.filter((p) => p.status === "blocked").length;
  const activeProjects = nonGoalWeek.filter((p) => p.status === "in_progress").length;
  const sprintCompletionRate = sprint?.completion_pct ?? 0;
  const commitmentScore =
    nonGoalWeek.length > 0 ? Math.round((tasksCompletedThisWeek / nonGoalWeek.length) * 100) : 100;
  const leadsThisWeek = leadsRes.count ?? 0;
  const hasWeeklyReview = (reviewRes.count ?? 0) > 0;

  const completed = allPriorities.filter((p) => p.status === "completed");
  const onTime = completed.filter(
    (p) => p.completed_at && p.deadline && p.completed_at.split("T")[0] <= p.deadline,
  );
  const accountabilityScore =
    completed.length > 0 ? Math.round((onTime.length / completed.length) * 100) : 100;

  // Sprint goal changes for active sprint
  let sprintGoalChanges = 0;
  if (sprint) {
    const { count } = await supabase
      .from("fos_sprint_goal_history")
      .select("id", { count: "exact", head: true })
      .eq("sprint_id", sprint.id);
    sprintGoalChanges = count ?? 0;
  }

  return NextResponse.json({
    tasksCompletedThisWeek,
    tasksOverdue,
    sprintCompletionRate,
    accountabilityScore,
    commitmentScore,
    activeProjects,
    blockedTasks,
    leadsThisWeek,
    hasWeeklyReview,
    sprintGoalChanges,
  });
}
