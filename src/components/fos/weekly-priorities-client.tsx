"use client";

import { useEffect, useState } from "react";
import type { FosWeeklyPriority, FosPriorityStatus } from "@/lib/fos-types";
import { getWeekStart } from "@/lib/fos-types";
import { AccountabilityBadge } from "./accountability-badge";

const STATUS_CONFIG: Record<FosPriorityStatus, { label: string; color: string }> = {
  not_started: { label: "Nie started", color: "#6b7280" },
  in_progress: { label: "W toku", color: "#FF4C00" },
  completed: { label: "Ukończone", color: "#FF4C00" },
  blocked: { label: "Zablokowane", color: "#1C1917" },
};

function StatusPill({ status }: { status: FosPriorityStatus }) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

export function WeeklyPrioritiesClient() {
  const [week, setWeek] = useState(getWeekStart());
  const [priorities, setPriorities] = useState<FosWeeklyPriority[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [limitWarning, setLimitWarning] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    owner_label: "",
    deadline: "",
  });

  const load = (w = week) => {
    setLoading(true);
    fetch(`/api/fos/priorities?week=${w}`)
      .then((r) => r.json())
      .then((d) => { setPriorities((d.data ?? []).filter((p: FosWeeklyPriority) => !p.is_company_goal && p.kind === "priority")); setLoading(false); });
  };

  useEffect(() => { load(); }, [week]);

  const addPriority = async () => {
    if (!form.title) return;
    setSaving(true); setLimitWarning("");
    const res = await fetch("/api/fos/priorities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, week_start: week, kind: "priority" }),
    });
    const json = await res.json();
    if (!res.ok) {
      if (json.code === "LIMIT_EXCEEDED") {
        setLimitWarning(json.error);
      }
      setSaving(false); return;
    }
    setForm({ title: "", description: "", owner_label: "", deadline: "" });
    setShowForm(false); setSaving(false); load();
  };

  const updateStatus = async (id: string, status: FosPriorityStatus) => {
    await fetch(`/api/fos/priorities/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const deletePriority = async (id: string) => {
    await fetch(`/api/fos/priorities/${id}`, { method: "DELETE" });
    load();
  };

  const items = priorities;

  // Compute simple accountability per owner
  const ownerScores: Record<string, { done: number; total: number }> = {};
  for (const p of priorities) {
    const key = p.owner_label ?? "—";
    if (!ownerScores[key]) ownerScores[key] = { done: 0, total: 0 };
    ownerScores[key].total++;
    if (p.status === "completed") {
      const onTime = !p.deadline || (p.completed_at && p.completed_at.split("T")[0] <= p.deadline);
      if (onTime) ownerScores[key].done++;
    }
  }

  // Week navigation
  const prevWeek = () => {
    const d = new Date(week);
    d.setDate(d.getDate() - 7);
    const w = d.toISOString().split("T")[0];
    setWeek(w); load(w);
  };
  const nextWeek = () => {
    const d = new Date(week);
    d.setDate(d.getDate() + 7);
    const w = d.toISOString().split("T")[0];
    setWeek(w); load(w);
  };

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-semibold">Weekly Priorities</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <button onClick={prevWeek} className="text-[var(--muted)] hover:text-[var(--text)] text-[11px]">‹</button>
            <span className="text-[11px] text-[var(--muted)] tabular-nums">{week}</span>
            <button onClick={nextWeek} className="text-[var(--muted)] hover:text-[var(--text)] text-[11px]">›</button>
          </div>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setLimitWarning(""); }}
          className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          + Dodaj
        </button>
      </div>

      {limitWarning && (
        <div
          className="rounded-lg px-4 py-3 mb-4 text-[12px] font-medium"
          style={{ background: "#FF8C4220", border: "1px solid #FF8C4240", color: "#FF8C42" }}
        >
          ⚠ {limitWarning}
        </div>
      )}

      {showForm && (
        <div
          className="rounded-xl p-4 mb-4 space-y-3"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
        >
          <input
            placeholder="Tytuł priorytetu *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          />
          <textarea
            placeholder="Opis (opcjonalnie)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Owner (email / imię)"
              value={form.owner_label}
              onChange={(e) => setForm({ ...form, owner_label: e.target.value })}
              className="rounded-lg px-3 py-2 text-[13px] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            />
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="rounded-lg px-3 py-2 text-[13px] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addPriority}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-[12px] font-medium text-white disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              {saving ? "Zapisuję..." : "Dodaj"}
            </button>
            <button
              onClick={() => { setShowForm(false); setLimitWarning(""); }}
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
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--muted)" }}>
              Priorytety ({items.length}/3)
            </div>
          </div>
          {items.length === 0 ? (
            <div className="text-[12px] py-3 px-4 rounded-lg text-center" style={{ background: "var(--ba-4)", color: "var(--muted)" }}>
              Brak priorytetów na ten tydzień
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((p) => (
                <PriorityRow
                  key={p.id}
                  p={p}
                  onStatusChange={updateStatus}
                  onDelete={deletePriority}
                  ownerScore={p.owner_label ? ownerScores[p.owner_label] : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PriorityRow({
  p,
  onStatusChange,
  onDelete,
  ownerScore,
}: {
  p: FosWeeklyPriority;
  onStatusChange: (id: string, s: FosPriorityStatus) => void;
  onDelete: (id: string) => void;
  ownerScore?: { done: number; total: number };
}) {
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = p.status !== "completed" && p.deadline && p.deadline < today;
  const score = ownerScore && ownerScore.total > 0
    ? Math.round((ownerScore.done / ownerScore.total) * 100)
    : null;

  const STATUSES: FosPriorityStatus[] = ["not_started", "in_progress", "completed", "blocked"];

  return (
    <div
      className="rounded-lg p-3"
      style={{
        background: isOverdue ? "#1C191708" : "var(--ba-4)",
        border: `1px solid ${isOverdue ? "#1C191730" : "var(--border)"}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[13px] font-medium ${p.status === "completed" ? "line-through opacity-60" : ""}`}>
              {p.title}
            </span>
            <StatusPill status={p.status} />
            {isOverdue && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{ background: "#1C191715", color: "#1C1917", border: "1px solid #1C191730" }}>
                Zaległe
              </span>
            )}
          </div>
          {p.description && (
            <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: "var(--muted)" }}>
              {p.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {p.owner_label && (
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                👤 {p.owner_label}
              </span>
            )}
            {score !== null && <AccountabilityBadge score={score} size="sm" />}
            {p.deadline && (
              <span className="text-[11px] tabular-nums" style={{ color: isOverdue ? "#1C1917" : "var(--muted)" }}>
                📅 {p.deadline.slice(5).replace("-", ".")}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setOpen(!open)}
            className="text-[11px] px-2 py-1 rounded transition-colors hover:bg-[var(--ba-4)]"
            style={{ color: "var(--muted)" }}>
            Status ▾
          </button>
          <button onClick={() => onDelete(p.id)}
            className="text-[11px] px-2 py-1 rounded transition-colors hover:bg-[var(--ba-4)]"
            style={{ color: "var(--muted)" }}>
            ✕
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-2 flex gap-1.5 flex-wrap">
          {STATUSES.map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <button key={s}
                onClick={() => { onStatusChange(p.id, s); setOpen(false); }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-opacity hover:opacity-80"
                style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
