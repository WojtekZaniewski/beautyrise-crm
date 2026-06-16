"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  FosSprint,
  FosWeeklyPriority,
  FosPriorityStatus,
  FosMetrics,
  FosIdea,
  FosActivityItem,
  FosDecision,
  FosWaitingFor,
  FosDailyNote,
} from "@/lib/fos-types";
import { getWeekStart } from "@/lib/fos-types";

const OWNERS = ["Kuba", "Wojtek"] as const;
type Owner = (typeof OWNERS)[number];

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

async function patchPriority(id: string, body: Record<string, unknown>) {
  await fetch(`/api/fos/priorities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Circular Progress ─────────────────────────────────────────────────────────
function CircleProgress({ done, total, size = 56 }: { done: number; total: number; size?: number }) {
  const strokeW = 5;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const offset = circ - (pct / 100) * circ;
  const color = pct === 100 ? "#FF4C00" : "var(--accent)";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={strokeW} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeW}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[12px] font-bold tabular-nums leading-none" style={{ color }}>{pct}%</span>
        <span className="text-[8px] leading-none mt-0.5" style={{ color: "var(--muted)" }}>{done}/{total}</span>
      </div>
    </div>
  );
}

// ─── Weekly Scoreboard ─────────────────────────────────────────────────────────
function WeeklyScoreboard({ metrics }: { metrics: FosMetrics | null }) {
  if (!metrics) return <div className="h-10 rounded-xl mb-3 animate-pulse" style={{ background: "var(--ba-2)" }} />;
  const items = [
    { label: "Ukończone", value: metrics.tasksCompletedThisWeek, danger: false },
    { label: "Nowe leady", value: metrics.leadsThisWeek, danger: false },
    { label: "Zaległe", value: metrics.tasksOverdue, danger: metrics.tasksOverdue > 0 },
    { label: "Zablokowane", value: metrics.blockedTasks, danger: metrics.blockedTasks > 0 },
    { label: "Accountability", value: `${metrics.accountabilityScore}%`, danger: metrics.accountabilityScore < 70 },
  ];
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-3 flex-wrap" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
      <span className="text-[9.5px] font-bold uppercase tracking-widest shrink-0" style={{ color: "var(--muted)" }}>Ten tydzień</span>
      <div className="w-px h-3 shrink-0" style={{ background: "var(--border)" }} />
      {items.map(({ label, value, danger }) => (
        <div key={label} className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>{label}</span>
          <span className="text-[13px] font-bold tabular-nums" style={{ color: danger ? "#1C1917" : "inherit" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Health Score ──────────────────────────────────────────────────────────────
function computeHealth(metrics: FosMetrics, sprint: FosSprint | null) {
  const focus = sprint ? Math.round(sprint.completion_pct / 10) : 0;
  const execution = Math.round(metrics.accountabilityScore / 10);
  const communication = metrics.hasWeeklyReview ? 9 : 4;
  const consistency = Math.max(0, 10 - metrics.sprintGoalChanges * 3);
  const overall = ((focus + execution + communication + consistency) / 4);
  return { focus, execution, communication, consistency, overall: overall.toFixed(1) };
}

function HealthScore({ metrics, sprint }: { metrics: FosMetrics; sprint: FosSprint | null }) {
  const h = computeHealth(metrics, sprint);
  const overall = parseFloat(h.overall);
  const color = overall >= 7 ? "#FF4C00" : overall >= 5 ? "#FF8C42" : "#1C1917";
  const dims = [
    { label: "Focus", value: h.focus },
    { label: "Execution", value: h.execution },
    { label: "Communication", value: h.communication },
    { label: "Consistency", value: h.consistency },
  ];
  return (
    <div className="glass-card rounded-xl px-4 py-4 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Health Score</div>
        <div className="text-[28px] font-bold leading-none tabular-nums" style={{ color }}>{h.overall}</div>
      </div>
      <div className="space-y-1.5">
        {dims.map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[10px] w-24 shrink-0" style={{ color: "var(--muted)" }}>{label}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${value * 10}%`, background: value >= 7 ? "#FF4C00" : value >= 5 ? "#FF8C42" : "#1C1917" }} />
            </div>
            <span className="text-[10px] tabular-nums w-4 text-right" style={{ color: "var(--muted)" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sprint Card ───────────────────────────────────────────────────────────────
function SprintCard({ sprint }: { sprint: FosSprint | null }) {
  if (!sprint) return (
    <div className="glass-card rounded-xl px-4 py-4 h-full flex flex-col justify-between">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Sprint</div>
      <div className="text-[13px]" style={{ color: "var(--muted)" }}>Brak aktywnego sprintu</div>
      <Link href="/fos/sprints" className="mt-3 text-[12px] font-semibold hover:underline" style={{ color: "var(--accent)" }}>+ Utwórz sprint →</Link>
    </div>
  );
  const daysLeft = Math.max(0, Math.ceil((new Date(sprint.end_date).getTime() - Date.now()) / 86400000));
  return (
    <div className="glass-card rounded-xl px-4 py-4 h-full" style={{ borderLeft: "3px solid var(--accent)" }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--accent)" }}>{sprint.name}</div>
          <div className="text-[14px] font-semibold leading-snug line-clamp-2">{sprint.goal}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[26px] font-bold tabular-nums leading-none" style={{ color: "var(--accent)" }}>{sprint.completion_pct}%</div>
          <div className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>{daysLeft === 0 ? "Kończy się dziś" : `${daysLeft} dni`}</div>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "var(--border)" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${sprint.completion_pct}%`, background: "var(--accent)" }} />
      </div>
      <div className="flex justify-between text-[10px]" style={{ color: "var(--muted)" }}>
        <span>{sprint.start_date.slice(5).replace("-", ".")}</span>
        <Link href="/fos/sprints" className="hover:underline" style={{ color: "var(--accent)" }}>Edytuj</Link>
        <span>{sprint.end_date.slice(5).replace("-", ".")}</span>
      </div>
    </div>
  );
}

// ─── Company Goal Card ─────────────────────────────────────────────────────────
function CompanyGoalCard({
  priorities,
  onToggle,
  onDelete,
  onRename,
}: {
  priorities: FosWeeklyPriority[];
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}) {
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const editRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (editId) editRef.current?.focus(); }, [editId]);
  function startEdit(p: FosWeeklyPriority) { setEditId(p.id); setDraft(p.title); }
  function commitEdit(orig: FosWeeklyPriority) {
    const t = draft.trim();
    setEditId(null);
    if (t && t !== orig.title) onRename(orig.id, t);
  }
  const goals = priorities.filter((p) => p.is_company_goal);
  if (goals.length === 0) return null;
  // only tasks owned by this goal (tasks that share the week, not company goals)
  const tasks = priorities.filter((p) => !p.is_company_goal);
  const done = tasks.filter((p) => p.status === "completed").length;

  return (
    <div className="rounded-xl px-4 py-4 mb-3"
      style={{ background: "linear-gradient(135deg, rgba(255,76,0,0.08) 0%, rgba(255,255,255,0.97) 100%)", border: "2px solid rgba(255,76,0,0.25)" }}>
      <div className="flex gap-4">
        <CircleProgress done={done} total={tasks.length} size={60} />
        <div className="flex-1 min-w-0">
          <div className="text-[9.5px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Cel tygodnia</div>
          {goals.map((g) => (
            <div key={g.id} className="flex items-start gap-2 group mb-2">
              <button onClick={() => onToggle(g)} className="shrink-0 w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center transition-all"
                style={{ borderColor: g.status === "completed" ? "#FF4C00" : "rgba(255,76,0,0.4)", background: g.status === "completed" ? "#FF4C00" : "transparent" }}>
                {g.status === "completed" && <span className="text-white" style={{ fontSize: 8 }}>✓</span>}
              </button>
              {editId === g.id ? (
                <input ref={editRef} value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={() => commitEdit(g)}
                  onKeyDown={(e) => { if (e.key === "Enter") commitEdit(g); if (e.key === "Escape") setEditId(null); }}
                  className="text-[14px] font-semibold leading-snug flex-1 min-w-0 bg-transparent outline-none border-b"
                  style={{ borderColor: "var(--accent)", color: "var(--text)" }}
                />
              ) : (
                <span onClick={() => startEdit(g)} title="Kliknij, aby edytować cel"
                  className="text-[14px] font-semibold leading-snug flex-1 min-w-0 cursor-text hover:opacity-70 transition-opacity"
                  style={{ textDecoration: g.status === "completed" ? "line-through" : "none", opacity: g.status === "completed" ? 0.5 : 1 }}>
                  {g.title}
                </span>
              )}
              <button onClick={() => onDelete(g.id)} className="opacity-0 group-hover:opacity-100 shrink-0 text-[11px] transition-opacity mt-0.5"
                style={{ color: "rgba(255,76,0,0.5)" }} title="Usuń cel">✕</button>
            </div>
          ))}
          {tasks.length > 0 && (
            <div className="space-y-1 mt-1 pt-2" style={{ borderTop: "1px solid rgba(255,76,0,0.15)" }}>
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-2 group">
                  <button onClick={() => onToggle(t)}
                    className="shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center transition-all"
                    style={{ borderColor: t.status === "completed" ? "#FF4C00" : "rgba(0,0,0,0.2)", background: t.status === "completed" ? "#FF4C00" : "transparent" }}>
                    {t.status === "completed" && <span className="text-white" style={{ fontSize: 8 }}>✓</span>}
                  </button>
                  {editId === t.id ? (
                    <input ref={editRef} value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => commitEdit(t)}
                      onKeyDown={(e) => { if (e.key === "Enter") commitEdit(t); if (e.key === "Escape") setEditId(null); }}
                      className="text-[12px] flex-1 min-w-0 bg-transparent outline-none border-b"
                      style={{ borderColor: "var(--accent)", color: "var(--text)" }}
                    />
                  ) : (
                    <span onClick={() => startEdit(t)} title="Kliknij, aby edytować"
                      className={`text-[12px] flex-1 min-w-0 truncate cursor-text hover:opacity-70 transition-opacity ${t.status === "completed" ? "line-through opacity-40" : ""}`}>{t.title}</span>
                  )}
                  {t.owner_label && <span className="text-[10px]" style={{ color: "rgba(0,0,0,0.35)" }}>{t.owner_label}</span>}
                  <button onClick={() => onDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-[10px] transition-opacity shrink-0"
                    style={{ color: "rgba(255,76,0,0.4)" }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Task Section (ghost input) ────────────────────────────────────────────────
function TaskSection({
  label, tasks, owner, scope, onToggle, onDelete, onAdd, autoFocus,
}: {
  label: string; tasks: FosWeeklyPriority[]; owner: Owner; scope: "today" | "week";
  onToggle: (p: FosWeeklyPriority) => void; onDelete: (id: string) => void;
  onAdd: (owner: Owner, scope: "today" | "week", title: string) => void; autoFocus?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

  function submit() {
    if (draft.trim()) onAdd(owner, scope, draft.trim());
    setDraft("");
  }

  const pending = tasks.filter((t) => t.status !== "completed");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="mb-3">
      <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--muted)" }}>{label}</div>
      <div className="space-y-0.5">
        {pending.map((t) => (
          <div key={t.id} className="flex items-center gap-2 px-1.5 py-1 -mx-1.5 rounded-lg group hover:bg-[var(--ba-4)] transition-colors">
            <button onClick={() => onToggle(t)} className="shrink-0 w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all"
              style={{ borderColor: "var(--border)", background: "transparent" }} />
            <span className="text-[12px] flex-1 min-w-0 truncate">{t.title}</span>
            <button onClick={() => onDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-[10px] transition-opacity shrink-0" style={{ color: "var(--muted)" }}>✕</button>
          </div>
        ))}
        {completed.map((t) => (
          <div key={t.id} className="flex items-center gap-2 px-1.5 py-1 -mx-1.5 rounded-lg group hover:bg-[var(--ba-4)] transition-colors">
            <button onClick={() => onToggle(t)} className="shrink-0 w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all"
              style={{ borderColor: "#FF4C00", background: "#FF4C00" }}>
              <span className="text-white" style={{ fontSize: 8 }}>✓</span>
            </button>
            <span className="text-[12px] flex-1 min-w-0 truncate line-through opacity-40">{t.title}</span>
            <button onClick={() => onDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-[10px] transition-opacity shrink-0" style={{ color: "var(--muted)" }}>✕</button>
          </div>
        ))}
      </div>
      <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); if (e.key === "Escape") setDraft(""); }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder="+ Dodaj task..."
        className="mt-1 w-full text-[11.5px] px-2 py-1 rounded-lg outline-none transition-all"
        style={{ background: focused || draft ? "var(--ba-4)" : "transparent", border: focused || draft ? "1px solid var(--accent)" : "1px solid transparent", color: "var(--text)" }} />
    </div>
  );
}

// ─── Daily Notes ───────────────────────────────────────────────────────────────
function DailyNotes({ owner, today, initialContent, workspaceId }: { owner: Owner; today: string; initialContent: string; workspaceId?: string }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(val: string) {
    setContent(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSaving(true);
      await fetch("/api/fos/daily-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner_label: owner, date: today, content: val }),
      });
      setSaving(false);
    }, 800);
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Notatki dnia</div>
        {saving && <span className="text-[9px]" style={{ color: "var(--muted)" }}>zapisuję...</span>}
      </div>
      <textarea value={content} onChange={(e) => handleChange(e.target.value)}
        placeholder="Co obserwujesz? Jakie wnioski?"
        rows={3}
        className="w-full text-[12px] px-2.5 py-2 rounded-lg outline-none resize-none transition-all"
        style={{ background: "var(--ba-2)", border: "1px solid var(--border)", color: "var(--text)", lineHeight: "1.5" }} />
    </div>
  );
}

// ─── Person Panel ──────────────────────────────────────────────────────────────
function PersonPanel({ owner, tasks, today, onToggle, onDelete, onAdd, dailyNote, isFirst }: {
  owner: Owner; tasks: FosWeeklyPriority[]; today: string;
  onToggle: (p: FosWeeklyPriority) => void; onDelete: (id: string) => void;
  onAdd: (owner: Owner, scope: "today" | "week", title: string) => void;
  dailyNote: string; isFirst?: boolean;
}) {
  const todayTasks = tasks.filter((t) => t.deadline === today);
  const weekTasks = tasks.filter((t) => t.deadline !== today);
  const done = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="rounded-xl p-4" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-bold tracking-tight">{owner}</h2>
          <div className="text-[10px]" style={{ color: "var(--muted)" }}>{done}/{tasks.length} ukończone</div>
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: tasks.length === 0 ? "var(--ba-2)" : done === tasks.length && tasks.length > 0 ? "#FF4C0020" : "var(--accent-subtle)", color: tasks.length === 0 ? "var(--muted)" : done === tasks.length && tasks.length > 0 ? "#FF4C00" : "var(--accent)" }}>
          {tasks.length === 0 ? "0" : done === tasks.length ? "✓" : tasks.length - done}
        </div>
      </div>
      <TaskSection label="DZIŚ" tasks={todayTasks} owner={owner} scope="today" onToggle={onToggle} onDelete={onDelete} onAdd={onAdd} autoFocus={isFirst} />
      <TaskSection label="TEN TYDZIEŃ" tasks={weekTasks} owner={owner} scope="week" onToggle={onToggle} onDelete={onDelete} onAdd={onAdd} />
      <DailyNotes owner={owner} today={today} initialContent={dailyNote} />
    </div>
  );
}

// ─── Blockers Section ──────────────────────────────────────────────────────────
function BlockersSection({ priorities, onUnblock }: { priorities: FosWeeklyPriority[]; onUnblock: (p: FosWeeklyPriority) => void }) {
  const blockers = priorities.filter((p) => p.status === "blocked");
  if (blockers.length === 0) return null;
  const byOwner = OWNERS.map((o) => ({ owner: o, items: blockers.filter((p) => p.owner_label === o) })).filter((g) => g.items.length > 0);
  return (
    <div className="rounded-xl px-4 py-3 mb-3" style={{ background: "#1C191708", border: "1px solid #1C191730" }}>
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "#1C1917" }}>🚨 Blockers</div>
      <div className="space-y-2">
        {byOwner.map(({ owner, items }) => (
          <div key={owner}>
            <div className="text-[10px] font-semibold mb-1" style={{ color: "var(--muted)" }}>{owner}</div>
            {items.map((p) => (
              <div key={p.id} className="flex items-center gap-2 py-1">
                <span className="text-[12px] flex-1 min-w-0 truncate">{p.title}</span>
                <button onClick={() => onUnblock(p)} className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-lg transition-colors hover:opacity-80"
                  style={{ background: "#1C191715", color: "#1C1917", border: "1px solid #1C191730" }}>
                  Odblokuj
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Waiting For Section ───────────────────────────────────────────────────────
function WaitingForSection({ items, onResolve, onAdd }: {
  items: FosWaitingFor[];
  onResolve: (id: string) => void;
  onAdd: (from: Owner, forLabel: Owner, desc: string) => void;
}) {
  const [from, setFrom] = useState<Owner>("Kuba");
  const [forLabel, setForLabel] = useState<Owner>("Wojtek");
  const [desc, setDesc] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="rounded-xl px-4 py-3 mb-3 glass-card">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "var(--muted)" }}>⏳ Waiting For</div>
      {items.length === 0 && !focused && (
        <div className="text-[11px] italic mb-2" style={{ color: "var(--muted)" }}>Nikt na nic nie czeka</div>
      )}
      <div className="space-y-1.5 mb-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-[11px] font-semibold shrink-0" style={{ color: "var(--accent)" }}>{item.from_label}</span>
            <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>czeka na</span>
            <span className="text-[11px] font-semibold shrink-0">{item.for_label}</span>
            <span className="text-[11px] flex-1 min-w-0 truncate" style={{ color: "var(--muted)" }}>— {item.description}</span>
            <button onClick={() => onResolve(item.id)} className="shrink-0 text-[10px] px-1.5 py-0.5 rounded transition-colors hover:opacity-80"
              style={{ background: "#FF4C0015", color: "#FF4C00" }}>✓</button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <select value={from} onChange={(e) => setFrom(e.target.value as Owner)}
          className="text-[11px] px-2 py-1 rounded-lg outline-none" style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}>
          {OWNERS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>czeka na</span>
        <select value={forLabel} onChange={(e) => setForLabel(e.target.value as Owner)}
          className="text-[11px] px-2 py-1 rounded-lg outline-none" style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}>
          {OWNERS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <input value={desc} onChange={(e) => setDesc(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === "Enter" && desc.trim()) { onAdd(from, forLabel, desc.trim()); setDesc(""); } }}
          placeholder="Opis... (Enter aby dodać)"
          className="flex-1 min-w-[140px] text-[11px] px-2 py-1 rounded-lg outline-none transition-all"
          style={{ background: "var(--ba-4)", border: focused ? "1px solid var(--accent)" : "1px solid var(--border)", color: "var(--text)" }} />
      </div>
    </div>
  );
}

// ─── Decisions Log ─────────────────────────────────────────────────────────────
function DecisionsLog({ decisions, onAdd, onDelete }: {
  decisions: FosDecision[];
  onAdd: (title: string) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? decisions : decisions.slice(0, 5);

  return (
    <div className="rounded-xl px-4 py-3 mb-3 glass-card">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "var(--muted)" }}>📜 Decisions Log</div>
      <div className="space-y-1.5 mb-2">
        {visible.map((d) => (
          <div key={d.id} className="flex items-start gap-2 group py-0.5">
            <span className="text-[10px] tabular-nums shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>{formatDate(d.decided_at)}</span>
            {d.author_label && <span className="text-[10px] shrink-0 font-semibold mt-0.5" style={{ color: "var(--accent)" }}>{d.author_label}</span>}
            <span className="text-[12px] flex-1 min-w-0">{d.title}</span>
            <button onClick={() => onDelete(d.id)} className="opacity-0 group-hover:opacity-100 shrink-0 text-[10px] transition-opacity" style={{ color: "var(--muted)" }}>✕</button>
          </div>
        ))}
        {decisions.length === 0 && <div className="text-[11px] italic" style={{ color: "var(--muted)" }}>Brak zapisanych decyzji</div>}
      </div>
      {decisions.length > 5 && (
        <button onClick={() => setExpanded(!expanded)} className="text-[10px] mb-2 hover:underline" style={{ color: "var(--accent)" }}>
          {expanded ? "Zwiń" : `Pokaż wszystkie (${decisions.length})`}
        </button>
      )}
      <input value={draft} onChange={(e) => setDraft(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { onAdd(draft.trim()); setDraft(""); } if (e.key === "Escape") setDraft(""); }}
        placeholder="+ Nowa decyzja... (Enter aby zapisać)"
        className="w-full text-[12px] px-2.5 py-1.5 rounded-lg outline-none transition-all"
        style={{ background: focused || draft ? "var(--ba-4)" : "transparent", border: focused || draft ? "1px solid var(--accent)" : "1px solid transparent", color: "var(--text)" }} />
    </div>
  );
}

// ─── Idea Backlog ──────────────────────────────────────────────────────────────
function IdeaBacklog({ ideas, onAdd, onDelete }: {
  ideas: FosIdea[];
  onAdd: (title: string) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="rounded-xl px-4 py-3 mb-3 glass-card">
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>💡 Idea Backlog</div>
        <Link href="/fos/ideas" className="text-[10px] hover:underline" style={{ color: "var(--accent)" }}>Wszystkie →</Link>
      </div>
      <div className="space-y-1 mb-2">
        {ideas.slice(0, 8).map((idea) => (
          <div key={idea.id} className="flex items-center gap-2 group py-0.5">
            <span className="text-[11px] flex-1 min-w-0 truncate">{idea.title}</span>
            <button onClick={() => onDelete(idea.id)} className="opacity-0 group-hover:opacity-100 shrink-0 text-[10px] transition-opacity" style={{ color: "var(--muted)" }}>✕</button>
          </div>
        ))}
        {ideas.length === 0 && <div className="text-[11px] italic" style={{ color: "var(--muted)" }}>Backlog jest pusty</div>}
      </div>
      <input value={draft} onChange={(e) => setDraft(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { onAdd(draft.trim()); setDraft(""); } if (e.key === "Escape") setDraft(""); }}
        placeholder="+ Dodaj pomysł... (Enter)"
        className="w-full text-[12px] px-2.5 py-1.5 rounded-lg outline-none transition-all"
        style={{ background: focused || draft ? "var(--ba-4)" : "transparent", border: focused || draft ? "1px solid var(--accent)" : "1px solid transparent", color: "var(--text)" }} />
    </div>
  );
}

// ─── Activity Feed ─────────────────────────────────────────────────────────────
const ACTIVITY_ICONS: Record<string, string> = {
  priority_completed: "✓",
  idea_added: "💡",
  review_submitted: "📋",
  lead_added: "👤",
  sprint_started: "🚀",
};

function ActivityFeed({ items }: { items: FosActivityItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl px-4 py-3 glass-card">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "var(--muted)" }}>📈 Aktywność</div>
      <div className="space-y-1.5">
        {items.slice(0, 15).map((item) => (
          <div key={item.id} className="flex items-start gap-2.5">
            <span className="text-[12px] shrink-0 mt-0.5">{ACTIVITY_ICONS[item.type] ?? "·"}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[12px]">{item.label}</span>
              {item.actor && <span className="text-[10px] ml-1.5" style={{ color: "var(--muted)" }}>{item.actor}</span>}
            </div>
            <span className="text-[10px] tabular-nums shrink-0" style={{ color: "var(--muted)" }}>
              {new Date(item.created_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function FosCommandCenter() {
  const router = useRouter();
  const [sprint, setSprint] = useState<FosSprint | null>(null);
  const [priorities, setPriorities] = useState<FosWeeklyPriority[]>([]);
  const [metrics, setMetrics] = useState<FosMetrics | null>(null);
  const [ideas, setIdeas] = useState<FosIdea[]>([]);
  const [activity, setActivity] = useState<FosActivityItem[]>([]);
  const [decisions, setDecisions] = useState<FosDecision[]>([]);
  const [waiting, setWaiting] = useState<FosWaitingFor[]>([]);
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const weekStart = getWeekStart();
  const today = getTodayStr();

  // Midnight auto-refresh
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(now.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const t = setTimeout(() => router.refresh(), midnight.getTime() - now.getTime());
    return () => clearTimeout(t);
  }, [router]);

  const load = useCallback(async () => {
    setLoading(true);
    const [sprintRes, priRes, metricsRes, ideasRes, activityRes, decisionsRes, waitingRes, notesRes] =
      await Promise.all([
        fetch("/api/fos/sprints").then((r) => r.json()),
        fetch(`/api/fos/priorities?week=${weekStart}`).then((r) => r.json()),
        fetch("/api/fos/metrics").then((r) => r.json()),
        fetch("/api/fos/ideas?status=backlog").then((r) => r.json()),
        fetch("/api/fos/activity").then((r) => r.json()),
        fetch("/api/fos/decisions").then((r) => r.json()),
        fetch("/api/fos/waiting").then((r) => r.json()),
        fetch(`/api/fos/daily-notes?date=${today}`).then((r) => r.json()),
      ]);
    const active = (sprintRes.data ?? []).find((s: FosSprint) => s.status === "active") ?? null;
    setSprint(active);
    setPriorities(priRes.data ?? []);
    setMetrics(metricsRes);
    setIdeas(ideasRes.data ?? []);
    setActivity(activityRes.data ?? []);
    setDecisions(decisionsRes.data ?? []);
    setWaiting(waitingRes.data ?? []);
    const notes: Record<string, string> = {};
    for (const n of notesRes.data ?? []) notes[n.owner_label] = n.content ?? "";
    setDailyNotes(notes);
    setLoading(false);
  }, [weekStart, today]);

  useEffect(() => { load(); }, [load]);

  // ── Task actions ─────────────────────────────────────────────────────────────
  const toggleStatus = useCallback(async (p: FosWeeklyPriority) => {
    const next: FosPriorityStatus = p.status === "completed" ? "not_started" : "completed";
    setPriorities((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
    await patchPriority(p.id, { status: next });
  }, []);

  const unblock = useCallback(async (p: FosWeeklyPriority) => {
    setPriorities((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: "in_progress" } : x)));
    await patchPriority(p.id, { status: "in_progress" });
  }, []);

  const addTask = useCallback(async (owner: Owner, scope: "today" | "week", title: string) => {
    const deadline = scope === "today" ? today : undefined;
    const tempId = `tmp-${Date.now()}`;
    const optimistic: FosWeeklyPriority = {
      id: tempId, workspace_id: "", sprint_id: sprint?.id ?? null, week_start: weekStart,
      title, description: null, owner_id: null, owner_label: owner, deadline: deadline ?? null,
      status: "not_started", is_company_goal: false, completed_at: null,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    setPriorities((prev) => [...prev, optimistic]);
    const res = await fetch("/api/fos/priorities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, week_start: weekStart, owner_label: owner, deadline, sprint_id: sprint?.id ?? null }),
    });
    const data = await res.json();
    if (data.data) setPriorities((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
  }, [sprint, today, weekStart]);

  const deleteTask = useCallback(async (id: string) => {
    setPriorities((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/priorities/${id}`, { method: "DELETE" });
  }, []);

  const renameTask = useCallback(async (id: string, title: string) => {
    setPriorities((prev) => prev.map((x) => (x.id === id ? { ...x, title } : x)));
    await patchPriority(id, { title });
  }, []);

  // ── Decisions actions ────────────────────────────────────────────────────────
  const addDecision = useCallback(async (title: string) => {
    const tempId = `tmp-${Date.now()}`;
    const optimistic: FosDecision = { id: tempId, workspace_id: "", author_label: null, title, description: null, decided_at: today, created_at: new Date().toISOString() };
    setDecisions((prev) => [optimistic, ...prev]);
    const res = await fetch("/api/fos/decisions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, decided_at: today }),
    });
    const data = await res.json();
    if (data.data) setDecisions((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
  }, [today]);

  const deleteDecision = useCallback(async (id: string) => {
    setDecisions((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/decisions/${id}`, { method: "DELETE" });
  }, []);

  // ── Waiting For actions ──────────────────────────────────────────────────────
  const addWaiting = useCallback(async (from: Owner, forLabel: Owner, desc: string) => {
    const tempId = `tmp-${Date.now()}`;
    const optimistic: FosWaitingFor = { id: tempId, workspace_id: "", from_label: from, for_label: forLabel, description: desc, resolved: false, created_at: new Date().toISOString() };
    setWaiting((prev) => [optimistic, ...prev]);
    const res = await fetch("/api/fos/waiting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from_label: from, for_label: forLabel, description: desc }),
    });
    const data = await res.json();
    if (data.data) setWaiting((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
  }, []);

  const resolveWaiting = useCallback(async (id: string) => {
    setWaiting((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/waiting/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: true }),
    });
  }, []);

  // ── Ideas actions ────────────────────────────────────────────────────────────
  const addIdea = useCallback(async (title: string) => {
    const tempId = `tmp-${Date.now()}`;
    const optimistic: FosIdea = { id: tempId, workspace_id: "", author_id: null, author_label: null, title, description: null, status: "backlog", created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    setIdeas((prev) => [optimistic, ...prev]);
    const res = await fetch("/api/fos/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (data.data) setIdeas((prev) => prev.map((x) => (x.id === tempId ? data.data : x)));
  }, []);

  const deleteIdea = useCallback(async (id: string) => {
    setIdeas((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/fos/ideas/${id}`, { method: "DELETE" });
  }, []);

  if (loading) return (
    <div className="px-4 py-5 sm:px-7 sm:py-6 max-w-5xl mx-auto space-y-3">
      {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "var(--ba-2)" }} />)}
    </div>
  );

  return (
    <div className="px-4 py-5 sm:px-7 sm:py-6 max-w-5xl mx-auto">

      {/* Weekly Scoreboard */}
      <WeeklyScoreboard metrics={metrics} />

      {/* Sprint + Health Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <SprintCard sprint={sprint} />
        {metrics ? <HealthScore metrics={metrics} sprint={sprint} /> : <div className="h-32 rounded-xl animate-pulse" style={{ background: "var(--ba-2)" }} />}
      </div>

      {/* Company Goal with steps */}
      <CompanyGoalCard priorities={priorities} onToggle={toggleStatus} onDelete={deleteTask} onRename={renameTask} />

      {/* Two-person columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {OWNERS.map((owner, i) => (
          <PersonPanel
            key={owner}
            owner={owner}
            tasks={priorities.filter((p) => p.owner_label === owner && !p.is_company_goal)}
            today={today}
            onToggle={toggleStatus}
            onDelete={deleteTask}
            onAdd={addTask}
            dailyNote={dailyNotes[owner] ?? ""}
            isFirst={i === 0}
          />
        ))}
      </div>

      {/* Unassigned tasks */}
      {(() => {
        const unassigned = priorities.filter((p) => !p.is_company_goal && !OWNERS.includes(p.owner_label as Owner));
        if (unassigned.length === 0) return null;
        return (
          <div className="rounded-xl px-4 py-3 mb-3" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
            <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Bez właściciela</div>
            <div className="space-y-0.5">
              {unassigned.map((t) => (
                <div key={t.id} className="flex items-center gap-2 px-1.5 py-1 -mx-1.5 rounded-lg group hover:bg-[var(--ba-4)] transition-colors">
                  <button onClick={() => toggleStatus(t)} className="shrink-0 w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all"
                    style={{ borderColor: t.status === "completed" ? "#22c55e" : "var(--border)", background: t.status === "completed" ? "#22c55e" : "transparent" }}>
                    {t.status === "completed" && <span className="text-white" style={{ fontSize: 8 }}>✓</span>}
                  </button>
                  <span className={`text-[12px] flex-1 min-w-0 truncate ${t.status === "completed" ? "line-through opacity-40" : ""}`}>{t.title}</span>
                  {t.owner_label && <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>{t.owner_label}</span>}
                  <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-[10px] transition-opacity shrink-0" style={{ color: "var(--muted)" }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Blockers */}
      <BlockersSection priorities={priorities} onUnblock={unblock} />

      {/* Waiting For */}
      <WaitingForSection items={waiting} onResolve={resolveWaiting} onAdd={addWaiting} />

      {/* Decisions Log */}
      <DecisionsLog decisions={decisions} onAdd={addDecision} onDelete={deleteDecision} />

      {/* Idea Backlog */}
      <IdeaBacklog ideas={ideas} onAdd={addIdea} onDelete={deleteIdea} />

      {/* Activity Feed */}
      <ActivityFeed items={activity} />

    </div>
  );
}
