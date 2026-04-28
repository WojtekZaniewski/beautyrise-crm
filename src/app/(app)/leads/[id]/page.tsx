import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StageSelect } from "./stage-select";
import { AddNote } from "./add-note";
import { LeadTags } from "./tags";
import { ValueEdit } from "./value-edit";
import { LeadNipField, LeadSegmentationFields } from "./lead-extra-fields";
import { sourceLabel, eventLabel } from "@/lib/constants";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getStagesForWorkspace } from "@/lib/pipeline";

const panelStyle = {
  background: "var(--panel-solid)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  boxShadow: "var(--shadow-sm)",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [leadRes, eventsRes, stagesData, tagsRes] = await Promise.all([
    supabase
      .from("leads")
      .select(`
        *,
        pipeline_stages ( id, name, color, pipeline_id ),
        lead_tags ( tag_id )
      `)
      .eq("id", id)
      .single(),
    supabase
      .from("lead_events")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
    getStagesForWorkspace(WORKSPACE_ID),
    supabase
      .from("tags")
      .select("id, name, color")
      .eq("workspace_id", WORKSPACE_ID)
      .order("name"),
  ]);

  const lead = leadRes.data;
  if (!lead) notFound();

  const events = eventsRes.data;
  const stages = stagesData;
  const allTags = tagsRes.data;

  const stage = lead.pipeline_stages as { id: string; name: string; color: string } | null;
  const assignedIds = ((lead.lead_tags as Array<{ tag_id: string }>) ?? []).map(
    (lt) => lt.tag_id,
  );

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-5xl mx-auto anim-page">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12.5px] mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/leads" className="hover:text-[var(--text)] transition-colors">
          Leady
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>{lead.full_name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Lead info card */}
          <div style={panelStyle} className="p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-[18px] font-semibold tracking-tight">{lead.full_name}</h1>
                <div className="text-[12.5px] mt-0.5" style={{ color: "var(--muted)" }}>
                  {sourceLabel[lead.source] ?? lead.source}
                </div>
              </div>
              {stage && (
                <span
                  className="px-2.5 py-1 rounded-full text-[12px] font-medium"
                  style={{
                    backgroundColor: stage.color + "18",
                    color: stage.color,
                    border: `1px solid ${stage.color}30`,
                  }}
                >
                  {stage.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5 text-[13px]">
              {[
                { label: "Telefon", value: lead.phone },
                { label: "E-mail", value: lead.email },
              ].map((f) => (
                <div key={f.label}>
                  <div
                    className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {f.label}
                  </div>
                  <div>{f.value ?? "—"}</div>
                </div>
              ))}
              <div>
                <div
                  className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  Wartość
                </div>
                <ValueEdit leadId={id} value={lead.value_pln as number | null} />
              </div>
              <LeadNipField leadId={id} nip={(lead as Record<string, unknown>).nip as string | null} />
              <div>
                <div
                  className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  Data dodania
                </div>
                <div>
                  {new Date(lead.created_at).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {lead.notes && (
              <div
                className="mt-5 pt-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div
                  className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Notatki
                </div>
                <div className="text-[13px] whitespace-pre-wrap">{lead.notes}</div>
              </div>
            )}

            <LeadSegmentationFields
              leadId={id}
              typ={(lead as Record<string, unknown>).dofinansowanie_typ as string | null}
              obsluga={(lead as Record<string, unknown>)["dofinansowanie_obsluga"] as string | null}
            />
          </div>

          {/* Timeline */}
          <div style={panelStyle} className="p-6">
            <h2 className="text-[13.5px] font-semibold tracking-tight mb-4">Timeline</h2>
            <AddNote leadId={id} />

            <div className="mt-5 flex flex-col gap-4">
              {(events ?? []).map((ev) => (
                <div key={ev.id} className="flex gap-3 text-[13px]">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: "var(--accent)", opacity: 0.7 }}
                  />
                  <div>
                    <div className="font-medium">{eventLabel[ev.type] ?? ev.type}</div>
                    {ev.payload && Object.keys(ev.payload).length > 0 && (
                      <div className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
                        {ev.type === "note" && (ev.payload as { text?: string }).text}
                        {ev.type === "stage_change" &&
                          `${(ev.payload as { from?: string }).from ?? "?"} → ${(ev.payload as { to?: string }).to ?? "?"}`}
                      </div>
                    )}
                    <div className="text-[11.5px] mt-0.5" style={{ color: "var(--muted)", opacity: 0.7 }}>
                      {new Date(ev.created_at).toLocaleString("pl-PL")}
                    </div>
                  </div>
                </div>
              ))}
              {(events ?? []).length === 0 && (
                <div className="text-[13px]" style={{ color: "var(--muted)" }}>
                  Brak zdarzeń.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          <div style={panelStyle} className="p-4">
            <h3
              className="text-[11.5px] font-semibold uppercase tracking-[0.09em] mb-3"
              style={{ color: "var(--muted)" }}
            >
              Etap
            </h3>
            <StageSelect
              leadId={id}
              currentStageId={stage?.id ?? null}
              stages={stages ?? []}
              currentStageName={stage?.name}
            />
          </div>

          <div style={panelStyle} className="p-4">
            <h3
              className="text-[11.5px] font-semibold uppercase tracking-[0.09em] mb-3"
              style={{ color: "var(--muted)" }}
            >
              Tagi
            </h3>
            <LeadTags
              leadId={id}
              allTags={allTags ?? []}
              assignedIds={assignedIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
