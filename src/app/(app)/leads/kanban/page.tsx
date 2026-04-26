import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getPipelines, getCurrentPipelineId, getStagesForPipeline } from "@/lib/pipeline";
import { PipelineSelect } from "@/components/pipeline-select";
import { SourceSelect } from "@/components/source-select";
import { KanbanBoard } from "./board";

type SearchParams = Promise<{ source?: string }>;

export type MetaStats = {
  totalSpend: number;
  totalLeads: number;
  avgCPL: number;
  avgCPC: number;
  ctr: number;
  totalClicks: number;
  totalImpressions: number;
};

export default async function KanbanPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { source = "all" } = await searchParams;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [pipelines, currentPipelineId] = await Promise.all([
    getPipelines(WORKSPACE_ID),
    getCurrentPipelineId(WORKSPACE_ID),
  ]);

  const stages = currentPipelineId ? await getStagesForPipeline(currentPipelineId) : [];
  const stageIds = stages.map((s) => s.id);

  // Leads query with source filter
  let leadsRaw: Array<{
    id: string;
    full_name: string;
    phone: string | null;
    email: string | null;
    source: string;
    source_campaign_id: string | null;
    stage_id: string | null;
    created_at: string;
    potential_score: number | null;
  }> = [];

  if (stageIds.length > 0) {
    let q = supabase
      .from("leads")
      .select("id, full_name, phone, email, source, source_campaign_id, stage_id, created_at, potential_score")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("archived", false)
      .in("stage_id", stageIds)
      .order("created_at", { ascending: false });

    if (source !== "all") {
      q = q.eq("source", source);
    }

    const { data } = await q;
    leadsRaw = (data ?? []) as typeof leadsRaw;
  }

  // Fetch Meta Ads campaign metrics for stats bar
  let metaStats: MetaStats | null = null;
  const campaignMap: Record<string, { name: string; avgCPL: number }> = {};

  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, name")
    .eq("workspace_id", WORKSPACE_ID);

  if (campaigns && campaigns.length > 0) {
    const campaignIds = campaigns.map((c) => c.id);

    const { data: metrics } = await supabase
      .from("campaign_metrics_daily")
      .select("campaign_id, spend, impressions, clicks, leads_count")
      .in("campaign_id", campaignIds);

    if (metrics && metrics.length > 0) {
      let totalSpend = 0;
      let totalLeads = 0;
      let totalClicks = 0;
      let totalImpressions = 0;
      const perCampaign: Record<string, { spend: number; leads: number }> = {};

      for (const m of metrics) {
        const spend = parseFloat(String(m.spend ?? "0"));
        const leads = m.leads_count ?? 0;
        const clicks = m.clicks ?? 0;
        const impressions = m.impressions ?? 0;

        totalSpend += spend;
        totalLeads += leads;
        totalClicks += clicks;
        totalImpressions += impressions;

        if (!perCampaign[m.campaign_id]) {
          perCampaign[m.campaign_id] = { spend: 0, leads: 0 };
        }
        perCampaign[m.campaign_id].spend += spend;
        perCampaign[m.campaign_id].leads += leads;
      }

      metaStats = {
        totalSpend,
        totalLeads,
        avgCPL: totalLeads > 0 ? totalSpend / totalLeads : 0,
        avgCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
        ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
        totalClicks,
        totalImpressions,
      };

      for (const c of campaigns) {
        const cm = perCampaign[c.id];
        if (cm) {
          campaignMap[c.id] = {
            name: c.name,
            avgCPL: cm.leads > 0 ? cm.spend / cm.leads : 0,
          };
        }
      }
    }
  }

  // Enrich leads with per-campaign acquisition cost
  const leads = leadsRaw.map((lead) => ({
    ...lead,
    acquisition_cost:
      lead.source_campaign_id && campaignMap[lead.source_campaign_id]
        ? campaignMap[lead.source_campaign_id].avgCPL
        : null,
    campaign_name:
      lead.source_campaign_id && campaignMap[lead.source_campaign_id]
        ? campaignMap[lead.source_campaign_id].name
        : null,
  }));

  return (
    <div className="px-8 py-8 anim-page">
      <div className="flex items-center gap-3 heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold">Kanban</h1>
        <PipelineSelect pipelines={pipelines} currentPipelineId={currentPipelineId} />
        <SourceSelect current={source} />
      </div>
      <KanbanBoard
        key={source}
        stages={stages}
        initialLeads={leads}
        source={source}
        metaStats={metaStats}
      />
    </div>
  );
}
