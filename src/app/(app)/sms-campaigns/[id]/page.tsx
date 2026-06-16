import { createServiceClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { SmsCampaignChart, type SmsDailyPoint } from "@/components/sms-campaign-chart";

const CAMPAIGN_TYPES: Record<string, { label: string; color: string }> = {
  outreach:  { label: "Outreach",       color: "#FF4C00" },
  followup:  { label: "Follow-up",      color: "#FF4C00" },
  promo:     { label: "Promocja",       color: "#FF8C42" },
  reminder:  { label: "Przypomnienie",  color: "#FF4C00" },
  info:      { label: "Informacja",     color: "#6b7280" },
  other:     { label: "Inne",           color: "#A8A29E" },
};

const SMS_STATUS: Record<string, { bg: string; color: string; label: string }> = {
  sending: { bg: "#FF8C421a", color: "#FF8C42", label: "Wysyłanie" },
  sent:    { bg: "#FF4C001a", color: "#FF4C00", label: "Wysłana" },
  draft:   { bg: "rgba(0,0,0,0.05)", color: "#78716C", label: "Szkic" },
};

const RECIPIENT_STATUS: Record<string, { bg: string; color: string; label: string }> = {
  sent:    { bg: "#FF4C001a", color: "#FF4C00", label: "Wysłany" },
  pending: { bg: "rgba(0,0,0,0.05)", color: "#78716C", label: "Oczekuje" },
  sending: { bg: "#FF8C421a", color: "#FF8C42", label: "Wysyłanie…" },
  queued:  { bg: "#FF4C001a", color: "#FF4C00", label: "W kolejce" },
  failed:  { bg: "#1C19171a", color: "#1C1917", label: "Błąd" },
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

export default async function SmsCampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [{ data: campaign }, { data: recipientsRaw }] = await Promise.all([
    supabase
      .from("sms_campaigns")
      .select("*")
      .eq("id", id)
      .eq("workspace_id", WORKSPACE_ID)
      .single(),
    supabase
      .from("sms_campaign_recipients")
      .select("id, phone, name, status, message_body, sent_at, replied_at, created_at, lead_id, leads(full_name)")
      .eq("campaign_id", id)
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: true }),
  ]);

  if (!campaign) notFound();

  const recipients = recipientsRaw ?? [];
  // "queued" = accepted by SMSMobileAPI gateway, phone confirmation pending
  const totalSent = campaign.total_sent ?? recipients.filter((r) => r.status === "sent" || r.status === "queued").length;
  const totalQueued = recipients.filter((r) => r.status === "queued").length;
  const totalReplied = recipients.filter((r) => r.replied_at !== null).length;
  const replyRate = totalSent > 0 ? Math.round((totalReplied / totalSent) * 100) : 0;
  const totalFailed = recipients.filter((r) => r.status === "failed").length;

  // Build daily chart data
  const dailyMap: Record<string, { sent: number; replied: number }> = {};
  for (const r of recipients) {
    if (r.sent_at) {
      const d = (r.sent_at as string).slice(0, 10);
      if (!dailyMap[d]) dailyMap[d] = { sent: 0, replied: 0 };
      dailyMap[d].sent++;
    }
    if (r.replied_at) {
      const d = (r.replied_at as string).slice(0, 10);
      if (!dailyMap[d]) dailyMap[d] = { sent: 0, replied: 0 };
      dailyMap[d].replied++;
    }
  }
  const dailyData: SmsDailyPoint[] = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({
      date: new Date(date + "T12:00:00").toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }),
      ...v,
    }));

  const { type, name } = parseName(campaign.name as string);
  const typeInfo = type ? CAMPAIGN_TYPES[type] : null;
  const st = SMS_STATUS[(campaign.status as string)] ?? SMS_STATUS.sent;

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 w-full anim-page">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
        <Link href="/sms-campaigns" className="hover:text-[var(--text)] transition-colors">
          Kampanie SMS
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
            {new Date((campaign.created_at as string)).toLocaleString("pl-PL", {
              day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/integrations/sms"
            className="px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors"
            style={{ border: "1px solid var(--border-strong)", color: "var(--muted)" }}
          >
            Konfiguracja SMS
          </Link>
          <Link href="/integrations/sms?tab=campaign" className="btn-primary rounded-md px-4 py-2 text-[13px]">
            + Nowa kampania
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Wysłane SMS" value={String(totalSent)} sub={totalQueued > 0 ? `w tym ${totalQueued} w kolejce` : undefined} />
        <KpiCard label="Odpowiedzi" value={String(totalReplied)} />
        <KpiCard label="Odpowiedź %" value={totalSent > 0 ? `${replyRate}%` : "—"} />
        <KpiCard label="Błędy" value={String(totalFailed)} />
      </div>

      {/* Daily chart */}
      <section
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
      >
        <h2 className="font-semibold mb-4 text-sm">Aktywność dzienna</h2>
        <SmsCampaignChart data={dailyData} />
      </section>

      {/* Template preview */}
      {campaign.template && (
        <section
          className="rounded-xl p-6 mb-6"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <h2 className="font-semibold mb-3 text-sm">Treść wiadomości</h2>
          <div
            className="rounded-lg px-4 py-3 text-sm whitespace-pre-wrap font-mono"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            {campaign.template as string}
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
            <table className="w-full min-w-[500px] text-[13px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Odbiorca", "Telefon", "Status", "Odpowiedź", "Data wysłania"].map((h) => (
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
                  const lead = (Array.isArray(r.leads) ? r.leads[0] : r.leads) as { full_name: string } | null;
                  const rs = RECIPIENT_STATUS[r.status] ?? RECIPIENT_STATUS.pending;
                  return (
                    <tr
                      key={r.id}
                      style={{ borderBottom: i < recipients.length - 1 ? "1px solid var(--border)" : undefined }}
                    >
                      <td className="px-5 py-3 font-medium">
                        {lead ? (
                          <Link
                            href={`/leads/${r.lead_id}`}
                            className="hover:opacity-80 transition-opacity"
                            style={{ color: "var(--text)" }}
                          >
                            {lead.full_name}
                          </Link>
                        ) : (
                          <span style={{ color: "var(--muted)" }}>{r.name || "—"}</span>
                        )}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                        {r.phone}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-[11.5px] font-medium"
                          style={{ backgroundColor: rs.bg, color: rs.color }}
                        >
                          {rs.label}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {r.replied_at ? (
                          <span style={{ color: "#FF4C00" }} className="text-xs font-medium">
                            ✓ {new Date(r.replied_at as string).toLocaleDateString("pl-PL")}
                          </span>
                        ) : (
                          <span style={{ color: "var(--muted)" }}>—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--muted)" }}>
                        {r.sent_at
                          ? new Date(r.sent_at as string).toLocaleString("pl-PL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
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
