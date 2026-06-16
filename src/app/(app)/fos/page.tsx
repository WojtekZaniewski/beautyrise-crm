"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { FosSprint, FosWeeklyPriority, FosPriorityStatus } from "@/lib/fos-types";
import { getWeekStart } from "@/lib/fos-types";

const OWNERS = ["Kuba", "Wojtek"] as const;
type Owner = (typeof OWNERS)[number];

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FosCommandCenter() {
  const [sprint, setSprint] = useState<FosSprint | null>(null);
  const [priorities, setPriorities] = useState<FosWeeklyPriority[]>([]);
  const [loading, setLoading] = useState(true);
  const [eodOpen, setEodOpen] = useState(false);
  const weekStart = getWeekStart();
  const today = getTodayStr();

  const load = useCallback(async () => {
    setLoading(true);
    const [sprintRes, priRes] = await Promise.all([
      fetch("/api/fos/sprints").then((r) => r.json()),
      fetch(`/api/fos/priorities?week=${weekStart}`).then((r) => r.json()),
    ]);
    const active = (sprintRes.data ?? []).find((s: FosSprint) => s.status === "active") ?? null;
    setSprint(active);
    setPriorities(priRes.data ?? []);
    setLoading(false);
  }, [weekStart]);

  useEffect(() => { load(); }, [load]);

  const toggleStatus = useCallback(async (p: FosWeeklyPriority) => {
    const next: FosPriorityStatus = p.status === "completed" ? "not_started" : "completed";
    setPriorities((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
    await fetch(`/api/fos/priorities/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  }, []);

  const addTask = useCallback(
    async (owner: Owner, scope: "today" | "week", title: string) => {
      if (!title.trim()) return;
      const deadline = scope === "today" ? today : undefined;
      const tempId = `tmp-${Date.now()}`;
      const optimistic: FosWeeklyPriority = {
        id: tempId,
        workspace_id: "",
        sprint_id: sprint?.id ?? null,
        week_start: weekStart,
        title: title.trim(),
        description: null,
        owner_id: null,
        owner_label: owner,
        deadline: deadline ?? null,
        status: "not_started",
        is_company_goal: false,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPriorities((prev) => [...prev, optimistic]);
      const res = await fetch("/api/fos/priorities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          week_start: weekStart,
          owner_label: owner,
          deadline,
          sprint_id: sprint?.id ?? null,
        }),
      });
      const data = await res.json();
      if (data.data) {
        setPriorities((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
      }
    },
    [sprint, today, weekStart],
  );

  const deleteTask = useCallback(async (id: string) => {
    setPriorities((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/priorities/${id}`, { method: "DELETE" });
  }, []);

  const companyGoal = priorities.find((p) => p.is_company_goal);
  const completedToday = priorities.filter(
    (p) =>
      p.status === "completed" &&
      p.completed_at &&
      p.completed_at.split("T")[0] === today,
  );

  return (
    <div className="px-4 py-5 sm:px-7 sm:py-6 max-w-5xl mx-auto anim-page">
      {/* Sprint banner */}
      <SprintBanner sprint={sprint} loading={loading} />

      {/* Company Goal */}
      {companyGoal && (
        <div
          className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "var(--accent-subtle)",
            border: "2px solid rgba(255,76,0,0.2)",
          }}
        >
          <button
            onClick={() => toggleStatus(companyGoal)}
            className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
            style={{
              borderColor: companyGoal.status === "completed" ? "#22c55e" : "var(--accent)",
              background: companyGoal.status === "completed" ? "#22c55e" : "transparent",
            }}
          >
            {companyGoal.status === "completed" && (
              <span className="text-white" style={{ fontSize: 9 }}>✓</span>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div
              className="text-[9.5px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: "var(--accent)" }}
            >
              ⭐ Company Goal
            </div>
            <div
              className={`text-[13px] font-semibold leading-snug ${
                companyGoal.status === "completed" ? "line-through opacity-40" : ""
              }`}
            >
              {companyGoal.title}
            </div>
          </div>
          <Link
            href="/fos/priorities"
            className="shrink-0 text-[10px] hover:underline"
            style={{ color: "var(--muted)" }}
          >
            Priorytety →
          </Link>
        </div>
      )}

      {!companyGoal && !loading && (
        <div
          className="mb-4 flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ border: "1px dashed var(--border)", background: "var(--ba-2)" }}
        >
          <span className="text-[12px]" style={{ color: "var(--muted)" }}>
            Brak Company Goal na ten tydzień
          </span>
          <Link
            href="/fos/priorities"
            className="text-[11px] font-semibold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            + Dodaj cel
          </Link>
        </div>
      )}

      {/* Two-person columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {OWNERS.map((owner, i) => (
          <PersonColumn
            key={owner}
            owner={owner}
            tasks={priorities.filter((p) => p.owner_label === owner && !p.is_company_goal)}
            today={today}
            onToggle={toggleStatus}
            onDelete={deleteTask}
            onAdd={addTask}
            isFirst={i === 0}
          />
        ))}
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setEodOpen(true)}
          className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Koniec dnia 🏁
        </button>
        <Link
          href="/fos/reviews"
          className="px-4 py-2 rounded-lg text-[13px] font-medium"
          style={{ border: "1px solid var(--border)", color: "var(--text)" }}
        >
          Weekly Review
        </Link>
        <Link
          href="/fos/sprints"
          className="text-[12px]"
          style={{ color: "var(--muted)" }}
        >
          Sprinty
        </Link>
        <Link
          href="/fos/ideas"
          className="text-[12px]"
          style={{ color: "var(--muted)" }}
        >
          Pomysły
        </Link>
      </div>

      {eodOpen && (
        <EodModal
          today={today}
          completedToday={completedToday}
          allPriorities={priorities}
          onClose={() => setEodOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Sprint Banner ─────────────────────────────────────────────────────────────
function SprintBanner({ sprint, loading }: { sprint: FosSprint | null; loading: boolean }) {
  if (loading) {
    return (
      <div
        className="h-14 rounded-xl mb-4 animate-pulse"
        style={{ background: "var(--ba-2)" }}
      />
    );
  }
  return (
    <div
      className="mb-4 flex items-center gap-4 px-4 py-3 rounded-xl"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: "var(--accent)" }}
        >
          {sprint ? sprint.name : "Brak aktywnego sprintu"}
        </div>
        <div className="text-[13px] font-semibold leading-tight truncate">
          {sprint ? sprint.goal : "Utwórz sprint aby zacząć."}
        </div>
      </div>
      {sprint && (
        <div className="shrink-0 flex items-center gap-3">
          <div
            className="hidden sm:block w-20 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${sprint.completion_pct}%`, background: "var(--accent)" }}
            />
          </div>
          <span
            className="text-[15px] font-bold tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            {sprint.completion_pct}%
          </span>
        </div>
      )}
      <Link
        href="/fos/sprints"
        className="shrink-0 text-[11px] hover:underline"
        style={{ color: "var(--muted)" }}
      >
        {sprint ? "Edytuj" : "+ Sprint"}
      </Link>
    </div>
  );
}

// ─── Person Column ─────────────────────────────────────────────────────────────
function PersonColumn({
  owner,
  tasks,
  today,
  onToggle,
  onDelete,
  onAdd,
  isFirst,
}: {
  owner: Owner;
  tasks: FosWeeklyPriority[];
  today: string;
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
  onAdd: (owner: Owner, scope: "today" | "week", title: string) => void;
  isFirst?: boolean;
}) {
  const todayTasks = tasks.filter((t) => t.deadline === today);
  const weekTasks = tasks.filter((t) => t.deadline !== today);
  const done = tasks.filter((t) => t.status === "completed").length;

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight">{owner}</h2>
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>
            {done}/{tasks.length} ukończone
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
          style={{
            background:
              tasks.length === 0
                ? "var(--ba-2)"
                : done === tasks.length
                  ? "#22c55e20"
                  : "var(--accent-subtle)",
            color:
              tasks.length === 0
                ? "var(--muted)"
                : done === tasks.length
                  ? "#22c55e"
                  : "var(--accent)",
          }}
        >
          {tasks.length === 0 ? "0" : done === tasks.length ? "✓" : `${tasks.length - done}`}
        </div>
      </div>

      {/* DZIŚ */}
      <TaskSection
        label="DZIŚ"
        tasks={todayTasks}
        owner={owner}
        scope="today"
        onToggle={onToggle}
        onDelete={onDelete}
        onAdd={onAdd}
        autoFocus={isFirst}
      />

      {/* TEN TYDZIEŃ */}
      <TaskSection
        label="TEN TYDZIEŃ"
        tasks={weekTasks}
        owner={owner}
        scope="week"
        onToggle={onToggle}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </div>
  );
}

// ─── Task Section ──────────────────────────────────────────────────────────────
function TaskSection({
  label,
  tasks,
  owner,
  scope,
  onToggle,
  onDelete,
  onAdd,
  autoFocus,
}: {
  label: string;
  tasks: FosWeeklyPriority[];
  owner: Owner;
  scope: "today" | "week";
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
  onAdd: (owner: Owner, scope: "today" | "week", title: string) => void;
  autoFocus?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function submit() {
    if (draft.trim()) {
      onAdd(owner, scope, draft.trim());
    }
    setDraft("");
  }

  const pending = tasks.filter((t) => t.status !== "completed");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="mb-3">
      <div
        className="text-[9px] font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>

      <div className="space-y-1">
        {pending.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
        ))}
        {completed.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>

      {/* Always-visible ghost input — no click required */}
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") setDraft("");
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="+ Dodaj task..."
        className="mt-1.5 w-full text-[12px] px-2.5 py-1.5 rounded-lg outline-none transition-all"
        style={{
          background: focused || draft ? "var(--ba-4)" : "transparent",
          border: focused || draft ? "1px solid var(--accent)" : "1px solid transparent",
          color: "var(--text)",
        }}
      />
    </div>
  );
}

// ─── Task Row ──────────────────────────────────────────────────────────────────
function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: FosWeeklyPriority;
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
}) {
  const done = task.status === "completed";

  return (
    <div className="flex items-center gap-2 group px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--ba-4)] transition-colors">
      <button
        onClick={() => onToggle(task)}
        className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
        style={{
          borderColor: done ? "#22c55e" : "var(--border)",
          background: done ? "#22c55e" : "transparent",
        }}
      >
        {done && (
          <span className="text-white" style={{ fontSize: 9 }}>
            ✓
          </span>
        )}
      </button>
      <span
        className={`text-[12.5px] leading-snug flex-1 min-w-0 ${
          done ? "line-through opacity-40" : ""
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] shrink-0 px-1"
        style={{ color: "var(--muted)" }}
        title="Usuń"
      >
        ✕
      </button>
    </div>
  );
}

// ─── End of Day Modal ──────────────────────────────────────────────────────────
function EodModal({
  today,
  completedToday,
  allPriorities,
  onClose,
}: {
  today: string;
  completedToday: FosWeeklyPriority[];
  allPriorities: FosWeeklyPriority[];
  onClose: () => void;
}) {
  const dateLabel = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[16px] font-bold mb-0.5">Koniec dnia 🏁</div>
        <div className="text-[12px] mb-5 capitalize" style={{ color: "var(--muted)" }}>
          {dateLabel}
        </div>

        {OWNERS.map((owner) => {
          const doneByOwner = completedToday.filter((t) => t.owner_label === owner);
          const pendingToday = allPriorities.filter(
            (t) =>
              t.owner_label === owner &&
              t.status !== "completed" &&
              t.deadline === today,
          );

          return (
            <div key={owner} className="mb-5">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                {owner}
              </div>
              {doneByOwner.length === 0 ? (
                <div
                  className="text-[12px] italic mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  Nic nie ukończono dziś
                </div>
              ) : (
                doneByOwner.map((t) => (
                  <div key={t.id} className="flex items-start gap-1.5 text-[12px] mb-1">
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span>{t.title}</span>
                  </div>
                ))
              )}
              {pendingToday.length > 0 && (
                <div className="mt-2 text-[11px]" style={{ color: "#ef4444" }}>
                  Nieukończone:{" "}
                  {pendingToday.map((t) => t.title).join(", ")}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex gap-2 mt-5">
          <Link
            href="/fos/reviews"
            onClick={onClose}
            className="flex-1 text-center px-4 py-2 rounded-lg text-[12px] font-semibold text-white"
            style={{ background: "var(--accent)" }}
          >
            Weekly Review →
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[12px] font-medium"
            style={{ border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
