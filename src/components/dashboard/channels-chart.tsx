"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

type EmailDayPoint = { date: string; sent: number; opened: number; clicked: number };
type SmsDayPoint   = { date: string; sent: number; replied: number };

type Tab = "email" | "sms";
type EmailFilter = "sent" | "opened" | "clicked";
type SmsFilter   = "sent" | "replied";

export function ChannelsChart({
  emailData, emailTotalSent, emailTotalOpened, emailTotalClicked, emailOpenRate, emailClickRate,
  smsData, smsTotalSent, smsTotalReplied, smsReplyRate, smsCampaignCount,
  rangeLabel = "30 dni",
}: {
  emailData: EmailDayPoint[];
  emailTotalSent: number; emailTotalOpened: number; emailTotalClicked: number;
  emailOpenRate: number;  emailClickRate: number;
  smsData: SmsDayPoint[];
  smsTotalSent: number; smsTotalReplied: number;
  smsReplyRate: number; smsCampaignCount: number;
  rangeLabel?: string;
}) {
  const [tab, setTab]             = useState<Tab>("email");
  const [emailFilter, setEmailFilter] = useState<EmailFilter>("sent");
  const [smsFilter,   setSmsFilter]   = useState<SmsFilter>("sent");

  const emailColorMap: Record<EmailFilter, string> = { sent: "#FF4C00", opened: "#FF4C00", clicked: "#1C1917" };
  const emailLabelMap: Record<EmailFilter, string> = { sent: "Wysłane", opened: "Otwarte", clicked: "Kliknięte" };
  const emailColor = emailColorMap[emailFilter];

  const smsColorMap: Record<SmsFilter, string> = { sent: "#1C1917", replied: "#f97316" };
  const smsLabelMap: Record<SmsFilter, string> = { sent: "Wysłane", replied: "Odpowiedzi" };
  const smsColor = smsColorMap[smsFilter];

  return (
    <section
      className="rounded-lg p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Header + tabs */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13.5px] font-semibold tracking-tight">Kanały komunikacji ({rangeLabel})</h2>
        <div className="flex gap-1">
          {([
            { key: "email" as Tab, label: "E-mail", color: "#FF4C00", bg: "rgba(255,76,0,0.12)", border: "rgba(255,76,0,0.3)" },
            { key: "sms"   as Tab, label: "SMS",    color: "#1C1917", bg: "rgba(28,25,23,0.12)",  border: "rgba(28,25,23,0.3)" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all"
              style={{
                background: tab === t.key ? t.bg   : "var(--ba-4)",
                color:      tab === t.key ? t.color : "var(--muted)",
                border:     tab === t.key ? `1px solid ${t.border}` : "1px solid var(--border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EMAIL TAB ── */}
      {tab === "email" && (
        <>
          {/* Big rate cards */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Open Rate",  value: `${emailOpenRate.toFixed(1)}%`,  color: "#FF4C00" },
              { label: "Click Rate", value: `${emailClickRate.toFixed(1)}%`, color: "#1C1917" },
            ].map((r) => (
              <div key={r.label} className="rounded-lg px-4 py-3"
                style={{ background: `${r.color}08`, border: `1px solid ${r.color}25` }}>
                <div className="text-[10px] mb-1 font-medium" style={{ color: "var(--muted)" }}>{r.label}</div>
                <div className="text-[24px] font-semibold tabular-nums leading-none" style={{ color: r.color }}>{r.value}</div>
              </div>
            ))}
          </div>

          {/* Clickable metric selector */}
          <div className="flex gap-1.5 mb-4">
            {(["sent", "opened", "clicked"] as EmailFilter[]).map((f) => {
              const active = emailFilter === f;
              const c = emailColorMap[f];
              const vals: Record<EmailFilter, number> = { sent: emailTotalSent, opened: emailTotalOpened, clicked: emailTotalClicked };
              return (
                <button key={f} onClick={() => setEmailFilter(f)}
                  className="flex-1 flex flex-col text-left px-3 py-2 rounded-lg transition-all"
                  style={{ background: active ? `${c}12` : "var(--surface)", border: active ? `1px solid ${c}40` : "1px solid var(--border)" }}>
                  <span className="text-[9.5px] mb-0.5" style={{ color: "var(--muted)" }}>{emailLabelMap[f]}</span>
                  <span className="text-[15px] font-semibold tabular-nums" style={{ color: active ? c : "var(--text)" }}>
                    {vals[f].toLocaleString("pl-PL")}
                  </span>
                </button>
              );
            })}
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={emailData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="chEmailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={emailColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={emailColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
              <Tooltip
                formatter={(v: unknown) => [String(v), emailLabelMap[emailFilter]]}
                contentStyle={{ fontSize: 12, background: "var(--panel-solid)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px" }}
              />
              <Area type="monotone" dataKey={emailFilter} name={emailLabelMap[emailFilter]}
                stroke={emailColor} fill="url(#chEmailGrad)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}

      {/* ── SMS TAB ── */}
      {tab === "sms" && (
        <>
          {/* Big rate cards */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Reply Rate", value: `${smsReplyRate.toFixed(1)}%`, color: "#f97316" },
              { label: "Kampanie",   value: String(smsCampaignCount),      color: "#1C1917" },
            ].map((r) => (
              <div key={r.label} className="rounded-lg px-4 py-3"
                style={{ background: `${r.color}08`, border: `1px solid ${r.color}25` }}>
                <div className="text-[10px] mb-1 font-medium" style={{ color: "var(--muted)" }}>{r.label}</div>
                <div className="text-[24px] font-semibold tabular-nums leading-none" style={{ color: r.color }}>{r.value}</div>
              </div>
            ))}
          </div>

          {/* Clickable metric selector */}
          <div className="flex gap-1.5 mb-4">
            {(["sent", "replied"] as SmsFilter[]).map((f) => {
              const active = smsFilter === f;
              const c = smsColorMap[f];
              const vals: Record<SmsFilter, number> = { sent: smsTotalSent, replied: smsTotalReplied };
              return (
                <button key={f} onClick={() => setSmsFilter(f)}
                  className="flex-1 flex flex-col text-left px-3 py-2 rounded-lg transition-all"
                  style={{ background: active ? `${c}12` : "var(--surface)", border: active ? `1px solid ${c}40` : "1px solid var(--border)" }}>
                  <span className="text-[9.5px] mb-0.5" style={{ color: "var(--muted)" }}>{smsLabelMap[f]}</span>
                  <span className="text-[15px] font-semibold tabular-nums" style={{ color: active ? c : "var(--text)" }}>
                    {vals[f].toLocaleString("pl-PL")}
                  </span>
                </button>
              );
            })}
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={smsData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="chSmsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={smsColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={smsColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={32} />
              <Tooltip
                formatter={(v: unknown) => [String(v), smsLabelMap[smsFilter]]}
                contentStyle={{ fontSize: 12, background: "var(--panel-solid)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px" }}
              />
              <Area type="monotone" dataKey={smsFilter} name={smsLabelMap[smsFilter]}
                stroke={smsColor} fill="url(#chSmsGrad)" strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </section>
  );
}
