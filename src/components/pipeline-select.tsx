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
      className="rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
      style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
    >
      {pipelines.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
