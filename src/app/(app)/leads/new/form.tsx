"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string; pipeline_id: string };
type Pipeline = { id: string; name: string };

const fieldClass = "rounded-lg px-3 py-2 text-sm outline-none transition-colors w-full";
const fieldStyle = {
  background: "var(--ba-4)",
  border: "1px solid var(--border-strong)",
  color: "var(--text)",
};

export function NewLeadForm({
  pipelines,
  stages,
  workspaceId,
}: {
  pipelines: Pipeline[];
  stages: Stage[];
  workspaceId: string;
}) {
  const router = useRouter();

  const [pipelineId, setPipelineId] = useState("");
  const pipelineStages = stages.filter((s) => s.pipeline_id === pipelineId);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    nip: "",
    source: "manual",
    stage_id: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.full_name,
        phone: form.phone || null,
        email: form.email || null,
        nip: form.nip || null,
        source: form.source,
        stage_id: form.stage_id || null,
        notes: form.notes || null,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error ?? "Wystąpił błąd");
      setLoading(false);
      return;
    }

    router.push(`/leads/${result.id}`);
    router.refresh();
  }

  const fields = [
    { key: "full_name", label: "Imię i nazwisko *", type: "text", required: true, placeholder: "Anna Kowalska" },
    { key: "phone", label: "Telefon", type: "tel", required: false, placeholder: "+48 600 000 000" },
    { key: "email", label: "E-mail", type: "email", required: false, placeholder: "anna@example.com" },
    { key: "nip", label: "NIP", type: "text", required: false, placeholder: "1234567890" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 flex flex-col gap-5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {error && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{
            color: "var(--danger)",
            background: "rgba(220,38,38,0.06)",
            border: "1px solid rgba(220,38,38,0.16)",
          }}
        >
          {error}
        </div>
      )}

      {fields.map((f) => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="text-sm text-[var(--muted)]">{f.label}</label>
          <input
            type={f.type}
            value={(form as Record<string, string>)[f.key]}
            onChange={(e) => set(f.key, e.target.value)}
            required={f.required}
            placeholder={f.placeholder}
            className={fieldClass}
            style={fieldStyle}
          />
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Pipeline</label>
        <select
          value={pipelineId}
          onChange={(e) => {
            const pid = e.target.value;
            setPipelineId(pid);
            const first = stages.find((s) => s.pipeline_id === pid);
            set("stage_id", first?.id ?? "");
          }}
          className={fieldClass}
          style={fieldStyle}
        >
          <option value="">— Brak pipeline&apos;u —</option>
          {pipelines.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {pipelineId && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[var(--muted)]">Etap</label>
          <select
            value={form.stage_id}
            onChange={(e) => set("stage_id", e.target.value)}
            className={fieldClass}
            style={fieldStyle}
          >
            {pipelineStages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Źródło</label>
        <select
          value={form.source}
          onChange={(e) => set("source", e.target.value)}
          className={fieldClass}
          style={fieldStyle}
        >
          <option value="manual">Ręcznie</option>
          <option value="meta_ads">Meta Ads</option>
          <option value="import">Import</option>
          <option value="webhook">Webhook</option>
          <option value="sms">SMS</option>
          <option value="email">E-mail</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Notatki</label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Dodatkowe informacje…"
          className={`${fieldClass} resize-none`}
          style={fieldStyle}
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 btn-ghost rounded-lg py-2.5 text-sm transition-colors"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-primary disabled:opacity-50 rounded-lg py-2.5 text-sm font-semibold"
        >
          {loading ? "Zapisywanie…" : "Zapisz lead"}
        </button>
      </div>
    </form>
  );
}
