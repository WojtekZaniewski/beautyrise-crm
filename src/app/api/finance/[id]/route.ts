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

  const body = await req.json() as { status?: string };

  const { data: entry } = await supabase
    .from("finance_entries")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!entry) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const updates: Record<string, unknown> = {};
  if (body.status === "received" || body.status === "potential") {
    updates.status = body.status;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Brak zmian" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finance_entries")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: entry } = await supabase
    .from("finance_entries")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!entry) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { error } = await supabase.from("finance_entries").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
