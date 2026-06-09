import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { CapiClientsManager } from "./clients-manager";

type CapiLog = {
  id: string;
  event_name: string;
  match_keys: string[] | null;
  ok: boolean;
  events_received: number | null;
  fbtrace_id: string | null;
  error_message: string | null;
  created_at: string;
};

function QualityBar({ score, max = 5 }: { score: number; max?: number }) {
  const pct = Math.min(100, (score / max) * 100);
  const color = score >= 3 ? "#22c55e" : score >= 2 ? "#f59e0b" : "#ef4444";
  const label = score >= 3 ? "Good" : score >= 2 ? "Fair" : "Poor";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--ba-4)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-[13px] font-semibold w-16 text-right" style={{ color }}>
        {score.toFixed(1)} / {max} — {label}
      </span>
    </div>
  );
}

function MatchKeyChip({ k }: { k: string }) {
  const colors: Record<string, string> = {
    em: "#3b82f6",
    ph: "#8b5cf6",
    lead_id: "#06b6d4",
  };
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold text-white"
      style={{ background: colors[k] ?? "#6b7280" }}
    >
      {k}
    </span>
  );
}

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
      style={{
        background: ok ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        color: ok ? "#22c55e" : "#ef4444",
      }}
    >
      {ok ? "✓ OK" : "✗ Błąd"}
    </span>
  );
}

