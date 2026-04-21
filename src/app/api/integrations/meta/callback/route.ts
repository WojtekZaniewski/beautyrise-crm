import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const maxDuration = 60;

import {
  exchangeCodeForToken,
  getLongLivedToken,
  MetaClient,
} from "@/lib/meta/client";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

type AdAccount = {
  id: string;
  account_id: string;
  name: string;
  account_status: number;
  currency: string;
};

type Page = {
  id: string;
  name: string;
  access_token: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const errorParam = url.searchParams.get("error");

  function redirectWithError(error: string) {
    const target = new URL("/integrations/meta", url.origin);
    target.searchParams.set("error", error);
    return NextResponse.redirect(target);
  }

  if (errorParam) {
    return redirectWithError(`Meta odmówiła: ${errorParam}`);
  }

  if (!code) return redirectWithError("Brak kodu autoryzacji");

  const cookieStore = await cookies();
  const expectedState = cookieStore.get("meta_oauth_state")?.value;
  if (!state || state !== expectedState) {
    return redirectWithError("Nieprawidłowy state — możliwa próba CSRF");
  }

  try {
    const shortToken = await exchangeCodeForToken(code);
    const longToken = await getLongLivedToken(shortToken.access_token);

    const client = new MetaClient(longToken.access_token);

    const [accountsResp, pagesResp] = await Promise.all([
      client.get<{ data: AdAccount[] }>("me/adaccounts", {
        fields: "id,account_id,name,account_status,currency",
      }),
      client.get<{ data: Page[] }>("me/accounts", {
        fields: "id,name,access_token",
      }),
    ]);

    // Subscribe each page to leadgen webhook events automatically
    const pages = pagesResp.data ?? [];
    await Promise.allSettled(
      pages.map((page) =>
        fetch(
          `https://graph.facebook.com/v21.0/${page.id}/subscribed_apps`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscribed_fields: ["leadgen", "messages"],
              access_token: page.access_token,
            }),
          },
        ),
      ),
    );

    const supabase = createServiceClient();
    const WORKSPACE_ID = await getCurrentWorkspaceId();
    const expiresAt = longToken.expires_in
      ? new Date(Date.now() + longToken.expires_in * 1000).toISOString()
      : null;

    const { error } = await supabase.from("integrations").upsert(
      {
        workspace_id: WORKSPACE_ID,
        type: "meta_ads" as const,
        credentials: {
          access_token: longToken.access_token,
          expires_at: expiresAt,
          ad_accounts: accountsResp.data ?? [],
          pages: pages.map((p) => ({ id: p.id, name: p.name, access_token: p.access_token })),
          selected_ad_account_id: null,
        },
        status: "connected",
        connected_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workspace_id,type" },
    );

    if (error) return redirectWithError(`Błąd zapisu: ${error.message}`);

    const res = NextResponse.redirect(new URL("/integrations/meta/accounts", url.origin));
    res.cookies.delete("meta_oauth_state");
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Nieznany błąd";
    return redirectWithError(msg);
  }
}
