"use client";

import { useState, useEffect, useCallback } from "react";

type Note = { id: string; payload: { text: string }; created_at: string };
type LeadGroup = { name: string; campaigns: string[] };
type LeadDuplicate = { id: string; full_name: string; phone: string | null; email: string | null };
type LeadDetails = {
  id: string; full_name: string; phone: string | null; email: string | null;
  source: string; sourceLabel: string; created_at: string; groups: LeadGroup[];
};

const GROUP_COLORS: Record<string, [string, string]> = {
  "SMS":       ["#dcfce7", "#15803d"],
  "Email":     ["#dbeafe", "#1d4ed8"],
  "Meta Ads":  ["#ede9fe", "#6d28d9"],
  "Messenger": ["#fef3c7", "#b45309"],
  "Instagram": ["#fce7f3", "#be185d"],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function LeadNotesPanel({
  leadId: initialLeadId,
  leadName: initialLeadName,
  initialCount,
  fallbackEmail,
  fallbackName,
  conversationId,
}: {
  leadId?: string | null;
  leadName?: string;
  initialCount?: number;
  fallbackEmail?: string;
  fallbackName?: string;
  conversationId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "details">("notes");
  const [resolvedLeadId, setResolvedLeadId] = useState<string | null>(initialLeadId ?? null);
  const [resolvedLeadName, setResolvedLeadName] = useState<string>(
    initialLeadName ?? fallbackName ?? fallbackEmail ?? "Lead",
  );
  const [resolving, setResolving] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [details, setDetails] = useState<LeadDetails | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [duplicates, setDuplicates] = useState<LeadDuplicate[]>([]);

  const loadNotes = useCallback(async (lid: string) => {
    const res = await fetch(`/api/leads/${lid}/notes`);
    if (res.ok) setNotes((await res.json()).notes ?? []);
  }, []);

  const loadDetails = useCallback(async (lid: string) => {
    const res = await fetch(`/api/leads/${lid}`);
    if (res.ok) {
      const d: LeadDetails = await res.json();
      setDetails(d);
      setEditName(d.full_name ?? "");
      setEditPhone(d.phone ?? "");
      setEditEmail(d.email ?? "");
    }
  }, []);

  useEffect(() => {
    if (!open || !resolvedLeadId) return;
    if (activeTab === "notes") loadNotes(resolvedLeadId);
    if (activeTab === "details") loadDetails(resolvedLeadId);
  }, [open, activeTab, resolvedLeadId, loadNotes, loadDetails]);

  async function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (resolvedLeadId) { setOpen(true); return; }
    if (!fallbackEmail && !fallbackName) return;
    setResolving(true);
    const res = await fetch("/api/leads/find-or-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fallbackEmail, name: fallbackName, conversation_id: conversationId }),
    });
    if (res.ok) {
      const lead = await res.json();
      setResolvedLeadId(lead.id);
      setResolvedLeadName(lead.full_name);
    }
    setResolving(false);
    setOpen(true);
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim() || !resolvedLeadId) return;
    setNoteLoading(true);
    const res = await fetch(`/api/leads/${resolvedLeadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText }),
    });
    if (res.ok) { setNoteText(""); await loadNotes(resolvedLeadId); }
    setNoteLoading(false);
  }

  async function deleteNote(eventId: string) {
    if (!resolvedLeadId) return;
    setDeleting(eventId);
    await fetch(`/api/leads/${resolvedLeadId}/notes?eventId=${eventId}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== eventId));
    setDeleting(null);
  }

  async function saveDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!resolvedLeadId) return;
    setSavingDetails(true);
    setDuplicates([]);
    const res = await fetch(`/api/leads/${resolvedLeadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: editName, phone: editPhone, email: editEmail }),
    });
    if (res.ok) {
      const data = await res.json();
      setResolvedLeadName(editName || resolvedLeadName);
      setDetails(prev => prev ? {
        ...prev, full_name: editName, phone: editPhone || null, email: editEmail || null,
      } : prev);
      setDetailsSaved(true);
      setTimeout(() => setDetailsSaved(false), 2500);
      if (data.duplicates?.length) setDuplicates(data.duplicates);
      // Reload groups (integration detection may have changed)
      await loadDetails(resolvedLeadId);
    }
    setSavingDetails(false);
  }

  const count = open ? notes.length : (initialCount ?? 0);

  const inp: React.CSSProperties = {
    width: "100%", borderRadius: "8px", padding: "9px 12px", fontSize: "13px",
    outline: "none", background: "var(--ba-4)", border: "1px solid var(--border-strong)",
    color: "var(--text)", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <>
      <button
        onClick={handleOpen}
        onPointerDown={(e) => e.stopPropagation()}
        disabled={resolving}
        title="Notatki i dane leada"
        style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          padding: "3px 8px", borderRadius: "6px",
          border: "1px solid var(--border-strong)", background: "transparent",
          color: "var(--muted)", fontSize: "12px", cursor: "pointer",
          transition: "color 0.15s, border-color 0.15s",
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
        {resolving ? "…" : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        )}
        {count > 0 && (
          <span style={{ background: "var(--accent)", color: "#fff", borderRadius: "999px", padding: "0 5px", fontSize: "10px", fontWeight: 600, lineHeight: "16px" }}>
            {count}
          </span>
        )}
      </button>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50 }} onClick={() => setOpen(false)} />

          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: "440px", maxWidth: "95vw",
            zIndex: 51, background: "var(--panel-solid)", borderLeft: "1px solid var(--border)",
            display: "flex", flexDirection: "column",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resolvedLeadName}</div>
                {details && (
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
                    {[details.phone, details.email].filter(Boolean).join(" · ") || "Brak danych kontaktowych"}
                  </div>
                )}
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "20px", cursor: "pointer", lineHeight: 1, padding: "4px", flexShrink: 0 }}>×</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              {(["notes", "details"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  flex: 1, padding: "10px 16px", fontSize: "13px", fontWeight: 500,
                  background: "none", border: "none", cursor: "pointer",
                  color: activeTab === tab ? "var(--text)" : "var(--muted)",
                  borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
                  marginBottom: "-1px", transition: "color 0.15s",
                }}>
                  {tab === "notes" ? "Notatki" : "Dane leada"}
                </button>
              ))}
            </div>

            {/* ── NOTES TAB ── */}
            {activeTab === "notes" && (
              <>
                <form onSubmit={addNote} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Napisz notatkę…"
                    rows={3}
                    style={{ ...inp, resize: "vertical" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        if (noteText.trim()) addNote(e as unknown as React.FormEvent);
                      }
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button type="submit" disabled={noteLoading || !noteText.trim()} className="btn-primary"
                      style={{ padding: "7px 16px", borderRadius: "7px", fontSize: "13px", fontWeight: 500, opacity: noteLoading || !noteText.trim() ? 0.4 : 1 }}>
                      {noteLoading ? "…" : "Dodaj notatkę"}
                    </button>
                  </div>
                </form>
                <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
                  {notes.length === 0 ? (
                    <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "13px", paddingTop: "32px" }}>Brak notatek. Dodaj pierwszą.</div>
                  ) : notes.map((note) => (
                    <div key={note.id} style={{ padding: "12px 14px", borderRadius: "8px", background: "var(--ba-4)", border: "1px solid var(--border)", marginBottom: "10px", position: "relative" }}>
                      <div style={{ fontSize: "13px", color: "var(--text)", whiteSpace: "pre-wrap", wordBreak: "break-word", paddingRight: "28px" }}>{note.payload.text}</div>
                      <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px" }}>{formatDate(note.created_at)}</div>
                      <button onClick={() => deleteNote(note.id)} disabled={deleting === note.id} title="Usuń notatkę"
                        style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "14px", lineHeight: 1, padding: "2px", opacity: deleting === note.id ? 0.4 : 1 }}>×</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── DETAILS TAB ── */}
            {activeTab === "details" && (
              <div style={{ flex: 1, overflowY: "auto" }}>
                <form onSubmit={saveDetails} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

                  <div>
                    <label style={{ fontSize: "11px", color: "var(--muted)", display: "block", marginBottom: "6px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Imię i nazwisko</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Jan Kowalski" style={inp} />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", color: "var(--muted)", display: "block", marginBottom: "6px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Telefon</label>
                    <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="+48600000000" type="tel" style={inp} />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", color: "var(--muted)", display: "block", marginBottom: "6px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                    <input value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="jan@example.com" type="email" style={inp} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button type="submit" disabled={savingDetails} className="btn-primary"
                      style={{ padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, opacity: savingDetails ? 0.5 : 1 }}>
                      {savingDetails ? "Zapisywanie…" : "Zapisz dane"}
                    </button>
                    {detailsSaved && <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 500 }}>✓ Zapisano</span>}
                  </div>
                </form>

                {/* Origin + integrations */}
                {details && (
                  <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>

                    {/* Source */}
                    <div style={{ padding: "12px 14px", borderRadius: "10px", background: "var(--ba-4)", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)" }}>
                      <span style={{ fontWeight: 600, color: "var(--text)" }}>{details.sourceLabel}</span>
                      <span> · {formatDate(details.created_at)}</span>
                    </div>

                    {/* Integration groups */}
                    {details.groups.length > 0 ? (
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Aktywny w integracjach
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {details.groups.map(g => {
                            const [bg, color] = GROUP_COLORS[g.name] ?? ["var(--ba-4)", "var(--muted)"];
                            return (
                              <div key={g.name} style={{ padding: "10px 12px", borderRadius: "8px", background: bg, display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontSize: "12px", fontWeight: 700, color }}>{g.name}</span>
                                {g.campaigns.length > 0 && (
                                  <span style={{ fontSize: "11px", color, opacity: 0.85 }}>
                                    Uczestniczy w: {g.campaigns.join(", ")}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: "12px", color: "var(--muted)", fontStyle: "italic" }}>
                        Brak aktywności w integracjach.
                      </div>
                    )}

                    {/* Duplicate warning */}
                    {duplicates.length > 0 && (
                      <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#fef3c7", border: "1px solid #fcd34d", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "#92400e" }}>
                          ⚠ Wykryto możliwe duplikaty
                        </div>
                        <div style={{ fontSize: "11px", color: "#78350f" }}>
                          Następujące leady mają ten sam numer telefonu lub email:
                        </div>
                        {duplicates.map(d => (
                          <a key={d.id} href={`/leads/${d.id}`} target="_blank" rel="noreferrer"
                            style={{ fontSize: "12px", fontWeight: 500, color: "#b45309", textDecoration: "underline" }}>
                            {d.full_name}
                            {d.phone && <span style={{ fontWeight: 400, marginLeft: "6px" }}>{d.phone}</span>}
                            {d.email && <span style={{ fontWeight: 400, marginLeft: "6px" }}>{d.email}</span>}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
