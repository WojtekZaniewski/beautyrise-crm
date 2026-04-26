"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JournalCalendar } from "./journal-calendar";

type TodoState = "todo" | "waiting" | "done";
type NoteEntry = { id: string; content: string; created_at: string };
type TodoEntry = { id: string; text: string; completed: boolean; waiting: boolean; completed_at: string | null };
type DayEntry = { date: string; notes: NoteEntry[]; todos: TodoEntry[] };

const TODAY = new Date().toISOString().split("T")[0];

function getTodoState(t: TodoEntry): TodoState {
  if (t.completed) return "done";
  if (t.waiting) return "waiting";
  return "todo";
}
function nextState(s: TodoState): TodoState {
  if (s === "todo") return "waiting";
  if (s === "waiting") return "done";
  return "todo";
}

function TodoCheck({ state }: { state: TodoState }) {
  if (state === "done") return (
    <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center" style={{ background: "var(--accent)", border: "1.5px solid var(--accent)" }}>
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
  if (state === "waiting") return (
    <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)", border: "1.5px solid #eab308" }}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="3" stroke="#eab308" strokeWidth="1.2" />
        <path d="M4 2.5V4l1 1" stroke="#eab308" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  );
  return <div className="w-4 h-4 rounded shrink-0" style={{ border: "1.5px solid var(--border)" }} />;
}

function formatDateHeading(date: string) {
  if (date === TODAY) return "Dzisiaj";
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (date === yesterday) return "Wczoraj";
  return new Date(date + "T12:00:00").toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function formatDateSub(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}

function DayBreakdownBar({ todos }: { todos: TodoEntry[] }) {
  const total = todos.length;
  if (total === 0) return null;
  const done = todos.filter(t => t.completed).length;
  const waiting = todos.filter(t => t.waiting).length;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden mt-2" style={{ background: "var(--ba-4)" }}>
      {done > 0 && <div style={{ flex: done, background: "#22c55e" }} />}
      {waiting > 0 && <div style={{ flex: waiting, background: "#eab308" }} />}
      {(total - done - waiting) > 0 && <div style={{ flex: total - done - waiting, background: "var(--ba-4)" }} />}
    </div>
  );
}

function upsertDay(days: DayEntry[], date: string, fn: (d: DayEntry) => DayEntry): DayEntry[] {
  if (days.some(d => d.date === date)) return days.map(d => d.date !== date ? d : fn(d));
  return [...days, fn({ date, notes: [], todos: [] })].sort((a, b) => b.date.localeCompare(a.date));
}

