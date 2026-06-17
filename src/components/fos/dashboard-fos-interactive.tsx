"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FosWeeklyPriority, FosPriorityStatus, FosSprint } from "@/lib/fos-types";

async function patchPriority(id: string, body: Record<string, unknown>) {
  await fetch(`/api/fos/priorities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Circular Progress (sprint completion %) ────────────────────────────────────
function CircleProgress({ pct }: { pct: number }) {
  const size = 72;
  const strokeW = 6;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  const offset = circ - (clamped / 100) * circ;
  const color = clamped === 100 ? "#FF4C00" : "var(--accent)";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--border)" strokeWidth={strokeW}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeW}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[16px] font-bold tabular-nums leading-none" style={{ color }}>
          {clamped}%
        </span>
      </div>
    </div>
  );
}

// ─── Main Interactive Component ────────────────────────────────────────────────
export function DashboardFosInteractive({
  sprint,
  initialTasks,
}: {
  // Cel tygodnia = aktywny sprint (jedyne źródło, zsynchronizowane z /fos)
  sprint: FosSprint | null;
  initialTasks: FosWeeklyPriority[];
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState<FosWeeklyPriority[]>(initialTasks);

  // ── Midnight auto-refresh ──────────────────────────────────────────────────
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(now.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const ms = midnight.getTime() - now.getTime();
    const t = setTimeout(() => router.refresh(), ms);
    return () => clearTimeout(t);
  }, [router]);

  // ── Task actions ───────────────────────────────────────────────────────────
  async function toggleTask(t: FosWeeklyPriority) {
    const next: FosPriorityStatus = t.status === "completed" ? "not_started" : "completed";
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
    await patchPriority(t.id, { status: next });
  }

  const daysLeft = sprint
    ? Math.max(0, Math.ceil((new Date(sprint.end_date).getTime() - Date.now()) / 86400000))
    : 0;

  return (
    <>
      {/* ── Cel tygodnia (z aktywnego sprintu) ────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-4 mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(255,76,0,0.10) 0%, rgba(255,255,255,0.95) 100%)",
          border: "2px solid rgba(255,76,0,0.25)",
        }}
      >
        {sprint ? (
          <div className="flex gap-4 items-center">
            <CircleProgress pct={sprint.completion_pct} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9.5px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                  Cel tygodnia
                </span>
                <span
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(255,76,0,0.12)", color: "var(--accent)" }}
                >
                  {sprint.name}
                </span>
              </div>
              <div className="text-[15px] font-semibold leading-snug mb-2 line-clamp-2">
                {sprint.goal}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className="flex-1 min-w-[80px] h-1.5 rounded-full overflow-hidden max-w-xs"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sprint.completion_pct}%`, background: "var(--accent)" }}
                  />
                </div>
                <span className="text-[10px] tabular-nums shrink-0" style={{ color: "var(--muted)" }}>
                  {sprint.start_date.slice(5).replace("-", ".")} –{" "}
                  {sprint.end_date.slice(5).replace("-", ".")} ·{" "}
                  {daysLeft === 0 ? "dziś" : `${daysLeft} dni`}
                </span>
                <Link
                  href="/fos/sprints"
                  className="text-[10px] shrink-0 hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Edytuj
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[9.5px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
                Cel tygodnia
              </div>
              <div className="text-[13px]" style={{ color: "var(--muted)" }}>
                Brak aktywnego celu — ustaw cel tygodnia w sprincie.
              </div>
            </div>
            <Link
              href="/fos/sprints"
              className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white shrink-0"
              style={{ background: "var(--accent)" }}
            >
              + Ustaw cel
            </Link>
          </div>
        )}
      </div>

      {/* ── Tasks list ────────────────────────────────────────────────────── */}
      {tasks.length > 0 && (
        <div className="glass-card rounded-xl px-4 py-3 mb-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
            Ten tydzień · Priorytety
          </div>
          <div className="space-y-1">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--ba-4)] transition-colors">
                <button
                  onClick={() => toggleTask(t)}
                  className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: t.status === "completed" ? "#FF4C00" : "var(--border)",
                    background: t.status === "completed" ? "#FF4C00" : "transparent",
                  }}
                >
                  {t.status === "completed" && <span className="text-white" style={{ fontSize: 9 }}>✓</span>}
                </button>
                <span className={`text-[12.5px] flex-1 min-w-0 truncate ${t.status === "completed" ? "line-through opacity-40" : ""}`}>
                  {t.title}
                </span>
                {t.owner_label && (
                  <span className="text-[10px] shrink-0 hidden sm:block" style={{ color: "var(--muted)" }}>
                    {t.owner_label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
