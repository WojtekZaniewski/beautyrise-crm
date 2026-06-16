import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getCurrentPipelineId, getStagesForPipeline } from "@/lib/pipeline";
import Link from "next/link";
import { JournalWidget } from "@/components/dashboard/journal-widget";
import { DashboardFosSection } from "@/components/fos/dashboard-fos-section";
import {
  UnifiedCampaignChart,
  type DayPoint,
  type MetaAdsSummary,
  type MetaCampaignStats,
  type EmailCampaignStats,
  type SmsCampaignStats,
} from "@/components/dashboard/unified-campaign-chart";
import { DateRangePicker } from "@/components/date-range-picker";

function fmt(n: number | null | undefined, decimals = 0) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("pl-PL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtPln(n: number | null | undefined, decimals = 2) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("pl-PL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + " zł";
}

function fmtPct(n: number | null | undefined) {
  if (n == null || isNaN(n)) return "—";
  return (n * 100).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

const statusLabel: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: "Aktywna", color: "#FF4C00" },
  PAUSED: { label: "Wstrzymana", color: "#FF8C42" },
  ARCHIVED: { label: "Archiwum", color: "#6b7280" },
  DELETED: { label: "Usunięta", color: "#1C1917" },
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string; to?: string }>;
}) {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const currentPipelineId = await getCurrentPipelineId(WORKSPACE_ID);
  const stages = currentPipelineId ? await getStagesForPipeline(currentPipelineId) : [];

  const stageIds = stages.map((s) => s.id);

  // Last stage per pipeline = "closed/won" stage for revenue tracking
  const stagesByPipeline = new Map<string, string[]>();
  for (const stage of stages) {
    if (!stagesByPipeline.has(stage.pipeline_id)) stagesByPipeline.set(stage.pipeline_id, []);
    stagesByPipeline.get(stage.pipeline_id)!.push(stage.id);
  }
  const closedStageIds = [...stagesByPipeline.values()].map((ids) => ids[ids.length - 1]);

  // Date range (defaults to last 30 days)
  const todayStr = new Date().toISOString().split("T")[0];
  const defaultFrom = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
  const sp = await searchParams;
  const fromDate = sp?.from ?? defaultFrom;
  const toDate   = sp?.to   ?? todayStr;
  const fromIso  = fromDate + "T00:00:00.000Z";
  const toIso    = toDate   + "T23:59:59.999Z";

  // Range label for chart titles
  const numDays = Math.round((new Date(toDate).getTime() - new Date(fromDate).getTime()) / 86400000) + 1;
  const rangeLabelMap: Record<number, string> = { 7: "7 dni", 30: "30 dni", 90: "90 dni", 365: "Rok" };
  const rangeLabel = rangeLabelMap[numDays] ?? `${fromDate.slice(5).replace("-", ".")} – ${toDate.slice(5).replace("-", ".")}`;

  // Fixed relative dates for stat cards (always relative to now)
  const todayIso = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const weekIso = new Date(Date.now() - 7 * 86400000).toISOString();
  const sevenDaysAgoDate = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  const [todayRes, weekRes, leadsRes, metaIntRes, recentNotesRes] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", WORKSPACE_ID)
      .gte("created_at", todayIso),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", WORKSPACE_ID)
      .gte("created_at", weekIso),
    stageIds.length > 0
      ? supabase
          .from("leads")
          .select("stage_id")
          .eq("workspace_id", WORKSPACE_ID)
          .eq("archived", false)
          .in("stage_id", stageIds)
      : Promise.resolve({ data: [] as Array<{ stage_id: string }> }),
    supabase
      .from("integrations")
      .select("status")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("type", "meta_ads")
      .maybeSingle(),
    supabase
      .from("lead_events")
      .select("id, lead_id, payload, created_at, leads!inner(full_name, workspace_id)")
      .eq("type", "note")
      .eq("leads.workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  type RecentNote = { id: string; lead_id: string; text: string; leadName: string; created_at: string };
  const recentNotes: RecentNote[] = ((recentNotesRes.data ?? []) as unknown as Array<{
    id: string; lead_id: string; payload: { text?: string } | null; created_at: string;
    leads: { full_name: string };
  }>).map((ev) => ({
    id: ev.id,
    lead_id: ev.lead_id,
    text: ev.payload?.text ?? "",
    leadName: ev.leads.full_name,
    created_at: ev.created_at,
  }));

  const todayCount = todayRes.count ?? 0;
  const weekCount = weekRes.count ?? 0;
  const metaConnected = metaIntRes.data?.status === "connected";

  const stageCounts: Record<string, number> = {};
  for (const lead of leadsRes.data ?? []) {
    if (!lead.stage_id) continue;
    stageCounts[lead.stage_id] = (stageCounts[lead.stage_id] ?? 0) + 1;
  }

  // Fetch campaign data only when connected
  let campaigns: Array<{ id: string; name: string; status: string | null; objective: string | null }> = [];
  type MetricRow = { campaign_id: string; date: string; spend: string | null; impressions: number | null; clicks: number | null; leads_count: number | null; cpl: string | null; ctr: string | null };
  let metrics: MetricRow[] = [];
  let metaSpend7d: number | null = null;
  let metaCpl7d: number | null = null;

  if (metaConnected) {
    const { data: campaignsData } = await supabase
      .from("campaigns")
      .select("id, name, status, objective")
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false })
      .limit(50);

    campaigns = campaignsData ?? [];
    const ids = campaigns.map((c) => c.id);

    if (ids.length > 0) {
      const { data: metricsData } = await supabase
        .from("campaign_metrics_daily")
        .select("campaign_id, date, spend, impressions, clicks, leads_count, cpl, ctr")
        .in("campaign_id", ids)
        .gte("date", fromDate)
        .lte("date", toDate);
      metrics = (metricsData ?? []) as MetricRow[];

      // 7-day aggregates for stat cards
      const m7 = metrics.filter((m) => m.date >= sevenDaysAgoDate);
      const totalSpend7 = m7.reduce((s, m) => s + parseFloat(m.spend ?? "0"), 0);
      const totalLeads7 = m7.reduce((s, m) => s + (m.leads_count ?? 0), 0);
      metaSpend7d = totalSpend7;
      metaCpl7d = totalLeads7 > 0 ? totalSpend7 / totalLeads7 : null;
    }
  }

  // Fetch email + SMS stats and closed leads revenue in parallel
  const [revenueLeadsRes, emailMsgRes, smsRecipRes, smsCampRes, emailOutreachRes] = await Promise.all([
    supabase
      .from("leads")
      .select("value_pln, updated_at")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("archived", false)
      .not("value_pln", "is", null)
      .in("stage_id", closedStageIds.length > 0 ? closedStageIds : ["__none__"])
      .gte("updated_at", fromIso)
      .lte("updated_at", toIso),
    supabase
      .from("email_messages")
      .select("sent_at, opened_at, clicked_at")
      .eq("workspace_id", WORKSPACE_ID)
      .not("sent_at", "is", null)
      .gte("sent_at", fromIso)
      .lte("sent_at", toIso),
    supabase
      .from("sms_campaign_recipients")
      .select("sent_at, replied_at, created_at, campaign_id, lead_id")
      .eq("workspace_id", WORKSPACE_ID)
      .gte("created_at", fromIso)
      .lte("created_at", toIso),
    supabase
      .from("sms_campaigns")
      .select("id, name, status, total_sent")
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("email_outreach_campaigns")
      .select("id, name, status, total_sent, email_outreach_recipients(opened_at, clicked_at, replied_at, lead_id)")
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false }),
  ]);
  const revenueLeads = revenueLeadsRes.data;

  // Email — aggregate and build 30-day daily array
  const emailByDay: Record<string, { sent: number; opened: number; clicked: number }> = {};
  let emailTotalSent = 0, emailTotalOpened = 0, emailTotalClicked = 0;
  for (const m of emailMsgRes.data ?? []) {
    const ds = (m.sent_at as string).split("T")[0];
    if (!emailByDay[ds]) emailByDay[ds] = { sent: 0, opened: 0, clicked: 0 };
    emailByDay[ds].sent++;
    if (m.opened_at) { emailByDay[ds].opened++; emailTotalOpened++; }
    if (m.clicked_at) { emailByDay[ds].clicked++; emailTotalClicked++; }
    emailTotalSent++;
  }
  const emailOpenRate  = emailTotalSent > 0 ? (emailTotalOpened  / emailTotalSent) * 100 : 0;
  const emailClickRate = emailTotalSent > 0 ? (emailTotalClicked / emailTotalSent) * 100 : 0;

  type EmailDayPoint = { date: string; sent: number; opened: number; clicked: number };
  const emailChartData: EmailDayPoint[] = [];
  for (let d = new Date(fromDate + "T12:00:00"); d <= new Date(toDate + "T12:00:00"); d.setDate(d.getDate() + 1)) {
    const ds = d.toISOString().split("T")[0];
    emailChartData.push({
      date: d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }),
      ...(emailByDay[ds] ?? { sent: 0, opened: 0, clicked: 0 }),
    });
  }

  // SMS — aggregate and build 30-day daily array
  const smsByDay: Record<string, { sent: number; replied: number }> = {};
  let smsTotalSent = 0, smsTotalReplied = 0;
  for (const r of smsRecipRes.data ?? []) {
    const ds = ((r.sent_at ?? r.created_at) as string).split("T")[0];
    if (!smsByDay[ds]) smsByDay[ds] = { sent: 0, replied: 0 };
    smsByDay[ds].sent++;
    if (r.replied_at) { smsByDay[ds].replied++; smsTotalReplied++; }
    smsTotalSent++;
  }
  const smsReplyRate = smsTotalSent > 0 ? (smsTotalReplied / smsTotalSent) * 100 : 0;

  // Per-campaign SMS stats
  const smsRepliesByCamp: Record<string, number> = {};
  const smsLeadsByCamp: Record<string, Set<string>> = {};
  for (const r of smsRecipRes.data ?? []) {
    const rec = r as { campaign_id?: string; replied_at?: string | null; lead_id?: string | null };
    const cid = rec.campaign_id;
    if (!cid) continue;
    if (rec.replied_at) smsRepliesByCamp[cid] = (smsRepliesByCamp[cid] ?? 0) + 1;
    if (rec.lead_id) {
      if (!smsLeadsByCamp[cid]) smsLeadsByCamp[cid] = new Set();
      smsLeadsByCamp[cid].add(rec.lead_id);
    }
  }
  const smsCampaignStats: SmsCampaignStats[] = (smsCampRes.data ?? []).map(c => {
    const sent    = c.total_sent ?? 0;
    const replied = smsRepliesByCamp[c.id] ?? 0;
    return {
      id: c.id,
      name: c.name.replace(/^\[[a-z]+\]\s*/i, ""),
      sent, replied,
      replyRate: sent > 0 ? (replied / sent) * 100 : 0,
      revenue: 0, leadsWon: 0,
    };
  });

  // Per-campaign email outreach stats
  type EmailOutreachRaw = {
    id: string; name: string; status: string; total_sent: number;
    email_outreach_recipients: { opened_at: string | null; clicked_at: string | null; replied_at: string | null; lead_id: string | null }[];
  };
  const emailOutreachData = (emailOutreachRes.data ?? []) as unknown as EmailOutreachRaw[];

  const emailLeadsByCamp: Record<string, Set<string>> = {};
  for (const camp of emailOutreachData) {
    emailLeadsByCamp[camp.id] = new Set();
    for (const r of camp.email_outreach_recipients ?? []) {
      if (r.lead_id) emailLeadsByCamp[camp.id].add(r.lead_id);
    }
  }

  const emailCampaignStats: EmailCampaignStats[] = emailOutreachData.map(c => {
    const recs    = c.email_outreach_recipients ?? [];
    const sent    = c.total_sent || recs.length;
    const opened  = recs.filter(r => r.opened_at).length;
    const clicked = recs.filter(r => r.clicked_at).length;
    const replied = recs.filter(r => r.replied_at).length;
    return {
      id: c.id,
      name: c.name.replace(/^\[[a-z]+\]\s*/i, ""),
      sent, opened, clicked, replied,
      openRate:  sent > 0 ? (opened  / sent) * 100 : 0,
      clickRate: sent > 0 ? (clicked / sent) * 100 : 0,
      replyRate: sent > 0 ? (replied / sent) * 100 : 0,
      revenue: 0, leadsWon: 0,
    };
  });

  // Enrich campaign stats with Kanban revenue (closed leads linked to campaigns)
  const allCampLeadIds = [
    ...new Set([
      ...Object.values(emailLeadsByCamp).flatMap(s => [...s]),
      ...Object.values(smsLeadsByCamp).flatMap(s => [...s]),
    ]),
  ];
  if (allCampLeadIds.length > 0 && closedStageIds.length > 0) {
    const { data: campLeadsData } = await supabase
      .from("leads")
      .select("id, value_pln, updated_at")
      .in("id", allCampLeadIds)
      .in("stage_id", closedStageIds)
      .not("value_pln", "is", null)
      .gte("updated_at", fromIso)
      .lte("updated_at", toIso);

    const closedLeadVal: Record<string, number> = {};
    for (const lead of campLeadsData ?? []) {
      closedLeadVal[lead.id] = parseFloat(String(lead.value_pln));
    }

    for (const camp of emailCampaignStats) {
      const ids = [...(emailLeadsByCamp[camp.id] ?? new Set())];
      const won = ids.filter(id => id in closedLeadVal);
      camp.revenue  = won.reduce((s, id) => s + closedLeadVal[id], 0);
      camp.leadsWon = won.length;
    }
    for (const camp of smsCampaignStats) {
      const ids = [...(smsLeadsByCamp[camp.id] ?? new Set())];
      const won = ids.filter(id => id in closedLeadVal);
      camp.revenue  = won.reduce((s, id) => s + closedLeadVal[id], 0);
      camp.leadsWon = won.length;
    }
  }

  type SmsDayPoint = { date: string; sent: number; replied: number };
  const smsChartData: SmsDayPoint[] = [];
  for (let d = new Date(fromDate + "T12:00:00"); d <= new Date(toDate + "T12:00:00"); d.setDate(d.getDate() + 1)) {
    const ds = d.toISOString().split("T")[0];
    smsChartData.push({
      date: d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }),
      ...(smsByDay[ds] ?? { sent: 0, replied: 0 }),
    });
  }

  // Build daily revenue map
  const revenueByDay: Record<string, number> = {};
  for (const lead of revenueLeads ?? []) {
    const day = (lead.updated_at as string).split("T")[0];
    revenueByDay[day] = (revenueByDay[day] ?? 0) + parseFloat(lead.value_pln as string);
  }

  // Build daily spend map from already-fetched metrics
  const spendByDay: Record<string, number> = {};
  for (const m of metrics) {
    spendByDay[m.date] = (spendByDay[m.date] ?? 0) + parseFloat(m.spend ?? "0");
  }

  // Build daily meta stats maps
  const clicksByDay: Record<string, number> = {};
  const impressionsByDay: Record<string, number> = {};
  const leadsByDay: Record<string, number> = {};
  for (const m of metrics) {
    clicksByDay[m.date]      = (clicksByDay[m.date]      ?? 0) + (m.clicks      ?? 0);
    impressionsByDay[m.date] = (impressionsByDay[m.date] ?? 0) + (m.impressions ?? 0);
    leadsByDay[m.date]       = (leadsByDay[m.date]       ?? 0) + (m.leads_count ?? 0);
  }

  // Build date-range combined dataset
  const chartData: DayPoint[] = [];
  for (let d = new Date(fromDate + "T12:00:00"); d <= new Date(toDate + "T12:00:00"); d.setDate(d.getDate() + 1)) {
    const dateStr    = d.toISOString().split("T")[0];
    const daySpend       = spendByDay[dateStr]       ?? 0;
    const dayClicks      = clicksByDay[dateStr]      ?? 0;
    const dayImpressions = impressionsByDay[dateStr] ?? 0;
    const dayLeads       = leadsByDay[dateStr]       ?? 0;
    chartData.push({
      date:        d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }),
      spend:       daySpend,
      revenue:     revenueByDay[dateStr] ?? 0,
      clicks:      dayClicks,
      impressions: dayImpressions,
      leads:       dayLeads,
      cpl:         dayLeads       > 0 ? daySpend / dayLeads       : 0,
      cpc:         dayClicks      > 0 ? daySpend / dayClicks      : 0,
      ctr:         dayImpressions > 0 ? (dayClicks / dayImpressions) * 100 : 0,
    });
  }

  const chartTotalSpend = chartData.reduce((s, d) => s + d.spend, 0);
  const chartTotalRevenue = chartData.reduce((s, d) => s + d.revenue, 0);

  // Aggregate metrics per campaign (30 days)
  type CampaignAgg = {
    id: string; name: string; status: string | null; objective: string | null;
    spend: number; impressions: number; clicks: number; leads: number;
    cpl: number | null; ctr: number | null;
  };
  const campaignAgg: CampaignAgg[] = campaigns.map((c) => {
    const cm = metrics.filter((m) => m.campaign_id === c.id);
    const spend = cm.reduce((s, m) => s + parseFloat(m.spend ?? "0"), 0);
    const impressions = cm.reduce((s, m) => s + (m.impressions ?? 0), 0);
    const clicks = cm.reduce((s, m) => s + (m.clicks ?? 0), 0);
    const leads = cm.reduce((s, m) => s + (m.leads_count ?? 0), 0);
    const cpl = leads > 0 ? spend / leads : null;
    const ctr = impressions > 0 ? clicks / impressions : null;
    return { id: c.id, name: c.name, status: c.status, objective: c.objective, spend, impressions, clicks, leads, cpl, ctr };
  }).sort((a, b) => b.spend - a.spend);

  const totals = campaignAgg.reduce(
    (acc, c) => ({
      spend: acc.spend + c.spend,
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks,
      leads: acc.leads + c.leads,
    }),
    { spend: 0, impressions: 0, clicks: 0, leads: 0 },
  );
  const totalCpl = totals.leads > 0 ? totals.spend / totals.leads : null;
  const totalCtr = totals.impressions > 0 ? totals.clicks / totals.impressions : null;

  const stats = [
    { label: "Leady dziś", value: String(todayCount), accent: todayCount > 0 },
    { label: "Leady (7 dni)", value: String(weekCount), accent: false },
    { label: "Spend Meta (7 dni)", value: metaSpend7d != null ? fmtPln(metaSpend7d) : "—", accent: false },
    { label: "Średni CPL (7 dni)", value: metaCpl7d != null ? fmtPln(metaCpl7d) : "—", accent: false },
  ];

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-6xl mx-auto anim-page heat-glow">
      <DashboardFosSection />

      {/* CRM section header */}
      <div
        className="flex flex-wrap items-center justify-between gap-y-3 pt-5 pb-5 mb-5 -mx-4 sm:-mx-7 px-4 sm:px-7"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div style={{ width: 3, height: 36, background: "var(--accent)", borderRadius: 2, flexShrink: 0 }} />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="text-[11px] uppercase tracking-widest font-bold"
                style={{ color: "var(--muted)" }}
              >
                CRM
              </span>
            </div>
            <h1 className="text-[20px] font-bold tracking-tight">Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker from={fromDate} to={toDate} />
          <Link href="/leads/new" className="btn-primary rounded-md px-3 sm:px-4 py-2 text-[13px]">
            + Nowy lead
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 anim-stagger">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card rounded-xl p-5"
          >
            <div className="text-[10.5px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              {s.label}
            </div>
            <div
              className="text-[30px] font-bold leading-none tracking-tight"
              style={s.accent ? { color: "var(--accent)", textShadow: "0 0 24px rgba(255,76,0,0.25)" } : { color: "var(--text)" }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-col grid: left = pipeline + campaigns, right = journal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 flex flex-col gap-5">

      {/* Pipeline */}
      <section className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13.5px] font-semibold tracking-tight">Pipeline leadów</h2>
          <Link href="/leads/kanban" className="text-[12px] font-medium transition-colors" style={{ color: "var(--accent-2)" }}>
            Kanban →
          </Link>
        </div>
        {stages.length === 0 ? (
          <p className="text-[13px] text-[var(--muted)]">
            Brak etapów.{" "}
            <Link href="/settings/pipelines" style={{ color: "var(--accent-2)" }}>
              Skonfiguruj pipeline →
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-md px-3.5 py-3"
                style={{ background: "var(--ba-2)", border: "1px solid var(--border)", borderLeft: `2.5px solid ${stage.color}` }}
              >
                <div className="text-[10.5px] font-medium uppercase tracking-[0.08em] mb-1.5 truncate" style={{ color: "var(--muted)" }}>
                  {stage.name}
                </div>
                <div className="text-[22px] font-semibold tracking-tight leading-none">
                  {stageCounts[stage.id] ?? 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <UnifiedCampaignChart
        rangeLabel={rangeLabel}
        metaChartData={chartData}
        metaStats={metaConnected && totals.spend > 0 ? ({
          avgCPL: totalCpl,
          avgCPC: totals.clicks > 0 ? totals.spend / totals.clicks : null,
          ctr: totalCtr,
          totalClicks: totals.clicks,
          totalLeads: totals.leads,
          totalImpressions: totals.impressions,
          totalSpend: totals.spend,
        } satisfies MetaAdsSummary) : null}
        totalSpend={chartTotalSpend}
        totalRevenue={chartTotalRevenue}
        metaCampaigns={campaignAgg.map(c => ({
          id: c.id,
          name: c.name,
          spend: c.spend,
          impressions: c.impressions,
          clicks: c.clicks,
          leads: c.leads,
          cpl: c.cpl,
          ctr: c.ctr,
        } satisfies MetaCampaignStats))}
        emailChartData={emailChartData}
        emailTotalSent={emailTotalSent}
        emailTotalOpened={emailTotalOpened}
        emailTotalClicked={emailTotalClicked}
        emailOpenRate={emailOpenRate}
        emailClickRate={emailClickRate}
        emailCampaigns={emailCampaignStats}
        smsChartData={smsChartData}
        smsTotalSent={smsTotalSent}
        smsTotalReplied={smsTotalReplied}
        smsReplyRate={smsReplyRate}
        smsCampaigns={smsCampaignStats}
      />

      {/* Campaigns */}
      <section className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13.5px] font-semibold tracking-tight">Kampanie Meta Ads</h2>
          <Link href="/campaigns" className="text-[12px] font-medium" style={{ color: "var(--accent-2)" }}>
            Wszystkie kampanie →
          </Link>
        </div>

        {!metaConnected ? (
          <p className="text-[13px] text-[var(--muted)]">
            Podłącz konto Meta Ads aby zobaczyć metryki kampanii.{" "}
            <Link href="/integrations/meta" style={{ color: "var(--accent-2)" }}>
              Podłącz →
            </Link>
          </p>
        ) : campaigns.length === 0 ? (
          <p className="text-[13px] text-[var(--muted)]">
            Brak kampanii. Zsynchronizuj dane Meta Ads.{" "}
            <Link href="/campaigns" style={{ color: "var(--accent-2)" }}>
              Synchronizuj →
            </Link>
          </p>
        ) : (
          <>
            {/* 30-day totals summary */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-5 rounded-lg p-4"
              style={{ background: "var(--ba-2)", border: "1px solid var(--border)" }}
            >
              {[
                { label: "Wydatki (30 dni)", value: fmtPln(totals.spend) },
                { label: "Wyświetlenia", value: fmt(totals.impressions) },
                { label: "Kliknięcia", value: fmt(totals.clicks) },
                { label: "Leady", value: fmt(totals.leads) },
                { label: "Śr. CPL", value: fmtPln(totalCpl) },
                { label: "Śr. CTR", value: fmtPct(totalCtr) },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10.5px] uppercase tracking-wide font-medium mb-1" style={{ color: "var(--muted)" }}>
                    {item.label}
                  </div>
                  <div className="text-[16px] font-semibold leading-none">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Campaign rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Kampania", "Status", "Wydatki", "Wyświetl.", "Kliknięcia", "Leady", "CPL", "CTR"].map((h) => (
                      <th key={h} className="text-left pb-2.5 pr-4 font-medium" style={{ color: "var(--muted)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaignAgg.slice(0, 10).map((c) => {
                    const st = statusLabel[c.status ?? ""] ?? { label: c.status ?? "—", color: "var(--muted)" };
                    return (
                      <tr
                        key={c.id}
                        className="border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <td className="py-2.5 pr-4 font-medium max-w-[200px] truncate">
                          <Link href={`/campaigns/${c.id}`} className="hover:underline" style={{ color: "var(--text)" }}>
                            {c.name}
                          </Link>
                        </td>
                        <td className="py-2.5 pr-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                            style={{ color: st.color }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                              style={{ background: st.color }}
                            />
                            {st.label}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 tabular-nums">{fmtPln(c.spend)}</td>
                        <td className="py-2.5 pr-4 tabular-nums" style={{ color: "var(--muted)" }}>{fmt(c.impressions)}</td>
                        <td className="py-2.5 pr-4 tabular-nums">{fmt(c.clicks)}</td>
                        <td className="py-2.5 pr-4 tabular-nums font-semibold" style={c.leads > 0 ? { color: "var(--accent-2)" } : undefined}>
                          {fmt(c.leads)}
                        </td>
                        <td className="py-2.5 pr-4 tabular-nums">{fmtPln(c.cpl)}</td>
                        <td className="py-2.5 tabular-nums" style={{ color: "var(--muted)" }}>{fmtPct(c.ctr)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {campaignAgg.length > 10 && (
              <div className="mt-3 text-[12px]" style={{ color: "var(--muted)" }}>
                Pokazano 10 z {campaignAgg.length} kampanii.{" "}
                <Link href="/campaigns" style={{ color: "var(--accent-2)" }}>
                  Zobacz wszystkie →
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      </div>{/* end left col */}

      {/* Right column — Recent lead notes + Journal */}
      <div className="lg:col-span-1 flex flex-col gap-5">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13.5px] font-semibold tracking-tight">Ostatnie notatki</h2>
            <Link href="/leads/kanban" className="text-[12px] font-medium" style={{ color: "var(--accent-2)" }}>
              Kanban →
            </Link>
          </div>
          {recentNotes.length === 0 ? (
            <p className="text-[12.5px]" style={{ color: "var(--muted)" }}>
              Brak notatek. Dodaj notatkę w karcie leada.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentNotes.map((n) => (
                <Link
                  key={n.id}
                  href={`/leads/${n.lead_id}`}
                  className="rounded-lg px-3 py-2.5 block transition-colors hover:border-[var(--accent)]"
                  style={{ background: "var(--ba-2)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[12px] font-semibold truncate" style={{ color: "var(--accent-2)" }}>
                      {n.leadName}
                    </span>
                    <span className="text-[10.5px] shrink-0" style={{ color: "var(--muted)" }}>
                      {new Date(n.created_at).toLocaleString("pl-PL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p
                    className="text-[12.5px] leading-relaxed break-words"
                    style={{ color: "var(--text)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {n.text}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <JournalWidget />
      </div>

      </div>{/* end grid */}
    </div>
  );
}
