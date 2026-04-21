import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MetricsChart } from "@/components/campaigns/metrics-chart";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (!campaign) notFound();

  const [{ data: metrics }, { data: leads }] = await Promise.all([
    supabase
      .from("campaign_metrics_daily")
      .select("date, spend, impressions, clicks, leads_count, cpc, ctr, cpl")
      .eq("campaign_id", id)
      .order("date", { ascending: true }),
    supabase
      .from("leads")
      .select("id, full_name, phone, created_at, pipeline_stages(name, color)")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("source_campaign_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const totals = (metrics ?? []).reduce(
    (acc, m) => ({
      spend: acc.spend + Number(m.spend ?? 0),
      impressions: acc.impressions + Number(m.impressions ?? 0),
      clicks: acc.clicks + Number(m.clicks ?? 0),
      leads: acc.leads + Number(m.leads_count ?? 0),
    }),
    { spend: 0, impressions: 0, clicks: 0, leads: 0 },
  );

  const avgCpl = totals.leads > 0 ? totals.spend / totals.leads : null;
  const avgCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : null;

  const chartData = (metrics ?? []).map((m) => ({
    date: m.date,
    spend: Number(m.spend ?? 0),
    leads: Number(m.leads_count ?? 0),
  }));

  const kpis = [
    { label: "Spend total", value: `${totals.spend.toFixed(2)} zł` },
    { label: "Leady", value: String(totals.leads) },
    { label: "Średni CPL", value: avgCpl ? `${avgCpl.toFixed(2)} zł` : "—" },
    { label: "CTR", value: avgCtr ? `${avgCtr.toFixed(2)}%` : "—" },
  ];

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
        <Link href="/campaigns" className="hover:text-white">Kampanie</Link>
        <span>/</span>
        <span className="text-white">{campaign.name}</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{campaign.name}</h1>
          <div className="text-sm text-[var(--muted)] mt-1">
            {campaign.status ?? "—"} · {campaign.objective ?? "—"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5"
          >
            <div className="text-sm text-[var(--muted)] mb-1">{k.label}</div>
            <div className="text-2xl font-semibold">{k.value}</div>
          </div>
        ))}
      </div>

      <section className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Spend vs. leady (dziennie)</h2>
        <MetricsChart data={chartData} />
      </section>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Metryki dzienne</h2>
          {(metrics ?? []).length === 0 ? (
            <div className="text-sm text-[var(--muted)]">Brak danych.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[var(--muted)] border-b border-[var(--border)]">
                    <th className="text-left py-2">Data</th>
                    <th className="text-right py-2">Spend</th>
                    <th className="text-right py-2">Clicks</th>
                    <th className="text-right py-2">Leady</th>
                    <th className="text-right py-2">CPL</th>
                  </tr>
                </thead>
                <tbody>
                  {(metrics ?? []).slice().reverse().map((m) => (
                    <tr key={m.date} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-2">{m.date}</td>
                      <td className="py-2 text-right">{Number(m.spend ?? 0).toFixed(2)} zł</td>
                      <td className="py-2 text-right">{m.clicks ?? 0}</td>
                      <td className="py-2 text-right">{m.leads_count ?? 0}</td>
                      <td className="py-2 text-right">
                        {m.cpl ? `${Number(m.cpl).toFixed(2)} zł` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Leady z tej kampanii ({leads?.length ?? 0})
          </h2>
          {(leads ?? []).length === 0 ? (
            <div className="text-sm text-[var(--muted)]">
              Żaden lead nie został jeszcze przypisany do tej kampanii.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {(leads ?? []).map((l) => {
                const stage = l.pipeline_stages as unknown as { name: string; color: string } | null;
                return (
                  <Link
                    key={l.id}
                    href={`/leads/${l.id}`}
                    className="flex items-center justify-between border border-[var(--border)] hover:border-[var(--accent)] rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <div>
                      <div className="font-medium">{l.full_name}</div>
                      {l.phone && <div className="text-xs text-[var(--muted)]">{l.phone}</div>}
                    </div>
                    {stage && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: stage.color + "20", color: stage.color }}
                      >
                        {stage.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
