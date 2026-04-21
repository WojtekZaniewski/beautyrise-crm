import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getStagesForWorkspace } from "@/lib/pipeline";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const stages = await getStagesForWorkspace(WORKSPACE_ID);

  const stageIds = stages.map((s) => s.id);

  const todayIso = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const weekIso = new Date(Date.now() - 7 * 86400000).toISOString();

  const [todayRes, weekRes, leadsRes] = await Promise.all([
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
  ]);

  const todayCount = todayRes.count ?? 0;
  const weekCount = weekRes.count ?? 0;

  const stageCounts: Record<string, number> = {};
  for (const lead of leadsRes.data ?? []) {
    if (!lead.stage_id) continue;
    stageCounts[lead.stage_id] = (stageCounts[lead.stage_id] ?? 0) + 1;
  }

  const stats = [
    { label: "Leady dziś", value: String(todayCount), icon: "↑" },
    { label: "Leady (7 dni)", value: String(weekCount), icon: "◈" },
    { label: "Spend Meta (7 dni)", value: "—", icon: "◉" },
    { label: "Średni CPL", value: "—", icon: "◐" },
  ];

  return (
    <div className="px-7 py-7 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">Przegląd aktywności</p>
        </div>
        <Link
          href="/leads/new"
          className="btn-primary rounded-md px-4 py-2 text-[13px]"
        >
          + Nowy lead
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-lg p-5"
            style={{
              background: "var(--panel-solid)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="text-[11.5px] font-medium text-[var(--muted)] uppercase tracking-wide mb-3">
              {s.label}
            </div>
            <div
              className="text-[28px] font-semibold leading-none tracking-tight"
              style={
                i === 0 && todayCount > 0
                  ? { color: "var(--accent-2)" }
                  : undefined
              }
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <section
        className="rounded-lg p-5 mb-5"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13.5px] font-semibold tracking-tight">Pipeline leadów</h2>
          <Link
            href="/leads/kanban"
            className="text-[12px] font-medium transition-colors"
            style={{ color: "var(--accent-2)" }}
          >
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
                style={{
                  background: "var(--ba-2)",
                  border: "1px solid var(--border)",
                  borderLeft: `2.5px solid ${stage.color}`,
                }}
              >
                <div
                  className="text-[10.5px] font-medium uppercase tracking-[0.08em] mb-1.5 truncate"
                  style={{ color: "var(--muted)" }}
                >
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

      {/* Campaigns */}
      <section
        className="rounded-lg p-5"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h2 className="text-[13.5px] font-semibold tracking-tight mb-2">Kampanie Meta Ads</h2>
        <p className="text-[13px] text-[var(--muted)]">
          Podłącz konto Meta Ads aby zobaczyć metryki kampanii.{" "}
          <Link href="/integrations/meta" style={{ color: "var(--accent-2)" }}>
            Podłącz →
          </Link>
        </p>
      </section>
    </div>
  );
}
