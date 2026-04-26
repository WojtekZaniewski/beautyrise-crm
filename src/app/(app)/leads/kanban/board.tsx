"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { LeadNotesPanel } from "@/components/lead-notes-panel";
import type { MetaStats } from "./page";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

type Stage = { id: string; name: string; color: string };
type Lead = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  source: string;
  source_campaign_id: string | null;
  stage_id: string | null;
  created_at: string;
  potential_score?: number | null;
  acquisition_cost?: number | null;
  campaign_name?: string | null;
  value_pln?: string | null;
};

const sourceConfig: Record<string, { label: string; color: string; bg: string }> = {
  manual: { label: "Ręcznie", color: "#f97316", bg: "rgba(249,115,22,0.10)" },
  import: { label: "Import", color: "#6b7280", bg: "rgba(107,114,128,0.10)" },
  meta_ads: { label: "Meta Ads", color: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
  webhook: { label: "Webhook", color: "#14b8a6", bg: "rgba(20,184,166,0.10)" },
  sms: { label: "SMS", color: "#22c55e", bg: "rgba(34,197,94,0.10)" },
  email: { label: "E-mail", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
};

function pln(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(value);
}

function MetaStatsBar({
  metaStats,
  convertedCount,
  convertedAcquisitionCost,
  totalRevenue,
}: {
  metaStats: MetaStats;
  convertedCount: number;
  convertedAcquisitionCost: number;
  totalRevenue: number;
}) {
  const profit = totalRevenue - convertedAcquisitionCost;
  const roi =
    convertedAcquisitionCost > 0 ? (profit / convertedAcquisitionCost) * 100 : null;

  const items: { label: string; value: string; highlight?: "green" | "blue" | "red" }[] = [
    { label: "Wydano łącznie", value: pln(metaStats.totalSpend) },
    { label: "Leady (kampanie)", value: metaStats.totalLeads.toString() },
    { label: "Śr. CPL", value: pln(metaStats.avgCPL) },
    { label: "Śr. CPC", value: pln(metaStats.avgCPC) },
    { label: "CTR", value: `${metaStats.ctr.toFixed(2)}%` },
    { label: "Kliknięcia", value: metaStats.totalClicks.toLocaleString("pl-PL") },
    { label: "Zamknięte", value: convertedCount.toString(), highlight: convertedCount > 0 ? "green" : undefined },
    ...(convertedAcquisitionCost > 0
      ? [{ label: "Koszt zamkniętych", value: pln(convertedAcquisitionCost), highlight: "blue" as const }]
      : []),
    ...(totalRevenue > 0
      ? [{ label: "Przychód", value: pln(totalRevenue), highlight: "green" as const }]
      : []),
    ...(totalRevenue > 0 && convertedAcquisitionCost > 0
      ? [{ label: "Zysk", value: pln(profit), highlight: profit >= 0 ? "green" as const : "red" as const }]
      : []),
    ...(roi !== null
      ? [{ label: "ROI", value: `${roi.toFixed(1)}%`, highlight: roi >= 0 ? "green" as const : "red" as const }]
      : []),
  ];

  const highlightStyle = {
    green: { bg: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" },
    blue: { bg: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", color: "#3b82f6" },
    red: { bg: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" },
  };

  const hasChart = totalRevenue > 0 || convertedAcquisitionCost > 0;
  const barData = [
    { name: "Koszt", value: convertedAcquisitionCost, color: "#3b82f6" },
    { name: "Przychód", value: totalRevenue, color: "#22c55e" },
    { name: "Zysk", value: profit, color: profit >= 0 ? "#22c55e" : "#ef4444" },
  ];

  return (
    <div
      className="flex gap-4 mb-5 p-4 rounded-xl"
      style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.18)" }}
    >
      {/* Left: label + stats chips */}
      <div className="flex flex-wrap gap-3 items-center flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mr-1 self-start pt-1">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
            style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}
          >
            f
          </div>
          <span className="text-[11px] font-semibold" style={{ color: "#3b82f6" }}>
            Meta Ads
          </span>
        </div>
        {items.map((item) => {
          const hs = item.highlight ? highlightStyle[item.highlight] : null;
          return (
            <div
              key={item.label}
              className="flex flex-col px-3 py-2 rounded-lg min-w-[80px]"
              style={{
                background: hs ? hs.bg : "var(--surface)",
                border: hs ? hs.border : "1px solid var(--border)",
              }}
            >
              <span className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>
                {item.label}
              </span>
              <span
                className="text-[13px] font-semibold tabular-nums"
                style={{ color: hs ? hs.color : "var(--text)" }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right: bar chart — Koszt vs Przychód vs Zysk */}
      {hasChart && (
        <div
          className="shrink-0 flex flex-col pl-4"
          style={{ width: 220, borderLeft: "1px solid rgba(59,130,246,0.2)" }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-wide mb-1"
            style={{ color: "var(--muted)" }}
          >
            Koszt vs Przychód
          </span>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={barData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="30%">
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide domain={["auto", "auto"]} />
              <ReferenceLine y={0} stroke="rgba(0,0,0,0.1)" />
              <Tooltip
                formatter={(v: unknown) => [pln(v as number)]}
                labelStyle={{ fontSize: 11 }}
                contentStyle={{
                  fontSize: 11,
                  background: "var(--panel-solid)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "4px 8px",
                }}
              />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function KanbanDeleteButton({
  leadId,
  onDelete,
}: {
  leadId: string;
  onDelete: (id: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    setPending(false);
    onDelete(leadId);
  }

  if (confirming) {
    return (
      <div
        className="flex items-center gap-1"
        draggable={false}
        onDragStart={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDelete}
          disabled={pending}
          className="text-[11px] font-semibold px-2 py-0.5 rounded"
          style={{ background: "#ef4444", color: "#fff", opacity: pending ? 0.6 : 1 }}
        >
          {pending ? "…" : "Usuń"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[11px] px-2 py-0.5 rounded"
          style={{ background: "var(--ba-4)", color: "var(--muted)", border: "1px solid var(--border-strong)" }}
        >
          Anuluj
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      draggable={false}
      onDragStart={(e) => e.stopPropagation()}
      title="Przenieś do kosza"
      className="flex items-center justify-center w-6 h-6 rounded transition-colors"
      style={{ border: "1px solid var(--border-strong)", color: "var(--muted)", background: "transparent" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#ef4444";
        (e.currentTarget as HTMLElement).style.borderColor = "#ef4444";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--muted)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    </button>
  );
}

function ClosingPriceEdit({
  leadId,
  value,
  onUpdate,
}: {
  leadId: string;
  value: string | null | undefined;
  onUpdate: (value: string | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const numericValue = value != null ? parseFloat(value) : null;
  const [val, setVal] = useState(numericValue?.toString() ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const numeric = val === "" ? null : Number(val);
    await fetch(`/api/leads/${leadId}/value`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value_pln: numeric }),
    });
    setSaving(false);
    setEditing(false);
    onUpdate(val === "" ? null : val);
  }

  if (editing) {
    return (
      <div
        className="flex items-center gap-1.5 mt-2"
        draggable={false}
        onDragStart={(e) => e.stopPropagation()}
      >
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="0.00"
          autoFocus
          className="rounded px-2 py-1 text-xs w-24 outline-none"
          style={{ background: "var(--ba-4)", border: "1px solid var(--accent)", color: "var(--text)" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
        />
        <button
          onClick={save}
          disabled={saving}
          className="text-[11px] font-medium px-2 py-0.5 rounded"
          style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}
        >
          {saving ? "…" : "OK"}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="text-[11px]"
          style={{ color: "var(--muted)" }}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      draggable={false}
      onDragStart={(e) => e.stopPropagation()}
      className="flex items-center gap-1 mt-2 text-xs rounded px-2 py-1 w-full transition-colors"
      style={{
        background: numericValue != null ? "rgba(34,197,94,0.08)" : "var(--ba-4)",
        border: numericValue != null ? "1px solid rgba(34,197,94,0.2)" : "1px solid var(--border)",
        color: numericValue != null ? "#22c55e" : "var(--muted)",
      }}
    >
      <span className="font-medium">
        {numericValue != null ? `${pln(numericValue)}` : "+ Cena zamknięcia"}
      </span>
    </button>
  );
}

function LeadCard({
  lead,
  isClosedStage,
  isDragging,
  onDragStart,
  onDragEnd,
  onValueUpdate,
  onDelete,
}: {
  lead: Lead;
  isClosedStage: boolean;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onValueUpdate: (leadId: string, value: string | null) => void;
  onDelete: (id: string) => void;
}) {
  const src = sourceConfig[lead.source];
  const hasCost = lead.acquisition_cost != null && lead.acquisition_cost > 0;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", lead.id);
        onDragStart(lead.id);
      }}
      onDragEnd={onDragEnd}
      className="bg-[var(--surface)] rounded-lg p-3 cursor-grab active:cursor-grabbing select-none shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all"
      style={{
        border: isClosedStage
          ? "1px solid rgba(34,197,94,0.35)"
          : "1px solid var(--border)",
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <div className="flex items-start gap-1 mb-1">
        <Link
          href={`/leads/${lead.id}`}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-sm hover:text-[var(--accent)] transition-colors flex-1 leading-snug"
        >
          {lead.full_name}
        </Link>
        {isClosedStage && (
          <span
            className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5"
            style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}
          >
            Zamknięty
          </span>
        )}
      </div>

      {lead.phone && (
        <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>
          {lead.phone}
        </div>
      )}

      {lead.campaign_name && (
        <div
          className="text-[10.5px] mb-1.5 truncate"
          style={{ color: "var(--muted)" }}
          title={lead.campaign_name}
        >
          📣 {lead.campaign_name}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap items-center gap-1">
          {src && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ background: src.bg, color: src.color }}
            >
              {src.label}
            </span>
          )}
          {hasCost && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(59,130,246,0.08)", color: "#3b82f6" }}
            >
              ~{pln(lead.acquisition_cost!)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1" draggable={false} onDragStart={(e) => e.stopPropagation()}>
          <LeadNotesPanel
            leadId={lead.id}
            leadName={lead.full_name}
            initialScore={lead.potential_score}
          />
          <KanbanDeleteButton leadId={lead.id} onDelete={onDelete} />
        </div>
      </div>

      {isClosedStage && (
        <ClosingPriceEdit
          leadId={lead.id}
          value={lead.value_pln}
          onUpdate={(v) => onValueUpdate(lead.id, v)}
        />
      )}
    </div>
  );
}

export function KanbanBoard({
  stages,
  initialLeads,
  source,
  metaStats,
}: {
  stages: Stage[];
  initialLeads: Lead[];
  source: string;
  metaStats: MetaStats | null;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStageId, setOverStageId] = useState<string | null>(null);
  const dragCounters = useRef<Record<string, number>>({});
  const supabase = createClient();

  const closedStageId = stages.length > 0 ? stages[stages.length - 1].id : null;

  const closedLeads = closedStageId
    ? leads.filter((l) => l.stage_id === closedStageId)
    : [];
  const closedMetaLeads = closedLeads.filter((l) => l.source === "meta_ads");

  const convertedCount = closedMetaLeads.length;
  const convertedAcquisitionCost = closedMetaLeads.reduce(
    (sum, l) => sum + (l.acquisition_cost ?? 0),
    0,
  );
  // Revenue = sum of closing prices for ALL closed leads (any source)
  const totalRevenue = closedLeads.reduce(
    (sum, l) => sum + (l.value_pln != null ? parseFloat(l.value_pln) : 0),
    0,
  );

  const showMetaStats =
    metaStats !== null && (source === "meta_ads" || source === "all");

  function getLeadsForStage(stageId: string) {
    return leads.filter((l) => l.stage_id === stageId);
  }

  function handleDeleteLead(leadId: string) {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  }

  function handleValueUpdate(leadId: string, value: string | null) {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, value_pln: value } : l)),
    );
  }

  async function handleDrop(targetStageId: string) {
    if (!draggingId) return;
    const prevLead = leads.find((l) => l.id === draggingId);
    if (!prevLead || prevLead.stage_id === targetStageId) {
      setDraggingId(null);
      setOverStageId(null);
      return;
    }

    const targetStage = stages.find((s) => s.id === targetStageId);

    setLeads((prev) =>
      prev.map((l) =>
        l.id === draggingId ? { ...l, stage_id: targetStageId } : l,
      ),
    );
    setDraggingId(null);
    setOverStageId(null);

    await supabase
      .from("leads")
      .update({ stage_id: targetStageId, updated_at: new Date().toISOString() })
      .eq("id", draggingId);

    await supabase.from("lead_events").insert({
      lead_id: draggingId,
      type: "stage_change",
      payload: {
        from: stages.find((s) => s.id === prevLead.stage_id)?.name,
        to: targetStage?.name,
      },
    });
  }

  return (
    <>
      {showMetaStats && (
        <MetaStatsBar
          metaStats={metaStats!}
          convertedCount={convertedCount}
          convertedAcquisitionCost={convertedAcquisitionCost}
          totalRevenue={totalRevenue}
        />
      )}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          const isClosed = stage.id === closedStageId;
          const isOver = overStageId === stage.id;

          const columnMetaLeads = isClosed
            ? stageLeads.filter((l) => l.source === "meta_ads")
            : [];
          const columnMetaSpend = columnMetaLeads.reduce(
            (sum, l) => sum + (l.acquisition_cost ?? 0),
            0,
          );
          const columnRevenue = isClosed
            ? stageLeads.reduce(
                (sum, l) =>
                  sum + (l.value_pln != null ? parseFloat(l.value_pln) : 0),
                0,
              )
            : 0;

          return (
            <div
              key={stage.id}
              className="shrink-0 w-64 rounded-xl flex flex-col transition-colors"
              style={{
                background: isOver ? "var(--bg-3, var(--bg-2))" : "var(--bg-2)",
                border: isOver
                  ? `2px solid ${isClosed ? "#22c55e" : stage.color}`
                  : "1px solid var(--border)",
                borderTopColor: isClosed ? "#22c55e" : stage.color,
                borderTopWidth: 3,
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                dragCounters.current[stage.id] =
                  (dragCounters.current[stage.id] ?? 0) + 1;
                setOverStageId(stage.id);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
              onDragLeave={() => {
                dragCounters.current[stage.id] =
                  (dragCounters.current[stage.id] ?? 1) - 1;
                if (dragCounters.current[stage.id] <= 0) {
                  dragCounters.current[stage.id] = 0;
                  setOverStageId((prev) =>
                    prev === stage.id ? null : prev,
                  );
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                dragCounters.current[stage.id] = 0;
                handleDrop(stage.id);
              }}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{stage.name}</span>
                  {isClosed && (
                    <span
                      className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}
                    >
                      Konwersja
                    </span>
                  )}
                </div>
                <span
                  className="text-xs bg-[var(--surface)] px-2 py-0.5 rounded-full border border-[var(--border)]"
                  style={{ color: "var(--muted)" }}
                >
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead cards */}
              <div className="flex flex-col gap-2 p-3 min-h-[140px] flex-1">
                {stageLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isClosedStage={isClosed}
                    isDragging={lead.id === draggingId}
                    onDragStart={setDraggingId}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setOverStageId(null);
                      dragCounters.current = {};
                    }}
                    onValueUpdate={handleValueUpdate}
                    onDelete={handleDeleteLead}
                  />
                ))}
                {stageLeads.length === 0 && (
                  <div
                    className="text-xs text-center py-8"
                    style={{ color: "var(--muted)" }}
                  >
                    Upuść lead tutaj
                  </div>
                )}
              </div>

              {/* Closed stage summary */}
              {isClosed && stageLeads.length > 0 && (
                <div
                  className="mx-3 mb-3 px-3 py-2.5 rounded-lg text-xs"
                  style={{
                    background: "rgba(34,197,94,0.05)",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "var(--muted)" }}>Zamknięte</span>
                    <span className="font-semibold" style={{ color: "#22c55e" }}>
                      {stageLeads.length}
                    </span>
                  </div>
                  {columnRevenue > 0 && (
                    <div className="flex justify-between mb-1">
                      <span style={{ color: "var(--muted)" }}>Przychód</span>
                      <span className="font-semibold tabular-nums" style={{ color: "#22c55e" }}>
                        {pln(columnRevenue)}
                      </span>
                    </div>
                  )}
                  {columnMetaLeads.length > 0 && (
                    <>
                      <div className="flex justify-between mb-1">
                        <span style={{ color: "var(--muted)" }}>Koszt pozysk. (Meta)</span>
                        <span className="font-semibold tabular-nums" style={{ color: "#3b82f6" }}>
                          {pln(columnMetaSpend)}
                        </span>
                      </div>
                      {columnRevenue > 0 && (
                        <div className="flex justify-between">
                          <span style={{ color: "var(--muted)" }}>Zysk</span>
                          <span
                            className="font-semibold tabular-nums"
                            style={{ color: columnRevenue - columnMetaSpend >= 0 ? "#22c55e" : "#ef4444" }}
                          >
                            {pln(columnRevenue - columnMetaSpend)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
