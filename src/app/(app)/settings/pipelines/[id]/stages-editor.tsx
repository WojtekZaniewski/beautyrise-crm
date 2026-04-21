"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string; color: string; order: number };

const COLORS = ["#ff4c00", "#3b82f6", "#22c55e", "#eab308", "#ef4444", "#f97316", "#a855f7"];

export function StagesEditor({
  pipelineId,
  initialStages,
}: {
  pipelineId: string;
  initialStages: Stage[];
}) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  async function add() {
    if (!newName.trim()) return;
    setLoading(true);
    await fetch(`/api/pipelines/${pipelineId}/stages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), color: newColor }),
    });
    setNewName("");
    setLoading(false);
    router.refresh();
  }

  async function rename(stage: Stage) {
    const name = window.prompt("Nowa nazwa", stage.name);
    if (!name || name === stage.name) return;
    await fetch(`/api/pipelines/stages/${stage.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    router.refresh();
  }

  async function recolor(stageId: string, color: string) {
    await fetch(`/api/pipelines/stages/${stageId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
    router.refresh();
  }

  async function remove(stage: Stage) {
    if (!window.confirm(`Usunąć etap "${stage.name}"?`)) return;
    const res = await fetch(`/api/pipelines/stages/${stage.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? "Błąd");
      return;
    }
    router.refresh();
  }

  async function move(stage: Stage, dir: -1 | 1) {
    const others = [...initialStages].sort((a, b) => a.order - b.order);
    const idx = others.findIndex((s) => s.id === stage.id);
    const swap = others[idx + dir];
    if (!swap) return;

    await Promise.all([
      fetch(`/api/pipelines/stages/${stage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: swap.order }),
      }),
      fetch(`/api/pipelines/stages/${swap.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: stage.order }),
      }),
    ]);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5">
        <div className="text-sm font-medium mb-3">Dodaj etap</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Nazwa etapu"
            className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <div className="flex gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`w-7 h-7 rounded-full border-2 ${newColor === c ? "border-white" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={add}
            disabled={loading || !newName.trim()}
            className="bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Dodaj
          </button>
        </div>
      </div>

      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl overflow-hidden">
        {initialStages.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-[var(--muted)]">
            Brak etapów. Dodaj pierwszy powyżej.
          </div>
        ) : (
          initialStages
            .sort((a, b) => a.order - b.order)
            .map((stage, idx) => (
              <div
                key={stage.id}
                className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)] last:border-0"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <div className="flex-1 font-medium">{stage.name}</div>
                <div className="flex gap-1">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => recolor(stage.id, c)}
                      className={`w-5 h-5 rounded-full border ${stage.color === c ? "border-white" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <button
                  onClick={() => move(stage, -1)}
                  disabled={idx === 0}
                  className="text-xs text-[var(--muted)] hover:text-white disabled:opacity-30 px-1"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(stage, 1)}
                  disabled={idx === initialStages.length - 1}
                  className="text-xs text-[var(--muted)] hover:text-white disabled:opacity-30 px-1"
                >
                  ↓
                </button>
                <button
                  onClick={() => rename(stage)}
                  className="text-xs text-[var(--muted)] hover:text-white"
                >
                  Zmień nazwę
                </button>
                <button
                  onClick={() => remove(stage)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Usuń
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
