"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string; pipeline_id: string };
type Pipeline = { id: string; name: string };

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
  const supabase = createClient();

  const [pipelineId, setPipelineId] = useState(pipelines[0]?.id ?? "");
  const pipelineStages = stages.filter((s) => s.pipeline_id === pipelineId);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    source: "manual",
    stage_id: pipelineStages[0]?.id ?? "",
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

    const { data, error: err } = await supabase
      .from("leads")
      .insert({
        workspace_id: workspaceId,
        full_name: form.full_name,
        phone: form.phone || null,
        email: form.email || null,
        source: form.source,
        stage_id: form.stage_id || null,
        notes: form.notes || null,
      })
      .select("id")
      .single();

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // log created event
    await supabase.from("lead_events").insert({
      lead_id: data.id,
      type: "created",
      payload: { source: form.source },
    });

    router.push(`/leads/${data.id}`);
    router.refresh();
  }

  const fields = [
    { key: "full_name", label: "Imię i nazwisko *", type: "text", required: true, placeholder: "Anna Kowalska" },
    { key: "phone", label: "Telefon", type: "tel", required: false, placeholder: "+48 600 000 000" },
    { key: "email", label: "E-mail", type: "email", required: false, placeholder: "anna@example.com" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--panel)] border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-5"
    >
      {error && (
        <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">
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
            className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
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
          className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
        >
          {pipelines.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Etap</label>
        <select
          value={form.stage_id}
          onChange={(e) => set("stage_id", e.target.value)}
          className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
        >
          {pipelineStages.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Źródło</label>
        <select
          value={form.source}
          onChange={(e) => set("source", e.target.value)}
          className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
        >
          <option value="manual">Ręcznie</option>
          <option value="meta_ads">Meta Ads</option>
          <option value="import">Import</option>
          <option value="webhook">Webhook</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[var(--muted)]">Notatki</label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Dodatkowe informacje…"
          className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-[var(--border)] hover:border-[var(--accent)] rounded-lg py-2.5 text-sm transition-colors"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[var(--accent)] hover:opacity-90 disabled:opacity-50 rounded-lg py-2.5 text-sm font-semibold transition-opacity"
        >
          {loading ? "Zapisywanie…" : "Zapisz lead"}
        </button>
      </div>
    </form>
  );
}
