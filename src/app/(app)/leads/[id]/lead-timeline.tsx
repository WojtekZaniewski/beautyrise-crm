"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type LEvent = {
  id: string;
  type: string;
  payload: Record<string, string> | null;
  created_at: string;
};

const EVENT_LABELS: Record<string, string> = {
  note: "Notatka",
  stage_change: "Zmiana etapu",
  meta_form_submitted: "Formularz Meta",
};

const CTX_COLOR: Record<string, string> = {
  meta_ads: "#3b82f6",
  email: "#8b5cf6",
  sms: "#22c55e",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function LeadTimeline({
  leadId,
  initialEvents,
  contextType = "all",
  campaignId,
  campaignName,
}: {
  leadId: string;
  initialEvents: LEvent[];
  contextType?: "all" | "general" | "meta_ads" | "email" | "sms";
  campaignId?: string;
  campaignName?: string;
}) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [noteText, setNoteText] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { setEvents(initialEvents); }, [initialEvents]);

  const displayEvents = events.filter((ev) => {
    if (contextType === "all") return true;
    if (ev.type !== "note") return false;
    const ct = ev.payload?.context_type;
    if (contextType === "general") return !ct || ct === "general";
    if (contextType === "meta_ads") return ct === "meta_ads" && ev.payload?.campaign_id === campaignId;
    if (contextType === "email") return ct === "email" && ev.payload?.campaign_id === campaignId;
    if (contextType === "sms") return ct === "sms" && ev.payload?.campaign_id === campaignId;
    return true;
  });

  const placeholder =
    contextType === "all" || contextType === "general" ? "Wpisz notatkę…" :
    contextType === "meta_ads" ? `Notatka — Meta Ads${campaignName ? ` · ${campaignName}` : ""}…` :
    contextType === "email" ? `Notatka — 📧 ${campaignName ?? "Email"}…` :
    contextType === "sms" ? `Notatka — ✉ ${campaignName ?? "SMS"}…` :
    "Wpisz notatkę…";

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAdding(true);

    const body: Record<string, string> = {
      text: noteText.trim(),
      context_type: contextType === "all" ? "general" : contextType,
    };
    if ((contextType === "email" || contextType === "sms") && campaignId) {
      body.campaign_id = campaignId;
      if (campaignName) body.campaign_name = campaignName;
    }
    if (contextType === "meta_ads" && campaignId) {
      body.campaign_id = campaignId;
      if (campaignName) body.campaign_name = campaignName;
    }

    await fetch(`/api/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setNoteText("");
    setAdding(false);
    router.refresh();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (noteText.trim() && !adding) {
        addNote(e as unknown as React.FormEvent);
      }
    }
  }

  async function deleteNote(eventId: string) {
    setDeleting(eventId);
    await fetch(`/api/leads/${leadId}/notes?eventId=${eventId}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    setDeleting(null);
  }

  return (
    <div>
      {/* Note form */}
      <form onSubmit={addNote} className="flex flex-col gap-2 mb-6">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: "var(--ba-4)",
            border: "1px solid var(--border-strong)",
            color: "var(--text)",
            resize: "vertical",
            minHeight: "96px",
            lineHeight: "1.55",
          }}
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>Ctrl+Enter aby zapisać</span>
          <button
            type="submit"
            disabled={adding || !noteText.trim()}
            className="btn-primary disabled:opacity-40 px-5 py-2 rounded-lg text-sm font-medium"
          >
            {adding ? "Zapisuję…" : "Dodaj notatkę"}
          </button>
        </div>
      </form>

      {/* Events list */}
      {displayEvents.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
          <div className="flex flex-col gap-4">
            {displayEvents.map((ev) => {
              const p = ev.payload;
              const ct = p?.context_type;
              const isCampaignNote = ev.type === "note" && ct && ct !== "general";
              const badgeColor = CTX_COLOR[ct ?? ""] ?? "#6b7280";

              return (
                <div key={ev.id} className="flex gap-3 text-[13px] group">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
                    style={{ background: ev.type === "note" ? "var(--accent)" : "var(--muted)", opacity: 0.7 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isCampaignNote && ct && (
                        <span style={{ fontSize: "10px", fontWeight: 600, color: badgeColor, padding: "1px 5px", borderRadius: "4px", background: `${badgeColor}12`, border: `1px solid ${badgeColor}30`, flexShrink: 0 }}>
                          {ct === "meta_ads" ? "Meta Ads" : ct === "email" ? "📧" : "✉"}{p?.campaign_name ? ` ${p.campaign_name}` : ""}
                        </span>
                      )}
                      {ev.type !== "note" && (
                        <span className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
                          {EVENT_LABELS[ev.type] ?? ev.type}
                        </span>
                      )}
                      <span className="text-[11px] ml-auto shrink-0" style={{ color: "var(--muted)", opacity: 0.7 }}>
                        {formatDate(ev.created_at)}
                      </span>
                      {ev.type === "note" && (
                        <button
                          onClick={() => deleteNote(ev.id)}
                          disabled={deleting === ev.id}
                          title="Usuń"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px]"
                          style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
                        >
                          {deleting === ev.id ? "…" : "✕"}
                        </button>
                      )}
                    </div>
                    {p && (
                      <div className="text-[13px] mt-1 whitespace-pre-wrap leading-relaxed" style={{ color: "var(--text)" }}>
                        {ev.type === "note" && p.text}
                        {ev.type === "stage_change" && (
                          <span style={{ color: "var(--muted)" }}>{p.from ?? "?"} → {p.to ?? "?"}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {displayEvents.length === 0 && (
        <div className="text-[13px]" style={{ color: "var(--muted)" }}>
          Brak notatek.
        </div>
      )}
    </div>
  );
}
