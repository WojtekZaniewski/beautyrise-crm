"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type TodoState = "todo" | "waiting" | "done";
type Note = { id: string; content: string; created_at: string };
type Todo = { id: string; text: string; completed: boolean; waiting: boolean; completed_at: string | null };

const TODAY = new Date().toISOString().split("T")[0];

function getTodoState(t: Todo): TodoState {
  if (t.completed) return "done";
  if (t.waiting) return "waiting";
  return "todo";
}

function nextState(s: TodoState): TodoState {
  if (s === "todo") return "waiting";
  if (s === "waiting") return "done";
  return "todo";
}

function TodoCheckbox({ state }: { state: TodoState }) {
  if (state === "done") {
    return (
      <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center" style={{ background: "var(--accent)", border: "1.5px solid var(--accent)" }}>
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    );
  }
  if (state === "waiting") {
    return (
      <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)", border: "1.5px solid #eab308" }}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="3" stroke="#eab308" strokeWidth="1.2" />
          <path d="M4 2.5V4l1 1" stroke="#eab308" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-4 h-4 rounded shrink-0" style={{ border: "1.5px solid var(--border)", background: "transparent" }} />
  );
}

function todayLabel() {
  return new Date().toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}

export function JournalWidget() {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/journal/notes?date=${TODAY}`).then((r) => r.json()) as Promise<{ notes: Note[] }>,
      fetch(`/api/journal/todos?date=${TODAY}`).then((r) => r.json()) as Promise<{ todos: Todo[] }>,
    ]).then(([n, t]) => {
      setNotes(n.notes ?? []);
      setTodos(t.todos ?? []);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  async function sendNote(e: React.FormEvent) {
    e.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    const res = await fetch("/api/journal/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: TODAY, content }),
    });
    const data = await res.json() as { note?: Note };
    if (data.note) { setNotes((p) => [...p, data.note!]); setDraft(""); textareaRef.current?.focus(); }
    setSending(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); sendNote(e as unknown as React.FormEvent); }
  }

  async function deleteNote(id: string) {
    setNotes((p) => p.filter((n) => n.id !== id));
    await fetch(`/api/journal/notes/${id}`, { method: "DELETE" }).catch(() => {});
  }

  async function cycleTodo(t: Todo) {
    const next = nextState(getTodoState(t));
    const patch = next === "done"
      ? { completed: true, waiting: false }
      : next === "waiting"
      ? { completed: false, waiting: true }
      : { completed: false, waiting: false };
    setTodos((p) => p.map((x) => x.id === t.id ? { ...x, ...patch, completed_at: patch.completed ? new Date().toISOString() : null } : x));
    await fetch(`/api/journal/todos/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => {});
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const text = newTodo.trim();
    if (!text) return;
    setNewTodo("");
    const res = await fetch("/api/journal/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: TODAY, text }),
    });
    const data = await res.json() as { todo?: Todo };
    if (data.todo) setTodos((p) => [...p, data.todo!]);
  }

  async function deleteTodo(id: string) {
    setTodos((p) => p.filter((t) => t.id !== id));
    await fetch(`/api/journal/todos/${id}`, { method: "DELETE" }).catch(() => {});
  }

  function startEdit(t: Todo) { setEditingId(t.id); setEditText(t.text); }
  async function saveEdit(id: string) {
    const text = editText.trim();
    if (!text) { setEditingId(null); return; }
    setTodos((p) => p.map((t) => t.id === id ? { ...t, text } : t));
    setEditingId(null);
    await fetch(`/api/journal/todos/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => {});
  }

  // Sort: todo → waiting → done
  const sorted = [...todos].sort((a, b) => {
    const order = { todo: 0, waiting: 1, done: 2 } as Record<TodoState, number>;
    return order[getTodoState(a)] - order[getTodoState(b)];
  });

  const done = todos.filter((t) => t.completed).length;
  const waiting = todos.filter((t) => t.waiting).length;
  const total = todos.length;

  return (
    <div className="rounded-lg flex flex-col overflow-hidden" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>

      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <div className="text-[13.5px] font-semibold tracking-tight">Dzisiaj</div>
          <div className="text-[11.5px] capitalize mt-0.5" style={{ color: "var(--muted)" }}>{todayLabel()}</div>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-1.5">
            {waiting > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(234,179,8,0.1)", color: "#eab308" }}>⏳ {waiting}</span>}
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: done === total ? "rgba(34,197,94,0.12)" : "var(--ba-4)", color: done === total ? "#22c55e" : "var(--muted)" }}>
              {done}/{total}
            </span>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="px-5 pt-4 pb-3">
        <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-2" style={{ color: "var(--muted)" }}>Notatki</div>

        {notes.length > 0 && (
          <div className="flex flex-col gap-2 mb-3">
            {notes.map((n) => (
              <div key={n.id} className="rounded-lg px-3 py-2.5 group relative" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-[12.5px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>{n.content}</p>
                  <button onClick={() => deleteNote(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-1 shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>✕</button>
                </div>
                <div className="text-[10.5px] mt-1" style={{ color: "var(--muted)" }}>{formatTime(n.created_at)}</div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={sendNote}>
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={loaded ? "Napisz notatkę… (Ctrl+Enter = wyślij)" : ""}
            disabled={!loaded || sending}
            rows={3}
            className="w-full rounded-lg px-3 py-2.5 text-[13px] leading-relaxed outline-none resize-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <div className="flex justify-end mt-2">
            <button type="submit" disabled={!draft.trim() || sending} className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40" style={{ background: "var(--accent)", color: "white" }}>
              {sending ? "Wysyłanie…" : "Wyślij do dziennika"}
            </button>
          </div>
        </form>
      </div>

      <div className="mx-5" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Todos */}
      <div className="px-5 pt-3 pb-2">
        <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-2.5" style={{ color: "var(--muted)" }}>Do zrobienia</div>

        <div className="flex flex-col gap-1.5 mb-3">
          {sorted.length === 0 && loaded && <div className="text-[12.5px] py-1" style={{ color: "var(--muted)" }}>Brak zadań na dziś.</div>}
          {sorted.map((t) => {
            const state = getTodoState(t);
            return (
              <div key={t.id} className="flex items-center gap-2.5 group min-h-[28px]">
                <button onClick={() => cycleTodo(t)} className="shrink-0"><TodoCheckbox state={state} /></button>

                {editingId === t.id ? (
                  <input autoFocus value={editText} onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(t.id)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveEdit(t.id); if (e.key === "Escape") setEditingId(null); }}
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

                <button onClick={() => deleteTodo(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-1 shrink-0" style={{ color: "var(--muted)" }}>✕</button>
              </div>
            );
          })}
        </div>

        <form onSubmit={addTodo} className="flex gap-2">
          <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Dodaj zadanie…"
            className="flex-1 rounded-lg px-3 py-1.5 text-[12.5px] outline-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <button type="submit" disabled={!newTodo.trim()} className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40 shrink-0" style={{ background: "var(--accent)", color: "white" }}>
            + Dodaj
          </button>
        </form>
      </div>

      <div className="px-5 py-3 mt-1" style={{ borderTop: "1px solid var(--border)" }}>
        <Link href="/journal" className="text-[12px] font-medium" style={{ color: "var(--accent-2)" }}>Dziennik — historia zadań i notatek →</Link>
      </div>
    </div>
  );
}
