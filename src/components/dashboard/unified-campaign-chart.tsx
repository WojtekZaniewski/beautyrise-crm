"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
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
};
export type SmsCampaignStats = {
  id: string; name: string; sent: number; replied: number; replyRate: number;
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
    <div className="flex flex-col px-4 py-2.5 rounded-lg" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
      <span className="text-[10px] font-medium uppercase tracking-wide mb-1" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-[18px] font-semibold tabular-nums leading-none" style={{ color }}>{value}</span>
    </div>
  );
}

function RateCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg px-4 py-3" style={{ background: `${color}08`, border: `1px solid ${color}25` }}>
      <div className="text-[10px] mb-1 font-medium" style={{ color: "var(--muted)" }}>{label}</div>
      <div className="text-[24px] font-semibold tabular-nums leading-none" style={{ color }}>{value}</div>
    </div>
  );
}

const CHART_STYLE = {
  contentStyle: {
    fontSize: 12,
    background: "var(--panel-solid)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "6px 10px",
  },
};

const META_FILTER_COLOR: Record<MetaFilter, string> = {
  spend: "#3b82f6", revenue: "#22c55e", both: "#3b82f6",
  cpl: "#f97316", cpc: "#8b5cf6", ctr: "#ec4899",
  clicks: "#f59e0b", leads: "#06b6d4", impressions: "#6b7280",
};

const EMAIL_COLOR: Record<EmailFilter, string> = { sent: "#8b5cf6", opened: "#3b82f6", clicked: "#22c55e" };
const EMAIL_LABEL: Record<EmailFilter, string> = { sent: "Wysłane", opened: "Otwarte", clicked: "Kliknięte" };
const SMS_COLOR: Record<SmsFilter, string> = { sent: "#22c55e", replied: "#f97316" };
const SMS_LABEL: Record<SmsFilter, string> = { sent: "Wysłane", replied: "Odpowiedzi" };

