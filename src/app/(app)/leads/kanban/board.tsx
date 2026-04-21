"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Stage = { id: string; name: string; color: string };
type Lead = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  source: string;
  stage_id: string | null;
  created_at: string;
};

const sourceLabel: Record<string, string> = {
  manual: "Ręcznie",
  import: "Import",
  meta_ads: "Meta Ads",
  webhook: "Webhook",
};

function LeadCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 cursor-grab active:cursor-grabbing select-none"
    >
      <Link
        href={`/leads/${lead.id}`}
        onClick={(e) => e.stopPropagation()}
        className="font-medium text-sm hover:text-[var(--accent)] transition-colors block mb-1"
      >
        {lead.full_name}
      </Link>
      {lead.phone && (
        <div className="text-xs text-[var(--muted)]">{lead.phone}</div>
      )}
      <div className="text-xs text-[var(--muted)] mt-1">
        {sourceLabel[lead.source] ?? lead.source}
      </div>
    </div>
  );
}

function DragCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-[var(--bg)] border border-[var(--accent)] rounded-lg p-3 shadow-xl w-56 rotate-2">
      <div className="font-medium text-sm">{lead.full_name}</div>
      {lead.phone && (
        <div className="text-xs text-[var(--muted)]">{lead.phone}</div>
      )}
    </div>
  );
}

export function KanbanBoard({
  stages,
  initialLeads,
}: {
  stages: Stage[];
  initialLeads: Lead[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const activeLead = leads.find((l) => l.id === activeId);

  function getLeadsForStage(stageId: string) {
    return leads.filter((l) => l.stage_id === stageId);
  }

  function onDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  async function onDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const leadId = active.id as string;
    const overId = over.id as string;

    // Determine target stage: over could be a stage column or another lead
    const isStage = stages.some((s) => s.id === overId);
    const targetStageId = isStage
      ? overId
      : (leads.find((l) => l.id === overId)?.stage_id ?? null);

    if (!targetStageId) return;

    const prevLead = leads.find((l) => l.id === leadId);
    if (prevLead?.stage_id === targetStageId) return;

    const targetStage = stages.find((s) => s.id === targetStageId);

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage_id: targetStageId } : l)),
    );

    await supabase
      .from("leads")
      .update({ stage_id: targetStageId, updated_at: new Date().toISOString() })
      .eq("id", leadId);

    await supabase.from("lead_events").insert({
      lead_id: leadId,
      type: "stage_change",
      payload: {
        from: stages.find((s) => s.id === prevLead?.stage_id)?.name,
        to: targetStage?.name,
      },
    });
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          return (
            <div
              key={stage.id}
              id={stage.id}
              className="shrink-0 w-64 bg-[var(--panel)] border border-[var(--border)] rounded-xl flex flex-col"
              style={{ borderTopColor: stage.color, borderTopWidth: 3 }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[var(--border)]">
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-xs text-[var(--muted)] bg-[var(--bg)] px-2 py-0.5 rounded-full">
                  {stageLeads.length}
                </span>
              </div>

              <SortableContext items={stageLeads.map((l) => l.id)}>
                <div className="flex flex-col gap-2 p-3 min-h-[120px]">
                  {stageLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      isDragging={lead.id === activeId}
                    />
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="text-xs text-[var(--muted)] text-center py-6">
                      Upuść lead tutaj
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeLead ? <DragCard lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
