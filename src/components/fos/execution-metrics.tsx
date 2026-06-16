"use client";

import { useEffect, useState } from "react";
import type { FosMetrics } from "@/lib/fos-types";

const CARDS: {
  key: keyof FosMetrics;
  label: string;
  suffix?: string;
  danger?: boolean;
}[] = [
  { key: "tasksCompletedThisWeek", label: "Ukończone (tydzień)" },
  { key: "tasksOverdue", label: "Zaległe", danger: true },
  { key: "sprintCompletionRate", label: "Sprint", suffix: "%" },
  { key: "accountabilityScore", label: "Accountability", suffix: "%" },
  { key: "activeProjects", label: "Aktywne" },
  { key: "blockedTasks", label: "Zablokowane", danger: true },
];

export function ExecutionMetrics() {
  const [metrics, setMetrics] = useState<FosMetrics | null>(null);

  useEffect(() => {
    fetch("/api/fos/metrics")
      .then((r) => r.json())
      .then((d) => setMetrics(d));
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
      {CARDS.map(({ key, label, suffix, danger }) => {
        const val = metrics?.[key];
        const isDangerous = danger && val != null && (val as number) > 0;
        return (
          <div
            key={key}
            className="rounded-lg p-4"
            style={{
              background: isDangerous ? "#1C191710" : "var(--panel-solid)",
              border: `1px solid ${isDangerous ? "#1C191730" : "var(--border)"}`,
            }}
          >
            <div
              className="text-[10px] font-medium uppercase tracking-wide mb-2"
              style={{ color: "var(--muted)" }}
            >
              {label}
            </div>
            <div
              className="text-[22px] font-semibold leading-none tabular-nums"
              style={{ color: isDangerous ? "#1C1917" : "inherit" }}
            >
              {val == null ? "—" : `${val}${suffix ?? ""}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}
