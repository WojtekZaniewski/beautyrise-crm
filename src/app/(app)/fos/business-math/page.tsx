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

const LS_CLIENTS = "bm_returning_clients";
const LS_SPEND = "bm_avg_spend";

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

function computeTargets(currentMonthly: number): number[] {
  if (currentMonthly <= 0) return [5000, 10000, 15000, 20000];
  const base = Math.ceil((currentMonthly + 1) / 5000) * 5000;
  return [base, base + 5000, base + 10000, base + 20000];
}

function NumInput({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className="text-[11px] font-semibold uppercase tracking-wide block mb-2"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-28 text-[24px] font-bold text-right rounded-xl px-3 py-2 outline-none transition-all tabular-nums"
          style={{
            background: "var(--ba-4)",
            color: "var(--text)",
            border: `2px solid ${focused ? "var(--accent)" : "var(--border)"}`,
          }}
        />
        {suffix && (
          <span className="text-[15px] font-medium" style={{ color: "var(--muted)" }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <div className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>
          {hint}
        </div>
      )}
    </div>
  );
}

export default function BusinessMathPage() {
  const [data, setData] = useState<BizMathData | null>(null);
  const [clients, setClients] = useState("30");
  const [spend, setSpend] = useState("300");

  const clientsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage
  useEffect(() => {
    const storedClients = localStorage.getItem(LS_CLIENTS);
    const storedSpend = localStorage.getItem(LS_SPEND);
    if (storedClients) setClients(storedClients);
    if (storedSpend) setSpend(storedSpend);
  }, []);

  // Fetch sparkline data (non-blocking)
  useEffect(() => {
    fetch("/api/fos/business-math")
      .then((r) => r.json())
      .then(setData)
      .catch(() => null);
  }, []);

  function handleClients(val: string) {
    setClients(val);
    if (clientsTimer.current) clearTimeout(clientsTimer.current);
    clientsTimer.current = setTimeout(() => {
      if (parseInt(val, 10) > 0) localStorage.setItem(LS_CLIENTS, val);
    }, 500);
  }

  function handleSpend(val: string) {
    setSpend(val);
    if (spendTimer.current) clearTimeout(spendTimer.current);
    spendTimer.current = setTimeout(() => {
      if (parseInt(val, 10) > 0) localStorage.setItem(LS_SPEND, val);
    }, 500);
  }

  const numClients = Math.max(0, parseInt(clients, 10) || 0);
  const numSpend = Math.max(0, parseInt(spend, 10) || 0);
  const currentMonthly = numClients * numSpend;
  const targets = computeTargets(currentMonthly);

  const chartData = (data?.months ?? []).map((m) => ({
    name: monthShort(m.month),
    income: m.income,
  }));
  const hasChartData = chartData.some((m) => m.income > 0);

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

      {/* Inputs */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="text-[10px] font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--muted)" }}
        >
          Twoje dane
        </div>
        <div className="flex flex-wrap gap-8">
          <NumInput
            label="Powracające klientki / mies."
            value={clients}
            onChange={handleClients}
            suffix="os."
            hint="Ile klientek wraca co miesiąc"
          />
          <NumInput
            label="Śr. wydatki klientki / mies."
            value={spend}
            onChange={handleSpend}
            suffix="zł"
            hint="Ile średnio wydaje jedna klientka"
          />
        </div>

        {/* Computed current revenue */}
        {currentMonthly > 0 && (
          <div
            className="mt-5 pt-4 flex items-baseline gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-[12px]" style={{ color: "var(--muted)" }}>
              Obecny przychód z powracających:
            </span>
            <span
              className="text-[22px] font-bold tabular-nums"
              style={{ color: "var(--accent)" }}
            >
              {fmtPln(currentMonthly)}
            </span>
            <span className="text-[12px]" style={{ color: "var(--muted)" }}>
              / mies.
            </span>
          </div>
        )}
      </div>

      {/* Goals */}
      <div
        className="rounded-2xl px-5 py-5"
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

        {numSpend <= 0 ? (
          <div
            className="text-[13px] italic text-center py-3"
            style={{ color: "var(--muted)" }}
          >
            Wpisz średnie wydatki klientki, żeby zobaczyć cele.
          </div>
        ) : (
          <div className="space-y-5">
            {targets.map((target) => {
              const needed = Math.ceil(target / numSpend);
              const progress = numClients > 0 ? Math.min(1, numClients / needed) : 0;
              const gap = Math.max(0, needed - numClients);
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
                        className="text-[16px] font-bold tabular-nums"
                        style={{ color: "var(--text)" }}
                      >
                        {fmtPln(target)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-[15px] font-bold tabular-nums"
                        style={{ color: achieved ? "#16a34a" : "var(--text)" }}
                      >
                        {needed} kl.
                      </span>
                      {!achieved && numClients > 0 && (
                        <span
                          className="text-[11px]"
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

                  {numClients > 0 && (
                    <div
                      className="text-[10px] mt-1"
                      style={{ color: "var(--muted)" }}
                    >
                      {achieved
                        ? "Cel osiągnięty przy obecnej bazie"
                        : `${pct}% drogi — brakuje ${gap} ${gap === 1 ? "klientki" : "klientek"}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Actual revenue sparkline — reference only */}
      {hasChartData && (
        <div
          className="rounded-2xl px-5 py-4"
          style={{
            background: "var(--panel-solid)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-widest mb-1"
            style={{ color: "var(--muted)" }}
          >
            Przychody z systemu · ostatnie 6 miesięcy
          </div>
          {data?.avgMonthlyRevenue ? (
            <div className="text-[13px] mb-3" style={{ color: "var(--muted)" }}>
              Śr.{" "}
              <strong style={{ color: "var(--text)" }}>
                {fmtPln(data.avgMonthlyRevenue)}
              </strong>{" "}
              / mies. z wprowadzonych płatności
            </div>
          ) : null}
          <div style={{ height: 56 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 2, right: 0, left: 0, bottom: 14 }}
              >
                <defs>
                  <linearGradient id="bm-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4C00" stopOpacity={0.18} />
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
        </div>
      )}
    </div>
  );
}
