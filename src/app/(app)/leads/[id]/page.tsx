import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StageSelect } from "./stage-select";
import { LeadTimeline } from "./lead-timeline";
import { LeadTags } from "./tags";
import { ValueEdit } from "./value-edit";
import { LeadNipField, LeadSegmentationFields } from "./lead-extra-fields";
import { IntegrationSidebar } from "./integration-sidebar";
import { PotentialScore } from "./potential-score";
import { SendGrantFormButton } from "./send-grant-form-button";
import { sourceLabel } from "@/lib/constants";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getStagesForPipeline, getCurrentPipelineId, getPipelines } from "@/lib/pipeline";

const panelStyle = {
  background: "var(--panel-solid)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  boxShadow: "var(--shadow-sm)",
};

const INT_COLOR: Record<string, string> = {
  meta_ads: "#3b82f6",
  email:    "#8b5cf6",
  sms:      "#22c55e",
};

export default async function LeadDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ctx?: string; cid?: string }>;
}) {
  const { id } = await params;
  const { ctx = "general", cid = "" } = await searchParams;

  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [leadRes, eventsRes, tagsRes] = await Promise.all([
    supabase
      .from("leads")
      .select(`*, pipeline_stages ( id, name, color, pipeline_id ), lead_tags ( tag_id )`)
      .eq("id", id)
      .single(),
    supabase
      .from("lead_events")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("tags").select("id, name, color").eq("workspace_id", WORKSPACE_ID).order("name"),
  ]);

  const lead = leadRes.data;
  if (!lead) notFound();

  const events = eventsRes.data;
  const allTags = tagsRes.data;

  // Fetch stages only from the lead's own pipeline to avoid duplicates across pipelines
  const leadPipelineId =
    (lead.pipeline_stages as { pipeline_id: string } | null)?.pipeline_id ??
    await getCurrentPipelineId(WORKSPACE_ID);
  const [stages, allPipelines] = await Promise.all([
    leadPipelineId ? getStagesForPipeline(leadPipelineId) : Promise.resolve([]),
    getPipelines(WORKSPACE_ID),
  ]);
  const leadPipelineName = allPipelines.find((p) => p.id === leadPipelineId)?.name ?? "";

  type CampaignRef = { id: string; name: string };
  const phone = lead.phone as string | null;
  const email = lead.email as string | null;
  const sourceCampaignId = (lead as Record<string, unknown>).source_campaign_id as string | null;

  const [emailRows, smsRows, metaCampRes] = await Promise.all([
    email
      ? supabase.from("email_outreach_recipients").select("email_outreach_campaigns(id, name)").eq("email", email).limit(20)
      : { data: [] as unknown[] },
    phone
      ? supabase.from("sms_campaign_recipients").select("sms_campaigns(id, name)").eq("phone", phone).limit(20)
      : { data: [] as unknown[] },
    sourceCampaignId
      ? supabase.from("campaigns").select("id, name").eq("id", sourceCampaignId).single()
      : { data: null },
  ]);

  const emailCampaigns: CampaignRef[] = [...new Map(
    (emailRows.data ?? [])
      .map((r) => (r as { email_outreach_campaigns: CampaignRef | null }).email_outreach_campaigns)
      .filter((c): c is CampaignRef => c !== null)
      .map((c) => [c.id, c])
  ).values()];

  const smsCampaigns: CampaignRef[] = [...new Map(
    (smsRows.data ?? [])
      .map((r) => (r as { sms_campaigns: CampaignRef | null }).sms_campaigns)
      .filter((c): c is CampaignRef => c !== null)
      .map((c) => [c.id, c])
  ).values()];

  const metaCampaigns: CampaignRef[] = metaCampRes.data ? [metaCampRes.data as CampaignRef] : [];

  const stage = lead.pipeline_stages as { id: string; name: string; color: string } | null;
  const assignedIds = ((lead.lead_tags as Array<{ tag_id: string }>) ?? []).map((lt) => lt.tag_id);

  const dof = /dofinansow/i;
  const isDofinansowaniaLead =
    dof.test(leadPipelineName) ||
    !!((lead as Record<string, unknown>).dofinansowanie_typ) ||
    emailCampaigns.some((c) => dof.test(c.name)) ||
    smsCampaigns.some((c) => dof.test(c.name)) ||
    metaCampaigns.some((c) => dof.test(c.name));

  const activeCampaignName =
    ctx === "email"    ? (emailCampaigns.find((c) => c.id === cid)?.name ?? "") :
    ctx === "sms"      ? (smsCampaigns.find((c) => c.id === cid)?.name ?? "") :
    ctx === "meta_ads" ? (metaCampaigns.find((c) => c.id === cid)?.name ?? "") :
    "";

  const mappedEvents = (events ?? []).map((ev) => ({
    id: ev.id,
    type: ev.type,
    payload: ev.payload as Record<string, string> | null,
    created_at: ev.created_at,
  }));

  // Integration header for non-general views
  const intHeaderColor = INT_COLOR[ctx] ?? "var(--accent)";
  const intHeaderLabel =
    ctx === "meta_ads" ? `Meta Ads${activeCampaignName ? ` — ${activeCampaignName}` : ""}` :
    ctx === "email"    ? `📧 ${activeCampaignName || "Email"}` :
    ctx === "sms"      ? `✉ ${activeCampaignName || "SMS"}` :
    null;

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-5xl mx-auto anim-page">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12.5px] mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/leads" className="hover:text-[var(--text)] transition-colors">Leady</Link>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>{lead.full_name}</span>
        {intHeaderLabel && (
          <>
            <span>/</span>
            <span style={{ color: intHeaderColor, fontWeight: 500 }}>{intHeaderLabel}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Lead info card — always visible */}
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
                  style={{ backgroundColor: stage.color + "18", color: stage.color, border: `1px solid ${stage.color}30` }}
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
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1" style={{ color: "var(--muted)" }}>{f.label}</div>
                  <div>{f.value ?? "—"}</div>
                </div>
              ))}
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1" style={{ color: "var(--muted)" }}>Wartość</div>
                <ValueEdit leadId={id} value={lead.value_pln as number | null} />
              </div>
              <LeadNipField leadId={id} nip={(lead as Record<string, unknown>).nip as string | null} />
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-1" style={{ color: "var(--muted)" }}>Data dodania</div>
                <div>
                  {new Date(lead.created_at).toLocaleString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            {lead.notes && (
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-2" style={{ color: "var(--muted)" }}>Notatki</div>
                <div className="text-[13px] whitespace-pre-wrap">{lead.notes}</div>
              </div>
            )}

            {/* Stage — inline in card, always visible */}
            <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.09em] mb-2" style={{ color: "var(--muted)" }}>Etap</div>
              <StageSelect leadId={id} currentStageId={stage?.id ?? null} stages={stages ?? []} currentStageName={stage?.name} />
            </div>

            {/* Potential score */}
            <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <PotentialScore
                leadId={id}
                initialScore={(lead as Record<string, unknown>).potential_score as number | null}
              />
            </div>

            {/* Segmentation + grant form button — only for dofinansowania leads in general view */}
            {ctx === "general" && isDofinansowaniaLead && (
              <>
                <LeadSegmentationFields
                  leadId={id}
                  typ={(lead as Record<string, unknown>).dofinansowanie_typ as string | null}
                  obsluga={(lead as Record<string, unknown>)["dofinansowanie_obsluga"] as string | null}
                />
                <div className="mt-5 pt-5 flex flex-col gap-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <SendGrantFormButton leadId={id} hasEmail={!!lead.email} />
                  {!lead.email && (
                    <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                      Lead nie ma adresu e-mail - uzupelnij go aby wyslac formularz.
                    </p>
                  )}
                  {/* Grant form tracking status */}
                  {(() => {
                    const sentEvent = (events ?? []).find((ev) => ev.type === "grant_form_sent");
                    const clickedEvent = (events ?? []).find((ev) => ev.type === "grant_form_clicked");
                    const fmt = (iso: string) => new Date(iso).toLocaleString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
                    return (
                      <div
                        className="flex flex-col gap-2 rounded-lg px-3 py-2.5 text-[12.5px]"
                        style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)" }}
                      >
                        <div className="font-semibold text-[10.5px] uppercase tracking-[0.09em]" style={{ color: "var(--muted)" }}>
                          Formularz dotacyjny
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: "var(--muted)" }}>Wysłany:</span>
                          {sentEvent ? (
                            <span style={{ color: "var(--text)" }}>{fmt(sentEvent.created_at)}</span>
                          ) : (
                            <span style={{ color: "var(--muted)", fontStyle: "italic" }}>nie wysłano</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: "var(--muted)" }}>Kliknął link:</span>
                          {clickedEvent ? (
                            <>
                              <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Tak</span>
                              <span style={{ color: "var(--muted)" }}>— {fmt(clickedEvent.created_at)}</span>
                            </>
                          ) : (
                            <span style={{ color: "#dc2626", fontWeight: 700 }}>✗ Nie</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            )}
          </div>

          {/* Integration context header — for non-general views */}
          {ctx !== "general" && intHeaderLabel && (
            <div
              style={{
                padding: "12px 16px", borderRadius: "8px",
                background: `${intHeaderColor}08`, border: `1px solid ${intHeaderColor}25`,
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 700, color: intHeaderColor }}>{intHeaderLabel}</span>
              {activeCampaignName && (
                <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>Notatki powiązane z tą kampanią</span>
              )}
            </div>
          )}

          {/* Notes */}
          <div style={panelStyle} className="p-6">
            <h2 className="text-[13.5px] font-semibold tracking-tight mb-4">Notatki</h2>
            <LeadTimeline
              leadId={id}
              initialEvents={mappedEvents}
              contextType={ctx as "all" | "general" | "meta_ads" | "email" | "sms"}
              campaignId={cid || undefined}
              campaignName={activeCampaignName || undefined}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          {/* Integration + campaign selector */}
          <IntegrationSidebar
            leadId={id}
            metaCampaigns={metaCampaigns}
            emailCampaigns={emailCampaigns}
            smsCampaigns={smsCampaigns}
          />

          <div style={panelStyle} className="p-4">
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.09em] mb-3" style={{ color: "var(--muted)" }}>
              Tagi
            </h3>
            <LeadTags leadId={id} allTags={allTags ?? []} assignedIds={assignedIds} />
          </div>
        </div>
      </div>
    </div>
  );
}
