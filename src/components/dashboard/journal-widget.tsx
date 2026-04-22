"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type Todo = { id: string; text: string; completed: boolean; completed_at: string | null };

const TODAY = new Date().toISOString().split("T")[0];

function todayLabel() {
  return new Date().toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" });
}

export function JournalWidget() {
  const [note, setNote] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load today's data
  useEffect(() => {
    Promise.all([
      fetch(`/api/journal/note?date=${TODAY}`).then((r) => r.json()) as Promise<{ content: string }>,
      fetch(`/api/journal/todos?date=${TODAY}`).then((r) => r.json()) as Promise<{ todos: Todo[] }>,
    ]).then(([noteData, todoData]) => {
      setNote(noteData.content ?? "");
      setTodos(todoData.todos ?? []);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const saveNote = useCallback((val: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch("/api/journal/note", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: TODAY, content: val }),
      }).catch(() => {});
    }, 800);
  }, []);

  function onNoteChange(val: string) {
    setNote(val);
    saveNote(val);
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
    if (data.todo) setTodos((prev) => [...prev, data.todo!]);
  }

  async function toggleTodo(id: string, completed: boolean) {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed } : t));
    await fetch(`/api/journal/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    }).catch(() => {});
  }

  async function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/journal/todos/${id}`, { method: "DELETE" }).catch(() => {});
  }

  const done = todos.filter((t) => t.completed).length;
  const total = todos.length;

  return (
    <div
      className="rounded-lg flex flex-col gap-0 overflow-hidden"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <div className="text-[13.5px] font-semibold tracking-tight">Dzisiaj</div>
          <div className="text-[11.5px] capitalize mt-0.5" style={{ color: "var(--muted)" }}>
            {todayLabel()}
          </div>
        </div>
        {total > 0 && (
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: done === total ? "rgba(34,197,94,0.12)" : "var(--ba-4)", color: done === total ? "#22c55e" : "var(--muted)" }}
          >
            {done}/{total}
          </span>
        )}
      </div>

      {/* Notes */}
      <div className="px-5 pt-4 pb-3">
        <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-2" style={{ color: "var(--muted)" }}>
          Notatki
        </div>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder={loaded ? "Zapisz myśli, obserwacje, plan dnia…" : "Ładowanie…"}
          disabled={!loaded}
          rows={4}
          className="w-full rounded-lg px-3 py-2.5 text-[13px] leading-relaxed outline-none resize-none"
          style={{
            background: "var(--ba-4)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      {/* Divider */}
      <div className="mx-5" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Todos */}
      <div className="px-5 pt-3 pb-2">
        <div className="text-[10.5px] uppercase tracking-wide font-semibold mb-2.5" style={{ color: "var(--muted)" }}>
          Do zrobienia
        </div>

        <div className="flex flex-col gap-1.5 mb-3">
          {todos.length === 0 && loaded && (
            <div className="text-[12.5px] py-1" style={{ color: "var(--muted)" }}>
              Brak zadań na dziś.
            </div>
          )}
          {todos.map((t) => (
            <div key={t.id} className="flex items-center gap-2.5 group">
              <button
                onClick={() => toggleTodo(t.id, !t.completed)}
                className="w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all"
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
              </button>
              <span
                className="flex-1 text-[13px] leading-snug"
                style={{
                  color: t.completed ? "var(--muted)" : "var(--text)",
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-1"
                style={{ color: "var(--muted)" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={addTodo} className="flex gap-2">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="+ Dodaj zadanie…"
            className="flex-1 rounded-lg px-3 py-1.5 text-[12.5px] outline-none"
            style={{
              background: "var(--ba-4)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
          <button
            type="submit"
            disabled={!newTodo.trim()}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium disabled:opacity-40 shrink-0"
            style={{ background: "var(--accent)", color: "white" }}
          >
            Dodaj
          </button>
        </form>
      </div>

      {/* Footer link */}
      <div
        className="px-5 py-3 mt-1"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <Link
          href="/journal"
          className="text-[12px] font-medium transition-colors"
          style={{ color: "var(--accent-2)" }}
        >
          Dziennik — historia zadań i notatek →
        </Link>
      </div>
    </div>
  );
}
