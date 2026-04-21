"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export type DailyMetric = {
  date: string;
  spend: number;
  leads: number;
};

export function MetricsChart({ data }: { data: DailyMetric[] }) {
  if (data.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-sm text-[var(--muted)]">
        Brak danych. Podłącz konto Meta Ads aby zobaczyć metryki.
      </div>
    );
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
          <XAxis
            dataKey="date"
            stroke="#78716C"
            style={{ fontSize: 11.5 }}
            tickFormatter={(d) =>
              new Date(d).toLocaleDateString("pl-PL", { month: "short", day: "numeric" })
            }
          />
          <YAxis
            yAxisId="spend"
            stroke="#ff4c00"
            style={{ fontSize: 11.5 }}
            tickFormatter={(v) => `${v} zł`}
          />
          <YAxis
            yAxisId="leads"
            orientation="right"
            stroke="#22c55e"
            style={{ fontSize: 11.5 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 7,
              fontSize: 12,
              color: "#0C0A08",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelFormatter={(d) => new Date(d).toLocaleDateString("pl-PL")}
            formatter={(value, name) => {
              const v = Number(value ?? 0);
              return name === "spend"
                ? [`${v.toFixed(2)} zł`, "Wydatki"]
                : [v, "Leady"];
            }}
          />
          <Legend
            formatter={(v) => (v === "spend" ? "Wydatki" : "Leady")}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Line
            yAxisId="spend"
            type="monotone"
            dataKey="spend"
            stroke="#ff4c00"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="leads"
            type="monotone"
            dataKey="leads"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
