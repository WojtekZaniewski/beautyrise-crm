"use client";

import { useState } from "react";
import Link from "next/link";

type TodoEntry = { id: string; date: string; text: string; completed: boolean; completed_at: string | null };
type DayEntry = { date: string; content: string; todos: TodoEntry[] | null };

const TODAY = new Date().toISOString().split("T")[0];

function formatDateLabel(date: string) {
  const d = new Date(date + "T12:00:00");
  if (date === TODAY) return "Dzisiaj";
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (date === yesterday) return "Wczoraj";
  return d.toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatDateSub(date: string) {
  const d = new Date(date + "T12:00:00");
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}

export function JournalClient({ initialDays }: { initialDays: DayEntry[] }) {
  const [days] = useState<DayEntry[]>(initialDays);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>();
    // auto-expand first 3 days
    initialDays.slice(0, 3).forEach((d) => s.add(d.date));
    return s;
  });

  function toggle(date: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
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
          Zacznij dziś — dodaj notatkę lub zadanie na{" "}
          <Link href="/" style={{ color: "var(--accent-2)" }}>
            dashboardzie →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const isOpen = expanded.has(day.date);
        const todos = day.todos ?? [];
        const done = todos.filter((t) => t.completed).length;
        const total = todos.length;
        const hasNote = day.content.trim().length > 0;
        const isToday = day.date === TODAY;

        return (
          <div
            key={day.date}
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--panel-solid)", border: `1px solid ${isToday ? "var(--accent)" : "var(--border)"}` }}
          >
            {/* Day header */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => toggle(day.date)}
            >
              <div className="flex items-center gap-3">
                {isToday && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                )}
                <div>
                  <div className="text-[13.5px] font-semibold capitalize">
                    {formatDateLabel(day.date)}
                  </div>
                  {!isToday && (
                    <div className="text-[11.5px] capitalize" style={{ color: "var(--muted)" }}>
                      {formatDateSub(day.date)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Badges */}
                <div className="flex items-center gap-1.5">
                  {hasNote && (
                    <span
                      className="text-[10.5px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--ba-4)", color: "var(--muted)" }}
                    >
                      notatka
                    </span>
                  )}
                  {total > 0 && (
                    <span
                      className="text-[10.5px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: done === total && total > 0 ? "rgba(34,197,94,0.12)" : "var(--ba-4)",
                        color: done === total && total > 0 ? "#22c55e" : "var(--muted)",
                      }}
                    >
                      {done}/{total} zadań
                    </span>
                  )}
                </div>
                <span
                  className="text-[12px] transition-transform duration-150"
                  style={{ color: "var(--muted)", transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block" }}
                >
                  ▾
                </span>
              </div>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {hasNote && (
                  <div
                    className="px-5 py-4"
                    style={{ borderBottom: total > 0 ? "1px solid var(--border)" : undefined }}
                  >
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-2" style={{ color: "var(--muted)" }}>
                      Notatka
                    </div>
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>
                      {day.content}
                    </p>
                  </div>
                )}

                {total > 0 && (
                  <div className="px-5 py-4">
                    <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Zadania
                    </div>
                    <div className="flex flex-col gap-2">
                      {todos.map((t) => (
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
                            className="text-[13px]"
                            style={{
                              color: t.completed ? "var(--muted)" : "var(--text)",
                              textDecoration: t.completed ? "line-through" : "none",
                            }}
                          >
                            {t.text}
                          </span>
                          {t.completed && t.completed_at && (
                            <span className="ml-auto text-[11px]" style={{ color: "var(--muted)" }}>
                              {new Date(t.completed_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isToday && (
                  <div
                    className="px-5 py-3"
                    style={{ borderTop: "1px solid var(--border)", background: "var(--ba-2)" }}
                  >
                    <Link
                      href="/"
                      className="text-[12px] font-medium"
                      style={{ color: "var(--accent-2)" }}
                    >
                      Edytuj na dashboardzie →
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
