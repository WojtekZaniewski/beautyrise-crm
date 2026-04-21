import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import Link from "next/link";
import { SyncButton } from "./sync-button";

export default async function CampaignsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const since = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

  const [campaignsRes, metricsRes, integrationRes] = await Promise.all([
    supabase
      .from("campaigns")
      .select("id, name, status, objective, daily_budget, synced_at")
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("campaign_metrics_daily")
      .select("campaign_id, spend, leads_count")
      .gte("date", since),
    supabase
      .from("integrations")
      .select("status")
      .eq("workspace_id", WORKSPACE_ID)
      .eq("type", "meta_ads")
      .maybeSingle(),
  ]);

  const campaigns = campaignsRes.data;
  const metrics = metricsRes.data;
  const integration = integrationRes.data;

  const aggregated = new Map<string, { spend: number; leads: number }>();
  for (const m of metrics ?? []) {
    const cur = aggregated.get(m.campaign_id) ?? { spend: 0, leads: 0 };
    cur.spend += Number(m.spend ?? 0);
    cur.leads += Number(m.leads_count ?? 0);
    aggregated.set(m.campaign_id, cur);
  }

  const isConnected = integration?.status === "connected";

  const panelStyle = {
    background: "var(--panel-solid)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    boxShadow: "var(--shadow-sm)",
  };

  return (
    <div className="px-7 py-7 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Kampanie</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
            Metryki z ostatnich 7 dni
          </p>
        </div>
        <div className="flex gap-2.5 items-center">
          {isConnected && <SyncButton />}
          {!isConnected && (
            <Link
              href="/integrations/meta"
              className="btn-primary rounded-md px-4 py-2 text-[13px]"
            >
              Podłącz Meta Ads
            </Link>
          )}
        </div>
      </div>

      {!isConnected ? (
        <div style={panelStyle} className="p-12 text-center">
          <div
            className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--accent-subtle)", border: "1px solid rgba(255,76,0,0.2)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M2 13C2 9.5 4.5 6 6.5 6c1 0 2 .9 2.5 2.3C9.5 7 10.5 6 11.5 6 13.5 6 16 9.5 16 13c0 2-.8 3.5-2 3.5-.7 0-1.4-.5-2-1.7-.5 1.2-1.1 1.7-1.9 1.7-.8 0-1.4-.5-1.9-1.7-.6 1.2-1.3 1.7-2 1.7C2.8 16.5 2 15 2 13z"
                stroke="var(--accent-2)"
                strokeWidth="1.4"
              />
            </svg>
          </div>
          <div className="text-[15px] font-semibold tracking-tight mb-2">
            Brak podłączonego konta Meta Ads
          </div>
          <div className="text-[13px] mb-6" style={{ color: "var(--muted)" }}>
            Połącz konto, aby synchronizować kampanie i metryki reklamowe.
          </div>
          <Link
            href="/integrations/meta"
            className="btn-primary rounded-md px-5 py-2.5 text-[13px] inline-block"
          >
            Podłącz Meta Ads →
          </Link>
        </div>
      ) : (campaigns ?? []).length === 0 ? (
        <div style={panelStyle} className="p-10 text-center">
          <div className="text-[13px]" style={{ color: "var(--muted)" }}>
            Brak kampanii. Uruchom sync w Integracje → Meta Ads.
          </div>
        </div>
      ) : (
        <div style={panelStyle} className="overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  { label: "Nazwa", align: "left" },
                  { label: "Status", align: "left" },
                  { label: "Cel", align: "left" },
                  { label: "Spend (7d)", align: "right" },
                  { label: "Leady (7d)", align: "right" },
                  { label: "CPL", align: "right" },
                ].map((h) => (
                  <th
                    key={h.label}
                    className={`px-4 py-3 font-medium text-[11.5px] uppercase tracking-[0.07em] text-${h.align}`}
                    style={{ color: "var(--muted)" }}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(campaigns ?? []).map((c) => {
                const agg = aggregated.get(c.id) ?? { spend: 0, leads: 0 };
                const cpl = agg.leads > 0 ? agg.spend / agg.leads : null;
                return (
                  <tr
                    key={c.id}
                    className="table-row-hover transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="font-medium hover:opacity-80 transition-opacity"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {c.status ? (
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium"
                          style={{
                            background:
                              c.status === "ACTIVE"
                                ? "rgba(34,197,94,0.1)"
                                : "rgba(255,255,255,0.05)",
                            color:
                              c.status === "ACTIVE" ? "#22c55e" : "var(--muted)",
                            border: `1px solid ${c.status === "ACTIVE" ? "rgba(34,197,94,0.25)" : "var(--border)"}`,
                          }}
                        >
                          {c.status}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {c.objective ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {agg.spend > 0 ? `${agg.spend.toFixed(2)} zł` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {agg.leads || "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {cpl ? `${cpl.toFixed(2)} zł` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
