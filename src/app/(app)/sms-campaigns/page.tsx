import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import Link from "next/link";

const CAMPAIGN_TYPES: Record<string, { label: string; color: string }> = {
  outreach:  { label: "Outreach",       color: "#3b82f6" },
  followup:  { label: "Follow-up",      color: "#8b5cf6" },
  promo:     { label: "Promocja",       color: "#f59e0b" },
  reminder:  { label: "Przypomnienie",  color: "#22c55e" },
  info:      { label: "Informacja",     color: "#6b7280" },
  other:     { label: "Inne",           color: "#94a3b8" },
};

const SMS_STATUS: Record<string, { bg: string; color: string; label: string }> = {
  sending: { bg: "#f59e0b1a", color: "#d97706", label: "Wysyłanie" },
  sent:    { bg: "#22c55e1a", color: "#16a34a", label: "Wysłana" },
  draft:   { bg: "rgba(0,0,0,0.05)", color: "#78716C", label: "Szkic" },
};

function parseName(raw: string): { type: string | null; name: string } {
  const m = raw.match(/^\[([a-z]+)\]\s*(.*)/s);
  return m ? { type: m[1], name: m[2] } : { type: null, name: raw };
}

export default async function SmsCampaignsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: campaigns } = await supabase
    .from("sms_campaigns")
    .select("id, name, status, total_sent, created_at")
    .eq("workspace_id", WORKSPACE_ID)
    .order("created_at", { ascending: false });

  const campaignIds = (campaigns ?? []).map((c) => c.id);
  const replyCounts: Record<string, number> = {};
  if (campaignIds.length > 0) {
    const { data: replied } = await supabase
      .from("sms_campaign_recipients")
      .select("campaign_id")
      .in("campaign_id", campaignIds)
      .not("replied_at", "is", null);
    for (const r of replied ?? []) {
      replyCounts[r.campaign_id] = (replyCounts[r.campaign_id] ?? 0) + 1;
    }
  }

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-5xl mx-auto anim-page">
      <div className="flex flex-wrap items-center justify-between gap-y-3 heat-glow -mx-4 sm:-mx-7 -mt-4 sm:-mt-7 px-4 sm:px-7 pt-4 sm:pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-semibold tracking-tight">Kampanie SMS</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            {(campaigns ?? []).length} {(campaigns ?? []).length === 1 ? "kampania" : "kampanii"}
          </p>
        </div>
        <Link
          href="/integrations/sms?tab=campaign"
          className="btn-primary rounded-md px-4 py-2 text-[13px]"
        >
          + Nowa kampania
        </Link>
      </div>

      <div
        className="rounded-lg overflow-x-auto"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <table className="w-full min-w-[640px] text-[13px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Nazwa", "Typ", "Status", "Wysłane", "Odpowiedzi", "Odpowiedź %", "Data", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-medium text-[11.5px] uppercase tracking-[0.07em]"
                  style={{ color: "var(--muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(campaigns ?? []).length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--muted)" }}>
                  Brak kampanii SMS.{" "}
                  <Link href="/integrations/sms?tab=campaign" style={{ color: "var(--accent-2)" }}>
                    Utwórz pierwszą →
                  </Link>
                </td>
              </tr>
            ) : (
              (campaigns ?? []).map((c) => {
                const { type, name } = parseName(c.name);
                const typeInfo = type ? CAMPAIGN_TYPES[type] : null;
                const replied = replyCounts[c.id] ?? 0;
                const replyRate = c.total_sent > 0 ? Math.round((replied / c.total_sent) * 100) : 0;
                const st = SMS_STATUS[c.status] ?? SMS_STATUS.sent;

                return (
                  <tr
                    key={c.id}
                    className="table-row-hover transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/sms-campaigns/${c.id}`}
                        className="font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "var(--text)" }}
                      >
                        {name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {typeInfo ? (
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                          style={{ backgroundColor: typeInfo.color + "18", color: typeInfo.color, border: `1px solid ${typeInfo.color}30` }}
                        >
                          {typeInfo.label}
                        </span>
                      ) : (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                        style={{ backgroundColor: st.bg, color: st.color }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--muted)" }}>
                      {c.total_sent}
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--muted)" }}>
                      {replied}
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: replyRate > 0 ? "var(--text)" : "var(--muted)" }}>
                      {c.total_sent > 0 ? `${replyRate}%` : "—"}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-[12px]" style={{ color: "var(--muted)" }}>
                      {new Date(c.created_at).toLocaleDateString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/sms-campaigns/${c.id}`}
                        className="text-[12px] transition-colors hover:opacity-70"
                        style={{ color: "var(--accent-2)" }}
                      >
                        Szczegóły →
                      </Link>
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
