import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getCurrentPipelineId, getStagesForPipeline } from "@/lib/pipeline";
import { SourceSelect } from "@/components/source-select";
import { CampaignSelect } from "@/components/campaign-select";
import { DateRangePicker } from "@/components/date-range-picker";
import { KanbanBoard } from "./board";

type SearchParams = Promise<{ source?: string; campaign?: string; from?: string; to?: string; minScore?: string; maxScore?: string; minDays?: string }>;

export type MetaStats = {
  totalSpend: number;
  totalLeads: number;
  avgCPL: number;
  avgCPC: number;
  ctr: number;
  totalClicks: number;
  totalImpressions: number;
};

export type EmailStats = {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  openRate: number;
  clickRate: number;
  totalToday: number;
  total7d: number;
};
export type EmailDailyPoint = { date: string; sent: number; opened: number; clicked: number };

export type SmsStats = {
  totalSent: number;
  totalReplied: number;
  replyRate: number;
  campaignCount: number;
  totalToday: number;
  total7d: number;
};
export type SmsDailyPoint = { date: string; sent: number; replied: number };

export default async function KanbanPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { source = "all", campaign = "all", from: fromParam, to: toParam, minScore: minScoreParam, maxScore: maxScoreParam, minDays: minDaysParam } = await searchParams;
  const minScore = minScoreParam ? parseInt(minScoreParam) : null;
  const maxScore = maxScoreParam ? parseInt(maxScoreParam) : null;
  const minDays  = minDaysParam  ? parseInt(minDaysParam)  : null;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  // Date range (default: last 30 days)
  const todayStr   = new Date().toISOString().split("T")[0];
  const defaultFrom = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
  const fromDate   = fromParam ?? defaultFrom;
  const toDate     = toParam   ?? todayStr;
  const fromIso    = fromDate + "T00:00:00.000Z";
  const toIso      = toDate   + "T23:59:59.999Z";

  const numDays = Math.round((new Date(toDate).getTime() - new Date(fromDate).getTime()) / 86400000) + 1;
  const rangeLabelMap: Record<number, string> = { 7: "7 dni", 30: "30 dni", 90: "90 dni", 365: "Rok" };
  const rangeLabel = rangeLabelMap[numDays] ?? `${fromDate.slice(5).replace("-", ".")} – ${toDate.slice(5).replace("-", ".")}`;


  const currentPipelineId = await getCurrentPipelineId(WORKSPACE_ID);
  const stages = currentPipelineId ? await getStagesForPipeline(currentPipelineId) : [];
  const stageIds = stages.map((s) => s.id);

  // Fetch all campaigns for this workspace (needed for dropdown + metrics)
  const [{ data: campaigns }, { data: emailCampaigns }, { data: smsCampaigns }] = await Promise.all([
    supabase.from("campaigns").select("id, name").eq("workspace_id", WORKSPACE_ID).order("name"),
    supabase.from("email_outreach_campaigns").select("id, name").eq("workspace_id", WORKSPACE_ID).order("created_at", { ascending: false }),
    supabase.from("sms_campaigns").select("id, name").eq("workspace_id", WORKSPACE_ID).order("created_at", { ascending: false }),
  ]);

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
    notes: string | null;
    custom_fields: Record<string, unknown> | null;
  }> = [];

  if (stageIds.length > 0) {
    let q = supabase
      .from("leads")
      .select("id, full_name, phone, email, source, source_campaign_id, stage_id, created_at, potential_score, value_pln, notes, custom_fields")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("archived", false)
      .in("stage_id", stageIds)
      .gte("created_at", fromIso)
      .lte("created_at", toIso)
      .order("created_at", { ascending: false });

    let shouldQuery = true;

    if (source === "email") {
      // Filter by source_campaign_id — works even without "email" in lead_source enum
      const emailIds = (emailCampaigns ?? []).map(c => c.id);
      if (campaign !== "all") {
        q = q.eq("source_campaign_id", campaign);
      } else if (emailIds.length > 0) {
        q = q.in("source_campaign_id", emailIds);
      } else {
        shouldQuery = false;
      }
    } else if (source === "sms") {
      const smsIds = (smsCampaigns ?? []).map(c => c.id);
      if (campaign !== "all") {
        q = q.eq("source_campaign_id", campaign);
      } else if (smsIds.length > 0) {
        q = q.in("source_campaign_id", smsIds);
      } else {
        shouldQuery = false;
      }
    } else {
      if (source !== "all") {
        q = q.eq("source", source);
      }
      if (campaign !== "all") {
        q = q.eq("source_campaign_id", campaign);
      }
    }

    if (shouldQuery) {
      const { data } = await q;
      leadsRaw = (data ?? []) as typeof leadsRaw;
    }
  }

  // Fetch Meta Ads campaign metrics (for stats bar)
  let metaStats: MetaStats | null = null;
  const campaignMap: Record<string, { name: string; avgCPL: number }> = {};

  if (campaigns && campaigns.length > 0) {
    const campaignIds =
      source === "meta_ads" && campaign !== "all"
        ? [campaign]
        : campaigns.map((c) => c.id);

    const { data: metrics } = await supabase
      .from("campaign_metrics_daily")
      .select("campaign_id, date, spend, impressions, clicks, leads_count")
      .in("campaign_id", campaignIds)
      .gte("date", fromDate)
      .lte("date", toDate);

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

  // Aggregate daily metrics by date (for the chart panel) — same campaign filter as metaStats
  const filteredCampaignIds =
    source === "meta_ads" && campaign !== "all"
      ? [campaign]
      : (campaigns ?? []).map((c) => c.id);

  type DailyMetric = { date: string; spend: number; clicks: number; impressions: number; leadsCount: number };
  const metricsByDate: Record<string, DailyMetric> = {};
  if (filteredCampaignIds.length > 0) {
    const allMetrics = await supabase
      .from("campaign_metrics_daily")
      .select("date, spend, clicks, impressions, leads_count")
      .in("campaign_id", filteredCampaignIds)
      .gte("date", fromDate)
      .lte("date", toDate);

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

  // Email & SMS stats (selected date range)
  const sevenDaysAgoStr = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  // Email stats — always built (zeroed when no data)
  const emailDMap: Record<string, { sent: number; opened: number; clicked: number }> = {};
  let emailTotalSent = 0, emailTotalOpened = 0, emailTotalClicked = 0, emailToday = 0, email7d = 0;
  {
    // When specific email outreach campaign selected, use email_outreach_recipients
    if (source === "email" && campaign !== "all") {
      const { data: emailRaw } = await supabase
        .from("email_outreach_recipients")
        .select("sent_at, opened_at, clicked_at")
        .eq("campaign_id", campaign)
        .not("sent_at", "is", null);
      for (const m of emailRaw ?? []) {
        const ds = (m.sent_at as string).split("T")[0];
        if (ds < fromDate || ds > toDate) continue;
        if (!emailDMap[ds]) emailDMap[ds] = { sent: 0, opened: 0, clicked: 0 };
        emailDMap[ds].sent++;
        if (m.opened_at) { emailDMap[ds].opened++; emailTotalOpened++; }
        if (m.clicked_at) { emailDMap[ds].clicked++; emailTotalClicked++; }
        emailTotalSent++;
        if (ds === todayStr) emailToday++;
        if (ds >= sevenDaysAgoStr) email7d++;
      }
    } else {
      const { data: emailRaw } = await supabase
        .from("email_messages")
        .select("sent_at, opened_at, clicked_at")
        .eq("workspace_id", WORKSPACE_ID)
        .not("sent_at", "is", null)
        .gte("sent_at", fromIso)
        .lte("sent_at", toIso);
      for (const m of emailRaw ?? []) {
        const ds = (m.sent_at as string).split("T")[0];
        if (!emailDMap[ds]) emailDMap[ds] = { sent: 0, opened: 0, clicked: 0 };
        emailDMap[ds].sent++;
        if (m.opened_at) { emailDMap[ds].opened++; emailTotalOpened++; }
        if (m.clicked_at) { emailDMap[ds].clicked++; emailTotalClicked++; }
        emailTotalSent++;
        if (ds === todayStr) emailToday++;
        if (ds >= sevenDaysAgoStr) email7d++;
      }
    }
  }
  const emailStats: EmailStats = {
    totalSent: emailTotalSent, totalOpened: emailTotalOpened, totalClicked: emailTotalClicked,
    openRate:  emailTotalSent > 0 ? (emailTotalOpened  / emailTotalSent) * 100 : 0,
    clickRate: emailTotalSent > 0 ? (emailTotalClicked / emailTotalSent) * 100 : 0,
    totalToday: emailToday, total7d: email7d,
  };
  const emailDailyMetrics: EmailDailyPoint[] = [];
  for (let d = new Date(fromDate + "T12:00:00"); d <= new Date(toDate + "T12:00:00"); d.setDate(d.getDate() + 1)) {
    const ds  = d.toISOString().split("T")[0];
    const lbl = d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
    emailDailyMetrics.push({ date: lbl, ...(emailDMap[ds] ?? { sent: 0, opened: 0, clicked: 0 }) });
  }

  // SMS stats — always built (zeroed when no data)
  const smsDMap: Record<string, { sent: number; replied: number }> = {};
  let smsTotalSent = 0, smsTotalReplied = 0, smsToday = 0, sms7d = 0;
  let smsCampaignCount = 0;
  {
    let recipientsQuery = supabase
      .from("sms_campaign_recipients")
      .select("sent_at, replied_at, created_at")
      .eq("workspace_id", WORKSPACE_ID)
      .gte("created_at", fromIso)
      .lte("created_at", toIso);

    if (source === "sms" && campaign !== "all") {
      recipientsQuery = recipientsQuery.eq("campaign_id", campaign);
    }

    const [recipientsRes, campaignsCountRes] = await Promise.all([
      recipientsQuery,
      supabase.from("sms_campaigns").select("id", { count: "exact", head: true }).eq("workspace_id", WORKSPACE_ID),
    ]);
    smsCampaignCount = campaignsCountRes.count ?? 0;
    for (const r of recipientsRes.data ?? []) {
      const ds = ((r.sent_at ?? r.created_at) as string).split("T")[0];
      if (!smsDMap[ds]) smsDMap[ds] = { sent: 0, replied: 0 };
      smsDMap[ds].sent++;
      if (r.replied_at) { smsDMap[ds].replied++; smsTotalReplied++; }
      smsTotalSent++;
      if (ds === todayStr) smsToday++;
      if (ds >= sevenDaysAgoStr) sms7d++;
    }
  }
  const smsStats: SmsStats = {
    totalSent: smsTotalSent, totalReplied: smsTotalReplied,
    replyRate: smsTotalSent > 0 ? (smsTotalReplied / smsTotalSent) * 100 : 0,
    campaignCount: smsCampaignCount,
    totalToday: smsToday, total7d: sms7d,
  };
  const smsDailyMetrics: SmsDailyPoint[] = [];
  for (let d = new Date(fromDate + "T12:00:00"); d <= new Date(toDate + "T12:00:00"); d.setDate(d.getDate() + 1)) {
    const ds  = d.toISOString().split("T")[0];
    const lbl = d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
    smsDailyMetrics.push({ date: lbl, ...(smsDMap[ds] ?? { sent: 0, replied: 0 }) });
  }

  // Fetch last contact event per lead
  const lastContactMap: Record<string, string> = {};
  if (leadsRaw.length > 0) {
    const leadIds = leadsRaw.map((l) => l.id);
    const { data: contactEvents } = await supabase
      .from("lead_events")
      .select("lead_id, created_at")
      .in("lead_id", leadIds)
      .in("type", ["note", "call", "sms_sent", "email_sent", "message_received", "message_sent"])
      .order("created_at", { ascending: false });
    for (const e of contactEvents ?? []) {
      if (!lastContactMap[e.lead_id as string]) {
        lastContactMap[e.lead_id as string] = e.created_at as string;
      }
    }
  }

  // Apply potential score filter
  if (minScore !== null) leadsRaw = leadsRaw.filter((l) => (l.potential_score ?? 0) >= minScore);
  if (maxScore !== null) leadsRaw = leadsRaw.filter((l) => (l.potential_score ?? 0) <= maxScore);

  // Apply "days without contact" filter
  if (minDays !== null) {
    const cutoff = Date.now() - minDays * 86400000;
    leadsRaw = leadsRaw.filter((l) => {
      const last = lastContactMap[l.id];
      if (!last) return true; // brak kontaktu = nieskończenie wiele dni
      return new Date(last).getTime() < cutoff;
    });
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
    last_contact_at: lastContactMap[lead.id] ?? null,
  }));

  const selectedEmailCampaignName = campaign !== "all"
    ? (emailCampaigns ?? []).find((c) => c.id === campaign)?.name ?? null
    : null;
  const selectedSmsCampaignName = campaign !== "all"
    ? (smsCampaigns ?? []).find((c) => c.id === campaign)?.name ?? null
    : null;

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 anim-page">
      <div className="flex flex-wrap items-center gap-3 heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Kanban</h1>
        <SourceSelect current={source} />
        {source === "meta_ads" && (
          <CampaignSelect campaigns={campaigns ?? []} current={campaign} source="meta_ads" />
        )}
        {source === "email" && (emailCampaigns ?? []).length > 0 && (
          <CampaignSelect campaigns={emailCampaigns ?? []} current={campaign} source="email" />
        )}
        {source === "sms" && (smsCampaigns ?? []).length > 0 && (
          <CampaignSelect campaigns={smsCampaigns ?? []} current={campaign} source="sms" />
        )}
        <div className="ml-auto">
          <DateRangePicker from={fromDate} to={toDate} />
        </div>
      </div>
      <KanbanBoard
        key={`${campaign}-${fromDate}-${toDate}`}
        stages={stages}
        initialLeads={leads}
        source={source}
        metaStats={metaStats}
        dailyMetrics={dailyMetrics}
        emailStats={emailStats}
        emailDailyMetrics={emailDailyMetrics}
        smsStats={smsStats}
        smsDailyMetrics={smsDailyMetrics}
        fromDate={fromDate}
        toDate={toDate}
        rangeLabel={rangeLabel}
        selectedEmailCampaignName={selectedEmailCampaignName}
        selectedSmsCampaignName={selectedSmsCampaignName}
      />
    </div>
  );
}
