import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { AccountSelector } from "./account-selector";
import { PageSelector } from "./page-selector";
import Link from "next/link";

type AdAccount = {
  id: string;
  account_id: string;
  name: string;
  account_status: number;
  currency: string;
};

type Page = { id: string; name: string; access_token: string };

export default async function MetaAccountsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials, status")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .maybeSingle();

  const creds = (integration?.credentials ?? {}) as {
    ad_accounts?: AdAccount[];
    selected_ad_account_id?: string | null;
    pages?: Page[];
    selected_page_id?: string | null;
  };

  const accounts = creds.ad_accounts ?? [];
  const pages = (creds.pages ?? []).map((p) => ({ id: p.id, name: p.name }));

  if (!integration || accounts.length === 0) {
    return (
      <div className="px-8 py-8 w-full">
        <h1 className="text-2xl font-semibold mb-4">Wybór konta reklamowego</h1>
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-8 text-center">
          <div className="text-sm text-[var(--muted)] mb-4">
            Brak dostępnych kont reklamowych. Najpierw podłącz Meta Ads.
          </div>
          <Link
            href="/integrations/meta"
            className="inline-block bg-[var(--accent)] hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium"
          >
            ← Wróć do integracji
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 w-full flex flex-col gap-8">
      {/* Ad account selector */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Wybór konta reklamowego</h1>
        <p className="text-sm text-[var(--muted)] mb-6">
          Wybierz konto, z którego CRM ma synchronizować kampanie i metryki.
        </p>
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6">
          <AccountSelector
            accounts={accounts}
            selectedId={creds.selected_ad_account_id ?? null}
          />
        </div>
      </div>

      {/* Page selector for messaging */}
      {pages.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Strona do wiadomości</h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            Wybierz stronę Facebook / Instagram, której wiadomości (Messenger, DM) mają być widoczne w CRM.
          </p>
          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6">
            <PageSelector
              pages={pages}
              selectedId={creds.selected_page_id ?? null}
            />
          </div>
        </div>
      )}
    </div>
  );
}
