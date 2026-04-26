"use client";

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
      <h2 className="text-[13.5px] font-semibold tracking-tight mb-4">
        Wyniki finansowe (30 dni)
      </h2>

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
            formatter={(v: unknown, name: string) => [pln(v as number), name]}
            contentStyle={{
              fontSize: 12,
              background: "var(--panel-solid)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 10px",
            }}
          />
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
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
