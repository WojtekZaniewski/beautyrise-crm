import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import type { FosSprint } from "@/lib/fos-types";
import Link from "next/link";

export async function CompanyFocusBanner() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data: sprint } = (await supabase
    .from("fos_sprints")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("status", "active")
    .maybeSingle()) as { data: FosSprint | null };

  if (!sprint) {
    return (
      <div
        className="rounded-xl px-5 py-4 mb-6 flex items-center justify-between"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-widest font-semibold text-[var(--muted)] mb-1">
            Company Focus
          </div>
          <div className="text-[13px] text-[var(--muted)]">
            Brak aktywnego sprintu.{" "}
            <Link href="/fos/sprints" className="underline" style={{ color: "var(--accent)" }}>
              Utwórz sprint →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pct = sprint.completion_pct;
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(sprint.end_date).getTime() - Date.now()) / 86400000),
  );

  return (
    <div
      className="rounded-xl px-5 py-4 mb-6"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--muted)]">
              Company Focus
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
            >
              {sprint.name}
            </span>
          </div>
          <div className="text-[15px] font-semibold leading-snug line-clamp-2">
            {sprint.goal}
          </div>
        </div>
        <div className="text-right shrink-0 ml-4">
          <div
            className="text-[30px] font-bold leading-none tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            {pct}%
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-0.5">
            {daysLeft === 0 ? "Kończy się dziś" : `${daysLeft} dni`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "var(--accent)" }}
          />
        </div>
        <span className="text-[11px] text-[var(--muted)] shrink-0 tabular-nums">
          {sprint.start_date.slice(5).replace("-", ".")} –{" "}
          {sprint.end_date.slice(5).replace("-", ".")}
        </span>
        <Link
          href="/fos/sprints"
          className="text-[11px] shrink-0 hover:underline"
          style={{ color: "var(--accent)" }}
        >
          Edytuj
        </Link>
      </div>
    </div>
  );
}
