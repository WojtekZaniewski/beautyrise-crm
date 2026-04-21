"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ValueEdit({ leadId, value }: { leadId: string; value: number | null }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value?.toString() ?? "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    setSaving(true);
    await fetch(`/api/leads/${leadId}/value`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value_pln: val === "" ? null : Number(val) }),
    });
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="hover:text-[var(--accent)] transition-colors text-left"
      >
        {value != null ? `${value} zł` : <span className="text-[var(--muted)]">— kliknij aby dodać</span>}
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
        onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
      />
      <button onClick={save} disabled={saving} className="text-xs text-[var(--accent)]">
        {saving ? "…" : "Zapisz"}
      </button>
      <button onClick={() => setEditing(false)} className="text-xs text-[var(--muted)]">Anuluj</button>
    </div>
  );
}
