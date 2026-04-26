"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { LeadNotesPanel } from "@/components/lead-notes-panel";
import type { MetaStats } from "./page";

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
}: {
  metaStats: MetaStats;
  convertedCount: number;
  convertedAcquisitionCost: number;
}) {
  const items: { label: string; value: string; highlight?: boolean }[] = [
    { label: "Wydano łącznie", value: pln(metaStats.totalSpend) },
    { label: "Leady (kampanie)", value: metaStats.totalLeads.toString() },
    { label: "Śr. CPL", value: pln(metaStats.avgCPL) },
    { label: "Śr. CPC", value: pln(metaStats.avgCPC) },
    { label: "CTR", value: `${metaStats.ctr.toFixed(2)}%` },
    { label: "Kliknięcia", value: metaStats.totalClicks.toLocaleString("pl-PL") },
    { label: "Zamknięte leady", value: convertedCount.toString(), highlight: convertedCount > 0 },
    ...(convertedAcquisitionCost > 0
      ? [{ label: "Koszt zamkniętych", value: pln(convertedAcquisitionCost), highlight: true }]
      : []),
    ...(convertedCount > 0 && convertedAcquisitionCost > 0
      ? [{ label: "Śr. koszt/konwers.", value: pln(convertedAcquisitionCost / convertedCount), highlight: true }]
      : []),
  ];

  return (
    <div
      className="flex flex-wrap gap-3 mb-5 p-4 rounded-xl items-center"
      style={{
        background: "rgba(59,130,246,0.04)",
        border: "1px solid rgba(59,130,246,0.18)",
      }}
    >
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
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col px-3 py-2 rounded-lg min-w-[80px]"
          style={{
            background: item.highlight ? "rgba(34,197,94,0.06)" : "var(--surface)",
            border: item.highlight
              ? "1px solid rgba(34,197,94,0.2)"
              : "1px solid var(--border)",
          }}
        >
          <span className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>
            {item.label}
          </span>
          <span
            className="text-[13px] font-semibold tabular-nums"
            style={{ color: item.highlight ? "#22c55e" : "var(--text)" }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function LeadCard({
  lead,
  isClosedStage,
  isDragging,
  onDragStart,
  onDragEnd,
}: {
  lead: Lead;
  isClosedStage: boolean;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
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
        <div
          draggable={false}
          onDragStart={(e) => e.stopPropagation()}
        >
          <LeadNotesPanel
            leadId={lead.id}
            leadName={lead.full_name}
            initialScore={lead.potential_score}
          />
        </div>
      </div>
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

  const closedMetaLeads = closedStageId
    ? leads.filter((l) => l.stage_id === closedStageId && l.source === "meta_ads")
    : [];
  const convertedCount = closedMetaLeads.length;
  const convertedAcquisitionCost = closedMetaLeads.reduce(
    (sum, l) => sum + (l.acquisition_cost ?? 0),
    0,
  );

  const showMetaStats =
    metaStats !== null && (source === "meta_ads" || source === "all");

  function getLeadsForStage(stageId: string) {
    return leads.filter((l) => l.stage_id === stageId);
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

          return (
            <div
              key={stage.id}
              className="shrink-0 w-64 rounded-xl flex flex-col transition-colors"
              style={{
                background: isOver ? "var(--bg-3, var(--bg-2))" : "var(--bg-2)",
                border: isOver
                  ? `2px solid ${isClosed ? "#22c55e" : stage.color}`
                  : `1px solid var(--border)`,
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
                  setOverStageId((prev) => (prev === stage.id ? null : prev));
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

              {/* Closed stage cost summary */}
              {isClosed && stageLeads.length > 0 && (
                <div
                  className="mx-3 mb-3 px-3 py-2.5 rounded-lg text-xs"
                  style={{
                    background: "rgba(34,197,94,0.05)",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "var(--muted)" }}>Zamknięte leady</span>
                    <span className="font-semibold" style={{ color: "#22c55e" }}>
                      {stageLeads.length}
                    </span>
                  </div>
                  {columnMetaLeads.length > 0 && (
                    <>
                      <div className="flex justify-between mb-1">
                        <span style={{ color: "var(--muted)" }}>z Meta Ads</span>
                        <span className="font-semibold">{columnMetaLeads.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--muted)" }}>Koszt pozysk.</span>
                        <span
                          className="font-semibold tabular-nums"
                          style={{ color: "#3b82f6" }}
                        >
                          {pln(columnMetaSpend)}
                        </span>
                      </div>
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
