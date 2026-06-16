"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string; color: string; order: number };

const COLORS = ["#ff4c00", "#FF4C00", "#FF4C00", "#FF8C42", "#1C1917", "#f97316", "#FF4C00"];

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
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="text-sm font-medium mb-3 text-[var(--text)]">Dodaj etap</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Nazwa etapu"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,76,0,0.45)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,76,0,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-strong)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <div className="flex gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${newColor === c ? "border-[var(--text)] scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={add}
            disabled={loading || !newName.trim()}
            className="btn-primary disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Dodaj
          </button>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
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
                className="flex items-center gap-3 px-5 py-3 last:border-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                <div className="flex-1 font-medium text-sm text-[var(--text)]">{stage.name}</div>
                <div className="flex gap-1">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => recolor(stage.id, c)}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${stage.color === c ? "border-[var(--text)]" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <button
                  onClick={() => move(stage, -1)}
                  disabled={idx === 0}
                  className="text-xs text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-30 px-1 transition-colors"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(stage, 1)}
                  disabled={idx === initialStages.length - 1}
                  className="text-xs text-[var(--muted)] hover:text-[var(--text)] disabled:opacity-30 px-1 transition-colors"
                >
                  ↓
                </button>
                <button
                  onClick={() => rename(stage)}
                  className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  Zmień nazwę
                </button>
                <button
                  onClick={() => remove(stage)}
                  className="text-xs transition-colors"
                  style={{ color: "var(--danger)" }}
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
