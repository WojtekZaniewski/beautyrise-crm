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

interface Client {
  id: string;
  name: string;
  amount: number;
}

const LS_CLIENTS = "bm_clients_list";

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

function genId() {
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseAmount(v: string): number {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      <div className="text-[24px] font-bold tabular-nums" style={{ color: accent ? "var(--accent)" : "var(--text)" }}>
        {value}
      </div>
    </div>
  );
}

export default function BusinessMathPage() {
  const [data, setData] = useState<BizMathData | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [draftName, setDraftName] = useState("");
  const [draftAmount, setDraftAmount] = useState("");

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved clients from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_CLIENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setClients(
            parsed
              .filter((c) => c && typeof c.amount === "number")
              .map((c) => ({ id: c.id ?? genId(), name: String(c.name ?? ""), amount: Math.max(0, c.amount) })),
          );
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  // Persist (debounced) once initial load is done
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(LS_CLIENTS, JSON.stringify(clients));
    }, 400);
  }, [clients, loaded]);

  // Fetch sparkline data (non-blocking)
  useEffect(() => {
    fetch("/api/fos/business-math")
      .then((r) => r.json())
      .then(setData)
      .catch(() => null);
  }, []);

  function addClient() {
    const amount = parseAmount(draftAmount);
    if (amount <= 0) return;
    setClients((prev) => [...prev, { id: genId(), name: draftName.trim(), amount }]);
    setDraftName("");
    setDraftAmount("");
  }

  function updateClient(id: string, patch: Partial<Client>) {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function removeClient(id: string) {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  const count = clients.length;
  const totalMonthly = clients.reduce((s, c) => s + (c.amount || 0), 0);
  const avgSpend = count > 0 ? Math.round(totalMonthly / count) : 0;
  const targets = computeTargets(totalMonthly);

  const chartData = (data?.months ?? []).map((m) => ({
    name: monthShort(m.month),
    income: m.income,
  }));
  const hasChartData = chartData.some((m) => m.income > 0);

  const inputStyle = {
    background: "var(--ba-4)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

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
        <h1 className="text-[18px] font-bold tracking-tight" style={{ color: "var(--text)" }}>
          Business Math
        </h1>
      </div>

      {/* Returning clients list */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
          Powracające klientki
        </div>

        {/* Summary — computed automatically */}
        <div className="flex flex-wrap gap-8 mb-5">
          <Stat label="Klientek" value={`${count}`} />
          <Stat label="Śr. wydatki / klientkę" value={fmtPln(avgSpend)} accent />
          <Stat label="Przychód / mies." value={fmtPln(totalMonthly)} />
        </div>

        {/* List */}
        {count > 0 && (
          <div className="space-y-2 mb-1">
            {clients.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2 group">
                <span className="text-[11px] w-5 text-right tabular-nums shrink-0" style={{ color: "var(--muted)" }}>
                  {i + 1}
                </span>
                <input
                  value={c.name}
                  onChange={(e) => updateClient(c.id, { name: e.target.value })}
                  placeholder="Imię (np. Ania)"
                  className="flex-1 min-w-0 text-[14px] rounded-lg px-3 py-2 outline-none transition-all"
                  style={inputStyle}
                />
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={c.amount ? String(c.amount) : ""}
                  onChange={(e) => updateClient(c.id, { amount: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                  placeholder="0"
                  className="w-24 text-[15px] font-semibold text-right rounded-lg px-3 py-2 outline-none transition-all tabular-nums"
                  style={inputStyle}
                />
                <span className="text-[13px] shrink-0" style={{ color: "var(--muted)" }}>zł</span>
                <button
                  onClick={() => removeClient(c.id)}
                  title="Usuń"
                  className="shrink-0 text-[13px] w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--muted)" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add row */}
        <div
          className={`flex items-center gap-2 ${count > 0 ? "mt-3 pt-3" : ""}`}
          style={count > 0 ? { borderTop: "1px solid var(--border)" } : undefined}
        >
          <span className="w-5 shrink-0" />
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addClient(); }}
            placeholder="Imię (np. Ania)"
            className="flex-1 min-w-0 text-[14px] rounded-lg px-3 py-2 outline-none transition-all"
            style={inputStyle}
          />
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={draftAmount}
            onChange={(e) => setDraftAmount(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addClient(); }}
            placeholder="0"
            className="w-24 text-[15px] font-semibold text-right rounded-lg px-3 py-2 outline-none transition-all tabular-nums"
            style={inputStyle}
          />
          <span className="text-[13px] shrink-0" style={{ color: "var(--muted)" }}>zł</span>
          <button
            onClick={addClient}
            disabled={parseAmount(draftAmount) <= 0}
            className="shrink-0 text-[13px] font-semibold px-3 py-2 rounded-lg transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)", color: "white" }}
          >
            + Dodaj
          </button>
        </div>

        {count === 0 && (
          <div className="text-[12px] italic mt-3" style={{ color: "var(--muted)" }}>
            Dodaj powracające klientki i ile wydają — średnia policzy się sama.
          </div>
        )}
      </div>

      {/* Goals */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
          Ile klientek do celu?
        </div>

        {avgSpend <= 0 ? (
          <div className="text-[13px] italic text-center py-3" style={{ color: "var(--muted)" }}>
            Dodaj klientki powyżej, żeby zobaczyć cele.
          </div>
        ) : (
          <div className="space-y-5">
            {targets.map((target) => {
              const needed = Math.ceil(target / avgSpend);
              const progress = count > 0 ? Math.min(1, count / needed) : 0;
              const gap = Math.max(0, needed - count);
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
                      <span className="text-[16px] font-bold tabular-nums" style={{ color: "var(--text)" }}>
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
                      {!achieved && count > 0 && (
                        <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                          +{gap} brakuje
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ba-4)" }}>
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

                  {count > 0 && (
                    <div className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>
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
          style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
            Przychody z systemu · ostatnie 6 miesięcy
          </div>
          {data?.avgMonthlyRevenue ? (
            <div className="text-[13px] mb-3" style={{ color: "var(--muted)" }}>
              Śr.{" "}
              <strong style={{ color: "var(--text)" }}>{fmtPln(data.avgMonthlyRevenue)}</strong>{" "}
              / mies. z wprowadzonych płatności
            </div>
          ) : null}
          <div style={{ height: 56 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 14 }}>
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
