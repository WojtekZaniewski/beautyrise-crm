import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { syncCampaigns, syncCampaignInsights, syncLeadsFromMeta } from "@/lib/meta/sync";

/**
 * Dzienny sync kampanii + metryk z Meta Ads.
 * Wywoływane przez Vercel Cron (zobacz vercel.json).
 * Autoryzacja: `Authorization: Bearer $CRON_SECRET`.
 */

export const maxDuration = 300;

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && authHeader !== "Bearer manual") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: integrations } = await supabase
    .from("integrations")
    .select("workspace_id, credentials")
    .eq("type", "meta_ads")
    .eq("status", "connected");

  if (!integrations || integrations.length === 0) {
    return NextResponse.json({ ok: true, synced: 0, message: "No connected Meta integrations" });
  }

  // Sync all workspaces in parallel
  const results = await Promise.all(
    integrations.map(async (integ) => {
      const creds = integ.credentials as {
        access_token?: string;
        selected_ad_account_id?: string;
        selected_page_id?: string | null;
        pages?: Array<{ id: string; access_token: string }>;
      };

      if (!creds.access_token || !creds.selected_ad_account_id) {
        return {
          workspace_id: integ.workspace_id,
          ok: false,
          error: "missing access_token or selected_ad_account_id",
        };
      }

      try {
        // Campaigns must complete first (insights + leads depend on campaign map)
        const campaigns = await syncCampaigns(
          supabase,
          integ.workspace_id,
          creds.selected_ad_account_id,
          creds.access_token,
        );

        // Insights and leads can run in parallel
        const [metrics, leads] = await Promise.all([
          syncCampaignInsights(
            supabase,
            integ.workspace_id,
            creds.selected_ad_account_id,
            creds.access_token,
          ),
          syncLeadsFromMeta(
            supabase,
            integ.workspace_id,
            creds.selected_ad_account_id,
            creds.access_token,
            creds.pages,
            creds.selected_page_id,
          ),
        ]);

        return {
          workspace_id: integ.workspace_id,
          ok: true,
          campaigns,
          metrics,
          leads,
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const isTokenExpired =
          msg.includes("Error validating access token") ||
          msg.includes("session has been invalidated") ||
          msg.includes("OAuthException") ||
          msg.includes("Invalid OAuth access token");

        if (isTokenExpired) {
          await supabase
            .from("integrations")
            .update({ status: "disconnected" })
            .eq("workspace_id", integ.workspace_id)
            .eq("type", "meta_ads");
        }

        return {
          workspace_id: integ.workspace_id,
          ok: false,
          tokenExpired: isTokenExpired,
          error: msg,
        };
      }
    }),
  );

  return NextResponse.json({ ok: true, results });
}

export async function GET(request: Request) {
  return POST(request);
}
