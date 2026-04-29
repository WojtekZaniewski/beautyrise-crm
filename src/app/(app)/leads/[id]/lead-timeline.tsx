"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type LEvent = {
  id: string;
  type: string;
  payload: Record<string, string> | null;
  created_at: string;
};
type CampaignRef = { id: string; name: string };
type ContextType =
  | "all"
  | "general"
  | "meta_ads"
  | `email:${string}`
  | `sms:${string}`;

const EVENT_LABELS: Record<string, string> = {
  note: "Notatka",
  stage_change: "Zmiana etapu",
  meta_form_submitted: "Formularz Meta",
};

const INTEGRATION_COLORS: Record<string, string> = {
  meta_ads: "#3b82f6",
  email: "#8b5cf6",
  sms: "#22c55e",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

export function LeadTimeline({
  leadId,
  initialEvents,
  emailCampaigns,
  smsCampaigns,
  leadSource,
  leadCampaignName,
}: {
  leadId: string;
  initialEvents: LEvent[];
  emailCampaigns: CampaignRef[];
  smsCampaigns: CampaignRef[];
  leadSource: string;
  leadCampaignName?: string | null;
}) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [context, setContext] = useState<ContextType>("all");
  const [noteText, setNoteText] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { setEvents(initialEvents); }, [initialEvents]);

  const hasMetaAds = leadSource === "meta_ads";
  const hasContextOptions = hasMetaAds || emailCampaigns.length > 0 || smsCampaigns.length > 0;

  // Resolve context details for adding a note
  function resolveNoteBody(): Record<string, string> {
    if (context === "all" || context === "general") {
      return { context_type: "general" };
    }
    if (context === "meta_ads") {
      const body: Record<string, string> = { context_type: "meta_ads" };
      if (leadCampaignName) body.campaign_name = leadCampaignName;
      return body;
    }
    if (context.startsWith("email:")) {
      const cid = context.slice(6);
      const c = emailCampaigns.find((x) => x.id === cid);
      return { context_type: "email", campaign_id: cid, campaign_name: c?.name ?? "" };
    }
    if (context.startsWith("sms:")) {
      const cid = context.slice(4);
      const c = smsCampaigns.find((x) => x.id === cid);
      return { context_type: "sms", campaign_id: cid, campaign_name: c?.name ?? "" };
    }
    return { context_type: "general" };
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAdding(true);
    await fetch(`/api/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText.trim(), ...resolveNoteBody() }),
    });
    setNoteText("");
    setAdding(false);
    router.refresh();
  }

  async function deleteNote(eventId: string) {
    setDeleting(eventId);
    await fetch(`/api/leads/${leadId}/notes?eventId=${eventId}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    setDeleting(null);
  }

  // Filter events for display
  const displayEvents = events.filter((ev) => {
    if (context === "all") return true;
    if (ev.type !== "note") return false;
    const ct = ev.payload?.context_type;
    if (context === "general") return !ct || ct === "general";
    if (context === "meta_ads") return ct === "meta_ads";
    if (context.startsWith("email:")) {
      const cid = context.slice(6);
      return ct === "email" && ev.payload?.campaign_id === cid;
    }
    if (context.startsWith("sms:")) {
      const cid = context.slice(4);
      return ct === "sms" && ev.payload?.campaign_id === cid;
    }
    return true;
  });

  const placeholder =
    context === "all" || context === "general" ? "Dodaj notatkę ogólną…" :
    context === "meta_ads" ? `Notatka — Meta Ads${leadCampaignName ? ` · ${leadCampaignName}` : ""}…` :
    context.startsWith("email:") ? `Notatka — 📧 ${emailCampaigns.find((c) => c.id === context.slice(6))?.name ?? "Email"}…` :
    context.startsWith("sms:") ? `Notatka — ✉ ${smsCampaigns.find((c) => c.id === context.slice(4))?.name ?? "SMS"}…` :
    "Dodaj notatkę…";

  const btnStyle = (active: boolean, color: string): React.CSSProperties => ({
    padding: "5px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: 500, cursor: "pointer",
    border: active ? `1px solid ${color}55` : "1px solid var(--border-strong)",
    background: active ? `${color}15` : "transparent",
    color: active ? color : "var(--muted)",
    transition: "all 0.12s", whiteSpace: "nowrap",
  });

  return (
    <div>
      {/* Context tabs */}
      {hasContextOptions && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>
            Kontekst notatek
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <button style={btnStyle(context === "all", "var(--accent)")} onClick={() => setContext("all")}>
              Wszystkie
            </button>
            <button style={btnStyle(context === "general", "var(--muted)")} onClick={() => setContext("general")}>
              Ogólne
            </button>
            {hasMetaAds && (
              <button style={btnStyle(context === "meta_ads", INTEGRATION_COLORS.meta_ads)} onClick={() => setContext("meta_ads")}>
                f Meta Ads{leadCampaignName ? ` · ${leadCampaignName}` : ""}
              </button>
            )}
            {emailCampaigns.map((c) => (
              <button
                key={c.id}
                style={btnStyle(context === `email:${c.id}`, INTEGRATION_COLORS.email)}
                onClick={() => setContext(`email:${c.id}` as ContextType)}
              >
                📧 {c.name}
              </button>
            ))}
            {smsCampaigns.map((c) => (
              <button
                key={c.id}
                style={btnStyle(context === `sms:${c.id}`, INTEGRATION_COLORS.sms)}
                onClick={() => setContext(`sms:${c.id}` as ContextType)}
              >
                ✉ {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add note form */}
      {context !== "all" && (
        <form onSubmit={addNote} className="flex gap-2 mb-5">
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
          />
          <button
            type="submit"
            disabled={adding || !noteText.trim()}
            className="btn-primary disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium"
          >
            {adding ? "…" : "Dodaj"}
          </button>
        </form>
      )}
      {context === "all" && (
        <form onSubmit={addNote} className="flex gap-2 mb-5">
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Dodaj notatkę ogólną…"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
          />
          <button
            type="submit"
            disabled={adding || !noteText.trim()}
            className="btn-primary disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium"
          >
            {adding ? "…" : "Dodaj"}
          </button>
        </form>
      )}

      {/* Timeline events */}
      <div className="flex flex-col gap-4">
        {displayEvents.map((ev) => {
          const p = ev.payload;
          const ct = p?.context_type;
          const isCampaignNote = ev.type === "note" && ct && ct !== "general";
          const badgeColor = ct === "meta_ads" ? INTEGRATION_COLORS.meta_ads : ct === "email" ? INTEGRATION_COLORS.email : INTEGRATION_COLORS.sms;

          return (
            <div key={ev.id} className="flex gap-3 text-[13px] group">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: ev.type === "note" ? "var(--accent)" : "var(--muted)", opacity: 0.7 }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{EVENT_LABELS[ev.type] ?? ev.type}</div>
                  {isCampaignNote && (
                    <span style={{ fontSize: "10.5px", fontWeight: 600, color: badgeColor, padding: "1px 6px", borderRadius: "4px", background: `${badgeColor}12`, border: `1px solid ${badgeColor}30` }}>
                      {ct === "meta_ads" ? "f Meta Ads" : ct === "email" ? "📧" : "✉"}
                      {p?.campaign_name ? ` ${p.campaign_name}` : ""}
                    </span>
                  )}
                  {ev.type === "note" && (
                    <button
                      onClick={() => deleteNote(ev.id)}
                      disabled={deleting === ev.id}
                      title="Usuń notatkę"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] ml-auto"
                      style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
                    >
                      {deleting === ev.id ? "…" : "✕"}
                    </button>
                  )}
                </div>
                {p && Object.keys(p).length > 0 && (
                  <div className="text-[12px] mt-0.5 whitespace-pre-wrap" style={{ color: "var(--muted)" }}>
                    {ev.type === "note" && p.text}
                    {ev.type === "stage_change" && `${p.from ?? "?"} → ${p.to ?? "?"}`}
                  </div>
                )}
                <div className="text-[11.5px] mt-0.5" style={{ color: "var(--muted)", opacity: 0.7 }}>
                  {formatDate(ev.created_at)}
                </div>
              </div>
            </div>
          );
        })}
        {displayEvents.length === 0 && (
          <div className="text-[13px]" style={{ color: "var(--muted)" }}>
            {context === "all" ? "Brak zdarzeń." : "Brak notatek w tym kontekście."}
          </div>
        )}
      </div>
    </div>
  );
}
