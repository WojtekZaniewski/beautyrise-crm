import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { campaignType, campaignStatus } from "@/lib/status-colors";

function parseName(raw: string): { type: string | null; name: string } {
  const m = raw.match(/^\[([a-z]+)\]\s*(.*)/s);
  return m ? { type: m[1], name: m[2] } : { type: null, name: raw };
}

type Campaign = {
  id: string;
  name: string;
  subject: string;
  status: string;
  total_sent: number;
  sent_at: string | null;
  created_at: string;
  email_accounts: { email: string; display_name: string } | null;
  email_outreach_recipients: { status: string; opened_at: string | null; clicked_at: string | null; replied_at: string | null }[];
};

export default async function EmailCampaignsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data } = await supabase
    .from("email_outreach_campaigns")
    .select(`
      id, name, subject, status, total_sent, sent_at, created_at,
      email_accounts ( email, display_name ),
      email_outreach_recipients ( status, opened_at, clicked_at, replied_at )
    `)
    .eq("workspace_id", WORKSPACE_ID)
    .order("created_at", { ascending: false });

  const campaigns = (data ?? []) as unknown as Campaign[];

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-5xl mx-auto anim-page">
      <div className="flex flex-wrap items-center justify-between gap-y-3 heat-glow -mx-4 sm:-mx-7 -mt-4 sm:-mt-7 px-4 sm:px-7 pt-4 sm:pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-semibold tracking-tight">Kampanie Email</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            {campaigns.length} {campaigns.length === 1 ? "kampania" : "kampanii"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/integrations/email"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors"
            style={{ border: "1px solid var(--border-strong)", color: "var(--muted)" }}
          >
            Konfiguracja
          </Link>
          <Link href="/integrations/email?tab=outreach" className="btn-primary rounded-md px-4 py-2 text-[13px]">
            + Nowa kampania
          </Link>
        </div>
      </div>

      <div
        className="rounded-lg overflow-x-auto"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <table className="w-full min-w-[700px] text-[13px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Nazwa / Temat", "Typ", "Status", "Wysłane", "Open %", "Click %", "Reply %", "Data", ""].map((h) => (
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
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--muted)" }}>
                  Brak kampanii email.{" "}
                  <Link href="/integrations/email?tab=outreach" style={{ color: "var(--accent-2)" }}>
                    Utwórz pierwszą →
                  </Link>
                </td>
              </tr>
            ) : (
              campaigns.map((c) => {
                const { type, name } = parseName(c.name);
                const typeInfo = type ? campaignType(type) : null;
                const st = campaignStatus(c.status);
                const recs = c.email_outreach_recipients ?? [];
                const sent = c.total_sent || recs.filter((r) => r.status !== "pending").length;
                const opened = recs.filter((r) => r.opened_at).length;
                const clicked = recs.filter((r) => r.clicked_at).length;
                const replied = recs.filter((r) => r.replied_at).length;
                const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
                const clickRate = sent > 0 ? Math.round((clicked / sent) * 100) : 0;
                const replyRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;

                return (
                  <tr
                    key={c.id}
                    className="table-row-hover transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/email-campaigns/${c.id}`}
                        className="font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "var(--text)" }}
                      >
                        {name}
                      </Link>
                      <div className="text-[11.5px] mt-0.5 truncate max-w-[220px]" style={{ color: "var(--muted)" }}>
                        {c.subject}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {typeInfo ? (
                        <StatusBadge label={typeInfo.label} tone={typeInfo.tone} />
                      ) : (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge label={st.label} tone={st.tone} />
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: "var(--muted)" }}>{sent}</td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: openRate > 0 ? "var(--text)" : "var(--muted)" }}>
                      {sent > 0 ? `${openRate}%` : "—"}
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: clickRate > 0 ? "var(--text)" : "var(--muted)" }}>
                      {sent > 0 ? `${clickRate}%` : "—"}
                    </td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: replyRate > 0 ? "var(--text)" : "var(--muted)" }}>
                      {sent > 0 ? `${replyRate}%` : "—"}
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
                        href={`/email-campaigns/${c.id}`}
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
