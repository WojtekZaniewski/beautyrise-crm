import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

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
