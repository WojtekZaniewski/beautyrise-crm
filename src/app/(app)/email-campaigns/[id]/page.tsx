import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentWorkspaceId } from "@/lib/workspace";

const CAMPAIGN_TYPES: Record<string, { label: string; color: string }> = {
  outreach:   { label: "Outreach",    color: "#3b82f6" },
  followup:   { label: "Follow-up",   color: "#8b5cf6" },
  promo:      { label: "Promocja",    color: "#f59e0b" },
  newsletter: { label: "Newsletter",  color: "#22c55e" },
  welcome:    { label: "Powitanie",   color: "#06b6d4" },
  other:      { label: "Inne",        color: "#94a3b8" },
};

const EMAIL_STATUS: Record<string, { bg: string; color: string; label: string }> = {
  draft:   { bg: "rgba(0,0,0,0.05)", color: "#78716C", label: "Szkic" },
  sending: { bg: "#f59e0b1a", color: "#d97706", label: "Wysyłanie" },
  sent:    { bg: "#22c55e1a", color: "#16a34a", label: "Wysłana" },
  failed:  { bg: "#ef44441a", color: "#dc2626", label: "Błąd" },
};

const RECIPIENT_STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:  { bg: "rgba(0,0,0,0.05)", color: "#78716C", label: "Oczekuje" },
  sent:     { bg: "#22c55e1a", color: "#16a34a", label: "Wysłany" },
  opened:   { bg: "#3b82f61a", color: "#2563eb", label: "Otwarto" },
  clicked:  { bg: "#8b5cf61a", color: "#7c3aed", label: "Kliknięto" },
  replied:  { bg: "#f59e0b1a", color: "#d97706", label: "Odpowiedź" },
  failed:   { bg: "#ef44441a", color: "#dc2626", label: "Błąd" },
};

function parseName(raw: string): { type: string | null; name: string } {
  const m = raw.match(/^\[([a-z]+)\]\s*(.*)/s);
  return m ? { type: m[1], name: m[2] } : { type: null, name: raw };
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--panel)", border: "1px solid var(--border)" }}>
      <div className="text-sm text-[var(--muted)] mb-1">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-[var(--muted)] mt-0.5">{sub}</div>}
    </div>
  );
}

export default async function EmailCampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: campaign, error } = await supabase
    .from("email_outreach_campaigns")
    .select(`
      *,
      email_accounts ( email, display_name ),
      email_outreach_recipients ( id, email, name, status, sent_at, opened_at, clicked_at, replied_at, lead_id )
    `)
    .eq("id", id)
    .eq("workspace_id", WORKSPACE_ID)
    .single();

  if (error || !campaign) notFound();

  type Recipient = {
    id: string; email: string; name: string | null; status: string;
    sent_at: string | null; opened_at: string | null; clicked_at: string | null;
    replied_at: string | null; lead_id: string | null;
  };
  const recipients = (campaign.email_outreach_recipients ?? []) as Recipient[];
  const account = campaign.email_accounts as { email: string; display_name: string } | null;

  const total = recipients.length;
  const sent = campaign.total_sent || recipients.filter((r) => r.sent_at !== null).length;
  const opened = recipients.filter((r) => r.opened_at).length;
  const clicked = recipients.filter((r) => r.clicked_at).length;
  const replied = recipients.filter((r) => r.replied_at).length;
  const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  const clickRate = sent > 0 ? Math.round((clicked / sent) * 100) : 0;
  const replyRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;

  const { type, name } = parseName(campaign.name as string);
  const typeInfo = type ? CAMPAIGN_TYPES[type] : null;
  const st = EMAIL_STATUS[(campaign.status as string)] ?? EMAIL_STATUS.draft;

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 max-w-5xl mx-auto anim-page">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
        <Link href="/email-campaigns" className="hover:text-[var(--text)] transition-colors">
          Kampanie Email
        </Link>
        <span>/</span>
        <span className="text-[var(--text)]">{name}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold">{name}</h1>
            {typeInfo && (
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: typeInfo.color + "18", color: typeInfo.color, border: `1px solid ${typeInfo.color}30` }}
              >
                {typeInfo.label}
              </span>
            )}
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: st.bg, color: st.color }}
            >
              {st.label}
            </span>
          </div>
          <div className="text-sm text-[var(--muted)]">
            Temat: <span className="text-[var(--text)]">{campaign.subject as string}</span>
            {account && <span className="ml-3">· {account.display_name} &lt;{account.email}&gt;</span>}
          </div>
          <div className="text-xs text-[var(--muted)] mt-0.5">
            {new Date(campaign.created_at as string).toLocaleString("pl-PL", {
              day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </div>
        </div>
        <Link href="/integrations/email?tab=outreach" className="btn-primary rounded-md px-4 py-2 text-[13px]">
          + Nowa kampania
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Wysłane" value={String(sent)} sub={`z ${total} odbiorców`} />
        <KpiCard label="Otwarte" value={sent > 0 ? `${openRate}%` : "—"} sub={`${opened} wiadomości`} />
        <KpiCard label="Kliknięcia" value={sent > 0 ? `${clickRate}%` : "—"} sub={`${clicked} kliknięć`} />
        <KpiCard label="Odpowiedzi" value={sent > 0 ? `${replyRate}%` : "—"} sub={`${replied} odpowiedzi`} />
      </div>

      {/* Body preview */}
      {(campaign.body_text as string) && (
        <section
          className="rounded-xl p-6 mb-6"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <h2 className="font-semibold mb-3 text-sm">Treść wiadomości</h2>
          <div
            className="rounded-lg px-4 py-3 text-sm whitespace-pre-wrap"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", maxHeight: "200px", overflowY: "auto" }}
          >
            {campaign.body_text as string}
          </div>
        </section>
      )}

      {/* Recipients table */}
      <section
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
      >
        <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="font-semibold">Odbiorcy ({recipients.length})</h2>
        </div>
        {recipients.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[var(--muted)]">Brak odbiorców.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Odbiorca", "Email", "Status", "Otwarto", "Kliknięto", "Odpowiedź"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-medium text-[11.5px] uppercase tracking-[0.07em]"
                      style={{ color: "var(--muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recipients.map((r, i) => {
                  const rs = RECIPIENT_STATUS_STYLES[r.status] ?? RECIPIENT_STATUS_STYLES.pending;
                  return (
                    <tr
                      key={r.id}
                      style={{ borderBottom: i < recipients.length - 1 ? "1px solid var(--border)" : undefined }}
                    >
                      <td className="px-5 py-3 font-medium">
                        {r.lead_id ? (
                          <Link
                            href={`/leads/${r.lead_id}`}
                            className="hover:opacity-80 transition-opacity"
                            style={{ color: "var(--text)" }}
                          >
                            {r.name || r.email}
                          </Link>
                        ) : (
                          <span>{r.name || "—"}</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--muted)" }}>
                        {r.email}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                          style={{ backgroundColor: rs.bg, color: rs.color }}
                        >
                          {rs.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: r.opened_at ? "#16a34a" : "var(--muted)" }}>
                        {r.opened_at
                          ? new Date(r.opened_at).toLocaleDateString("pl-PL")
                          : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: r.clicked_at ? "#7c3aed" : "var(--muted)" }}>
                        {r.clicked_at
                          ? new Date(r.clicked_at).toLocaleDateString("pl-PL")
                          : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: r.replied_at ? "#d97706" : "var(--muted)" }}>
                        {r.replied_at
                          ? new Date(r.replied_at).toLocaleDateString("pl-PL")
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
