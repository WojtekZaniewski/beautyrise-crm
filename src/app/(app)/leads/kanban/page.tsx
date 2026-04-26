import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getCurrentPipelineId, getStagesForPipeline } from "@/lib/pipeline";
import { SourceSelect } from "@/components/source-select";
import { CampaignSelect } from "@/components/campaign-select";
import { KanbanBoard } from "./board";

type SearchParams = Promise<{ source?: string; campaign?: string }>;

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
  const { source = "all", campaign = "all" } = await searchParams;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const currentPipelineId = await getCurrentPipelineId(WORKSPACE_ID);
  const stages = currentPipelineId ? await getStagesForPipeline(currentPipelineId) : [];
  const stageIds = stages.map((s) => s.id);

  // Fetch all campaigns for this workspace (needed for dropdown + metrics)
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, name")
    .eq("workspace_id", WORKSPACE_ID)
    .order("name");

  // Leads query
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
    value_pln: string | null;
  }> = [];

  if (stageIds.length > 0) {
    let q = supabase
      .from("leads")
      .select("id, full_name, phone, email, source, source_campaign_id, stage_id, created_at, potential_score, value_pln")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("archived", false)
      .in("stage_id", stageIds)
      .order("created_at", { ascending: false });

    if (source !== "all") {
      q = q.eq("source", source);
    }

    // Filter by specific campaign when Meta Ads + campaign selected
    if (source === "meta_ads" && campaign !== "all") {
      q = q.eq("source_campaign_id", campaign);
    }

    const { data } = await q;
    leadsRaw = (data ?? []) as typeof leadsRaw;
  }

  // Fetch Meta Ads campaign metrics (for stats bar)
  let metaStats: MetaStats | null = null;
  const campaignMap: Record<string, { name: string; avgCPL: number }> = {};

  if (campaigns && campaigns.length > 0) {
    const campaignIds =
      source === "meta_ads" && campaign !== "all"
        ? [campaign]
        : campaigns.map((c) => c.id);

    const thirtyDaysAgoDate = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
    const { data: metrics } = await supabase
      .from("campaign_metrics_daily")
      .select("campaign_id, date, spend, impressions, clicks, leads_count")
      .in("campaign_id", campaignIds)
      .gte("date", thirtyDaysAgoDate);

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

  // Aggregate daily metrics by date (for the chart panel)
  type DailyMetric = { date: string; spend: number; clicks: number; impressions: number; leadsCount: number };
  const metricsByDate: Record<string, DailyMetric> = {};
  if (campaigns && campaigns.length > 0) {
    const allMetrics = await supabase
      .from("campaign_metrics_daily")
      .select("date, spend, clicks, impressions, leads_count")
      .in("campaign_id", campaigns.map((c) => c.id))
      .gte("date", new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0]);

    for (const m of (allMetrics.data ?? [])) {
      const date = m.date as string;
      if (!metricsByDate[date]) {
        metricsByDate[date] = { date, spend: 0, clicks: 0, impressions: 0, leadsCount: 0 };
      }
      metricsByDate[date].spend       += parseFloat(String(m.spend ?? "0"));
      metricsByDate[date].clicks      += m.clicks       ?? 0;
      metricsByDate[date].impressions += m.impressions  ?? 0;
      metricsByDate[date].leadsCount  += m.leads_count  ?? 0;
    }
  }
  const dailyMetrics = Object.values(metricsByDate);

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
        <SourceSelect current={source} />
        {source === "meta_ads" && (
          <CampaignSelect campaigns={campaigns ?? []} current={campaign} />
        )}
      </div>
      <KanbanBoard
        key={`${source}-${campaign}`}
        stages={stages}
        initialLeads={leads}
        source={source}
        metaStats={metaStats}
        dailyMetrics={dailyMetrics}
      />
    </div>
  );
}
