import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(request: Request) {
  const { page_id } = await request.json() as { page_id?: string };

  if (!page_id) {
    return NextResponse.json({ error: "Brak page_id" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .single();

  if (!integration) {
    return NextResponse.json({ error: "Brak integracji Meta" }, { status: 404 });
  }

  const pages = (integration.credentials as { pages?: Array<{ id: string }> })?.pages ?? [];
  if (!pages.some((p) => p.id === page_id)) {
    return NextResponse.json({ error: "Nieznana strona" }, { status: 400 });
  }

  const { error } = await supabase
    .from("integrations")
    .update({
      credentials: {
        ...(integration.credentials as object),
        selected_page_id: page_id,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
