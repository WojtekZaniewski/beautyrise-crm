"use client";

import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip,
  BarChart, Bar, XAxis,
} from "recharts";
import type { FosWeeklyPriority, FosWeekHistory } from "@/lib/fos-types";

type BusinessMath = {
  months: { month: string; income: number }[];
  avgMonthlyRevenue: number;
} | null;

function fmtPln(n: number) {
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k zł`;
  return `${Math.round(n).toLocaleString("pl-PL")} zł`;
}

const GREEN = "#22c55e";
const RED = "#ef4444";
const EMPTY = "rgba(0,0,0,0.06)";

export function WeeklyProductivity({
  priorities, history, businessMath, today,
}: {
  priorities: FosWeeklyPriority[];
  history: FosWeekHistory[];
  businessMath: BusinessMath;
  today: string;
}) {
  const tasks = priorities.filter((p) => !p.is_company_goal);
  const planned = tasks.length;
  const completed = tasks.filter((p) => p.status === "completed").length;
  const notDone = planned - completed;
  const overdue = tasks.filter(
    (p) => p.status !== "completed" && p.deadline && p.deadline < today,
  ).length;
  const inProgress = tasks.filter((p) => p.status === "in_progress").length;
  const blocked = tasks.filter((p) => p.status === "blocked").length;
  const pct = planned === 0 ? 0 : Math.round((completed / planned) * 100);
  const hasTasks = planned > 0;

  const donutData = hasTasks
    ? [
        { name: "Ukończone", value: completed, color: GREEN },
        { name: "Do zrobienia", value: notDone, color: RED },
      ]
    : [{ name: "Brak", value: 1, color: EMPTY }];

  const months = businessMath?.months ?? [];
  const monthIncome = months.length > 0 ? months[months.length - 1].income : 0;
  const incomeSpark = months.map((m) => ({ v: m.income }));

  const stats: { label: string; value: number; danger?: boolean; good?: boolean }[] = [
    { label: "Zaplanowane", value: planned },
    { label: "Ukończone", value: completed, good: completed > 0 },
    { label: "Do zrobienia", value: notDone, danger: notDone > 0 },
    { label: "Zaległe", value: overdue, danger: overdue > 0 },
    { label: "W toku", value: inProgress },
    { label: "Zablokowane", value: blocked, danger: blocked > 0 },
  ];

  const trend = history.map((w) => ({ name: w.week_label, completed: w.completed, planned: w.total }));

  return (
    <div className="glass-card rounded-xl px-4 py-4 mb-3">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
        📊 Produktywność tygodnia
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_180px] gap-4">
        {/* Donut: done vs not-done */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative" style={{ width: 140, height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%" cy="50%"
                  innerRadius={48} outerRadius={66}
                  paddingAngle={hasTasks ? 2 : 0}
                  dataKey="value" stroke="none" isAnimationActive={false}
                >
                  {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[26px] font-bold tabular-nums leading-none" style={{ color: pct === 100 ? GREEN : "var(--text)" }}>
                {pct}%
              </span>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>{completed}/{planned}</span>
            </div>
          </div>
          {notDone > 0 ? (
            <div className="mt-1.5 text-[11px] font-semibold" style={{ color: RED }}>{notDone} do nadrobienia</div>
          ) : hasTasks ? (
            <div className="mt-1.5 text-[11px] font-semibold" style={{ color: GREEN }}>Wszystko zrobione 🎉</div>
          ) : (
            <div className="mt-1.5 text-[11px]" style={{ color: "var(--muted)" }}>Brak zadań w tym tygodniu</div>
          )}
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-2 content-center">
          {stats.map((s) => {
            const color = s.danger ? RED : s.good ? GREEN : "var(--text)";
            return (
              <div key={s.label} className="rounded-lg px-3 py-2.5" style={{ background: "var(--ba-2)" }}>
                <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{s.label}</div>
                <div className="text-[22px] font-bold tabular-nums leading-none" style={{ color }}>{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Budget tile */}
        <div className="rounded-lg px-3 py-3 flex flex-col" style={{ background: "var(--ba-2)" }}>
          <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Wygenerowany budżet · ten miesiąc</div>
          <div className="text-[24px] font-bold tabular-nums leading-none mb-1" style={{ color: GREEN }}>{fmtPln(monthIncome)}</div>
          {businessMath && businessMath.avgMonthlyRevenue > 0 && (
            <div className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>śr. mies. {fmtPln(businessMath.avgMonthlyRevenue)}</div>
          )}
          {incomeSpark.length >= 2 && (
            <div className="mt-auto" style={{ height: 38 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={incomeSpark} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="budgetSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GREEN} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", color: GREEN }}>
                          {fmtPln(Number(payload[0].value))}
                        </div>
                      ) : null
                    }
                  />
                  <Area type="monotone" dataKey="v" stroke={GREEN} strokeWidth={1.5} fill="url(#budgetSpark)" dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Weekly trend: planned vs completed */}
      {trend.length >= 2 && (
        <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="text-[9px] uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>Trend tygodniowy · zaplanowane vs ukończone</div>
          <div style={{ height: 90 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend} barGap={2} barCategoryGap="28%">
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="rounded-lg px-2 py-1.5 text-[11px]" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                        <div className="font-semibold mb-0.5">{label}</div>
                        {payload.map((p) => (
                          <div key={String(p.name)} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                            <span style={{ color: "var(--muted)" }}>{p.name === "planned" ? "Zaplanowane" : "Ukończone"}:</span>
                            <span className="font-medium">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="planned" name="planned" fill="rgba(0,0,0,0.10)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="completed" name="completed" fill={GREEN} radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
