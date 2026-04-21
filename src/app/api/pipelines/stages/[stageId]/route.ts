import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { invalidateStages } from "@/lib/pipeline";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ stageId: string }> },
) {
  const { stageId } = await params;
  const body = (await request.json()) as { name?: string; color?: string; order?: number };

  const update: Record<string, unknown> = {};
  if (body.name != null) update.name = body.name.trim();
  if (body.color != null) update.color = body.color;
  if (body.order != null) update.order = body.order;

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("pipeline_stages")
    .update(update)
    .eq("id", stageId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateStages();
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ stageId: string }> },
) {
  const { stageId } = await params;
  const supabase = createServiceClient();

  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("stage_id", stageId);

  if (count && count > 0) {
    return NextResponse.json(
      { error: `Etap ma ${count} leadów. Przenieś je przed usunięciem.` },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("pipeline_stages").delete().eq("id", stageId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateStages();
  return NextResponse.json({ ok: true });
}
