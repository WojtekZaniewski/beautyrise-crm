"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, Cell,
  XAxis, YAxis, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

export type DayPoint = {
  date: string; spend: number; revenue: number; clicks: number;
  impressions: number; leads: number; cpl: number; cpc: number; ctr: number;
};
export type MetaAdsSummary = {
  avgCPL: number | null; avgCPC: number | null; ctr: number | null;
  totalClicks: number; totalLeads: number; totalImpressions: number; totalSpend: number;
};
export type MetaCampaignStats = {
  id: string; name: string; spend: number; impressions: number;
  clicks: number; leads: number; cpl: number | null; ctr: number | null;
};
export type EmailCampaignStats = {
  id: string; name: string; sent: number; opened: number; clicked: number;
  replied: number; openRate: number; clickRate: number; replyRate: number;
  revenue: number; leadsWon: number;
};
export type SmsCampaignStats = {
  id: string; name: string; sent: number; replied: number; replyRate: number;
  revenue: number; leadsWon: number;
};
export type EmailDayPoint = { date: string; sent: number; opened: number; clicked: number };
export type SmsDayPoint = { date: string; sent: number; replied: number };

type Integration = "combined" | "meta" | "email" | "sms";
type MetaFilter = "spend" | "revenue" | "both" | "cpl" | "cpc" | "ctr" | "clicks" | "leads" | "impressions";
type EmailFilter = "sent" | "opened" | "clicked";
type SmsFilter = "sent" | "replied";

const PLN_META = new Set<MetaFilter>(["spend", "revenue", "both", "cpl", "cpc"]);
const PCT_META = new Set<MetaFilter>(["ctr"]);

