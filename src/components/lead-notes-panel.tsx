"use client";

import { useState, useEffect, useCallback } from "react";

type Note = { id: string; payload: { text: string }; created_at: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeadNotesPanel({
  leadId,
  leadName,
  initialCount,
}: {
  leadId: string;
  leadName: string;
  initialCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/leads/${leadId}/notes`);
    if (res.ok) {
      const data = await res.json();
      setNotes(data.notes ?? []);
    }
  }, [leadId]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      setText("");
      await load();
    }
    setLoading(false);
  }

  async function deleteNote(eventId: string) {
    setDeleting(eventId);
    await fetch(`/api/leads/${leadId}/notes?eventId=${eventId}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== eventId));
    setDeleting(null);
  }

  const count = open ? notes.length : (initialCount ?? 0);

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
        onPointerDown={(e) => e.stopPropagation()}
        title="Notatki"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "3px 8px",
          borderRadius: "6px",
          border: "1px solid var(--border-strong)",
          background: "transparent",
          color: "var(--muted)",
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.15s, border-color 0.15s",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--text)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--muted)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        {count > 0 && (
          <span style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "999px",
            padding: "0 5px",
            fontSize: "10px",
            fontWeight: 600,
            lineHeight: "16px",
          }}>{count}</span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 50,
            }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "420px",
              maxWidth: "95vw",
              zIndex: 51,
              background: "var(--panel-solid)",
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 20px 14px",
              borderBottom: "1px solid var(--border)",
              flexShrink: 0,
            }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                  Notatki
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                  {leadName}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: "20px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "4px",
                }}
              >
                ×
              </button>
            </div>

            {/* Add note form */}
            <form onSubmit={addNote} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Napisz notatkę…"
                rows={3}
                style={{
                  width: "100%",
                  resize: "vertical",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  outline: "none",
                  background: "var(--ba-4)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text)",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    if (text.trim()) addNote(e as unknown as React.FormEvent);
                  }
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="submit"
                  disabled={loading || !text.trim()}
                  className="btn-primary"
                  style={{
                    padding: "7px 16px",
                    borderRadius: "7px",
                    fontSize: "13px",
                    fontWeight: 500,
                    opacity: loading || !text.trim() ? 0.4 : 1,
                  }}
                >
                  {loading ? "…" : "Dodaj notatkę"}
                </button>
              </div>
            </form>

            {/* Notes list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
              {notes.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "13px", paddingTop: "32px" }}>
                  Brak notatek. Dodaj pierwszą.
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "var(--ba-4)",
                      border: "1px solid var(--border)",
                      marginBottom: "10px",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontSize: "13px", color: "var(--text)", whiteSpace: "pre-wrap", wordBreak: "break-word", paddingRight: "28px" }}>
                      {note.payload.text}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px" }}>
                      {formatDate(note.created_at)}
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      disabled={deleting === note.id}
                      title="Usuń notatkę"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        color: "var(--muted)",
                        cursor: "pointer",
                        fontSize: "14px",
                        lineHeight: 1,
                        padding: "2px",
                        opacity: deleting === note.id ? 0.4 : 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
