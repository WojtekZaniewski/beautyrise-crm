import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { invalidatePipelines, invalidateStages } from "@/lib/pipeline";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data } = await supabase
    .from("pipelines")
    .select("id, name, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });
  return NextResponse.json({ pipelines: data ?? [] });
}

export async function POST(request: Request) {
  const { name } = (await request.json()) as { name: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "Nazwa wymagana" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: pipeline, error } = await supabase
    .from("pipelines")
    .insert({ workspace_id: workspaceId, name: name.trim() })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Seed 4 default stages for new pipeline
  const defaultStages = [
    { pipeline_id: pipeline.id, name: "Nowy",                        color: "#ff4c00", order: 0 },
    { pipeline_id: pipeline.id, name: "W kontakcie",                  color: "#3b82f6", order: 1 },
    { pipeline_id: pipeline.id, name: "Umówiony na call",             color: "#a855f7", order: 2 },
    { pipeline_id: pipeline.id, name: "Po rozmowie",                  color: "#f59e0b", order: 3 },
    { pipeline_id: pipeline.id, name: "Zamknięty",                    color: "#22c55e", order: 4 },
    { pipeline_id: pipeline.id, name: "Lidy przekazane do prawnika",  color: "#6366f1", order: 5 },
  ];
  await supabase.from("pipeline_stages").insert(defaultStages);

  invalidatePipelines();
  invalidateStages();

  return NextResponse.json({ ok: true, pipeline_id: pipeline.id });
}
