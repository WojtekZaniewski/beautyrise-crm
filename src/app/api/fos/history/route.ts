import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

function weekLabel(weekStart: string) {
  const [, , d] = weekStart.split("-");
  const month = new Date(weekStart).toLocaleDateString("pl-PL", { month: "numeric" });
  return `${parseInt(d)}.${month}`;
}

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const todayStr = new Date().toISOString().split("T")[0];

  // fetch last 8 weeks of data (by week_start)
  const eightWeeksAgo = new Date();
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);
  const since = eightWeeksAgo.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("fos_weekly_priorities")
    .select("week_start, status, deadline, completed_at, is_company_goal")
    .eq("workspace_id", workspaceId)
    .gte("week_start", since)
    .order("week_start", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []).filter((r) => !r.is_company_goal);

  // Group by week_start
  const byWeek = new Map<string, typeof rows>();
  for (const row of rows) {
    const arr = byWeek.get(row.week_start) ?? [];
    arr.push(row);
    byWeek.set(row.week_start, arr);
  }

  const weeks = Array.from(byWeek.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-8)
    .map(([week_start, tasks]) => {
      const total = tasks.length;
      const completed = tasks.filter((t) => t.status === "completed").length;
      const on_time = tasks.filter(
        (t) =>
          t.status === "completed" &&
          t.completed_at &&
          t.deadline &&
          t.completed_at.split("T")[0] <= t.deadline
      ).length;
      const overdue = tasks.filter(
        (t) => t.status !== "completed" && t.deadline && t.deadline < todayStr
      ).length;
      const blocked = tasks.filter((t) => t.status === "blocked").length;
      const commitment_pct = total > 0 ? Math.round((completed / total) * 100) : 100;
      const accountability_pct =
        completed > 0 ? Math.round((on_time / completed) * 100) : 100;
      return {
        week_start,
        week_label: weekLabel(week_start),
        total,
        completed,
        on_time,
        overdue,
        blocked,
        commitment_pct,
        accountability_pct,
      };
    });

  return NextResponse.json({ data: weeks });
}
