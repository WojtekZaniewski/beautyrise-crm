import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getStagesForWorkspace } from "@/lib/pipeline";
import Link from "next/link";
import { JournalWidget } from "@/components/dashboard/journal-widget";
import { RevenueChart, type DayPoint, type MetaAdsSummary } from "@/components/dashboard/revenue-chart";

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
  ACTIVE: { label: "Aktywna", color: "#22c55e" },
  PAUSED: { label: "Wstrzymana", color: "#eab308" },
  ARCHIVED: { label: "Archiwum", color: "#6b7280" },
  DELETED: { label: "Usunięta", color: "#ef4444" },
};

export default async function Dashboard() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const stages = await getStagesForWorkspace(WORKSPACE_ID);

  const stageIds = stages.map((s) => s.id);

  const todayIso = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const weekIso = new Date(Date.now() - 7 * 86400000).toISOString();
  const sevenDaysAgoDate = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
  const thirtyDaysAgoDate = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

  const [todayRes, weekRes, leadsRes, metaIntRes] = await Promise.all([
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
  ]);

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
        .gte("date", thirtyDaysAgoDate);
      metrics = (metricsData ?? []) as MetricRow[];

      // 7-day aggregates for stat cards
      const m7 = metrics.filter((m) => m.date >= sevenDaysAgoDate);
      const totalSpend7 = m7.reduce((s, m) => s + parseFloat(m.spend ?? "0"), 0);
      const totalLeads7 = m7.reduce((s, m) => s + (m.leads_count ?? 0), 0);
      metaSpend7d = totalSpend7;
      metaCpl7d = totalLeads7 > 0 ? totalSpend7 / totalLeads7 : null;
    }
  }

  // Fetch closed leads with revenue for the chart
  const { data: revenueLeads } = await supabase
    .from("leads")
    .select("value_pln, updated_at")
    .eq("workspace_id", WORKSPACE_ID)
    .not("value_pln", "is", null)
    .gte("updated_at", thirtyDaysAgo);

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

  // Build 30-day combined dataset
  const chartData: DayPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = d.toISOString().split("T")[0];
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
    <div className="px-7 py-7 max-w-6xl mx-auto anim-page">
      {/* Header */}
      <div className="flex items-center justify-between heat-glow -mx-7 -mt-7 px-7 pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">Przegląd aktywności</p>
        </div>
        <Link href="/leads/new" className="btn-primary rounded-md px-4 py-2 text-[13px]">
          + Nowy lead
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 anim-stagger">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-5"
            style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="text-[11.5px] font-medium text-[var(--muted)] uppercase tracking-wide mb-3">
              {s.label}
            </div>
            <div
              className="text-[28px] font-semibold leading-none tracking-tight"
              style={s.accent ? { color: "var(--accent-2)" } : undefined}
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
      <section
        className="rounded-lg p-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
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

      <RevenueChart
        data={chartData}
        totalSpend={chartTotalSpend}
        totalRevenue={chartTotalRevenue}
        metaStats={metaConnected && totals.spend > 0 ? ({
          avgCPL: totalCpl,
          avgCPC: totals.clicks > 0 ? totals.spend / totals.clicks : null,
          ctr: totalCtr,
          totalClicks: totals.clicks,
          totalLeads: totals.leads,
          totalImpressions: totals.impressions,
          totalSpend: totals.spend,
        } satisfies MetaAdsSummary) : null}
      />

      {/* Campaigns */}
      <section
        className="rounded-lg p-5"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
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

      {/* Right column — Journal */}
      <div className="lg:col-span-1">
        <JournalWidget />
      </div>

      </div>{/* end grid */}
    </div>
  );
}
