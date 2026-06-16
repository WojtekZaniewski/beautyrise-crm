"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from "recharts";

type MonthPoint = {
  month: string;
  income: number;
  potential: number;
  expense: number;
  profit: number;
};

type CategoryPoint = {
  name: string;
  value: number;
};

const EXPENSE_COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#FF4C00"];
const INCOME_COLOR = "#22c55e";
const POTENTIAL_COLOR = "#f59e0b";
const EXPENSE_COLOR = "#ef4444";
const PROFIT_COLOR = "#FF4C00";

function fmtPln(n: number) {
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k zł`;
  return `${n.toLocaleString("pl-PL", { minimumFractionDigits: 0 })} zł`;
}

function CustomTooltipBar({ active, payload, label }: {
  active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-[12px] shadow-lg"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="font-semibold mb-1.5">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[var(--muted)]">{p.name}:</span>
          <span className="font-medium" style={{ color: p.color }}>{fmtPln(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function CustomTooltipPie({ active, payload }: {
  active?: boolean; payload?: Array<{ name: string; value: number; payload: CategoryPoint }>
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-xl px-3 py-2 text-[12px] shadow-lg"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="font-semibold">{item.name}</div>
      <div style={{ color: EXPENSE_COLOR }}>{fmtPln(item.value)}</div>
    </div>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  revenue: "Przychód", ads: "Reklamy", tools: "Narzędzia",
  salary: "Wynagrodzenia", office: "Biuro", other: "Inne",
};

export function FinanceCharts({
  monthlyData,
  categoryData,
}: {
  monthlyData: MonthPoint[];
  categoryData: CategoryPoint[];
}) {
  const hasMonthly = monthlyData.some((d) => d.income > 0 || d.potential > 0 || d.expense > 0);
  const hasCategory = categoryData.some((d) => d.value > 0);

  if (!hasMonthly && !hasCategory) {
    return (
      <div
        className="rounded-2xl p-6 text-center text-[13px] text-[var(--muted)]"
        style={{ border: "1px dashed var(--border)" }}
      >
        Dodaj wpisy aby zobaczyć wykresy
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* Monthly trend chart */}
      {hasMonthly && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-4">Trend miesięczny</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={2} barCategoryGap="25%">
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => fmtPln(v as number)}
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltipBar />} />
              <Bar dataKey="income" name="Przychód" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="potential" name="Potencjalny" fill={POTENTIAL_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Wydatki" fill={EXPENSE_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Zysk" fill={PROFIT_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category breakdown */}
      {hasCategory && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-4">Wydatki wg kategorii</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData.map((d) => ({ ...d, name: CATEGORY_LABELS[d.name] ?? d.name }))}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltipPie />} />
              <Legend
                formatter={(v) => <span style={{ fontSize: 11, color: "var(--muted)" }}>{v}</span>}
                iconSize={8}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
