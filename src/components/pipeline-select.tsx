"use client";

import { useRouter } from "next/navigation";

type Pipeline = { id: string; name: string };

export function PipelineSelect({
  pipelines,
  currentPipelineId,
}: {
  pipelines: Pipeline[];
  currentPipelineId: string | null;
}) {
  const router = useRouter();

  async function switchTo(id: string) {
    await fetch("/api/pipeline/switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pipeline_id: id }),
    });
    router.refresh();
  }

  if (pipelines.length === 0) {
    return (
      <div className="text-sm text-[var(--muted)]">Brak pipeline&apos;ów</div>
    );
  }

  return (
    <select
      value={currentPipelineId ?? ""}
      onChange={(e) => switchTo(e.target.value)}
      className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--accent)]"
    >
      {pipelines.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