const INTEGRATIONS: { key: Integration; label: string; color: string }[] = [
  { key: "combined", label: "Łączne", color: "var(--accent-2)" },
  { key: "meta",     label: "Meta Ads", color: "#3b82f6" },
  { key: "email",    label: "E-mail",   color: "#8b5cf6" },
  { key: "sms",      label: "SMS",      color: "#f97316" },
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
    <section
      className="rounded-lg p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
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
            <StatCard label={`Wydatki Meta (${rangeLabel})`} value={pln(totalSpend)} color="#3b82f6" />
            <StatCard label={`Przychód (${rangeLabel})`}     value={pln(totalRevenue)} color="#22c55e" />
            <StatCard
              label={profit >= 0 ? "Zysk" : "Strata"}
              value={pln(Math.abs(profit))}
              color={profit >= 0 ? "#22c55e" : "#ef4444"}
            />
            <StatCard label="E-maile wysłane" value={emailTotalSent.toLocaleString("pl-PL")} color="#8b5cf6" />
            <StatCard label="SMS wysłane"      value={smsTotalSent.toLocaleString("pl-PL")}   color="#f97316" />
          </div>

          {hasMetaData ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={metaChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="ucGrSp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ucGrRv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v} zł`} width={64} />
                <Tooltip {...CHART_STYLE} formatter={(v: unknown) => pln(v as number)} />
                <Area type="monotone" dataKey="spend"   name="Wydatki"  stroke="#3b82f6" fill="url(#ucGrSp)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                <Area type="monotone" dataKey="revenue" name="Przychód" stroke="#22c55e" fill="url(#ucGrRv)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
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
              <StatCard label="Wydatki"     value={pln(selectedMeta.spend)}                           color="#3b82f6" />
              <StatCard label="Kliknięcia"  value={selectedMeta.clicks.toLocaleString("pl-PL")}      color="#f59e0b" />
              <StatCard label="Leady"       value={selectedMeta.leads.toLocaleString("pl-PL")}       color="#06b6d4" />
              <StatCard label="Wyświetlenia" value={selectedMeta.impressions.toLocaleString("pl-PL")} color="#6b7280" />
              {selectedMeta.cpl != null && <StatCard label="Śr. CPL" value={pln(selectedMeta.cpl)} color="#f97316" />}
              {selectedMeta.ctr != null && <StatCard label="CTR" value={`${(selectedMeta.ctr * 100).toFixed(2)}%`} color="#ec4899" />}
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
                <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.14)" }}>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold" style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>f</div>
                    <span className="text-[10.5px] font-semibold" style={{ color: "#3b82f6" }}>
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
                  <StatCard label={`Wydatki (${rangeLabel})`}  value={pln(totalSpend)}        color="#3b82f6" />
                  <StatCard label={`Przychód (${rangeLabel})`} value={pln(totalRevenue)}       color="#22c55e" />
                  <StatCard label={profit >= 0 ? "Zysk" : "Strata"} value={pln(Math.abs(profit))} color={profit >= 0 ? "#22c55e" : "#ef4444"} />
                </div>
              )}

              {hasMetaData ? (
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={metaChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="mGrA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mGrB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mGrM" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={META_FILTER_COLOR[metaFilter]} stopOpacity={0.15} />
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
                    {(metaFilter === "spend" || metaFilter === "both") && (
                      <Area type="monotone" dataKey="spend"   name="Wydatki"  stroke="#3b82f6" fill="url(#mGrA)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                    )}
                    {(metaFilter === "revenue" || metaFilter === "both") && (
                      <Area type="monotone" dataKey="revenue" name="Przychód" stroke="#22c55e" fill="url(#mGrB)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                    )}
                    {!["spend", "revenue", "both"].includes(metaFilter) && (
                      <Area type="monotone" dataKey={metaFilter} name={metaFilter} stroke={META_FILTER_COLOR[metaFilter]} fill="url(#mGrM)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
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
            <div className="flex flex-wrap gap-3">
              <StatCard label="Wysłane"    value={selectedEmail.sent.toLocaleString("pl-PL")}    color="#8b5cf6" />
              <StatCard label="Otwarte"    value={selectedEmail.opened.toLocaleString("pl-PL")}  color="#3b82f6" />
              <StatCard label="Kliknięcia" value={selectedEmail.clicked.toLocaleString("pl-PL")} color="#22c55e" />
              <StatCard label="Odpowiedzi" value={selectedEmail.replied.toLocaleString("pl-PL")} color="#f59e0b" />
              <StatCard label="Open Rate"  value={`${selectedEmail.openRate.toFixed(1)}%`}       color="#3b82f6" />
              <StatCard label="Click Rate" value={`${selectedEmail.clickRate.toFixed(1)}%`}      color="#22c55e" />
              <StatCard label="Reply Rate" value={`${selectedEmail.replyRate.toFixed(1)}%`}      color="#f59e0b" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <RateCard label="Open Rate"  value={`${emailOpenRate.toFixed(1)}%`}  color="#3b82f6" />
                <RateCard label="Click Rate" value={`${emailClickRate.toFixed(1)}%`} color="#22c55e" />
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

              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={emailChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="eGr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={EMAIL_COLOR[emailFilter]} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={EMAIL_COLOR[emailFilter]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip {...CHART_STYLE} formatter={(v: unknown) => [String(v), EMAIL_LABEL[emailFilter]]} />
                  <Area type="monotone" dataKey={emailFilter} name={EMAIL_LABEL[emailFilter]} stroke={EMAIL_COLOR[emailFilter]} fill="url(#eGr)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
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
            <div className="flex flex-wrap gap-3">
              <StatCard label="Wysłane"    value={selectedSms.sent.toLocaleString("pl-PL")}    color="#22c55e" />
              <StatCard label="Odpowiedzi" value={selectedSms.replied.toLocaleString("pl-PL")} color="#f97316" />
              <StatCard label="Reply Rate" value={`${selectedSms.replyRate.toFixed(1)}%`}      color="#f97316" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <RateCard label="Reply Rate" value={`${smsReplyRate.toFixed(1)}%`}      color="#f97316" />
                <RateCard label="Kampanie"   value={String(smsCampaigns.length)}        color="#22c55e" />
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

              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={smsChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="sGr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={SMS_COLOR[smsFilter]} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={SMS_COLOR[smsFilter]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip {...CHART_STYLE} formatter={(v: unknown) => [String(v), SMS_LABEL[smsFilter]]} />
                  <Area type="monotone" dataKey={smsFilter} name={SMS_LABEL[smsFilter]} stroke={SMS_COLOR[smsFilter]} fill="url(#sGr)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </>
      )}
    </section>
  );
}
