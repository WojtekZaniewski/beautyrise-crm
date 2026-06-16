"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/status-badge";
import { campaignType, campaignStatus } from "@/lib/status-colors";

type Campaign = {
  id: string;
  name: string;
  status: string;
  total_sent: number;
  created_at: string;
  replied?: number;
};

function parseName(raw: string): { type: string | null; name: string } {
  const m = raw.match(/^\[([a-z]+)\]\s*(.*)/si);
  return m ? { type: m[1].toLowerCase(), name: m[2] } : { type: null, name: raw };
}

export default function SmsCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/sms/campaigns");
    const data = await res.json();
    setCampaigns(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await fetch(`/api/sms/campaigns/${id}`, { method: "DELETE" });
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
    setConfirmId(null);
    router.refresh();
  };

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 w-full anim-page">
      <div className="flex flex-wrap items-center justify-between gap-y-3 heat-glow -mx-4 sm:-mx-7 -mt-4 sm:-mt-7 px-4 sm:px-7 pt-4 sm:pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-semibold tracking-tight">Kampanie SMS</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            {campaigns.length} {campaigns.length === 1 ? "kampania" : "kampanii"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/integrations/sms"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors"
            style={{ border: "1px solid var(--border-strong)", color: "var(--muted)" }}
          >
            Konfiguracja
          </Link>
          <Link href="/integrations/sms?tab=campaign" className="btn-primary rounded-md px-4 py-2 text-[13px]">
            + Nowa kampania
          </Link>
        </div>
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
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--muted)" }}>
                  Ładowanie…
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[13px]" style={{ color: "var(--muted)" }}>
                  Brak kampanii SMS.{" "}
                  <Link href="/integrations/sms?tab=campaign" style={{ color: "var(--accent-2)" }}>
                    Utwórz pierwszą →
                  </Link>
                </td>
              </tr>
            ) : (
              campaigns.map((c) => {
                const { type, name } = parseName(c.name);
                const typeInfo = type ? campaignType(type) : null;
                const replied = c.replied ?? 0;
                const replyRate = c.total_sent > 0 ? Math.round((replied / c.total_sent) * 100) : 0;
                const st = campaignStatus(c.status);
                const isConfirming = confirmId === c.id;
                const isDeleting = deletingId === c.id;

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
                        <StatusBadge label={typeInfo.label} tone={typeInfo.tone} />
                      ) : (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge label={st.label} tone={st.tone} />
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
                      {new Date(c.created_at).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/sms-campaigns/${c.id}`}
                          className="text-[12px] transition-colors hover:opacity-70"
                          style={{ color: "var(--accent-2)" }}
                        >
                          Szczegóły →
                        </Link>
                        {isConfirming ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(c.id)}
                              disabled={isDeleting}
                              className="text-[11px] px-2 py-0.5 rounded font-medium transition-colors"
                              style={{ background: "#1C19171a", color: "#1C1917", border: "1px solid #1C191730" }}
                            >
                              {isDeleting ? "…" : "Tak, usuń"}
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="text-[11px] px-2 py-0.5 rounded transition-colors"
                              style={{ color: "var(--muted)" }}
                            >
                              Anuluj
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(c.id)}
                            className="text-[11px] transition-colors hover:opacity-70"
                            style={{ color: "var(--muted)" }}
                          >
                            Usuń
                          </button>
                        )}
                      </div>
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
