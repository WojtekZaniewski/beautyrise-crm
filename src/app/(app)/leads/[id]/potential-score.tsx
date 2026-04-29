"use client";

import { useState } from "react";

function scoreColor(s: number): string {
  if (s <= 3) return "#ef4444";
  if (s <= 6) return "#f59e0b";
  return "#16a34a";
}

export function PotentialScore({
  leadId,
  initialScore,
}: {
  leadId: string;
  initialScore: number | null;
}) {
  const [score, setScore] = useState<number | null>(initialScore);
  const [saving, setSaving] = useState(false);

  async function handleClick(val: number) {
    if (saving) return;
    const newScore = score === val ? null : val;
    setScore(newScore);
    setSaving(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ potential_score: newScore }),
    });
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div
          className="text-[10.5px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: "var(--muted)" }}
        >
          Potencjał zamknięcia
        </div>
        {score !== null && (
          <span
            className="text-[12px] font-bold"
            style={{ color: scoreColor(score) }}
          >
            {score}/10
          </span>
        )}
      </div>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => {
          const isActive = score === i;
          const col = scoreColor(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              disabled={saving}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                border: isActive ? `2px solid ${col}` : "1px solid var(--border-strong)",
                background: isActive ? col : "var(--ba-4)",
                color: isActive ? "#fff" : "var(--muted)",
                transition: "all 0.1s",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {i}
            </button>
          );
        })}
      </div>
    </div>
  );
}
