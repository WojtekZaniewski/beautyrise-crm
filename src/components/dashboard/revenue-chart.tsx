"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type DayPoint = { date: string; spend: number; revenue: number };

export type MetaAdsSummary = {
  avgCPL: number | null;
  avgCPC: number | null;
  ctr: number | null;
  totalClicks: number;
  totalLeads: number;
  totalImpressions: number;
  totalSpend: number;
};

type FilterMode = "both" | "spend" | "revenue";

const FILTER_OPTIONS: { key: FilterMode; label: string }[] = [
  { key: "spend", label: "Wydatki" },
  { key: "revenue", label: "Przychód" },
  { key: "both", label: "Oba" },
];

function pln(v: number) {
  return v.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  });
}

export function RevenueChart({
  data,
  totalSpend,
  totalRevenue,
  metaStats,
}: {
  data: DayPoint[];
  totalSpend: number;
  totalRevenue: number;
  metaStats?: MetaAdsSummary | null;
}) {
  const [filter, setFilter] = useState<FilterMode>("both");

  const profit = totalRevenue - totalSpend;
  const hasData = totalSpend > 0 || totalRevenue > 0;

  if (!hasData) return null;

  const summary = [
    { label: "Wydatki (30 dni)", value: pln(totalSpend), color: "#3b82f6" },
    { label: "Przychód (30 dni)", value: pln(totalRevenue), color: "#22c55e" },
    {
      label: profit >= 0 ? "Zysk" : "Strata",
      value: pln(Math.abs(profit)),
      color: profit >= 0 ? "#22c55e" : "#ef4444",
    },
  ];

  const metaStatItems = metaStats
    ? [
        { label: "Śr. CPL", value: metaStats.avgCPL != null ? pln(metaStats.avgCPL) : "—" },
        { label: "Śr. CPC", value: metaStats.avgCPC != null ? pln(metaStats.avgCPC) : "—" },
        { label: "CTR", value: metaStats.ctr != null ? `${(metaStats.ctr * 100).toFixed(2)}%` : "—" },
        { label: "Kliknięcia", value: metaStats.totalClicks.toLocaleString("pl-PL") },
        { label: "Leady (kampanie)", value: metaStats.totalLeads.toLocaleString("pl-PL") },
        { label: "Wyświetlenia", value: metaStats.totalImpressions.toLocaleString("pl-PL") },
      ]
    : [];

  return (
    <section
      className="rounded-lg p-5"
      style={{
        background: "var(--panel-solid)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13.5px] font-semibold tracking-tight">
          Wyniki finansowe (30 dni)
        </h2>
        <div className="flex gap-1">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all"
              style={{
                background: filter === f.key ? "var(--accent-subtle)" : "var(--ba-4)",
                color: filter === f.key ? "var(--accent-2)" : "var(--muted)",
                border: filter === f.key ? "1px solid rgba(255,76,0,0.2)" : "1px solid var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Meta Ads stats grid */}
      {metaStatItems.length > 0 && (
        <div
          className="rounded-lg p-3 mb-4"
          style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.14)" }}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold"
              style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}
            >
              f
            </div>
            <span className="text-[10.5px] font-semibold" style={{ color: "#3b82f6" }}>
              Meta Ads (30 dni)
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {metaStatItems.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>{s.label}</span>
                <span className="text-[13px] font-semibold tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-5">
        {summary.map((item) => (
          <div
            key={item.label}
            className="flex flex-col px-4 py-2.5 rounded-lg"
            style={{
              background: `${item.color}10`,
              border: `1px solid ${item.color}30`,
            }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-wide mb-1"
              style={{ color: "var(--muted)" }}
            >
              {item.label}
            </span>
            <span
              className="text-[18px] font-semibold tabular-nums leading-none"
              style={{ color: item.color }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v} zł`}
            width={60}
          />
          <Tooltip
            formatter={(v: unknown) => pln(v as number)}
            contentStyle={{
              fontSize: 12,
              background: "var(--panel-solid)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 10px",
            }}
          />
          {(filter === "spend" || filter === "both") && (
            <Area
              type="monotone"
              dataKey="spend"
              name="Wydatki"
              stroke="#3b82f6"
              fill="url(#gradSpend)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3 }}
            />
          )}
          {(filter === "revenue" || filter === "both") && (
            <Area
              type="monotone"
              dataKey="revenue"
              name="Przychód"
              stroke="#22c55e"
              fill="url(#gradRevenue)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
