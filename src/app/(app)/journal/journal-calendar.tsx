"use client";

import { useState } from "react";

type TodoState = "todo" | "waiting" | "done";
type NoteEntry = { id: string; content: string; created_at: string };
type TodoEntry = { id: string; text: string; completed: boolean; waiting: boolean; completed_at: string | null };
type DayEntry = { date: string; notes: NoteEntry[]; todos: TodoEntry[] };

const TODAY = new Date().toISOString().split("T")[0];
const WEEKDAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
const MONTHS_PL = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];

function getTodoState(t: TodoEntry): TodoState {
  if (t.completed) return "done";
  if (t.waiting) return "waiting";
  return "todo";
}
function nextTodoState(s: TodoState): TodoState {
  if (s === "todo") return "waiting";
  if (s === "waiting") return "done";
  return "todo";
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}
function formatDateFull(dateStr: string) {
  if (dateStr === TODAY) return "Dzisiaj";
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (dateStr === yesterday) return "Wczoraj";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function TodoCheckCal({ state }: { state: TodoState }) {
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

function buildCalendarGrid(year: number, month: number): (string | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function upsertMap(map: Map<string, DayEntry>, date: string, fn: (d: DayEntry) => DayEntry): Map<string, DayEntry> {
  const existing = map.get(date) ?? { date, notes: [], todos: [] };
  return new Map([...map, [date, fn(existing)]]);
}

export function JournalCalendar({ initialDays }: { initialDays: DayEntry[] }) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(TODAY);
  const [dataMap, setDataMap] = useState<Map<string, DayEntry>>(() => {
    const m = new Map<string, DayEntry>();
    for (const d of initialDays) m.set(d.date, d);
    return m;
  });
  const [loading, setLoading] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editTodoText, setEditTodoText] = useState("");

  async function selectDate(dateStr: string) {
    if (dateStr === selectedDate) return;
    setSelectedDate(dateStr);
    setAddingNote(false);
    setNewNoteContent("");
    setNewTodoText("");
    setEditingTodoId(null);
    if (!dataMap.has(dateStr)) {
      setLoading(true);
      try {
        const [nr, tr] = await Promise.all([
          fetch(`/api/journal/notes?date=${dateStr}`).then(r => r.json()) as Promise<{ notes: NoteEntry[] }>,
          fetch(`/api/journal/todos?date=${dateStr}`).then(r => r.json()) as Promise<{ todos: TodoEntry[] }>,
        ]);
        setDataMap(prev => new Map([...prev, [dateStr, { date: dateStr, notes: nr.notes ?? [], todos: tr.todos ?? [] }]]));
      } finally {
        setLoading(false);
      }
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  const cells = buildCalendarGrid(calYear, calMonth);
  const dayEntry = dataMap.get(selectedDate) ?? { date: selectedDate, notes: [], todos: [] };
  const sortedTodos = [...dayEntry.todos].sort((a, b) => {
    const o = { todo: 0, waiting: 1, done: 2 } as Record<TodoState, number>;
    return o[getTodoState(a)] - o[getTodoState(b)];
  });

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    const content = newNoteContent.trim();
    if (!content) return;
    setNewNoteContent("");
    setAddingNote(false);
    const res = await fetch("/api/journal/notes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate, content }),
    });
    const data = await res.json() as { note?: NoteEntry };
    if (data.note) setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, notes: [...d.notes, data.note!] })));
  }

  async function deleteNote(id: string) {
    setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, notes: d.notes.filter(n => n.id !== id) })));
    await fetch(`/api/journal/notes/${id}`, { method: "DELETE" }).catch(() => {});
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;
    setNewTodoText("");
    const res = await fetch("/api/journal/todos", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate, text }),
    });
    const data = await res.json() as { todo?: TodoEntry };
    if (data.todo) setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, todos: [...d.todos, data.todo!] })));
  }

  async function cycleTodo(t: TodoEntry) {
    const next = nextTodoState(getTodoState(t));
    const patch = next === "done"
      ? { completed: true, waiting: false, completed_at: new Date().toISOString() }
      : next === "waiting"
      ? { completed: false, waiting: true, completed_at: null }
      : { completed: false, waiting: false, completed_at: null };
    setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, todos: d.todos.map(td => td.id === t.id ? { ...td, ...patch } : td) })));
    await fetch(`/api/journal/todos/${t.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: patch.completed, waiting: patch.waiting }),
    }).catch(() => {});
  }

  async function deleteTodo(id: string) {
    setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, todos: d.todos.filter(t => t.id !== id) })));
    await fetch(`/api/journal/todos/${id}`, { method: "DELETE" }).catch(() => {});
  }

  async function saveEditTodo(id: string) {
    const text = editTodoText.trim();
    setEditingTodoId(null);
    if (!text) return;
    setDataMap(prev => upsertMap(prev, selectedDate, d => ({ ...d, todos: d.todos.map(t => t.id === id ? { ...t, text } : t) })));
    await fetch(`/api/journal/todos/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch(() => {});
  }

  return (
    <div>
      {/* Calendar grid */}
      <div className="rounded-xl overflow-hidden mb-3" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-[18px] transition-colors" style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>‹</button>
          <span className="text-[14px] font-semibold">{MONTHS_PL[calMonth]} {calYear}</span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-[18px] transition-colors" style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>›</button>
        </div>

        <div className="grid grid-cols-7 px-4 pt-3 pb-0">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-medium py-1" style={{ color: "var(--muted)" }}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 px-3 pb-3 gap-0.5">
          {cells.map((dateStr, i) => {
            if (!dateStr) return <div key={`e-${i}`} className="h-12" />;
            const entry = dataMap.get(dateStr);
            const hasNotes = (entry?.notes.length ?? 0) > 0;
            const hasTodos = (entry?.todos.length ?? 0) > 0;
            const allDone = hasTodos && entry!.todos.every(t => t.completed);
            const isToday = dateStr === TODAY;
            const isSelected = dateStr === selectedDate;
            return (
              <button
                key={dateStr}
                onClick={() => selectDate(dateStr)}
                className="rounded-lg flex flex-col items-center justify-start pt-1.5 pb-1 gap-0.5 h-12 transition-colors"
                style={{
                  background: isSelected ? "var(--accent-subtle)" : isToday ? "var(--ba-4)" : "transparent",
                  border: isSelected ? "1px solid rgba(255,76,0,0.35)" : isToday ? "1px solid var(--accent)" : "1px solid transparent",
                }}
              >
                <span className="text-[13px] font-medium leading-none" style={{ color: isToday ? "var(--accent-2)" : "var(--text)" }}>
                  {Number(dateStr.split("-")[2])}
                </span>
                <div className="flex gap-0.5 h-1.5">
                  {hasNotes && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />}
                  {hasTodos && <span className="w-1.5 h-1.5 rounded-full" style={{ background: allDone ? "#22c55e" : "#eab308" }} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 px-1">
        {[
          { color: "var(--accent)", label: "Notatka" },
          { color: "#eab308", label: "Zadania w toku" },
          { color: "#22c55e", label: "Wszystko zrobione" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[11.5px]" style={{ color: "var(--muted)" }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>

      {/* Day panel */}
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--panel-solid)", border: `1px solid ${selectedDate === TODAY ? "var(--accent)" : "var(--border)"}` }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="text-[13.5px] font-semibold capitalize">{formatDateFull(selectedDate)}</div>
            {dayEntry.todos.length > 0 && (
              <div className="text-[11.5px] mt-0.5" style={{ color: "var(--muted)" }}>
                {dayEntry.todos.filter(t => t.completed).length}/{dayEntry.todos.length} zadań
              </div>
            )}
          </div>
          {loading && <span className="text-[12px]" style={{ color: "var(--muted)" }}>Ładowanie…</span>}
        </div>

        {!loading && (
          <>
            {/* Notes */}
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>Przemyślenia</div>
              {dayEntry.notes.length > 0 && (
                <div className="flex flex-col gap-2.5 mb-3">
                  {dayEntry.notes.map(n => (
                    <div key={n.id} className="flex gap-3 group">
                      <div className="w-px shrink-0 self-stretch rounded-full" style={{ background: "var(--border)" }} />
                      <div className="flex-1">
                        <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>{n.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px]" style={{ color: "var(--muted)" }}>{formatTime(n.created_at)}</span>
                          <button onClick={() => deleteNote(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px]" style={{ color: "var(--muted)" }}>✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {addingNote ? (
                <form onSubmit={addNote}>
                  <textarea
                    autoFocus
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); addNote(e as unknown as React.FormEvent); }
                      if (e.key === "Escape") { setAddingNote(false); setNewNoteContent(""); }
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
                    <button type="button" onClick={() => { setAddingNote(false); setNewNoteContent(""); }} className="px-3 py-1.5 text-[12px]" style={{ color: "var(--muted)" }}>
                      Anuluj
                    </button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setAddingNote(true)} className="text-[12px]" style={{ color: "var(--muted)" }}>
                  + Dodaj notatkę
                </button>
              )}
            </div>

            {/* Todos */}
            <div className="px-5 py-4">
              <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-3" style={{ color: "var(--muted)" }}>Zadania</div>
              {sortedTodos.length > 0 && (
                <div className="flex flex-col gap-1.5 mb-3">
                  {sortedTodos.map(t => {
                    const state = getTodoState(t);
                    return (
                      <div key={t.id} className="flex items-center gap-2.5 group min-h-[28px]">
                        <button onClick={() => cycleTodo(t)} className="shrink-0"><TodoCheckCal state={state} /></button>
                        {editingTodoId === t.id ? (
                          <input
                            autoFocus value={editTodoText}
                            onChange={e => setEditTodoText(e.target.value)}
                            onBlur={() => saveEditTodo(t.id)}
                            onKeyDown={e => { if (e.key === "Enter") saveEditTodo(t.id); if (e.key === "Escape") setEditingTodoId(null); }}
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
                            onDoubleClick={() => state !== "done" && (setEditingTodoId(t.id), setEditTodoText(t.text))}
                          >
                            {t.text}
                          </span>
                        )}
                        {state === "done" && t.completed_at && <span className="text-[11px] shrink-0" style={{ color: "var(--muted)" }}>{formatTime(t.completed_at)}</span>}
                        {state === "waiting" && <span className="text-[11px] shrink-0" style={{ color: "#eab308" }}>oczekuje</span>}
                        <button onClick={() => deleteTodo(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-1 shrink-0" style={{ color: "var(--muted)" }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              )}
              <form onSubmit={addTodo} className="flex gap-2">
                <input
                  value={newTodoText}
                  onChange={e => setNewTodoText(e.target.value)}
                  placeholder="Nowe zadanie…"
                  className="flex-1 rounded-lg px-3 py-1.5 text-[12.5px] outline-none"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
                <button type="submit" disabled={!newTodoText.trim()} className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40 shrink-0" style={{ background: "var(--accent)", color: "white" }}>
                  + Dodaj
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
