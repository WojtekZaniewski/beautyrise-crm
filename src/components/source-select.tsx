"use client";

import { useRouter } from "next/navigation";

const INTEGRATIONS = [
  { label: "Wszystkie źródła", value: "all" },
  { label: "Meta Ads", value: "meta_ads" },
  { label: "E-mail", value: "email" },
  { label: "SMS", value: "sms" },
];

export function SourceSelect({ current }: { current: string }) {
  const router = useRouter();

  function handleChange(value: string) {
    if (value === "meta_ads") {
      router.push(`/leads/kanban?source=meta_ads&campaign=all`);
    } else {
      router.push(`/leads/kanban?source=${value}`);
    }
  }

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
      style={{
        background: "var(--ba-4)",
        border: "1px solid var(--border-strong)",
        color: "var(--text)",
      }}
    >
      {INTEGRATIONS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
