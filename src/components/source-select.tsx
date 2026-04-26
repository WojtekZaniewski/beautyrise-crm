"use client";

import { useRouter } from "next/navigation";

const SOURCES = [
  { label: "Wszystkie źródła", value: "all" },
  { label: "Meta Ads", value: "meta_ads" },
  { label: "SMS", value: "sms" },
  { label: "E-mail", value: "email" },
  { label: "Ręczne", value: "manual" },
  { label: "Import", value: "import" },
  { label: "Webhook", value: "webhook" },
];

export function SourceSelect({ current }: { current: string }) {
  const router = useRouter();

  return (
    <select
      value={current}
      onChange={(e) => router.push(`/leads/kanban?source=${e.target.value}`)}
      className="rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
      style={{
        background: "var(--ba-4)",
        border: "1px solid var(--border-strong)",
        color: "var(--text)",
      }}
    >
      {SOURCES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
