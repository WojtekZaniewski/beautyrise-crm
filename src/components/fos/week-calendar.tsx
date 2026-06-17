"use client";

import { useState } from "react";
import type { FosWeeklyPriority } from "@/lib/fos-types";

type Owner = string;
const WEEKDAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}
function dayNum(dateStr: string) {
  return Number(dateStr.split("-")[2]);
}

// ─── Single day column ─────────────────────────────────────────────────────────
function DayColumn({ date, weekday, today, tasks, onToggle, onDelete, onAdd }: {
  date: string; weekday: string; today: string;
  tasks: FosWeeklyPriority[];
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const isToday = date === today;
  const isPast = date < today;

  return (
    <div
      className="rounded-lg p-2 flex flex-col min-h-[120px]"
      style={{
        background: isToday ? "var(--accent-subtle)" : "var(--ba-2)",
        border: isToday ? "1px solid var(--accent)" : "1px solid transparent",
      }}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase" style={{ color: isToday ? "var(--accent-2)" : "var(--muted)" }}>{weekday}</span>
        <span className="text-[12px] font-bold tabular-nums" style={{ color: isToday ? "var(--accent-2)" : "var(--text)" }}>{dayNum(date)}</span>
      </div>

      <div className="space-y-1 flex-1">
        {tasks.map((t) => {
          const done = t.status === "completed";
          const overdue = !done && isPast;
          return (
            <div key={t.id} className="flex items-start gap-1.5 group">
              <button
                onClick={() => onToggle(t)}
                className="shrink-0 w-3 h-3 mt-0.5 rounded border flex items-center justify-center transition-all"
                style={{ borderColor: done ? "#22c55e" : overdue ? "#ef4444" : "var(--border)", background: done ? "#22c55e" : "transparent" }}
              >
                {done && <span className="text-white" style={{ fontSize: 7 }}>✓</span>}
              </button>
              <span
                className="text-[10.5px] leading-tight flex-1 min-w-0 break-words"
                style={{
                  color: done ? "var(--muted)" : overdue ? "#ef4444" : "var(--text)",
                  textDecoration: done ? "line-through" : "none",
                  fontWeight: overdue ? 600 : 400,
                }}
                title={t.owner_label ? `${t.title} — ${t.owner_label}` : t.title}
              >
                {t.title}
              </span>
              <button onClick={() => onDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-[9px] shrink-0 transition-opacity" style={{ color: "var(--muted)" }}>✕</button>
            </div>
          );
        })}
      </div>

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && draft.trim()) { onAdd(draft.trim()); setDraft(""); }
          if (e.key === "Escape") setDraft("");
        }}
        placeholder="+ task"
        className="mt-1.5 w-full text-[10.5px] px-1.5 py-1 rounded outline-none transition-all"
        style={{ background: draft ? "var(--ba-4)" : "transparent", border: draft ? "1px solid var(--accent)" : "1px solid var(--border)", color: "var(--text)" }}
      />
    </div>
  );
}

// ─── Week calendar ─────────────────────────────────────────────────────────────
export function WeekCalendar({
  priorities, today, weekStart, onToggle, onDelete, onAdd, onSetDeadline,
}: {
  priorities: FosWeeklyPriority[];
  today: string;
  weekStart: string;
  onToggle: (p: FosWeeklyPriority) => void;
  onDelete: (id: string) => void;
  onAdd: (owner: Owner | "", scope: "today" | "week", title: string, deadline?: string) => void;
  onSetDeadline: (id: string, date: string | null) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const tasks = priorities.filter((p) => !p.is_company_goal && p.kind !== "priority");
  const unscheduled = tasks.filter((p) => !p.deadline);

  return (
    <div className="glass-card rounded-xl px-4 py-4 mb-3">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>🗓️ Plan tygodnia</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
        {days.map((date, i) => (
          <DayColumn
            key={date}
            date={date}
            weekday={WEEKDAYS[i]}
            today={today}
            tasks={tasks.filter((t) => t.deadline === date)}
            onToggle={onToggle}
            onDelete={onDelete}
            onAdd={(title) => onAdd("", "week", title, date)}
          />
        ))}
      </div>

      {unscheduled.length > 0 && (
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="text-[9px] uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Bez dnia — przypisz do dnia</div>
          <div className="space-y-1">
            {unscheduled.map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <span className={`text-[12px] flex-1 min-w-0 truncate ${t.status === "completed" ? "line-through opacity-40" : ""}`}>{t.title}</span>
                {t.owner_label && <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>{t.owner_label}</span>}
                <input
                  type="date"
                  value=""
                  min={weekStart}
                  max={days[6]}
                  onChange={(e) => e.target.value && onSetDeadline(t.id, e.target.value)}
                  title="Przypisz deadline"
                  className="text-[10px] px-1.5 py-0.5 rounded-lg outline-none shrink-0"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
