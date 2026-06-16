"use client";

import { useEffect, useState } from "react";
import type { FosSprint, FosSprintGoalHistory } from "@/lib/fos-types";
import { SprintGoalModal } from "./sprint-goal-modal";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Aktywny", color: "#22c55e" },
  completed: { label: "Zakończony", color: "#6b7280" },
  archived: { label: "Archiwum", color: "#6b7280" },
};

export function SprintManager() {
  const [sprints, setSprints] = useState<FosSprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", goal: "", start_date: "", end_date: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Goal edit state
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [goalDraft, setGoalDraft] = useState("");
  const [confirmModal, setConfirmModal] = useState<{ sprintId: string; daysActive: number } | null>(null);

  // History
  const [historySprintId, setHistorySprintId] = useState<string | null>(null);
  const [history, setHistory] = useState<FosSprintGoalHistory[]>([]);

  // Completion pct
  const [editingPctId, setEditingPctId] = useState<string | null>(null);
  const [pctDraft, setPctDraft] = useState(0);

  const load = () => {
    setLoading(true);
    fetch("/api/fos/sprints")
      .then((r) => r.json())
      .then((d) => { setSprints(d.data ?? []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.name || !form.goal || !form.start_date || !form.end_date) {
      setError("Wypełnij wszystkie pola."); return;
    }
    setSaving(true); setError("");
    const res = await fetch("/api/fos/sprints", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    if (!res.ok) { setError(json.error); setSaving(false); return; }
    setForm({ name: "", goal: "", start_date: "", end_date: "" });
    setShowForm(false); setSaving(false); load();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/fos/sprints/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  };

  const saveGoal = async (sprintId: string, force = false) => {
    const res = await fetch(`/api/fos/sprints/${sprintId}/goal`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: goalDraft, force }),
    });
    const json = await res.json();
    if (json.requiresConfirmation) {
      setConfirmModal({ sprintId, daysActive: json.daysActive }); return;
    }
    setEditingGoalId(null); setConfirmModal(null); load();
  };

  const savePct = async (id: string) => {
    await fetch(`/api/fos/sprints/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ completion_pct: pctDraft }) });
    setEditingPctId(null); load();
  };

  const loadHistory = async (sprintId: string) => {
    if (historySprintId === sprintId) { setHistorySprintId(null); return; }
    const res = await fetch(`/api/fos/sprints/${sprintId}/goal`);
    const json = await res.json();
    setHistory(json.data ?? []); setHistorySprintId(sprintId);
  };

  if (loading) return <div className="text-[13px]" style={{ color: "var(--muted)" }}>Ładowanie...</div>;

  return (
    <div className="space-y-4">
      {confirmModal && (
        <SprintGoalModal
          daysActive={confirmModal.daysActive}
          onCancel={() => setConfirmModal(null)}
          onConfirm={() => saveGoal(confirmModal.sprintId, true)}
        />
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 rounded-lg text-[13px] font-medium text-white"
        style={{ background: "var(--accent)" }}
      >
        + Nowy Sprint
      </button>

      {showForm && (
        <div className="rounded-xl p-5 space-y-3" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
          <div className="text-[13px] font-semibold mb-1">Nowy sprint</div>
          {error && <div className="text-[12px] text-red-500">{error}</div>}
          <input
            placeholder="Nazwa (np. Sprint 12)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
          />
          <textarea
            placeholder="Główny cel sprintu"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            rows={2}
            className="w-full rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[var(--muted)] mb-1 block">Start</label>
              <input type="date" value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-[11px] text-[var(--muted)] mb-1 block">Koniec</label>
              <input type="date" value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={create} disabled={saving}
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-white disabled:opacity-50"
              style={{ background: "var(--accent)" }}>
              {saving ? "Zapisuję..." : "Utwórz"}
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }}
              className="px-4 py-2 rounded-lg text-[13px] transition-colors hover:bg-[var(--ba-4)]"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>
              Anuluj
            </button>
          </div>
        </div>
      )}

      {sprints.length === 0 && (
        <div className="text-[13px] py-8 text-center" style={{ color: "var(--muted)" }}>
          Brak sprintów. Utwórz pierwszy sprint, aby zacząć.
        </div>
      )}

      {sprints.map((sprint) => {
        const st = STATUS_LABELS[sprint.status] ?? STATUS_LABELS.active;
        return (
          <div key={sprint.id} className="rounded-xl p-5 space-y-3"
            style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-semibold">{sprint.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${st.color}15`, color: st.color, border: `1px solid ${st.color}30` }}>
                    {st.label}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--muted)] tabular-nums">
                  {sprint.start_date.slice(5).replace("-", ".")} – {sprint.end_date.slice(5).replace("-", ".")}
                </div>
              </div>
              {sprint.status === "active" && (
                <button onClick={() => updateStatus(sprint.id, "completed")}
                  className="text-[11px] px-3 py-1.5 rounded-lg shrink-0 transition-colors hover:bg-[var(--ba-4)]"
                  style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>
                  Zakończ sprint
                </button>
              )}
            </div>

            {/* Goal */}
            {editingGoalId === sprint.id ? (
              <div className="space-y-2">
                <textarea
                  value={goalDraft}
                  onChange={(e) => setGoalDraft(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
                />
                <div className="flex gap-2">
                  <button onClick={() => saveGoal(sprint.id)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
                    style={{ background: "var(--accent)" }}>
                    Zapisz cel
                  </button>
                  <button onClick={() => setEditingGoalId(null)}
                    className="px-3 py-1.5 rounded-lg text-[12px] transition-colors hover:bg-[var(--ba-4)]"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>
                    Anuluj
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 group">
                <p className="text-[13px] flex-1 leading-relaxed">{sprint.goal}</p>
                {sprint.status === "active" && (
                  <button
                    onClick={() => { setEditingGoalId(sprint.id); setGoalDraft(sprint.goal); }}
                    className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: "var(--accent)" }}>
                    Zmień cel
                  </button>
                )}
              </div>
            )}

            {/* Progress */}
            {sprint.status === "active" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--muted)]">Realizacja</span>
                  {editingPctId === sprint.id ? (
                    <div className="flex items-center gap-2">
                      <input type="number" min={0} max={100} value={pctDraft}
                        onChange={(e) => setPctDraft(Number(e.target.value))}
                        className="w-16 rounded px-2 py-0.5 text-[12px] text-center outline-none"
                        style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }} />
                      <button onClick={() => savePct(sprint.id)}
                        className="text-[11px] font-medium" style={{ color: "var(--accent)" }}>OK</button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditingPctId(sprint.id); setPctDraft(sprint.completion_pct); }}
                      className="text-[12px] font-semibold tabular-nums hover:underline"
                      style={{ color: "var(--accent)" }}>
                      {sprint.completion_pct}%
                    </button>
                  )}
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${sprint.completion_pct}%`, background: "var(--accent)" }} />
                </div>
              </div>
            )}

            {/* History toggle */}
            <button onClick={() => loadHistory(sprint.id)}
              className="text-[11px] hover:underline" style={{ color: "var(--muted)" }}>
              {historySprintId === sprint.id ? "Ukryj historię" : "Historia celów"}
            </button>
            {historySprintId === sprint.id && (
              <div className="space-y-2 pt-1">
                {history.length === 0 ? (
                  <div className="text-[12px] text-[var(--muted)]">Brak zmian celu.</div>
                ) : history.map((h) => (
                  <div key={h.id} className="rounded-lg p-3 text-[12px] space-y-1"
                    style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
                    <div className="text-[var(--muted)] line-through">{h.old_goal}</div>
                    <div>→ {h.new_goal}</div>
                    <div className="text-[10px] text-[var(--muted)]">
                      {new Date(h.changed_at).toLocaleString("pl-PL")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
