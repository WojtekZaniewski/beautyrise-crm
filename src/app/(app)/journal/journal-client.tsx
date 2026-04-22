"use client";

import { useState } from "react";
import Link from "next/link";

type NoteEntry = { id: string; content: string; confirmed: boolean; confirmed_at: string | null; created_at: string };
type TodoEntry = { id: string; text: string; completed: boolean; completed_at: string | null };
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

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
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
      <div
        className="rounded-xl px-6 py-10 text-center"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
      >
        <div className="text-[14px] font-medium mb-2">Brak wpisów</div>
        <p className="text-[13px]" style={{ color: "var(--muted)" }}>
          Zacznij dziś — wróć na{" "}
          <Link href="/" style={{ color: "var(--accent-2)" }}>dashboard →</Link>
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
        const total = todos.length;
        const confirmedNotes = notes.filter((n) => n.confirmed).length;
        const isToday = day.date === TODAY;
        const allDone = total > 0 && done === total;

        return (
          <div
            key={day.date}
            className="rounded-xl overflow-hidden"
            style={{
              background: "var(--panel-solid)",
              border: `1px solid ${isToday ? "var(--accent)" : "var(--border)"}`,
            }}
          >
            {/* Header */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => toggle(day.date)}
            >
              <div className="flex items-center gap-3">
                {isToday && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                <div>
                  <div className="text-[13.5px] font-semibold capitalize">{formatDateHeading(day.date)}</div>
                  {!isToday && (
                    <div className="text-[11.5px]" style={{ color: "var(--muted)" }}>
                      {new Date(day.date + "T12:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {notes.length > 0 && (
                  <span
                    className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: confirmedNotes === notes.length ? "rgba(34,197,94,0.1)" : "var(--ba-4)",
                      color: confirmedNotes === notes.length ? "#22c55e" : "var(--muted)",
                    }}
                  >
                    {confirmedNotes === notes.length && notes.length > 0 && (
                      <svg width="8" height="6" viewBox="0 0 9 7" fill="none" className="shrink-0">
                        <path d="M1 3.5L3.5 6L8 1" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {notes.length === 1 ? "1 notatka" : `${notes.length} notatki`}
                  </span>
                )}
                {total > 0 && (
                  <span
                    className="text-[10.5px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: allDone ? "rgba(34,197,94,0.1)" : "var(--ba-4)",
                      color: allDone ? "#22c55e" : "var(--muted)",
                    }}
                  >
                    {done}/{total} zadań
                  </span>
                )}
                <span
                  className="text-[12px] ml-1"
                  style={{ color: "var(--muted)", display: "inline-block", transition: "transform 0.15s", transform: isOpen ? "rotate(180deg)" : "none" }}
                >
                  ▾
                </span>
              </div>
            </button>

            {/* Expanded */}
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {/* Notes */}
                {notes.length > 0 && (
                  <div
                    className="px-5 py-4"
                    style={{ borderBottom: total > 0 ? "1px solid var(--border)" : undefined }}
                  >
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Notatki
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {notes.map((n) => (
                        <div
                          key={n.id}
                          className="rounded-lg px-3 py-2.5"
                          style={{
                            background: n.confirmed ? "rgba(34,197,94,0.06)" : "var(--ba-4)",
                            border: `1px solid ${n.confirmed ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center"
                              style={{
                                border: `1.5px solid ${n.confirmed ? "#22c55e" : "var(--border)"}`,
                                background: n.confirmed ? "#22c55e" : "transparent",
                              }}
                            >
                              {n.confirmed && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>
                                {n.content}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                                  {formatTime(n.created_at)}
                                </span>
                                {n.confirmed && n.confirmed_at && (
                                  <span className="text-[11px]" style={{ color: "#22c55e" }}>
                                    · zatwierdzona {formatTime(n.confirmed_at)}
                                  </span>
                                )}
                              </div>
                            </div>
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
                        .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
                        .map((t) => (
                          <div key={t.id} className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                              style={{
                                border: `1.5px solid ${t.completed ? "var(--accent)" : "var(--border)"}`,
                                background: t.completed ? "var(--accent)" : "transparent",
                              }}
                            >
                              {t.completed && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span
                              className="flex-1 text-[13px]"
                              style={{ color: t.completed ? "var(--muted)" : "var(--text)", textDecoration: t.completed ? "line-through" : "none" }}
                            >
                              {t.text}
                            </span>
                            {t.completed && t.completed_at && (
                              <span className="text-[11px] shrink-0" style={{ color: "var(--muted)" }}>
                                {formatTime(t.completed_at)}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                    {total > 1 && (
                      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "var(--ba-4)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(done / total) * 100}%`, background: allDone ? "#22c55e" : "var(--accent)", transition: "width 0.3s" }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {isToday && (
                  <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--ba-2)" }}>
                    <Link href="/" className="text-[12px] font-medium" style={{ color: "var(--accent-2)" }}>
                      Dodaj na dashboardzie →
                    </Link>
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
