import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { invalidatePipelines, invalidateStages } from "@/lib/pipeline";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { name } = (await request.json()) as { name: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "Nazwa wymagana" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { error } = await supabase
    .from("pipelines")
    .update({ name: name.trim() })
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidatePipelines();
  invalidateStages();
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Check if any leads use stages from this pipeline
  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("id")
    .eq("pipeline_id", id);
  const stageIds = (stages ?? []).map((s) => s.id);

  if (stageIds.length > 0) {
    const { count } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .in("stage_id", stageIds);
    if (count && count > 0) {
      return NextResponse.json(
        { error: `Pipeline ma ${count} leadów. Przenieś je najpierw do innego pipeline'u.` },
        { status: 400 },
      );
    }
  }

  const { error } = await supabase
    .from("pipelines")
    .delete()
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidatePipelines();
  invalidateStages();
  return NextResponse.json({ ok: true });
}
