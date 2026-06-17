import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getWeekStart } from "@/lib/fos-types";
import Link from "next/link";
import type { FosSprint, FosWeeklyPriority } from "@/lib/fos-types";
import { DashboardFosInteractive } from "./dashboard-fos-interactive";

export async function DashboardFosSection() {
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
      .eq("week_start", weekStart)
      .order("created_at", { ascending: true }),
    supabase
      .from("fos_weekly_priorities")
      .select("id, deadline, status, completed_at")
      .eq("workspace_id", workspaceId),
  ]);

  const sprint = sprintRes.data as FosSprint | null;
  const priorities = (prioritiesRes.data ?? []) as FosWeeklyPriority[];
  const allPriorities = allPrioritiesRes.data ?? [];

  // Compute metrics server-side
  const tasksCompletedThisWeek = priorities.filter((p) => p.status === "completed").length;
  const tasksOverdue = priorities.filter(
    (p) => p.status !== "completed" && p.deadline && p.deadline < todayStr,
  ).length;
  const blockedTasks = priorities.filter((p) => p.status === "blocked").length;
  const activeProjects = priorities.filter((p) => p.status === "in_progress").length;
  const sprintPct = sprint?.completion_pct ?? 0;

  const completed = allPriorities.filter((p) => p.status === "completed");
  const onTime = completed.filter(
    (p) => p.completed_at && p.deadline && p.completed_at.split("T")[0] <= p.deadline,
  );
  const accountabilityScore =
    completed.length > 0 ? Math.round((onTime.length / completed.length) * 100) : 100;

  // Cel tygodnia = aktywny sprint. Na dashboardzie (podsumowanie) pokazujemy tylko
  // priorytety tygodnia — codzienne taski są na /fos i nie zaśmiecają overview.
  const majorItems = priorities.filter((p) => !p.is_company_goal && p.kind === "priority");

  const metrics = [
    { label: "Ukończone", value: tasksCompletedThisWeek, suffix: "" },
    { label: "Zaległe", value: tasksOverdue, suffix: "", danger: true },
    { label: "Sprint", value: sprintPct, suffix: "%" },
    { label: "Accountability", value: accountabilityScore, suffix: "%" },
    { label: "Aktywne", value: activeProjects, suffix: "" },
    { label: "Zablokowane", value: blockedTasks, suffix: "", danger: true },
  ];

  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] uppercase tracking-widest font-bold"
            style={{ color: "var(--accent)" }}
          >
            Founder OS
          </span>
          <span className="text-[var(--border)]">·</span>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>
            {weekStart.slice(5).replace("-", ".")} – ten tydzień
          </span>
        </div>
        <Link
          href="/fos"
          className="text-[11px] font-medium hover:underline"
          style={{ color: "var(--accent)" }}
        >
          Otwórz FOS →
        </Link>
      </div>

      {/* Cel tygodnia (sprint) + Tasks — interactive client component */}
      <DashboardFosInteractive sprint={sprint} initialTasks={majorItems} />

      {/* Execution Metrics */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
        {metrics.map(({ label, value, suffix, danger }) => {
          const isDangerous = danger && value > 0;
          return (
            <div
              key={label}
              className={`rounded-xl px-3 py-3 ${isDangerous ? "" : "glass-card"}`}
              style={isDangerous ? {
                background: "#1C191710",
                border: "1px solid #1C191730",
              } : undefined}
            >
              <div
                className="text-[9.5px] font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                {label}
              </div>
              <div
                className="text-[20px] font-bold leading-none tabular-nums"
                style={{ color: isDangerous ? "#1C1917" : "inherit" }}
              >
                {value}
                {suffix}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