export function JournalClient({ initialDays }: { initialDays: DayEntry[] }) {
  const router = useRouter();
  const [view, setView] = useState<"lista" | "kalendarz">("lista");
  const [days, setDays] = useState<DayEntry[]>(initialDays);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>();
    initialDays.slice(0, 3).forEach(d => s.add(d.date));
    s.add(TODAY);
    return s;
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [addingTodoDate, setAddingTodoDate] = useState<string | null>(null);
  const [newTodoText, setNewTodoText] = useState("");
  const [addingNoteDate, setAddingNoteDate] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState("");

  // Always show today at the top
  const displayDays = days.some(d => d.date === TODAY)
    ? days
    : [{ date: TODAY, notes: [], todos: [] }, ...days];

  function toggle(date: string) {
    setExpanded(prev => { const n = new Set(prev); n.has(date) ? n.delete(date) : n.add(date); return n; });
  }

  function patchTodoInState(id: string, patch: Partial<TodoEntry>) {
    setDays(prev => prev.map(d => ({ ...d, todos: d.todos.map(t => t.id === id ? { ...t, ...patch } : t) })));
  }

  async function cycleTodo(t: TodoEntry) {
    const next = nextState(getTodoState(t));
    const patch =
      next === "done" ? { completed: true, waiting: false, completed_at: new Date().toISOString() }
      : next === "waiting" ? { completed: false, waiting: true, completed_at: null }
      : { completed: false, waiting: false, completed_at: null };
    patchTodoInState(t.id, patch);
    await fetch(`/api/journal/todos/${t.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: patch.completed, waiting: patch.waiting }),
    }).catch(() => {});
    router.refresh();
  }

  function startEdit(t: TodoEntry) { setEditingId(t.id); setEditText(t.text); }

  async function saveEdit(id: string) {
    const text = editText.trim();
    if (!text) { setEditingId(null); return; }
    patchTodoInState(id, { text });
    setEditingId(null);
    await fetch(`/api/journal/todos/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch(() => {});
  }

  async function deleteTodo(dateStr: string, id: string) {
    setDays(prev => prev.map(d => d.date !== dateStr ? d : { ...d, todos: d.todos.filter(t => t.id !== id) }));
    await fetch(`/api/journal/todos/${id}`, { method: "DELETE" }).catch(() => {});
    router.refresh();
  }

  async function addTodo(dateStr: string, e: React.FormEvent) {
    e.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;
    setNewTodoText("");
    setAddingTodoDate(null);
    const res = await fetch("/api/journal/todos", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr, text }),
    });
    const data = await res.json() as { todo?: TodoEntry };
    if (data.todo) setDays(prev => upsertDay(prev, dateStr, d => ({ ...d, todos: [...d.todos, data.todo!] })));
    router.refresh();
  }

  async function deleteNote(dateStr: string, id: string) {
    setDays(prev => prev.map(d => d.date !== dateStr ? d : { ...d, notes: d.notes.filter(n => n.id !== id) }));
    await fetch(`/api/journal/notes/${id}`, { method: "DELETE" }).catch(() => {});
  }

  async function addNote(dateStr: string, e: React.FormEvent) {
    e.preventDefault();
    const content = newNoteContent.trim();
    if (!content) return;
    setNewNoteContent("");
    setAddingNoteDate(null);
    const res = await fetch("/api/journal/notes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr, content }),
    });
    const data = await res.json() as { note?: NoteEntry };
    if (data.note) setDays(prev => upsertDay(prev, dateStr, d => ({ ...d, notes: [...d.notes, data.note!] })));
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-1.5 mb-4">
        {(["lista", "kalendarz"] as const).map(tab => {
          const isActive = view === tab;
          return (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className="px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-all capitalize"
              style={isActive
                ? { background: "var(--accent-subtle)", color: "var(--accent-2)", border: "1px solid rgba(255,76,0,0.2)" }
                : { color: "var(--muted)", border: "1px solid var(--border)", background: "transparent" }
              }
            >
              {tab === "lista" ? "Lista" : "Kalendarz"}
            </button>
          );
        })}
      </div>

      {view === "kalendarz" ? (
        <JournalCalendar initialDays={days} />
      ) : (
        <div className="flex flex-col gap-3">
          {displayDays.map((day) => {
            const isOpen = expanded.has(day.date);
            const todos = day.todos ?? [];
            const notes = day.notes ?? [];
            const done = todos.filter(t => t.completed).length;
            const waiting = todos.filter(t => t.waiting).length;
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
                <button className="w-full text-left" onClick={() => toggle(day.date)}>
                  <div className="px-5 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        {isToday && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                        <span className="text-[13.5px] font-semibold capitalize">{formatDateHeading(day.date)}</span>
                        {!isToday && <span className="text-[11.5px]" style={{ color: "var(--muted)" }}>{formatDateSub(day.date)}</span>}
                      </div>
                      <span className="text-[12px]" style={{ color: "var(--muted)", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>▾</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {total > 0 && (
                        <span className="text-[12px]" style={{ color: allDone ? "#22c55e" : "var(--muted)" }}>
                          {allDone ? "✓ wszystko zrobione" : `${done}/${total} zadań`}
                          {waiting > 0 && <span style={{ color: "#eab308" }}> · ⏳ {waiting} oczekuje</span>}
                        </span>
                      )}
                      {notes.length > 0 && (
                        <span className="text-[12px]" style={{ color: "var(--muted)" }}>{notes.length === 1 ? "1 notatka" : `${notes.length} notatki`}</span>
                      )}
                      {pct !== null && !allDone && (
                        <span className="text-[12px] font-medium" style={{ color: pct >= 80 ? "#22c55e" : "var(--muted)" }}>{pct}%</span>
                      )}
                    </div>
                    <DayBreakdownBar todos={todos} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    {/* Notes section */}
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                      <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>Przemyślenia</div>
                      {notes.length > 0 && (
                        <div className="flex flex-col gap-2.5 mb-3">
                          {notes.map(n => (
                            <div key={n.id} className="flex gap-3 group">
                              <div className="w-px shrink-0 self-stretch rounded-full" style={{ background: "var(--border)" }} />
                              <div className="flex-1">
                                <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>{n.content}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[11px]" style={{ color: "var(--muted)" }}>{formatTime(n.created_at)}</span>
                                  <button
                                    onClick={() => deleteNote(day.date, n.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px]"
                                    style={{ color: "var(--muted)" }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {addingNoteDate === day.date ? (
                        <form onSubmit={e => addNote(day.date, e)}>
                          <textarea
                            autoFocus
                            value={newNoteContent}
                            onChange={e => setNewNoteContent(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); addNote(day.date, e as unknown as React.FormEvent); }
                              if (e.key === "Escape") { setAddingNoteDate(null); setNewNoteContent(""); }
                            }}
                            placeholder="Napisz notatkę… (Ctrl+Enter = wyślij)"
                            rows={3}
                            className="w-full rounded-lg px-3 py-2.5 text-[13px] leading-relaxed outline-none resize-none"
                            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
                          />
                          <div className="flex gap-2 mt-2">
                            <button type="submit" disabled={!newNoteContent.trim()} className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40" style={{ background: "var(--accent)", color: "white" }}>
                              Dodaj notatkę
                            </button>
                            <button type="button" onClick={() => { setAddingNoteDate(null); setNewNoteContent(""); }} className="px-3 py-1.5 text-[12px]" style={{ color: "var(--muted)" }}>
                              Anuluj
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => { setAddingNoteDate(day.date); setExpanded(p => new Set([...p, day.date])); }}
                          className="text-[12px]"
                          style={{ color: "var(--muted)" }}
                        >
                          + Dodaj notatkę
                        </button>
                      )}
                    </div>

                    {/* Todos section */}
                    <div className="px-5 py-4">
                      <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>Zadania</div>
                      {total > 0 && (
                        <div className="flex flex-col gap-1.5 mb-3">
                          {[...todos].sort((a, b) => {
                            const o = { todo: 0, waiting: 1, done: 2 } as Record<TodoState, number>;
                            return o[getTodoState(a)] - o[getTodoState(b)];
                          }).map(t => {
                            const state = getTodoState(t);
                            return (
                              <div key={t.id} className="flex items-center gap-2.5 group min-h-[28px]">
                                <button onClick={() => cycleTodo(t)} className="shrink-0"><TodoCheck state={state} /></button>
                                {editingId === t.id ? (
                                  <input
                                    autoFocus value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                    onBlur={() => saveEdit(t.id)}
                                    onKeyDown={e => { if (e.key === "Enter") saveEdit(t.id); if (e.key === "Escape") setEditingId(null); }}
                                    className="flex-1 rounded px-2 py-0.5 text-[12.5px] outline-none"
                                    style={{ background: "var(--ba-4)", border: "1px solid var(--accent)", color: "var(--text)" }}
                                  />
                                ) : (
                                  <span
                                    className="flex-1 text-[13px] leading-snug cursor-text"
                                    style={{
                                      color: state === "done" ? "var(--muted)" : state === "waiting" ? "#eab308" : "var(--text)",
                                      textDecoration: state === "done" ? "line-through" : "none",
                                    }}
                                    onDoubleClick={() => state !== "done" && startEdit(t)}
                                  >
                                    {t.text}
                                  </span>
                                )}
                                {state === "done" && t.completed_at && <span className="text-[11px] shrink-0" style={{ color: "var(--muted)" }}>{formatTime(t.completed_at)}</span>}
                                {state === "waiting" && <span className="text-[11px] shrink-0" style={{ color: "#eab308" }}>oczekuje</span>}
                                <button onClick={() => deleteTodo(day.date, t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-1 shrink-0" style={{ color: "var(--muted)" }}>✕</button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {addingTodoDate === day.date ? (
                        <form onSubmit={e => addTodo(day.date, e)} className="flex gap-2 mt-1">
                          <input
                            autoFocus value={newTodoText}
                            onChange={e => setNewTodoText(e.target.value)}
                            onKeyDown={e => { if (e.key === "Escape") { setAddingTodoDate(null); setNewTodoText(""); } }}
                            placeholder="Nowe zadanie…"
                            className="flex-1 rounded-lg px-3 py-1.5 text-[12.5px] outline-none"
                            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
                          />
                          <button type="submit" disabled={!newTodoText.trim()} className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40 shrink-0" style={{ background: "var(--accent)", color: "white" }}>Dodaj</button>
                          <button type="button" onClick={() => { setAddingTodoDate(null); setNewTodoText(""); }} className="px-2 py-1.5 text-[12px]" style={{ color: "var(--muted)" }}>Anuluj</button>
                        </form>
                      ) : (
                        <button
                          onClick={() => { setAddingTodoDate(day.date); setExpanded(p => new Set([...p, day.date])); }}
                          className="text-[12px] mt-1"
                          style={{ color: "var(--muted)" }}
                        >
                          + Dodaj zadanie
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {displayDays.length === 0 && (
            <div className="rounded-xl px-6 py-10 text-center" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
              <div className="text-[14px] font-medium mb-2">Brak wpisów</div>
              <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                Zacznij dziś — wróć na <Link href="/" style={{ color: "var(--accent-2)" }}>dashboard →</Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
