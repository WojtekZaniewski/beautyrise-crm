import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const body = await req.json() as { active?: boolean; test_event_code?: string };

  const { data: existing } = await supabase
    .from("capi_clients")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!existing) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const update: Record<string, unknown> = {};
  if (typeof body.active === "boolean") update.active = body.active;
  if ("test_event_code" in body) update.test_event_code = body.test_event_code?.trim() || null;

  const { error } = await supabase.from("capi_clients").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: existing } = await supabase
    .from("capi_clients")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!existing) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { error } = await supabase.from("capi_clients").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
