import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getStagesForWorkspace } from "@/lib/pipeline";
import { sourceLabel } from "@/lib/constants";
import Link from "next/link";
import { LeadsFilters } from "./filters";
import { LeadNotesPanel } from "@/components/lead-notes-panel";

type SearchParams = Promise<{
  q?: string;
  stage?: string;
  source?: string;
  tag?: string;
}>;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, stage, tag } = await searchParams;
  const sourceParam = (await searchParams).source;
  const source = sourceParam === "all" ? undefined : (sourceParam ?? "meta_ads");
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const stages = await getStagesForWorkspace(WORKSPACE_ID);

  let query = supabase
    .from("leads")
    .select(`
      id, full_name, phone, email, source, created_at, archived, potential_score,
      pipeline_stages ( name, color ),
      lead_tags ( tags ( id, name, color ) )
    `)
    .eq("workspace_id", WORKSPACE_ID)
    .eq("archived", false);

  if (stage) query = query.eq("stage_id", stage);
  if (source) query = query.eq("source", source);
  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,phone.ilike.%${q}%,email.ilike.%${q}%`,
    );
  }

  const { data: leadsRaw } = await query
    .order("created_at", { ascending: false })
    .limit(200);

  let leads = leadsRaw ?? [];
  if (tag) {
    leads = leads.filter((l) =>
      ((l.lead_tags as unknown as Array<{ tags: { id: string } | null }>) ?? []).some(
        (lt) => lt.tags?.id === tag,
      ),
    );
  }

  const { data: tagsData } = await supabase
    .from("tags")
    .select("id, name, color")
    .eq("workspace_id", WORKSPACE_ID)
    .order("name");

  const exportUrl = `/api/leads/export?${new URLSearchParams(
    Object.entries({ q, stage, source, tag }).filter(([, v]) => v) as [string, string][],
  ).toString()}`;

  const sourceTabs = [
    { label: "Meta Ads", value: "meta_ads" },
    { label: "Wszystkie", value: "all" },
    { label: "Ręczne", value: "manual" },
    { label: "Import", value: "import" },
  ];

  const activeSource = sourceParam ?? "meta_ads";

  return (
    <div className="px-7 py-7 max-w-6xl mx-auto anim-page">
      {/* Header */}
      <div className="flex items-center justify-between heat-glow -mx-7 -mt-7 px-7 pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Leady</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            {leads.length} {leads.length === 1 ? "lead" : "leadów"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={exportUrl}
            className="px-3.5 py-2 rounded-md text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            Eksport CSV
          </a>
          <Link
            href="/leads/import"
            className="px-3.5 py-2 rounded-md text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            Import CSV
          </Link>
          <Link
            href="/leads/kanban"
            className="px-3.5 py-2 rounded-md text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            Kanban
          </Link>
          <Link
            href="/leads/new"
            className="btn-primary rounded-md px-4 py-2 text-[13px]"
          >
            + Nowy lead
          </Link>
        </div>
      </div>

      {/* Source tabs */}
      <div className="flex items-center gap-1.5 mb-4">
        {sourceTabs.map((tab) => {
          const isActive = activeSource === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/leads?source=${tab.value}`}
              className="px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-all"
              style={
                isActive
                  ? {
                      background: "var(--accent-subtle)",
                      color: "var(--accent-2)",
                      border: "1px solid rgba(255,76,0,0.2)",
                    }
                  : {
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <LeadsFilters stages={stages} tags={tagsData ?? []} />

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Imię i nazwisko", "Telefon", "E-mail", "Etap", "Tagi", "Źródło", "Data", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-medium text-[11.5px] uppercase tracking-[0.07em]"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-[13px]"
                  style={{ color: "var(--muted)" }}
                >
                  Brak leadów.{" "}
                  <Link
                    href="/leads/new"
                    style={{ color: "var(--accent-2)" }}
                  >
                    Dodaj pierwszy →
                  </Link>
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const stageData = lead.pipeline_stages as unknown as {
                  name: string;
                  color: string;
                } | null;
                const leadTags = (
                  (lead.lead_tags as unknown as Array<{
                    tags: { id: string; name: string; color: string } | null;
                  }>) ?? []
                )
                  .map((lt) => lt.tags)
                  .filter(Boolean) as Array<{
                  id: string;
                  name: string;
                  color: string;
                }>;
                return (
                  <tr
                    key={lead.id}
                    className="table-row-hover transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/leads/${lead.id}`}
                        className="font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "var(--text)" }}
                      >
                        {lead.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {lead.phone ?? "—"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {lead.email ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {stageData ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                          style={{
                            backgroundColor: stageData.color + "18",
                            color: stageData.color,
                            border: `1px solid ${stageData.color}30`,
                          }}
                        >
                          {stageData.name}
                        </span>
                      ) : (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {leadTags.map((t) => (
                          <span
                            key={t.id}
                            className="inline-flex px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                            style={{
                              backgroundColor: t.color + "18",
                              color: t.color,
                              border: `1px solid ${t.color}30`,
                            }}
                          >
                            {t.name}
                          </span>
                        ))}
                        {leadTags.length === 0 && (
                          <span style={{ color: "var(--muted)" }}>—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {sourceLabel[lead.source] ?? lead.source}
                    </td>
                    <td
                      className="px-4 py-3 tabular-nums text-[12px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {new Date(lead.created_at).toLocaleString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <LeadNotesPanel leadId={lead.id} leadName={lead.full_name} initialScore={(lead as { potential_score?: number | null }).potential_score} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
