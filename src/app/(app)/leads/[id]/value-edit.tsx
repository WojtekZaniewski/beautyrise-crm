"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function ValueEdit({ leadId, value }: { leadId: string; value: number | null }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value?.toString() ?? "");
  const [displayValue, setDisplayValue] = useState(value);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Sync when navigating to a different lead
  useEffect(() => {
    setVal(value?.toString() ?? "");
    setDisplayValue(value);
    setEditing(false);
  }, [value, leadId]);

  async function save() {
    setSaving(true);
    const parsed = val === "" ? null : Number(val);
    await fetch(`/api/leads/${leadId}/value`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value_pln: parsed }),
    });
    setDisplayValue(parsed);
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        title="Kliknij aby edytować"
        className="text-left group flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
      >
        <span>
          {displayValue != null
            ? `${displayValue} zł`
            : <span style={{ color: "var(--muted)" }}>— kliknij aby dodać</span>}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0"
          style={{ color: "var(--accent)" }}
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="rounded px-2 py-0.5 text-sm w-28 outline-none"
        style={{ background: "var(--ba-4)", border: "1px solid var(--accent)", color: "var(--text)" }}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") setEditing(false);
        }}
      />
      <button onClick={save} disabled={saving} className="text-xs" style={{ color: "var(--accent)" }}>
        {saving ? "…" : "Zapisz"}
      </button>
      <button onClick={() => setEditing(false)} className="text-xs" style={{ color: "var(--muted)" }}>
        Anuluj
      </button>
    </div>
  );
}
