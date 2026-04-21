import { MetaClient } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";

type MetaCampaign = {
  id: string;
  name: string;
  status?: string;
  objective?: string;
  daily_budget?: string;
};

type MetaInsight = {
  date_start: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  cpc?: string;
  ctr?: string;
  actions?: Array<{ action_type: string; value: string }>;
};

/**
 * Sync campaigns list from Meta → `campaigns` table.
 */
export async function syncCampaigns(
  supabase: SupabaseClient,
  workspaceId: string,
  adAccountId: string,
  accessToken: string,
): Promise<number> {
  const client = new MetaClient(accessToken);
  const campaigns = await client.paginate<MetaCampaign>(
    `act_${adAccountId}/campaigns`,
    { fields: "id,name,status,objective,daily_budget" },
  );

  if (campaigns.length === 0) return 0;

  const rows = campaigns.map((c) => ({
    workspace_id: workspaceId,
    external_id: c.id,
    platform: "meta",
    name: c.name,
    objective: c.objective ?? null,
    status: c.status ?? null,
    daily_budget: c.daily_budget ? Number(c.daily_budget) / 100 : null,
    synced_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("campaigns")
    .upsert(rows, { onConflict: "workspace_id,external_id" });

  if (error) throw new Error(`syncCampaigns: ${error.message}`);
  return rows.length;
}

/**
 * Sync daily insights for all campaigns of an ad account.
 * @param since ISO date YYYY-MM-DD (default: yesterday)
 */
export async function syncCampaignInsights(
  supabase: SupabaseClient,
  workspaceId: string,
  adAccountId: string,
  accessToken: string,
  since?: string,
): Promise<number> {
  const client = new MetaClient(accessToken);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const insights = await client.paginate<MetaInsight & { campaign_id: string }>(
    `act_${adAccountId}/insights`,
    {
      level: "campaign",
      time_increment: 1,
      time_range: JSON.stringify({ since: since ?? yesterday, until: today }),
      fields: "campaign_id,date_start,spend,impressions,clicks,cpc,ctr,actions",
    },
  );

  if (insights.length === 0) return 0;

  // Get our internal campaigns.id map
  const { data: campaignMap } = await supabase
    .from("campaigns")
    .select("id, external_id")
    .eq("workspace_id", workspaceId);

  const externalToInternal = new Map(
    (campaignMap ?? []).map((c) => [c.external_id, c.id]),
  );

  const rows = insights
    .map((i) => {
      const internalId = externalToInternal.get(i.campaign_id);
      if (!internalId) return null;

      const leadActions = (i.actions ?? []).find(
        (a) => a.action_type === "lead" || a.action_type === "onsite_conversion.lead_grouped",
      );
      const leadsCount = leadActions ? Number(leadActions.value) : 0;
      const spend = Number(i.spend ?? 0);

      return {
        campaign_id: internalId,
        date: i.date_start,
        spend: spend.toFixed(2),
        impressions: Number(i.impressions ?? 0),
        clicks: Number(i.clicks ?? 0),
        leads_count: leadsCount,
        cpc: i.cpc ? Number(i.cpc).toFixed(4) : null,
        ctr: i.ctr ? Number(i.ctr).toFixed(4) : null,
        cpl: leadsCount > 0 ? (spend / leadsCount).toFixed(4) : null,
        conversion_rate:
          Number(i.clicks ?? 0) > 0 && leadsCount > 0
            ? ((leadsCount / Number(i.clicks ?? 1)) * 100).toFixed(4)
            : null,
      };
    })
    .filter(Boolean);

  if (rows.length === 0) return 0;

  const { error } = await supabase
    .from("campaign_metrics_daily")
    .upsert(rows, { onConflict: "campaign_id,date" });

  if (error) throw new Error(`syncCampaignInsights: ${error.message}`);
  return rows.length;
}

type MetaLeadField = { name: string; values: string[] };

type MetaLead = {
  id: string;
  created_time: string;
  campaign_id?: string;
  ad_id?: string;
  form_id?: string;
  field_data: MetaLeadField[];
};

function extractField(fields: MetaLeadField[], ...keys: string[]): string | null {
  for (const key of keys) {
    const f = fields.find((f) => f.name.toLowerCase().includes(key));
    if (f?.values?.[0]) return f.values[0];
  }
  return null;
}

/**
 * Sync historical leads from Meta Lead Ads → `leads` table.
 */
export async function syncLeadsFromMeta(
  supabase: SupabaseClient,
  workspaceId: string,
  adAccountId: string,
  accessToken: string,
  pages?: Array<{ id: string; access_token: string }>,
): Promise<number> {
  type LeadgenForm = { id: string; name: string };

  const metaLeads: MetaLead[] = [];

  if (pages && pages.length > 0) {
    // Fetch all pages' forms in parallel, then all forms' leads in parallel
    const perPageResults = await Promise.all(
      pages.map(async (page) => {
        try {
          const pageClient = new MetaClient(page.access_token);
          const forms = await pageClient.paginate<LeadgenForm>(
            `${page.id}/leadgen_forms`,
            { fields: "id,name" },
          );
          const formLeadsArrays = await Promise.all(
            forms.map((form) =>
              pageClient
                .paginate<MetaLead>(`${form.id}/leads`, {
                  fields: "id,created_time,campaign_id,ad_id,form_id,field_data",
                })
                .catch(() => [] as MetaLead[]),
            ),
          );
          return formLeadsArrays.flat();
        } catch {
          return [] as MetaLead[];
        }
      }),
    );
    metaLeads.push(...perPageResults.flat());
  } else {
    // Fallback: fetch via campaigns → ads → leads (all parallel)
    const userClient = new MetaClient(accessToken);
    type MetaCampaignBasic = { id: string };
    type MetaAd = { id: string };
    const campaigns = await userClient.paginate<MetaCampaignBasic>(
      `act_${adAccountId}/campaigns`,
      { fields: "id" },
    );
    const perCampaignResults = await Promise.all(
      campaigns.map(async (campaign) => {
        const ads = await userClient.paginate<MetaAd>(`${campaign.id}/ads`, {
          fields: "id",
        });
        const perAdLeads = await Promise.all(
          ads.map((ad) =>
            userClient
              .paginate<MetaLead>(`${ad.id}/leads`, {
                fields: "id,created_time,campaign_id,ad_id,form_id,field_data",
              })
              .catch(() => [] as MetaLead[]),
          ),
        );
        return perAdLeads.flat();
      }),
    );
    metaLeads.push(...perCampaignResults.flat());
  }

  if (metaLeads.length === 0) return 0;

  // Map external campaign IDs to internal
  const { data: campaignMap } = await supabase
    .from("campaigns")
    .select("id, external_id")
    .eq("workspace_id", workspaceId);

  const externalToInternal = new Map(
    (campaignMap ?? []).map((c) => [c.external_id, c.id]),
  );

  // Get default stage from first pipeline in workspace (single query)
  const { data: pipelines } = await supabase
    .from("pipelines")
    .select("id")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true })
    .limit(1);

  let defaultStageId: string | null = null;
  if (pipelines?.[0]?.id) {
    const { data: firstStage } = await supabase
      .from("pipeline_stages")
      .select("id")
      .eq("pipeline_id", pipelines[0].id)
      .order("order")
      .limit(1);
    defaultStageId = firstStage?.[0]?.id ?? null;
  }

  // Fetch all existing meta_lead_ids for this workspace in ONE query
  const { data: existingLeads } = await supabase
    .from("leads")
    .select("custom_fields")
    .eq("workspace_id", workspaceId)
    .eq("source", "meta_ads");

  const existingMetaIds = new Set<string>();
  for (const l of existingLeads ?? []) {
    const mid = (l.custom_fields as { meta_lead_id?: string } | null)?.meta_lead_id;
    if (mid) existingMetaIds.add(mid);
  }

  // Build rows for leads not yet in DB — ONLY from campaigns in this workspace's ad account
  const rows = metaLeads
    .filter((l) => !existingMetaIds.has(l.id))
    .filter((l) => l.campaign_id && externalToInternal.has(l.campaign_id))
    .map((l) => {
      const fullName =
        extractField(l.field_data, "full_name", "name", "imię", "nazwisko") ??
        "Lead z Meta Ads";
      const phone = extractField(l.field_data, "phone", "telefon", "mobile");
      const email = extractField(l.field_data, "email", "mail", "e-mail");
      const internalCampaignId = externalToInternal.get(l.campaign_id!) ?? null;

      return {
        workspace_id: workspaceId,
        full_name: fullName,
        phone,
        email,
        source: "meta_ads" as const,
        source_campaign_id: internalCampaignId,
        stage_id: defaultStageId,
        archived: false,
        custom_fields: { meta_lead_id: l.id, form_id: l.form_id ?? null, field_data: l.field_data },
        created_at: new Date(l.created_time).toISOString(),
      };
    });

  if (rows.length === 0) return 0;

  // Single batch insert
  const { data: insertedRows, error } = await supabase
    .from("leads")
    .insert(rows)
    .select("id");

  if (error) throw new Error(`syncLeadsFromMeta insert: ${error.message}`);
  return insertedRows?.length ?? 0;
}

/**
 * Fetch Meta Lead Ads submission details by leadgen_id.
 */
export async function fetchLeadFromMeta(
  leadgenId: string,
  accessToken: string,
): Promise<{
  id: string;
  created_time: string;
  campaign_id?: string;
  ad_id?: string;
  field_data: Array<{ name: string; values: string[] }>;
}> {
  const client = new MetaClient(accessToken);
  return client.get(`${leadgenId}`, {
    fields: "id,created_time,campaign_id,ad_id,field_data",
  });
}
