import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { MetaClient } from "@/lib/meta/client";

export async function POST(request: Request) {
  const { account_id } = (await request.json()) as { account_id: string };

  if (!account_id) {
    return NextResponse.json({ error: "Brak account_id" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .maybeSingle();

  if (!integration) {
    return NextResponse.json({ error: "Brak integracji" }, { status: 404 });
  }

  const creds = (integration.credentials ?? {}) as Record<string, unknown>;
  creds.selected_ad_account_id = account_id;

  // Auto-fetch the first pixel for this ad account and store it for CAPI
  if (creds.access_token) {
    try {
      const client = new MetaClient(creds.access_token as string);
      const pixelRes = await client.get<{ data: Array<{ id: string; name: string }> }>(
        `${account_id}/adspixels`,
        { fields: "id,name" },
      );
      if (pixelRes.data?.[0]) {
        creds.pixel_id = pixelRes.data[0].id;
        creds.pixel_name = pixelRes.data[0].name;
      }
    } catch {}
  }

  const { error } = await supabase
    .from("integrations")
    .update({ credentials: creds, updated_at: new Date().toISOString() })
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
