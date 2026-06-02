"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function LeadContactEdit({
  leadId,
  field,
  value,
}: {
  leadId: string;
  field: "email" | "phone";
  value: string | null;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value ?? "");
  const [displayValue, setDisplayValue] = useState(value);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setVal(value ?? "");
    setDisplayValue(value);
    setEditing(false);
  }, [value, leadId]);

  async function save() {
    setSaving(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: val.trim() || null }),
    });
    setDisplayValue(val.trim() || null);
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
        <span className="text-[13px]">
          {displayValue != null ? displayValue : (
            <span style={{ color: "var(--muted)" }}>— dodaj</span>
          )}
        </span>
        <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="opacity-0 group-hover:opacity-50 transition-opacity shrink-0"
          style={{ color: "var(--accent)" }}
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <input
        type={field === "email" ? "email" : "tel"}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={field === "email" ? "adres@email.com" : "+48 000 000 000"}
        className="rounded px-2 py-0.5 text-[13px] outline-none"
        style={{
          background: "var(--ba-4)",
          border: "1px solid var(--accent)",
          color: "var(--text)",
          width: field === "email" ? "210px" : "160px",
        }}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") {
            setEditing(false);
            setVal(displayValue ?? "");
          }
        }}
      />
      <button
        onClick={save}
        disabled={saving}
        className="text-[12px] font-medium"
        style={{ color: "var(--accent)" }}
      >
        {saving ? "…" : "Zapisz"}
      </button>
      <button
        onClick={() => {
          setEditing(false);
          setVal(displayValue ?? "");
        }}
        className="text-[12px]"
        style={{ color: "var(--muted)" }}
      >
        Anuluj
      </button>
    </div>
  );
}