export default async function CapiQualityPage() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Fetch integration credentials (fallback source)
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials, status")
    .eq("workspace_id", workspaceId)
    .eq("type", "meta_ads")
    .maybeSingle();

  const creds = (integration?.credentials ?? {}) as {
    pixel_id?: string; pixel_name?: string; access_token?: string;
    selected_ad_account_id?: string;
  };

  // Fetch capi_clients (gateway-style config)
  const { data: capiClientsRaw } = await supabase
    .from("capi_clients")
    .select("id, name, pixel_id, test_event_code, active, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });

  const capiClients = (capiClientsRaw ?? []) as Array<{
    id: string; name: string; pixel_id: string; test_event_code: string | null; active: boolean; created_at: string;
  }>;

  // Effective pixel = from capi_clients or fallback to integrations
  const activeClient = capiClients.find((c) => c.active);
  const effectivePixelId = activeClient?.pixel_id ?? creds.pixel_id;
  const effectivePixelName = activeClient?.name ?? creds.pixel_name;

  // Fetch CAPI logs
  const { data: logsRaw } = await supabase
    .from("capi_logs")
    .select("id, event_name, match_keys, ok, events_received, fbtrace_id, error_message, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(100);

  const logs = (logsRaw ?? []) as CapiLog[];
  const last50 = logs.slice(0, 50);

  // Quality score: average match key count (excluding lead_id which is not a true PII key)
  const piiKeys = ["em", "ph"];
  const avgScore =
    last50.length === 0
      ? 0
      : last50.reduce((sum, log) => {
          const piiCount = (log.match_keys ?? []).filter((k) => piiKeys.includes(k)).length;
          return sum + piiCount;
        }, 0) / last50.length;

  // Recommendation analysis
  const logsWithEm = last50.filter((l) => (l.match_keys ?? []).includes("em")).length;
  const logsWithPh = last50.filter((l) => (l.match_keys ?? []).includes("ph")).length;
  const logsWithLeadId = last50.filter((l) => (l.match_keys ?? []).includes("lead_id")).length;

  const recommendations: string[] = [];
  if (last50.length > 0) {
    if (logsWithEm / last50.length < 0.5) {
      recommendations.push("Zbieraj email w formularzu Meta Lead Ad — brakuje go w ponad 50% eventów");
    }
    if (logsWithPh / last50.length < 0.5) {
      recommendations.push("Dodaj pole telefon do formularza Meta Lead Ad — brakuje go w ponad 50% eventów");
    }
    if (logsWithLeadId / last50.length < 0.3) {
      recommendations.push("Upewnij się, że leady z Meta Ads mają meta_lead_id w custom_fields — poprawia dopasowanie");
    }
  }

  const isConnected = integration?.status === "connected";
  const successRate =
    last50.length === 0 ? null : Math.round((last50.filter((l) => l.ok).length / last50.length) * 100);

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 max-w-4xl mx-auto anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">CAPI — Jakość danych</h1>
        <p className="text-sm text-[var(--muted)]">
          Monitoruj jakość eventów wysyłanych do Meta Conversions API
        </p>
      </div>

      {/* Gateway-style CAPI clients manager */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: "var(--panel)", border: "1px solid var(--border)" }}>
        <CapiClientsManager initialClients={capiClients} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Pixel status */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-3">Pixel (aktywny)</div>
          {effectivePixelId ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: (activeClient ?? isConnected) ? "#22c55e" : "#f59e0b" }}
                />
                <span className="text-[14px] font-semibold">
                  {effectivePixelName ?? "Pixel"}
                </span>
              </div>
              <div className="text-[12px] text-[var(--muted)] mb-3 font-mono">ID: {effectivePixelId}</div>
              <a
                href={`https://www.facebook.com/events_manager2/list/pixel/${effectivePixelId}/overview`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] underline"
                style={{ color: "var(--accent)" }}
              >
                Otwórz Events Manager →
              </a>
            </>
          ) : (
            <p className="text-[13px] text-[var(--muted)]">
              Brak pixela — wybierz konto reklamowe w{" "}
              <a href="/integrations/meta" style={{ color: "var(--accent)" }} className="underline">
                ustawieniach Meta
              </a>
            </p>
          )}
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-3">
            Ostatnie 50 eventów
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[20px] font-bold">{last50.length}</div>
              <div className="text-[11px] text-[var(--muted)]">Eventów</div>
            </div>
            <div>
              <div
                className="text-[20px] font-bold"
                style={{ color: successRate == null ? "var(--muted)" : successRate >= 90 ? "#22c55e" : "#f59e0b" }}
              >
                {successRate == null ? "—" : `${successRate}%`}
              </div>
              <div className="text-[11px] text-[var(--muted)]">Sukces</div>
            </div>
            <div>
              <div className="text-[20px] font-bold" style={{ color: "#3b82f6" }}>
                {last50.length === 0 ? "—" : `${Math.round((logsWithEm / last50.length) * 100)}%`}
              </div>
              <div className="text-[11px] text-[var(--muted)]">Z emailem</div>
            </div>
            <div>
              <div className="text-[20px] font-bold" style={{ color: "#8b5cf6" }}>
                {last50.length === 0 ? "—" : `${Math.round((logsWithPh / last50.length) * 100)}%`}
              </div>
              <div className="text-[11px] text-[var(--muted)]">Z telefonem</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Score */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
      >
        <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-3">
          Quality Score (avg klucze PII)
        </div>
        {last50.length === 0 ? (
          <p className="text-[13px] text-[var(--muted)]">Brak danych — przesuń lead na kanban, aby wysłać event</p>
        ) : (
          <QualityBar score={avgScore} />
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.16)" }}
        >
          <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#ef4444" }}>
            Rekomendacje
          </div>
          <ul className="flex flex-col gap-2">
            {recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <span style={{ color: "#f59e0b" }}>⚠</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Logs table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)" }}
        >
          <span className="font-semibold text-[14px]">Historia eventów</span>
          <span className="text-[12px] text-[var(--muted)]">{logs.length} wpisów</span>
        </div>

        {logs.length === 0 ? (
          <div className="px-4 py-10 text-center text-[13px] text-[var(--muted)]" style={{ background: "var(--panel)" }}>
            Brak logów — upewnij się, że tabela <code>capi_logs</code> istnieje w Supabase
          </div>
        ) : (
          <div className="overflow-x-auto" style={{ background: "var(--panel)" }}>
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Data", "Event", "Match keys", "Status", "Events recv.", "Trace ID"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-medium text-[var(--muted)] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[var(--ba-3)] transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-2.5 whitespace-nowrap text-[var(--muted)]">
                      {new Date(log.created_at).toLocaleString("pl-PL", {
                        day: "2-digit", month: "2-digit",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2.5 font-medium whitespace-nowrap">{log.event_name}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1 flex-wrap">
                        {(log.match_keys ?? []).map((k) => (
                          <MatchKeyChip key={k} k={k} />
                        ))}
                        {(log.match_keys ?? []).length === 0 && (
                          <span className="text-[var(--muted)]">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge ok={log.ok} />
                      {!log.ok && log.error_message && (
                        <div className="text-[10px] mt-0.5 text-[var(--muted)] max-w-[160px] truncate" title={log.error_message}>
                          {log.error_message}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {log.events_received ?? "—"}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[10px] text-[var(--muted)]">
                      {log.fbtrace_id ? log.fbtrace_id.slice(0, 12) + "…" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
