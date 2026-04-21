import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { invalidateStages } from "@/lib/pipeline";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: pipelineId } = await params;
  const { name, color } = (await request.json()) as { name: string; color?: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "Nazwa wymagana" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: existing } = await supabase
    .from("pipeline_stages")
    .select("order")
    .eq("pipeline_id", pipelineId)
    .order("order", { ascending: false })
    .limit(1);
  const nextOrder = existing?.[0]?.order != null ? existing[0].order + 1 : 0;

  const { error } = await supabase.from("pipeline_stages").insert({
    pipeline_id: pipelineId,
    name: name.trim(),
    color: color ?? "#ff4c00",
    order: nextOrder,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateStages();
  return NextResponse.json({ ok: true });
}
