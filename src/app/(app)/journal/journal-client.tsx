"use client";

import { useState } from "react";
import Link from "next/link";

type NoteEntry = { id: string; content: string; created_at: string };
type TodoEntry = { id: string; text: string; completed: boolean; waiting: boolean; completed_at: string | null };
type DayEntry = { date: string; notes: NoteEntry[]; todos: TodoEntry[] };

const TODAY = new Date().toISOString().split("T")[0];

function formatDateHeading(date: string) {
  if (date === TODAY) return "Dzisiaj";
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (date === yesterday) return "Wczoraj";
  return new Date(date + "T12:00:00").toLocaleDateString("pl-PL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatDateSub(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}

// Mini horizontal stacked bar: done (green) / waiting (yellow) / todo (gray)
function DayBreakdownBar({ todos }: { todos: TodoEntry[] }) {
  const total = todos.length;
  if (total === 0) return null;
  const done = todos.filter((t) => t.completed).length;
  const waiting = todos.filter((t) => t.waiting).length;
  const todo = total - done - waiting;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden gap-px mt-2" style={{ background: "var(--ba-4)" }}>
      {done > 0 && <div style={{ flex: done, background: "#22c55e" }} />}
      {waiting > 0 && <div style={{ flex: waiting, background: "#eab308" }} />}
      {todo > 0 && <div style={{ flex: todo, background: "var(--ba-4)" }} />}
    </div>
  );
}

export function JournalClient({ initialDays }: { initialDays: DayEntry[] }) {
  const [days] = useState<DayEntry[]>(initialDays);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>();
    initialDays.slice(0, 3).forEach((d) => s.add(d.date));
    return s;
  });

  function toggle(date: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });
  }

  if (days.length === 0) {
    return (
      <div className="rounded-xl px-6 py-10 text-center" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
        <div className="text-[14px] font-medium mb-2">Brak wpisów</div>
        <p className="text-[13px]" style={{ color: "var(--muted)" }}>
          Zacznij dziś — wróć na <Link href="/" style={{ color: "var(--accent-2)" }}>dashboard →</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const isOpen = expanded.has(day.date);
        const todos = day.todos ?? [];
        const notes = day.notes ?? [];
        const done = todos.filter((t) => t.completed).length;
        const waiting = todos.filter((t) => t.waiting).length;
        const total = todos.length;
        const isToday = day.date === TODAY;
        const allDone = total > 0 && done === total;
        const pct = total > 0 ? Math.round((done / total) * 100) : null;

        return (
          <div
            key={day.date}
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--panel-solid)", border: `1px solid ${isToday ? "var(--accent)" : "var(--border)"}` }}
          >
            {/* Header — always visible summary */}
            <button className="w-full text-left" onClick={() => toggle(day.date)}>
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    {isToday && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                    <div>
                      <span className="text-[13.5px] font-semibold capitalize">{formatDateHeading(day.date)}</span>
                      {!isToday && (
                        <span className="text-[11.5px] ml-2" style={{ color: "var(--muted)" }}>{formatDateSub(day.date)}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[12px]" style={{ color: "var(--muted)", display: "inline-block", transition: "transform 0.15s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                </div>

                {/* Summary row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {total > 0 && (
                    <span className="text-[12px]" style={{ color: allDone ? "#22c55e" : "var(--muted)" }}>
                      {allDone ? "✓" : `${done}/${total}`} zadań
                      {waiting > 0 && <span style={{ color: "#eab308" }}> · ⏳ {waiting} oczekuje</span>}
                    </span>
                  )}
                  {notes.length > 0 && (
                    <span className="text-[12px]" style={{ color: "var(--muted)" }}>
                      {notes.length === 1 ? "1 notatka" : `${notes.length} notatki`}
                    </span>
                  )}
                  {pct !== null && !allDone && (
                    <span className="text-[12px] font-medium" style={{ color: pct >= 80 ? "#22c55e" : "var(--muted)" }}>
                      {pct}%
                    </span>
                  )}
                </div>

                {/* Breakdown bar */}
                <DayBreakdownBar todos={todos} />
              </div>
            </button>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--border)" }}>

                {/* Notes as "przemyślenia" */}
                {notes.length > 0 && (
                  <div className="px-5 py-4" style={{ borderBottom: total > 0 ? "1px solid var(--border)" : undefined }}>
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Przemyślenia
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {notes.map((n) => (
                        <div key={n.id} className="flex gap-3">
                          <div className="w-px shrink-0 rounded-full mt-0.5" style={{ background: "var(--border)", minHeight: "100%" }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>{n.content}</p>
                            <div className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>{formatTime(n.created_at)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Todos */}
                {total > 0 && (
                  <div className="px-5 py-4">
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Zadania
                    </div>
                    <div className="flex flex-col gap-2">
                      {[...todos]
                        .sort((a, b) => {
                          const o = { todo: 0, waiting: 1, done: 2 } as Record<string, number>;
                          const sa = a.completed ? "done" : a.waiting ? "waiting" : "todo";
                          const sb = b.completed ? "done" : b.waiting ? "waiting" : "todo";
                          return o[sa] - o[sb];
                        })
                        .map((t) => {
                          const state = t.completed ? "done" : t.waiting ? "waiting" : "todo";
                          return (
                            <div key={t.id} className="flex items-center gap-3">
                              {/* State icon (read-only in history) */}
                              <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center" style={{
                                border: `1.5px solid ${state === "done" ? "var(--accent)" : state === "waiting" ? "#eab308" : "var(--border)"}`,
                                background: state === "done" ? "var(--accent)" : state === "waiting" ? "rgba(234,179,8,0.12)" : "transparent",
                              }}>
                                {state === "done" && (
                                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                )}
                                {state === "waiting" && (
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <circle cx="4" cy="4" r="3" stroke="#eab308" strokeWidth="1.2" />
                                    <path d="M4 2.5V4l1 1" stroke="#eab308" strokeWidth="1.1" strokeLinecap="round" />
                                  </svg>
                                )}
                              </div>
                              <span className="flex-1 text-[13px]" style={{
                                color: state === "done" ? "var(--muted)" : state === "waiting" ? "#eab308" : "var(--text)",
                                textDecoration: state === "done" ? "line-through" : "none",
                              }}>
                                {t.text}
                              </span>
                              {state === "done" && t.completed_at && (
                                <span className="text-[11px] shrink-0" style={{ color: "var(--muted)" }}>{formatTime(t.completed_at)}</span>
                              )}
                              {state === "waiting" && (
                                <span className="text-[11px] shrink-0" style={{ color: "#eab308" }}>oczekuje</span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {isToday && (
                  <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--ba-2)" }}>
                    <Link href="/" className="text-[12px] font-medium" style={{ color: "var(--accent-2)" }}>Edytuj na dashboardzie →</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
