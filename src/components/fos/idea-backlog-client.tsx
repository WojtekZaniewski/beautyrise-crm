"use client";

import { useEffect, useState } from "react";
import type { FosIdea, FosIdeaStatus } from "@/lib/fos-types";

const STATUS_CONFIG: Record<FosIdeaStatus, { label: string; color: string }> = {
  backlog: { label: "Backlog", color: "#6b7280" },
  under_review: { label: "Under Review", color: "#FF4C00" },
  approved: { label: "Approved", color: "#FF4C00" },
  rejected: { label: "Rejected", color: "#1C1917" },
};

const ALL_STATUSES: FosIdeaStatus[] = ["backlog", "under_review", "approved", "rejected"];

export function IdeaBacklogClient() {
  const [ideas, setIdeas] = useState<FosIdea[]>([]);
  const [filter, setFilter] = useState<FosIdeaStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const url = filter === "all" ? "/api/fos/ideas" : `/api/fos/ideas?status=${filter}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setIdeas(d.data ?? []); setLoading(false); });
  };

  useEffect(() => { load(); }, [filter]);

  const addIdea = async () => {
    if (!form.title) return;
    setSaving(true); setError("");
    const res = await fetch("/api/fos/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error); setSaving(false); return; }
    setForm({ title: "", description: "" });
    setShowForm(false); setSaving(false); load();
  };

  const changeStatus = async (id: string, status: FosIdeaStatus) => {
    await fetch(`/api/fos/ideas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOpenMenuId(null); load();
  };

  const deleteIdea = async (id: string) => {
    await fetch(`/api/fos/ideas/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold">Idea Backlog</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          + Nowy pomysł
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {(["all", ...ALL_STATUSES] as const).map((s) => {
          const active = filter === s;
          const cfg = s === "all" ? { label: "Wszystkie", color: "var(--muted)" } : STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-1 rounded-full text-[11px] font-medium shrink-0 transition-colors"
              style={active
                ? { background: s === "all" ? "var(--ba-4)" : `${(STATUS_CONFIG[s as FosIdeaStatus]).color}20`, color: s === "all" ? "var(--text)" : (STATUS_CONFIG[s as FosIdeaStatus]).color, border: `1px solid ${s === "all" ? "var(--border)" : (STATUS_CONFIG[s as FosIdeaStatus]).color + "50"}` }
                : { color: "var(--muted)", border: "1px solid transparent" }
              }
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {showForm && (
        <div
          className="rounded-xl p-4 mb-4 space-y-3"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
        >
          {error && <div className="text-[12px] text-[#1C1917]">{error}</div>}
          <input
            placeholder="Tytuł pomysłu *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          />
          <textarea
            placeholder="Opis (opcjonalnie)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          />
          <div className="flex gap-2">
            <button
              onClick={addIdea}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-[12px] font-medium text-white disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              {saving ? "Zapisuję..." : "Dodaj pomysł"}
            </button>
            <button
              onClick={() => { setShowForm(false); setError(""); }}
              className="px-4 py-2 rounded-lg text-[12px] transition-colors hover:bg-[var(--ba-4)]"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-[13px] py-4 text-center" style={{ color: "var(--muted)" }}>
          Ładowanie...
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-[13px] py-8 text-center" style={{ color: "var(--muted)" }}>
          Brak pomysłów.
        </div>
      ) : (
        <div className="space-y-2">
          {ideas.map((idea) => {
            const cfg = STATUS_CONFIG[idea.status];
            return (
              <div
                key={idea.id}
                className="rounded-lg p-3"
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[13px] font-medium">{idea.title}</span>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                        style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    {idea.description && (
                      <p className="text-[12px] line-clamp-2" style={{ color: "var(--muted)" }}>
                        {idea.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      {idea.author_label && (
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                          👤 {idea.author_label}
                        </span>
                      )}
                      <span className="text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>
                        {new Date(idea.created_at).toLocaleDateString("pl-PL")}
                      </span>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === idea.id ? null : idea.id)}
                      className="text-[11px] px-2 py-1 rounded transition-colors hover:bg-[var(--ba-4)]"
                      style={{ color: "var(--muted)" }}
                    >
                      ···
                    </button>
                    {openMenuId === idea.id && (
                      <div
                        className="absolute right-0 top-7 z-10 rounded-xl p-1 min-w-[140px] shadow-lg"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                      >
                        {ALL_STATUSES.filter((s) => s !== idea.status).map((s) => {
                          const c = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => changeStatus(idea.id, s)}
                              className="w-full text-left text-[12px] px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--ba-4)]"
                              style={{ color: c.color }}
                            >
                              → {c.label}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => deleteIdea(idea.id)}
                          className="w-full text-left text-[12px] px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--ba-4)] mt-1"
                          style={{ color: "#1C1917", borderTop: "1px solid var(--border)" }}
                        >
                          Usuń
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="mt-4 pt-3 text-[11px] text-center"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
      >
        💡 Pomysły nie zmieniają aktywnego sprintu automatycznie.
      </div>
    </div>
  );
}
