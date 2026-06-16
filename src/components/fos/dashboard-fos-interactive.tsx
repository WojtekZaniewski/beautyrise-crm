"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FosWeeklyPriority, FosPriorityStatus } from "@/lib/fos-types";
import { getWeekStart } from "@/lib/fos-types";

async function patchPriority(id: string, body: Record<string, unknown>) {
  await fetch(`/api/fos/priorities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Circular Progress ─────────────────────────────────────────────────────────
function CircleProgress({ done, total }: { done: number; total: number }) {
  const size = 72;
  const strokeW = 6;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const offset = circ - (pct / 100) * circ;
  const color = pct === 100 ? "#FF4C00" : "var(--accent)";

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
        <span className="text-[15px] font-bold tabular-nums leading-none" style={{ color }}>
          {pct}%
        </span>
        <span className="text-[9px] leading-none mt-0.5" style={{ color: "var(--muted)" }}>
          {done}/{total}
        </span>
      </div>
    </div>
  );
}

// ─── Single Goal Row ───────────────────────────────────────────────────────────
function GoalRow({
  goal,
  onToggle,
  onTitleChange,
  onDeadlineChange,
  onDelete,
}: {
  goal: FosWeeklyPriority;
  onToggle: (g: FosWeeklyPriority) => void;
  onTitleChange: (id: string, title: string) => void;
  onDeadlineChange: (id: string, deadline: string) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState(goal.title);
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = goal.status !== "completed" && goal.deadline && goal.deadline < today;
  const done = goal.status === "completed";

  function handleTitleBlur() {
    const trimmed = title.trim();
    if (trimmed && trimmed !== goal.title) onTitleChange(goal.id, trimmed);
    else if (!trimmed) setTitle(goal.title);
  }

  return (
    <div className="flex items-center gap-2 py-1.5 group">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(goal)}
        className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
        style={{
          borderColor: done ? "#FF4C00" : "var(--border)",
          background: done ? "#FF4C00" : "transparent",
        }}
      >
        {done && <span className="text-white" style={{ fontSize: 9 }}>✓</span>}
      </button>

      {/* Title — always editable */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleTitleBlur}
        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
        className={`flex-1 min-w-0 text-[13px] font-medium bg-transparent outline-none border-b border-transparent focus:border-current transition-colors ${
          done ? "line-through opacity-40" : ""
        }`}
        style={{ color: "inherit" }}
      />

      {/* Deadline */}
      <div className="shrink-0 flex items-center gap-1">
        {isOverdue && (
          <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ background: "#1C191715", color: "#1C1917" }}>
            zaległe
          </span>
        )}
        <input
          type="date"
          value={goal.deadline ?? ""}
          onChange={(e) => onDeadlineChange(goal.id, e.target.value)}
          className="text-[10px] bg-transparent outline-none cursor-pointer transition-colors hover:opacity-80"
          style={{ color: isOverdue ? "#1C1917" : "var(--muted)", width: 110 }}
          title="Deadline"
        />
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(goal.id)}
        className="opacity-0 group-hover:opacity-100 shrink-0 text-[11px] transition-opacity"
        style={{ color: "var(--muted)" }}
      >
        ✕
      </button>
    </div>
  );
}

// ─── Main Interactive Component ────────────────────────────────────────────────
export function DashboardFosInteractive({
  initialGoals,
  initialTasks,
}: {
  initialGoals: FosWeeklyPriority[];
  initialTasks: FosWeeklyPriority[];
}) {
  const router = useRouter();
  const [goals, setGoals] = useState<FosWeeklyPriority[]>(initialGoals);
  const [tasks, setTasks] = useState<FosWeeklyPriority[]>(initialTasks);
  const [newGoal, setNewGoal] = useState("");
  const [newGoalFocused, setNewGoalFocused] = useState(false);
  const weekStart = getWeekStart();

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

  // ── Goal actions ───────────────────────────────────────────────────────────
  async function toggleGoal(g: FosWeeklyPriority) {
    const next: FosPriorityStatus = g.status === "completed" ? "not_started" : "completed";
    setGoals((prev) => prev.map((x) => (x.id === g.id ? { ...x, status: next } : x)));
    await patchPriority(g.id, { status: next });
  }

  async function updateGoalTitle(id: string, title: string) {
    setGoals((prev) => prev.map((x) => (x.id === id ? { ...x, title } : x)));
    await patchPriority(id, { title });
  }

  async function updateGoalDeadline(id: string, deadline: string) {
    setGoals((prev) => prev.map((x) => (x.id === id ? { ...x, deadline: deadline || null } : x)));
    await patchPriority(id, { deadline: deadline || null });
  }

  async function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/priorities/${id}`, { method: "DELETE" });
  }

  async function addGoal() {
    const title = newGoal.trim();
    if (!title) return;
    setNewGoal("");
    const tempId = `tmp-${Date.now()}`;
    const optimistic: FosWeeklyPriority = {
      id: tempId, workspace_id: "", sprint_id: null, week_start: weekStart,
      title, description: null, owner_id: null, owner_label: null,
      deadline: null, status: "not_started", is_company_goal: true, is_fire: false,
      completed_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, optimistic]);
    const res = await fetch("/api/fos/priorities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, week_start: weekStart, is_company_goal: true }),
    });
    const data = await res.json();
    if (data.data) setGoals((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
  }

  // ── Task actions ───────────────────────────────────────────────────────────
  async function toggleTask(t: FosWeeklyPriority) {
    const next: FosPriorityStatus = t.status === "completed" ? "not_started" : "completed";
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
    await patchPriority(t.id, { status: next });
  }

  const doneGoals = goals.filter((g) => g.status === "completed").length;

  return (
    <>
      {/* ── Company Goals ─────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-4 mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(255,76,0,0.10) 0%, rgba(255,255,255,0.95) 100%)",
          border: "2px solid rgba(255,76,0,0.25)",
        }}
      >
        <div className="flex gap-4">
          {/* Circle */}
          <CircleProgress done={doneGoals} total={goals.length} />

          {/* Goals list */}
          <div className="flex-1 min-w-0">
            <div className="text-[9.5px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              Company Goals · ten tydzień
            </div>

            {goals.length === 0 && (
              <div className="text-[12px] italic mb-2" style={{ color: "var(--muted)" }}>
                Brak celów — dodaj poniżej
              </div>
            )}

            {goals.map((g) => (
              <GoalRow
                key={g.id}
                goal={g}
                onToggle={toggleGoal}
                onTitleChange={updateGoalTitle}
                onDeadlineChange={updateGoalDeadline}
                onDelete={deleteGoal}
              />
            ))}

            {/* Add new goal — always visible */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="shrink-0 text-[11px]" style={{ color: "var(--accent)" }}>+</span>
              <input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addGoal(); if (e.key === "Escape") setNewGoal(""); }}
                onFocus={() => setNewGoalFocused(true)}
                onBlur={() => setNewGoalFocused(false)}
                placeholder="Dodaj cel..."
                className="flex-1 text-[12px] bg-transparent outline-none border-b transition-colors"
                style={{
                  borderColor: newGoalFocused || newGoal ? "var(--accent)" : "rgba(255,255,255,0.1)",
                  color: "inherit",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Tasks list ────────────────────────────────────────────────────── */}
      {tasks.length > 0 && (
        <div className="glass-card rounded-xl px-4 py-3 mb-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
            Ten tydzień · Zadania
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

      {tasks.length === 0 && goals.length === 0 && (
        <div className="text-[12px] text-center py-2 mb-3" style={{ color: "var(--muted)" }}>
          <Link href="/fos" className="hover:underline" style={{ color: "var(--accent)" }}>
            Otwórz Founder OS →
          </Link>{" "}
          aby dodać zadania na ten tydzień
        </div>
      )}
    </>
  );
}
