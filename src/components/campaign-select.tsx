"use client";

import { useRouter } from "next/navigation";

type Campaign = { id: string; name: string };

export function CampaignSelect({
  campaigns,
  current,
}: {
  campaigns: Campaign[];
  current: string;
}) {
  const router = useRouter();

  return (
    <select
      value={current}
      onChange={(e) =>
        router.push(`/leads/kanban?source=meta_ads&campaign=${e.target.value}`)
      }
      className="rounded-lg px-3 py-1.5 text-sm outline-none transition-colors"
      style={{
        background: "var(--ba-4)",
        border: "1px solid var(--border-strong)",
        color: "var(--text)",
      }}
    >
      <option value="all">Wszystkie kampanie</option>
      {campaigns.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
