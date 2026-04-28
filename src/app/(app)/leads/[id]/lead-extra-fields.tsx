"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass = "rounded px-2 py-0.5 text-sm outline-none";
const inputStyle = { background: "var(--ba-4)", border: "1px solid var(--accent)", color: "var(--text)" };

function InlineEdit({
  leadId,
  field,
  value,
  placeholder = "— kliknij aby dodać",
}: {
  leadId: string;
  field: string;
  value: string | null;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    setSaving(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: val.trim() || null }),
    });
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="hover:text-[var(--accent)] transition-colors text-left text-[13px]"
      >
        {value ?? <span style={{ color: "var(--muted)" }}>{placeholder}</span>}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={inputClass}
        style={inputStyle}
        autoFocus
        onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
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

function SegmentSelect({
  leadId,
  field,
  value,
  options,
}: {
  leadId: string;
  field: string;
  value: string | null;
  options: { value: string; label: string }[];
}) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(newVal: string) {
    setSaving(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: newVal || null }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <select
      value={value ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className="rounded-lg px-2.5 py-1.5 text-[13px] outline-none w-full transition-colors"
      style={{
        background: value ? "rgba(255,76,0,0.06)" : "var(--ba-4)",
        border: value ? "1px solid rgba(255,76,0,0.25)" : "1px solid var(--border-strong)",
        color: "var(--text)",
        opacity: saving ? 0.6 : 1,
      }}
    >
      <option value="">— nie wybrano —</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

const labelClass = "text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1";

export function LeadNipField({
  leadId,
  nip,
}: {
  leadId: string;
  nip: string | null;
}) {
  return (
    <div>
      <div className={labelClass} style={{ color: "var(--muted)" }}>NIP</div>
      <InlineEdit leadId={leadId} field="nip" value={nip} placeholder="— kliknij aby dodać" />
    </div>
  );
}

export function LeadSegmentationFields({
  leadId,
  typ,
  obsluga,
}: {
  leadId: string;
  typ: string | null;
  obsluga: string | null;
}) {
  return (
    <div
      className="mt-5 pt-5 flex flex-col gap-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        className="text-[10.5px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: "var(--muted)" }}
      >
        Segmentacja — Dofinansowania
      </div>

      <div>
        <div className={labelClass} style={{ color: "var(--muted)" }}>Typ dofinansowania</div>
        <SegmentSelect
          leadId={leadId}
          field="dofinansowanie_typ"
          value={typ}
          options={[
            { value: "bur", label: "Dofinansowanie z BUR" },
            { value: "zwykle", label: "Zwykłe dofinansowanie" },
          ]}
        />
      </div>

      <div>
        <div className={labelClass} style={{ color: "var(--muted)" }}>Obsługa</div>
        <SegmentSelect
          leadId={leadId}
          field="dofinansowanie_obsluga"
          value={obsluga}
          options={[
            { value: "conpro", label: "Conpro" },
            { value: "martyna", label: "Martyna" },
          ]}
        />
      </div>
    </div>
  );
}