function pln(v: number) {
  return v.toLocaleString("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 });
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="flex flex-col px-4 py-3 rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`,
        border: `1px solid ${color}28`,
        boxShadow: `0 0 0 1px ${color}0A`,
      }}
    >
      <span style={{ color: "var(--muted)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</span>
      <span style={{ color, fontSize: 20, fontWeight: 700, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{value}</span>
    </div>
  );
}

function RateCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        border: `1px solid ${color}25`,
      }}
    >
      <div style={{ color: "var(--muted)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
      <div style={{ color, fontSize: 26, fontWeight: 700, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function FunnelBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.min((value / total) * 100, 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>{label}</span>
        <span className="text-[11px] tabular-nums">
          <span className="font-semibold">{value.toLocaleString("pl-PL")}</span>
          {total > 0 && value !== total && (
            <span className="ml-1" style={{ color: "var(--muted)" }}>({pct.toFixed(1)}%)</span>
          )}
        </span>
      </div>
      <div className="h-[6px] rounded-full overflow-hidden" style={{ background: "var(--ba-8)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)` }}
        />
      </div>
    </div>
  );
}

const CHART_STYLE = {
  contentStyle: {
    fontSize: 12,
    background: "rgba(255,255,255,0.96)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "8px 12px",
    color: "var(--text)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    backdropFilter: "blur(8px)",
  },
  itemStyle: { color: "#44403c" },
  labelStyle: { color: "#78716C", marginBottom: 4, fontSize: 11 },
  cursor: { stroke: "rgba(255,76,0,0.35)", strokeWidth: 1 },
};

const META_FILTER_COLOR: Record<MetaFilter, string> = {
  spend:       "#FF4C00",
  revenue:     "#1C1917",
  both:        "#FF4C00",
  cpl:         "#FF8C42",
  cpc:         "#FF8C42",
  ctr:         "#FF8C42",
  clicks:      "#FF6B35",
  leads:       "#FF4C00",
  impressions: "#a3a3a3",
};

const EMAIL_COLOR: Record<EmailFilter, string> = { sent: "#FF4C00", opened: "#FF8C42", clicked: "#FF8C42" };
const EMAIL_LABEL: Record<EmailFilter, string> = { sent: "Wysłane", opened: "Otwarte", clicked: "Kliknięte" };
const SMS_COLOR: Record<SmsFilter, string> = { sent: "#FF4C00", replied: "#1C1917" };
const SMS_LABEL: Record<SmsFilter, string> = { sent: "Wysłane", replied: "Odpowiedzi" };

const INTEGRATIONS: { key: Integration; label: string; color: string }[] = [
  { key: "combined", label: "Łączne",   color: "#FF4C00" },
  { key: "meta",     label: "Meta Ads", color: "#FF4C00" },
  { key: "email",    label: "E-mail",   color: "#FF8C42" },
  { key: "sms",      label: "SMS",      color: "#FF8C42" },
];

function CampaignSelect({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (id: string) => void;
  options: { id: string; name: string }[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-[12px] px-3 py-1.5 rounded-md"
      style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }}
    >
      <option value="all">{placeholder}</option>
      {options.map(o => (
        <option key={o.id} value={o.id}>{o.name}</option>
      ))}
    </select>
  );
}

export function UnifiedCampaignChart({
  rangeLabel,
  metaChartData, metaStats, totalSpend, totalRevenue, metaCampaigns,
  emailChartData, emailTotalSent, emailTotalOpened, emailTotalClicked,
  emailOpenRate, emailClickRate, emailCampaigns,
  smsChartData, smsTotalSent, smsTotalReplied, smsReplyRate, smsCampaigns,
}: {
  rangeLabel: string;
  metaChartData: DayPoint[];
  metaStats: MetaAdsSummary | null;
  totalSpend: number;
  totalRevenue: number;
  metaCampaigns: MetaCampaignStats[];
  emailChartData: EmailDayPoint[];
  emailTotalSent: number;
  emailTotalOpened: number;
  emailTotalClicked: number;
  emailOpenRate: number;
  emailClickRate: number;
  emailCampaigns: EmailCampaignStats[];
  smsChartData: SmsDayPoint[];
  smsTotalSent: number;
  smsTotalReplied: number;
  smsReplyRate: number;
  smsCampaigns: SmsCampaignStats[];
}) {
  const [integration, setIntegration] = useState<Integration>("combined");
  const [metaCampaignId, setMetaCampaignId] = useState("all");
  const [emailCampaignId, setEmailCampaignId] = useState("all");
  const [smsCampaignId, setSmsCampaignId] = useState("all");
  const [metaFilter, setMetaFilter] = useState<MetaFilter>("both");
  const [emailFilter, setEmailFilter] = useState<EmailFilter>("sent");
  const [smsFilter, setSmsFilter] = useState<SmsFilter>("sent");

  const profit = totalRevenue - totalSpend;
  const hasMetaData = totalSpend > 0 || totalRevenue > 0;

  const selectedMeta  = metaCampaigns.find(c => c.id === metaCampaignId) ?? null;
  const selectedEmail = emailCampaigns.find(c => c.id === emailCampaignId) ?? null;
  const selectedSms   = smsCampaigns.find(c => c.id === smsCampaignId) ?? null;

  const activeInt = INTEGRATIONS.find(i => i.key === integration)!;

  return (
    <section className="glass-card rounded-xl p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-[13.5px] font-semibold tracking-tight">
          Statystyki kampanii ({rangeLabel})
        </h2>
        <div className="flex gap-1 flex-wrap">
          {INTEGRATIONS.map(int => {
            const active = integration === int.key;
            return (
              <button
                key={int.key}
                onClick={() => setIntegration(int.key)}
                className="px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all"
                style={{
                  background: active ? `${int.color}15` : "var(--ba-4)",
                  color:      active ? int.color           : "var(--muted)",
                  border:     active ? `1px solid ${int.color}40` : "1px solid var(--border)",
                }}
              >
                {int.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ŁĄCZNE ── */}
      {integration === "combined" && (
        <>
          <div className="flex flex-wrap gap-3 mb-5">
            <StatCard label={`Wydatki Meta (${rangeLabel})`} value={pln(totalSpend)} color="#FF4C00" />
            <StatCard label={`Przychód (${rangeLabel})`}     value={pln(totalRevenue)} color="#1C1917" />
            <StatCard
              label={profit >= 0 ? "Zysk" : "Strata"}
              value={pln(Math.abs(profit))}
              color={profit >= 0 ? "#1C1917" : "#1C1917"}
            />
            <StatCard label="E-maile wysłane" value={emailTotalSent.toLocaleString("pl-PL")} color="#FF8C42" />
            <StatCard label="SMS wysłane"      value={smsTotalSent.toLocaleString("pl-PL")}   color="#f97316" />
          </div>

          {hasMetaData ? (() => {
            const avgSpend = metaChartData.length > 0 ? totalSpend / metaChartData.length : 0;
            return (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={metaChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="ucGrSp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#FF4C00" stopOpacity={0.20} />
                      <stop offset="95%" stopColor="#FF4C00" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ucGrRv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1C1917" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#1C1917" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v} zł`} width={64} />
                  <Tooltip {...CHART_STYLE} formatter={(v: unknown) => pln(v as number)} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "var(--muted)" }} iconType="circle" iconSize={7} />
                  {avgSpend > 0 && (
                    <ReferenceLine y={avgSpend} stroke="#FF4C00" strokeDasharray="4 3" strokeOpacity={0.4}
                      label={{ value: "śr.", fill: "#FF4C00", fontSize: 9, position: "right" }} />
                  )}
                  <Area type="monotone" dataKey="spend"   name="Wydatki"  stroke="#FF4C00" fill="url(#ucGrSp)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                  <Area type="monotone" dataKey="revenue" name="Przychód" stroke="#1C1917" fill="url(#ucGrRv)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                </AreaChart>
              </ResponsiveContainer>
            );
          })() : (
            <p className="text-[13px] text-center py-8" style={{ color: "var(--muted)" }}>
              Brak danych finansowych w wybranym okresie.
            </p>
          )}
        </>
      )}

      {/* ── META ADS ── */}
      {integration === "meta" && (
        <>
          {metaCampaigns.length > 0 && (
            <div className="mb-4">
              <CampaignSelect
                value={metaCampaignId}
                onChange={id => setMetaCampaignId(id)}
                options={metaCampaigns}
                placeholder="Wszystkie kampanie"
              />
            </div>
          )}

          {selectedMeta ? (
            <div className="flex flex-wrap gap-3">
              <StatCard label="Wydatki"     value={pln(selectedMeta.spend)}                           color="#FF4C00" />
              <StatCard label="Kliknięcia"  value={selectedMeta.clicks.toLocaleString("pl-PL")}      color="#FF8C42" />
              <StatCard label="Leady"       value={selectedMeta.leads.toLocaleString("pl-PL")}       color="#FF6B35" />
              <StatCard label="Wyświetlenia" value={selectedMeta.impressions.toLocaleString("pl-PL")} color="#6b7280" />
              {selectedMeta.cpl != null && <StatCard label="Śr. CPL" value={pln(selectedMeta.cpl)} color="#f97316" />}
              {selectedMeta.ctr != null && <StatCard label="CTR" value={`${(selectedMeta.ctr * 100).toFixed(2)}%`} color="#FF8C42" />}
            </div>
          ) : (
            <>
              {/* Filter buttons */}
              <div className="flex gap-1 mb-4">
                {(["spend", "revenue", "both"] as MetaFilter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setMetaFilter(f)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all"
                    style={{
                      background: metaFilter === f ? "var(--accent-subtle)" : "var(--ba-4)",
                      color:      metaFilter === f ? "var(--accent-2)"       : "var(--muted)",
                      border:     metaFilter === f ? "1px solid rgba(255,76,0,0.2)" : "1px solid var(--border)",
                    }}
                  >
                    {f === "spend" ? "Wydatki" : f === "revenue" ? "Przychód" : "Oba"}
                  </button>
                ))}
              </div>

              {/* Meta stats panel */}
              {metaStats && (
                <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(255,76,0,0.05)", border: "1px solid rgba(255,76,0,0.16)" }}>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold" style={{ background: "rgba(255,76,0,0.18)", color: "#FF4C00" }}>f</div>
                    <span className="text-[10.5px] font-semibold" style={{ color: "#FF4C00" }}>
                      Meta Ads ({rangeLabel}) — kliknij wskaźnik, aby zobaczyć wykres
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {([
                      { key: "cpl" as MetaFilter,         label: "Śr. CPL",      value: metaStats.avgCPL != null ? pln(metaStats.avgCPL) : "—" },
                      { key: "cpc" as MetaFilter,         label: "Śr. CPC",      value: metaStats.avgCPC != null ? pln(metaStats.avgCPC) : "—" },
                      { key: "ctr" as MetaFilter,         label: "CTR",           value: metaStats.ctr != null ? `${(metaStats.ctr * 100).toFixed(2)}%` : "—" },
                      { key: "clicks" as MetaFilter,      label: "Kliknięcia",   value: metaStats.totalClicks.toLocaleString("pl-PL") },
                      { key: "leads" as MetaFilter,       label: "Leady",        value: metaStats.totalLeads.toLocaleString("pl-PL") },
                      { key: "impressions" as MetaFilter, label: "Wyświetlenia", value: metaStats.totalImpressions.toLocaleString("pl-PL") },
                    ]).map(s => {
                      const active = metaFilter === s.key;
                      const c = META_FILTER_COLOR[s.key];
                      return (
                        <button key={s.key} onClick={() => setMetaFilter(s.key)}
                          className="flex flex-col text-left px-2.5 py-2 rounded-lg transition-all"
                          style={{ background: active ? `${c}12` : "var(--surface)", border: active ? `1px solid ${c}40` : "1px solid var(--border)" }}
                        >
                          <span className="text-[9.5px] mb-0.5" style={{ color: "var(--muted)" }}>{s.label}</span>
                          <span className="text-[13px] font-semibold tabular-nums" style={{ color: active ? c : "var(--text)" }}>{s.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Summary chips */}
              {(metaFilter === "spend" || metaFilter === "revenue" || metaFilter === "both") && (
                <div className="flex flex-wrap gap-3 mb-5">
                  <StatCard label={`Wydatki (${rangeLabel})`}  value={pln(totalSpend)}        color="#FF4C00" />
                  <StatCard label={`Przychód (${rangeLabel})`} value={pln(totalRevenue)}       color="#1C1917" />
                  <StatCard label={profit >= 0 ? "Zysk" : "Strata"} value={pln(Math.abs(profit))} color={profit >= 0 ? "#1C1917" : "#1C1917"} />
                </div>
              )}

              {hasMetaData ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={metaChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="mGrA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4C00" stopOpacity={0.20} /><stop offset="95%" stopColor="#FF4C00" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mGrB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1C1917" stopOpacity={0.18} /><stop offset="95%" stopColor="#1C1917" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mGrM" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={META_FILTER_COLOR[metaFilter]} stopOpacity={0.20} />
                        <stop offset="95%" stopColor={META_FILTER_COLOR[metaFilter]} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                    <YAxis
                      tick={{ fontSize: 10, fill: "var(--muted)" }}
                      axisLine={false} tickLine={false}
                      tickFormatter={(v: number) => {
                        if (PLN_META.has(metaFilter)) return `${v} zł`;
                        if (PCT_META.has(metaFilter)) return `${v.toFixed(1)}%`;
                        return String(Math.round(v));
                      }}
                      width={64}
                    />
                    <Tooltip
                      {...CHART_STYLE}
                      formatter={(v: unknown) => {
                        if (PLN_META.has(metaFilter)) return pln(v as number);
                        if (PCT_META.has(metaFilter)) return `${(v as number).toFixed(2)}%`;
                        return (v as number).toLocaleString("pl-PL");
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "var(--muted)" }} iconType="circle" iconSize={7} />
                    {(metaFilter === "spend" || metaFilter === "both") && (
                      <Area type="monotone" dataKey="spend"   name="Wydatki"  stroke="#FF4C00" fill="url(#mGrA)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                    )}
                    {(metaFilter === "revenue" || metaFilter === "both") && (
                      <Area type="monotone" dataKey="revenue" name="Przychód" stroke="#1C1917" fill="url(#mGrB)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                    )}
                    {!["spend", "revenue", "both"].includes(metaFilter) && (
                      <Area type="monotone" dataKey={metaFilter} name={metaFilter} stroke={META_FILTER_COLOR[metaFilter]} fill="url(#mGrM)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-[13px] text-center py-8" style={{ color: "var(--muted)" }}>
                  Brak danych Meta Ads.
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* ── E-MAIL ── */}
      {integration === "email" && (
        <>
          {emailCampaigns.length > 0 && (
            <div className="mb-4">
              <CampaignSelect
                value={emailCampaignId}
                onChange={id => setEmailCampaignId(id)}
                options={emailCampaigns}
                placeholder="Wszystkie kampanie"
              />
            </div>
          )}

          {selectedEmail ? (
            <>
              <div className="flex flex-wrap gap-3 mb-5">
                <StatCard label="Wysłane"    value={selectedEmail.sent.toLocaleString("pl-PL")}    color="#FF8C42" />
                <StatCard label="Otwarte"    value={selectedEmail.opened.toLocaleString("pl-PL")}  color="#FF4C00" />
                <StatCard label="Kliknięcia" value={selectedEmail.clicked.toLocaleString("pl-PL")} color="#1C1917" />
                <StatCard label="Odpowiedzi" value={selectedEmail.replied.toLocaleString("pl-PL")} color="#FF8C42" />
                <StatCard label="Open Rate"  value={`${selectedEmail.openRate.toFixed(1)}%`}       color="#FF4C00" />
                <StatCard label="Click Rate" value={`${selectedEmail.clickRate.toFixed(1)}%`}      color="#1C1917" />
                <StatCard label="Reply Rate" value={`${selectedEmail.replyRate.toFixed(1)}%`}      color="#FF8C42" />
                {selectedEmail.leadsWon > 0 && (
                  <StatCard label="Leady zamknięte" value={selectedEmail.leadsWon.toLocaleString("pl-PL")} color="#FF6B35" />
                )}
                {selectedEmail.revenue > 0 && (
                  <StatCard label="Przychód (Kanban)" value={pln(selectedEmail.revenue)} color="#1C1917" />
                )}
              </div>
              {(() => {
                const bars = [
                  { name: "Wysłane",    value: selectedEmail.sent,    color: "#FF8C42" },
                  { name: "Otwarte",    value: selectedEmail.opened,  color: "#FF4C00" },
                  { name: "Kliknięcia", value: selectedEmail.clicked, color: "#1C1917" },
                  { name: "Odpowiedzi", value: selectedEmail.replied, color: "#FF8C42" },
                  ...(selectedEmail.leadsWon > 0 ? [{ name: "Zamknięte", value: selectedEmail.leadsWon, color: "#FF6B35" }] : []),
                ];
                return (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={bars} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} allowDecimals={false} />
                      <Tooltip
                        {...CHART_STYLE}
                        formatter={(v: unknown) => [String(v), ""]}
                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                      />
                      <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                        {bars.map((entry, i) => (
                          <Cell key={i} fill={entry.color} fillOpacity={0.90} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                );
              })()}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <RateCard label="Open Rate"  value={`${emailOpenRate.toFixed(1)}%`}  color="#FF4C00" />
                <RateCard label="Click Rate" value={`${emailClickRate.toFixed(1)}%`} color="#1C1917" />
              </div>

              <div className="flex gap-1.5 mb-4">
                {(["sent", "opened", "clicked"] as EmailFilter[]).map(f => {
                  const active = emailFilter === f;
                  const c = EMAIL_COLOR[f];
                  const vals: Record<EmailFilter, number> = { sent: emailTotalSent, opened: emailTotalOpened, clicked: emailTotalClicked };
                  return (
                    <button key={f} onClick={() => setEmailFilter(f)}
                      className="flex-1 flex flex-col text-left px-3 py-2 rounded-lg transition-all"
                      style={{ background: active ? `${c}12` : "var(--surface)", border: active ? `1px solid ${c}40` : "1px solid var(--border)" }}
                    >
                      <span className="text-[9.5px] mb-0.5" style={{ color: "var(--muted)" }}>{EMAIL_LABEL[f]}</span>
                      <span className="text-[15px] font-semibold tabular-nums" style={{ color: active ? c : "var(--text)" }}>
                        {vals[f].toLocaleString("pl-PL")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={emailChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="eGr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={EMAIL_COLOR[emailFilter]} stopOpacity={0.20} />
                      <stop offset="95%" stopColor={EMAIL_COLOR[emailFilter]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip {...CHART_STYLE} formatter={(v: unknown) => [String(v), EMAIL_LABEL[emailFilter]]} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "var(--muted)" }} iconType="circle" iconSize={7} />
                  <Area type="monotone" dataKey={emailFilter} name={EMAIL_LABEL[emailFilter]} stroke={EMAIL_COLOR[emailFilter]} fill="url(#eGr)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </>
      )}

      {/* ── SMS ── */}
      {integration === "sms" && (
        <>
          {smsCampaigns.length > 0 && (
            <div className="mb-4">
              <CampaignSelect
                value={smsCampaignId}
                onChange={id => setSmsCampaignId(id)}
                options={smsCampaigns}
                placeholder="Wszystkie kampanie"
              />
            </div>
          )}

          {selectedSms ? (
            <>
              <div className="flex flex-wrap gap-3 mb-5">
                <StatCard label="Wysłane"    value={selectedSms.sent.toLocaleString("pl-PL")}    color="#1C1917" />
                <StatCard label="Odpowiedzi" value={selectedSms.replied.toLocaleString("pl-PL")} color="#f97316" />
                <StatCard label="Reply Rate" value={`${selectedSms.replyRate.toFixed(1)}%`}      color="#f97316" />
                {selectedSms.leadsWon > 0 && (
                  <StatCard label="Leady zamknięte" value={selectedSms.leadsWon.toLocaleString("pl-PL")} color="#FF6B35" />
                )}
                {selectedSms.revenue > 0 && (
                  <StatCard label="Przychód (Kanban)" value={pln(selectedSms.revenue)} color="#1C1917" />
                )}
              </div>
              {(() => {
                const bars = [
                  { name: "Wysłane",    value: selectedSms.sent,    color: "#1C1917" },
                  { name: "Odpowiedzi", value: selectedSms.replied, color: "#f97316" },
                  ...(selectedSms.leadsWon > 0 ? [{ name: "Zamknięte", value: selectedSms.leadsWon, color: "#FF6B35" }] : []),
                ];
                return (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={bars} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} allowDecimals={false} />
                      <Tooltip
                        {...CHART_STYLE}
                        formatter={(v: unknown) => [String(v), ""]}
                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                      />
                      <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                        {bars.map((entry, i) => (
                          <Cell key={i} fill={entry.color} fillOpacity={0.90} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                );
              })()}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <RateCard label="Reply Rate" value={`${smsReplyRate.toFixed(1)}%`}      color="#f97316" />
                <RateCard label="Kampanie"   value={String(smsCampaigns.length)}        color="#1C1917" />
              </div>

              <div className="flex gap-1.5 mb-4">
                {(["sent", "replied"] as SmsFilter[]).map(f => {
                  const active = smsFilter === f;
                  const c = SMS_COLOR[f];
                  const vals: Record<SmsFilter, number> = { sent: smsTotalSent, replied: smsTotalReplied };
                  return (
                    <button key={f} onClick={() => setSmsFilter(f)}
                      className="flex-1 flex flex-col text-left px-3 py-2 rounded-lg transition-all"
                      style={{ background: active ? `${c}12` : "var(--surface)", border: active ? `1px solid ${c}40` : "1px solid var(--border)" }}
                    >
                      <span className="text-[9.5px] mb-0.5" style={{ color: "var(--muted)" }}>{SMS_LABEL[f]}</span>
                      <span className="text-[15px] font-semibold tabular-nums" style={{ color: active ? c : "var(--text)" }}>
                        {vals[f].toLocaleString("pl-PL")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={smsChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="sGr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={SMS_COLOR[smsFilter]} stopOpacity={0.20} />
                      <stop offset="95%" stopColor={SMS_COLOR[smsFilter]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip {...CHART_STYLE} formatter={(v: unknown) => [String(v), SMS_LABEL[smsFilter]]} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "var(--muted)" }} iconType="circle" iconSize={7} />
                  <Area type="monotone" dataKey={smsFilter} name={SMS_LABEL[smsFilter]} stroke={SMS_COLOR[smsFilter]} fill="url(#sGr)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </>
      )}
    </section>
  );
}
