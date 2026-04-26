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
}: {
  data: DayPoint[];
  totalSpend: number;
  totalRevenue: number;
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
