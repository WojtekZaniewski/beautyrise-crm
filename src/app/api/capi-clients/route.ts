import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data, error } = await supabase
    .from("capi_clients")
    .select("id, name, pixel_id, test_event_code, active, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const body = await req.json() as {
    id?: string; name?: string; pixel_id?: string; access_token?: string;
    test_event_code?: string;
  };

  if (!body.name?.trim() || !body.pixel_id?.trim() || !body.access_token?.trim()) {
    return NextResponse.json({ error: "Wymagane: name, pixel_id, access_token" }, { status: 400 });
  }

  const id = body.id?.trim() || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const { data, error } = await supabase
    .from("capi_clients")
    .upsert({
      id,
      name: body.name.trim(),
      pixel_id: body.pixel_id.trim(),
      access_token: body.access_token.trim(),
      test_event_code: body.test_event_code?.trim() || null,
      workspace_id: workspaceId,
      active: true,
    }, { onConflict: "id" })
    .select("id, name, pixel_id, test_event_code, active")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
