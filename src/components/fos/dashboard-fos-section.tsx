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

  const goalItem = priorities.find((p) => p.is_company_goal);
  const majorItems = priorities.filter((p) => !p.is_company_goal);

  const daysLeft = sprint
    ? Math.max(0, Math.ceil((new Date(sprint.end_date).getTime() - Date.now()) / 86400000))
    : 0;

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

      {/* Company Goal + Tasks — interactive client component */}
      <DashboardFosInteractive initialGoal={goalItem ?? null} initialTasks={majorItems} />

      {/* Sprint card */}
      <div
        className="glass-card rounded-xl px-5 py-4 mb-3"
        style={sprint ? {
          borderLeft: "3px solid var(--accent)",
        } : undefined}
      >
        {!sprint ? (
          <div className="flex items-center justify-between">
            <div>
              <div
                className="text-[13px] font-medium mb-0.5"
                style={{ color: "var(--muted)" }}
              >
                Brak aktywnego sprintu
              </div>
              <div className="text-[12px]" style={{ color: "var(--muted)" }}>
                Zdefiniuj sprint, aby śledzić postępy i egzekucję.
              </div>
            </div>
            <Link
              href="/fos/sprints"
              className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white shrink-0"
              style={{ background: "var(--accent)" }}
            >
              + Utwórz sprint
            </Link>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {sprint.name}
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "#22c55e15", color: "#22c55e", border: "1px solid #22c55e30" }}
                >
                  Aktywny
                </span>
              </div>
              <div className="text-[17px] font-semibold leading-snug mb-3 line-clamp-2">
                {sprint.goal}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden max-w-xs"
                  style={{ background: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sprintPct}%`, background: "var(--accent)" }}
                  />
                </div>
                <span
                  className="text-[11px] tabular-nums shrink-0"
                  style={{ color: "var(--muted)" }}
                >
                  {sprint.start_date.slice(5).replace("-", ".")} –{" "}
                  {sprint.end_date.slice(5).replace("-", ".")}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div
                className="text-[36px] font-bold leading-none tabular-nums"
                style={{ color: "var(--accent)" }}
              >
                {sprintPct}%
              </div>
              <div className="text-[11px] mt-0.5 tabular-nums" style={{ color: "var(--muted)" }}>
                {daysLeft === 0 ? "Kończy się dziś" : `${daysLeft} dni`}
              </div>
              <Link
                href="/fos/sprints"
                className="text-[10px] hover:underline mt-1 block"
                style={{ color: "var(--accent)" }}
              >
                Edytuj
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Execution Metrics */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
        {metrics.map(({ label, value, suffix, danger }) => {
          const isDangerous = danger && value > 0;
          return (
            <div
              key={label}
              className={`rounded-xl px-3 py-3 ${isDangerous ? "" : "glass-card"}`}
              style={isDangerous ? {
                background: "#ef444410",
                border: "1px solid #ef444430",
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
                style={{ color: isDangerous ? "#ef4444" : "inherit" }}
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
