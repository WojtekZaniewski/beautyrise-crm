"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface BizMathData {
  months: { month: string; income: number }[];
  avgMonthlyRevenue: number;
  leadsCount: number;
}

const LS_KEY = "bm_returning_clients";

function fmtPln(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

function monthShort(month: string) {
  const d = new Date(month + "-15");
  return d.toLocaleDateString("pl-PL", { month: "short" }).replace(".", "");
}

function computeTargets(currentAvg: number): number[] {
  if (currentAvg <= 0) return [5000, 10000, 15000, 20000];
  const base = Math.ceil((currentAvg + 1) / 5000) * 5000;
  return [base, base + 5000, base + 10000, base + 20000];
}

export default function BusinessMathPage() {
  const [data, setData] = useState<BizMathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [returningClients, setReturningClients] = useState(30);
  const [inputValue, setInputValue] = useState("30");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      const n = parseInt(stored, 10);
      if (!isNaN(n) && n > 0) {
        setReturningClients(n);
        setInputValue(String(n));
      }
    }
  }, []);

  useEffect(() => {
    fetch("/api/fos/business-math")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  function handleClientsChange(val: string) {
    setInputValue(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n > 0) {
      setReturningClients(n);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        localStorage.setItem(LS_KEY, String(n));
      }, 500);
    }
  }

  const avg = data?.avgMonthlyRevenue ?? 0;
  const leadsCount = data?.leadsCount ?? 0;
  const avgClientValue = returningClients > 0 && avg > 0 ? avg / returningClients : 0;
  const targets = computeTargets(avg);

  const chartData = (data?.months ?? []).map((m) => ({
    name: monthShort(m.month),
    income: m.income,
  }));

  if (loading) {
    return (
      <div className="w-full px-4 py-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl animate-pulse"
            style={{ background: "var(--panel-solid)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Link
          href="/fos"
          className="text-[12px] transition-opacity hover:opacity-60"
          style={{ color: "var(--muted)" }}
        >
          ← Founder OS
        </Link>
        <span style={{ color: "var(--border)" }}>·</span>
        <h1
          className="text-[18px] font-bold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Business Math
        </h1>
      </div>

      {/* Revenue card */}
      <div
        className="rounded-2xl px-5 py-4"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="text-[10px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--muted)" }}
        >
          Średni miesięczny przychód · ostatnie 3 miesiące
        </div>
        <div
          className="text-[30px] font-bold tabular-nums leading-none"
          style={{ color: avg > 0 ? "var(--text)" : "var(--muted)" }}
        >
          {avg > 0 ? fmtPln(avg) : "Brak danych"}
        </div>
        <div className="text-[11px] mt-1 mb-3" style={{ color: "var(--muted)" }}>
          {avg === 0 ? (
            <>
              Dodaj przychody w{" "}
              <Link
                href="/finances"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Finanse
              </Link>
              , żeby kalkulator działał.
            </>
          ) : (
            <>Baza: {leadsCount} leadów</>
          )}
        </div>

        {/* Sparkline */}
        {chartData.some((m) => m.income > 0) && (
          <div style={{ height: 68 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 0, left: 0, bottom: 16 }}
              >
                <defs>
                  <linearGradient id="bm-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4C00" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#FF4C00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "var(--muted)" }}
                  axisLine={false}
                  tickLine={false}
                  height={14}
                />
                <Tooltip
                  formatter={(v) => [fmtPln(Number(v)), "Przychód"]}
                  contentStyle={{
                    background: "var(--panel-solid)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "var(--text)",
                  }}
                  labelStyle={{ color: "var(--muted)" }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#FF4C00"
                  strokeWidth={1.5}
                  fill="url(#bm-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Input card */}
      <div
        className="rounded-2xl px-5 py-4"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="text-[10px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--muted)" }}
        >
          Twoje dane
        </div>
        <div className="flex items-center gap-6">
          <div>
            <label
              className="text-[12px] font-medium block mb-1.5"
              style={{ color: "var(--text)" }}
            >
              Powracające klientki / miesiąc
            </label>
            <input
              type="number"
              min="1"
              value={inputValue}
              onChange={(e) => handleClientsChange(e.target.value)}
              className="w-20 text-[22px] font-bold text-center rounded-xl px-2 py-2 outline-none transition-all"
              style={{
                background: "var(--ba-4)",
                color: "var(--text)",
                border: "2px solid var(--border)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--accent)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border)")
              }
            />
          </div>
          <div className="flex-1 border-l pl-6" style={{ borderColor: "var(--border)" }}>
            <div
              className="text-[11px] mb-0.5"
              style={{ color: "var(--muted)" }}
            >
              Avg wartość klientki
            </div>
            <div
              className="text-[24px] font-bold tabular-nums leading-tight"
              style={{ color: avgClientValue > 0 ? "var(--accent)" : "var(--muted)" }}
            >
              {avgClientValue > 0 ? fmtPln(Math.round(avgClientValue)) : "–"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              zł / miesiąc
            </div>
          </div>
        </div>
      </div>

      {/* Targets card */}
      <div
        className="rounded-2xl px-5 py-4"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="text-[10px] font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--muted)" }}
        >
          Ile klientek do celu?
        </div>

        {avgClientValue <= 0 ? (
          <div
            className="text-[13px] text-center py-4 italic"
            style={{ color: "var(--muted)" }}
          >
            Uzupełnij przychody i liczbę klientek, żeby zobaczyć cele.
          </div>
        ) : (
          <div className="space-y-4">
            {targets.map((target) => {
              const needed = Math.ceil(target / avgClientValue);
              const progress = Math.min(1, returningClients / needed);
              const gap = Math.max(0, needed - returningClients);
              const achieved = gap === 0;
              const pct = Math.round(progress * 100);

              return (
                <div key={target}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {achieved && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: "#dcfce7", color: "#16a34a" }}
                        >
                          ✓
                        </span>
                      )}
                      <span
                        className="text-[15px] font-bold tabular-nums"
                        style={{ color: "var(--text)" }}
                      >
                        {fmtPln(target)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-[13px] font-semibold tabular-nums"
                        style={{ color: achieved ? "#16a34a" : "var(--text)" }}
                      >
                        {needed} kl.
                      </span>
                      {!achieved && (
                        <span
                          className="text-[11px] ml-1.5"
                          style={{ color: "var(--muted)" }}
                        >
                          +{gap} brakuje
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "var(--ba-4)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: achieved
                          ? "#22c55e"
                          : "linear-gradient(90deg, #FF4C00 0%, #FF7A3D 100%)",
                      }}
                    />
                  </div>

                  <div
                    className="text-[10px] mt-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {achieved
                      ? "Już osiągnięto przy obecnej bazie klientek"
                      : `${pct}% drogi`}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Current position */}
        {avgClientValue > 0 && (
          <div
            className="mt-4 pt-3 flex items-center gap-1.5 text-[12px]"
            style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
          >
            <span>Aktualnie:</span>
            <strong style={{ color: "var(--text)" }}>
              {returningClients} klientek
            </strong>
            <span>=</span>
            <strong style={{ color: "var(--accent)" }}>
              {fmtPln(Math.round(avgClientValue * returningClients))}/mies.
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
