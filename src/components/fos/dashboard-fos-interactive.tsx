"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { FosWeeklyPriority, FosPriorityStatus } from "@/lib/fos-types";

const STATUS_CONFIG: Record<FosPriorityStatus, { label: string; color: string }> = {
  not_started: { label: "Nie zaczęte", color: "#a3a3a3" },
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

async function patchPriority(id: string, body: Record<string, unknown>) {
  await fetch(`/api/fos/priorities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function DashboardFosInteractive({
  initialGoal,
  initialTasks,
}: {
  initialGoal: FosWeeklyPriority | null;
  initialTasks: FosWeeklyPriority[];
}) {
  const [goal, setGoal] = useState<FosWeeklyPriority | null>(initialGoal);
  const [tasks, setTasks] = useState<FosWeeklyPriority[]>(initialTasks);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState(initialGoal?.title ?? "");
  const goalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingGoal) goalInputRef.current?.focus();
  }, [editingGoal]);

  async function toggleGoal() {
    if (!goal) return;
    const next: FosPriorityStatus = goal.status === "completed" ? "not_started" : "completed";
    setGoal({ ...goal, status: next });
    await patchPriority(goal.id, { status: next });
  }

  async function saveGoalTitle() {
    if (!goal) return;
    const trimmed = goalDraft.trim();
    setEditingGoal(false);
    if (!trimmed || trimmed === goal.title) return;
    setGoal({ ...goal, title: trimmed });
    await patchPriority(goal.id, { title: trimmed });
  }

  async function toggleTask(t: FosWeeklyPriority) {
    const next: FosPriorityStatus = t.status === "completed" ? "not_started" : "completed";
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
    await patchPriority(t.id, { status: next });
  }

  return (
    <>
      {/* Company Goal */}
      {goal ? (
        <div
          className="rounded-xl px-4 py-3.5 mb-3 flex items-center gap-3"
          style={{
            background:
              "linear-gradient(126.97deg, rgba(6,11,40,0.74) 28.26%, rgba(10,14,35,0.71) 91.2%)",
            border: "2px solid rgba(255,76,0,0.35)",
          }}
        >
          {/* Toggle button */}
          <button
            onClick={toggleGoal}
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-all"
            style={{
              background: goal.status === "completed" ? "#22c55e" : "var(--accent)",
              color: "white",
              boxShadow:
                goal.status === "completed"
                  ? "0 0 0 2px #22c55e40"
                  : "0 0 0 2px rgba(255,76,0,0.3)",
            }}
            title="Zmień status"
          >
            {goal.status === "completed" ? "✓" : "⭐"}
          </button>

          {/* Title — click to edit inline */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[9.5px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: "var(--accent)" }}
            >
              Company Goal · ten tydzień
            </div>
            {editingGoal ? (
              <input
                ref={goalInputRef}
                value={goalDraft}
                onChange={(e) => setGoalDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveGoalTitle();
                  if (e.key === "Escape") {
                    setGoalDraft(goal.title);
                    setEditingGoal(false);
                  }
                }}
                onBlur={saveGoalTitle}
                className="w-full text-[14px] font-semibold bg-transparent outline-none border-b"
                style={{ borderColor: "var(--accent)", color: "inherit" }}
              />
            ) : (
              <div
                className={`text-[14px] font-semibold leading-snug cursor-text hover:opacity-80 transition-opacity ${
                  goal.status === "completed" ? "line-through opacity-50" : ""
                }`}
                onClick={() => {
                  setGoalDraft(goal.title);
                  setEditingGoal(true);
                }}
                title="Kliknij aby edytować"
              >
                {goal.title}
              </div>
            )}
          </div>

          <StatusPill status={goal.status} />
        </div>
      ) : (
        <div
          className="rounded-xl px-5 py-3 mb-3 flex items-center justify-between"
          style={{ border: "1px dashed var(--border)", background: "var(--ba-2)" }}
        >
          <span className="text-[12px]" style={{ color: "var(--muted)" }}>
            Brak Company Goal na ten tydzień
          </span>
          <Link
            href="/fos"
            className="text-[11px] font-semibold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            + Dodaj w FOS
          </Link>
        </div>
      )}

      {/* Tasks list — toggleable */}
      {tasks.length > 0 && (
        <div className="glass-card rounded-xl px-4 py-3 mb-3">
          <div
            className="text-[10px] font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--muted)" }}
          >
            Ten tydzień · Zadania
          </div>
          <div className="space-y-1.5">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-2.5 group px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--ba-4)] transition-colors"
              >
                <button
                  onClick={() => toggleTask(t)}
                  className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: t.status === "completed" ? "#22c55e" : "var(--border)",
                    background: t.status === "completed" ? "#22c55e" : "transparent",
                  }}
                >
                  {t.status === "completed" && (
                    <span className="text-white" style={{ fontSize: 9 }}>
                      ✓
                    </span>
                  )}
                </button>
                <span
                  className={`text-[12.5px] flex-1 min-w-0 truncate ${
                    t.status === "completed" ? "line-through opacity-40" : ""
                  }`}
                >
                  {t.title}
                </span>
                {t.owner_label && (
                  <span className="text-[10px] shrink-0 hidden sm:block" style={{ color: "var(--muted)" }}>
                    {t.owner_label}
                  </span>
                )}
                <StatusPill status={t.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
