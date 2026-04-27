import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import Link from "next/link";

type SearchParams = Promise<{ error?: string }>;

export default async function MetaIntegrationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: integration } = await supabase
    .from("integrations")
    .select("status, connected_at, credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .maybeSingle();

  const isConnected = integration?.status === "connected";
  const metaConfigured = Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET);

  const selectedAccountId = (
    integration?.credentials as { selected_ad_account_id?: string }
  )?.selected_ad_account_id;

  const selectedAccount = selectedAccountId
    ? ((integration?.credentials as {
        ad_accounts?: Array<{ account_id: string; name: string }>;
      })?.ad_accounts ?? []).find((a) => a.account_id === selectedAccountId)
    : null;

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 max-w-2xl mx-auto anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Meta Ads</h1>
        <p className="text-sm text-[var(--muted)]">
          Połącz konto Meta Business aby synchronizować kampanie i metryki.
        </p>
      </div>

      {error && (
        <div
          className="mb-4 text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--danger)", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.16)" }}
        >
          {error}
        </div>
      )}

      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
            f
          </div>
          <div>
            <div className="font-medium">Meta Business</div>
            <div className="text-sm text-[var(--muted)]">
              Facebook Ads · Instagram Ads · Lead Ads
            </div>
          </div>
          <span
            className="ml-auto text-xs border px-2 py-1 rounded-full"
            style={
              isConnected
                ? { color: "var(--success)", background: "rgba(22,163,74,0.08)", borderColor: "rgba(22,163,74,0.2)" }
                : { color: "var(--warning)", background: "rgba(202,138,4,0.08)", borderColor: "rgba(202,138,4,0.2)" }
            }
          >
            {isConnected ? "Podłączone" : "Niepodłączone"}
          </span>
        </div>

        {!metaConfigured && (
          <div
            className="rounded-lg p-4 text-sm"
            style={{ background: "rgba(202,138,4,0.06)", border: "1px solid rgba(202,138,4,0.2)" }}
          >
            <div className="font-medium mb-1" style={{ color: "var(--warning)" }}>
              Brak konfiguracji Meta App
            </div>
            <div className="text-[var(--muted)]">
              Zanim połączysz konto, musisz utworzyć aplikację na{" "}
              <a
                href="https://developers.facebook.com/apps"
                target="_blank"
                rel="noopener"
                className="text-[var(--accent)] hover:underline"
              >
                developers.facebook.com
              </a>{" "}
              i dodać <code className="bg-[var(--ba-8)] px-1 rounded text-[var(--text)]">META_APP_ID</code> +{" "}
              <code className="bg-[var(--ba-8)] px-1 rounded text-[var(--text)]">META_APP_SECRET</code> do{" "}
              <code className="bg-[var(--ba-8)] px-1 rounded text-[var(--text)]">.env.local</code>. Zobacz{" "}
              <Link href="/docs/meta-setup" className="text-[var(--accent)] hover:underline">
                instrukcję krok po kroku
              </Link>.
            </div>
          </div>
        )}

        {isConnected && (
          <div className="border border-[var(--border)] rounded-lg p-4 text-sm">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[var(--muted)]">Aktywne konto reklamowe</div>
              <Link
                href="/integrations/meta/accounts"
                className="text-xs text-[var(--accent)] hover:underline"
              >
                Zmień
              </Link>
            </div>
            <div className="font-medium">
              {selectedAccount?.name ?? "— nie wybrano —"}
            </div>
            {integration?.connected_at && (
              <div className="text-xs text-[var(--muted)] mt-2">
                Podłączone {new Date(integration.connected_at).toLocaleDateString("pl-PL")}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-[var(--border)] pt-5 flex flex-col gap-3 text-sm text-[var(--muted)]">
          <p>CRM będzie:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Synchronizować kampanie i metryki codziennie (cron o 03:00)</li>
            <li>Odbierać leady z Lead Ads w czasie rzeczywistym (webhook)</li>
            <li>Liczyć CPL i ROI per kampania na podstawie danych pipeline&apos;u</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <a
            href="/api/integrations/meta/oauth"
            className={`flex-1 text-center rounded-lg py-2.5 text-sm font-semibold transition-opacity ${
              metaConfigured
                ? "bg-blue-600 hover:opacity-90"
                : "bg-blue-600/40 cursor-not-allowed pointer-events-none"
            }`}
          >
            {isConnected ? "Połącz ponownie" : "Połącz przez OAuth"}
          </a>
          {isConnected && (
            <Link
              href="/campaigns"
              className="border border-[var(--border)] hover:border-[var(--accent)] px-4 py-2.5 rounded-lg text-sm transition-colors"
            >
              Kampanie →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

