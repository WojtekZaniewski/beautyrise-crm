import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

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

  const { error } = await supabase
    .from("integrations")
    .update({ credentials: creds, updated_at: new Date().toISOString() })
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
