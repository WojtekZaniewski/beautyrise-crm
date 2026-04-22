import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data } = await supabase
    .from("leads")
    .select("id, full_name, phone, email, source, created_at")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!data) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const body = await req.json();
  const allowed = ["full_name", "phone", "email"] as const;
  const update: Record<string, string | null> = {};

  for (const key of allowed) {
    if (key in body) {
      const val = typeof body[key] === "string" ? body[key].trim() || null : null;
      update[key] = val;
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Brak pól do aktualizacji" }, { status: 400 });
  }

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { error } = await supabase
    .from("leads")
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
