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

  const [sprintRes, prioritiesRes, allPrioritiesRes] = await Promise.all([
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
  ]);

  const sprint = sprintRes.data;
  const weekPriorities = prioritiesRes.data ?? [];
  const allPriorities = allPrioritiesRes.data ?? [];

  const tasksCompletedThisWeek = weekPriorities.filter((p) => p.status === "completed").length;
  const tasksOverdue = weekPriorities.filter(
    (p) => p.status !== "completed" && p.deadline && p.deadline < todayStr,
  ).length;
  const blockedTasks = weekPriorities.filter((p) => p.status === "blocked").length;
  const activeProjects = weekPriorities.filter((p) => p.status === "in_progress").length;
  const sprintCompletionRate = sprint?.completion_pct ?? 0;

  const completed = allPriorities.filter((p) => p.status === "completed");
  const onTime = completed.filter(
    (p) => p.completed_at && p.deadline && p.completed_at.split("T")[0] <= p.deadline,
  );
  const accountabilityScore =
    completed.length > 0 ? Math.round((onTime.length / completed.length) * 100) : 100;

  return NextResponse.json({
    tasksCompletedThisWeek,
    tasksOverdue,
    sprintCompletionRate,
    accountabilityScore,
    activeProjects,
    blockedTasks,
  });
}
