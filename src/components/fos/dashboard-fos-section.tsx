import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getWeekStart } from "@/lib/fos-types";
import Link from "next/link";
import type { FosSprint, FosWeeklyPriority, FosPriorityStatus } from "@/lib/fos-types";

const STATUS_CONFIG: Record<FosPriorityStatus, { label: string; color: string }> = {
  not_started: { label: "Nie started", color: "#a3a3a3" },
  in_progress: { label: "W toku", color: "#FF8C42" },
  completed: { label: "Ukończone", color: "#22c55e" },
  blocked: { label: "Zablokowane", color: "#ef4444" },
};

function StatusPill({ status }: { status: FosPriorityStatus }) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

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

      {/* Sprint card */}
      <div
        className="glass-card rounded-xl px-5 py-4 mb-3"
        style={sprint ? {
          background: "linear-gradient(135deg, rgba(255,76,0,0.08) 0%, rgba(255,255,255,0.92) 60%)",
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

      {/* Weekly Priorities preview */}
      <div className="glass-card rounded-xl px-4 py-3">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Ten tydzień · Priorytety
          </span>
          <Link
            href="/fos/priorities"
            className="text-[11px] font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Zarządzaj →
          </Link>
        </div>

        {priorities.length === 0 ? (
          <div className="py-3 text-center">
            <span className="text-[12px]" style={{ color: "var(--muted)" }}>
              Brak priorytetów na ten tydzień.{" "}
              <Link href="/fos/priorities" className="hover:underline" style={{ color: "var(--accent)" }}>
                Dodaj
              </Link>
            </span>
          </div>
        ) : (
          <div className="space-y-1.5">
            {goalItem && (
              <PriorityRow p={goalItem} isGoal />
            )}
            {majorItems.map((p) => (
              <PriorityRow key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PriorityRow({ p, isGoal }: { p: FosWeeklyPriority; isGoal?: boolean }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const isOverdue = p.status !== "completed" && p.deadline && p.deadline < todayStr;

  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{
        background: isGoal ? "var(--accent-subtle)" : "var(--ba-4)",
        border: `1px solid ${isGoal ? "rgba(255, 76, 0, 0.2)" : "var(--border)"}`,
      }}
    >
      <span className="text-[11px] shrink-0" style={{ color: isGoal ? "var(--accent)" : "var(--muted)" }}>
        {isGoal ? "⭐" : "▸"}
      </span>
      <span
        className={`text-[12px] font-medium flex-1 min-w-0 truncate ${
          p.status === "completed" ? "line-through opacity-50" : ""
        }`}
      >
        {p.title}
      </span>
      {p.owner_label && (
        <span
          className="text-[10px] shrink-0 tabular-nums hidden sm:block"
          style={{ color: "var(--muted)" }}
        >
          {p.owner_label}
        </span>
      )}
      {p.deadline && isOverdue && (
        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
          style={{ background: "#ef444415", color: "#ef4444" }}>
          Zaległe
        </span>
      )}
      <StatusPill status={p.status} />
    </div>
  );
}
