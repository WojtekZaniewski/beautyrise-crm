import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/server";
import { workspaceCookieConfig, invalidateWorkspaces } from "@/lib/workspace";
import { invalidatePipelines, invalidateStages } from "@/lib/pipeline";

const DEFAULT_STAGES = [
  { name: "Nowy", color: "#ff4c00", order: 0 },
  { name: "W kontakcie", color: "#FF4C00", order: 1 },
  { name: "Kwalifikacja", color: "#FF8C42", order: 2 },
  { name: "Wygrany", color: "#FF4C00", order: 3 },
  { name: "Przegrany", color: "#1C1917", order: 4 },
];

export async function GET() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("workspaces")
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: true });
  return NextResponse.json({ workspaces: data ?? [] });
}

export async function POST(request: Request) {
  const { name, slug } = (await request.json()) as { name: string; slug: string };

  if (!name?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Nazwa i slug wymagane" }, { status: 400 });
  }

  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const supabase = createServiceClient();

  const { data: workspace, error } = await supabase
    .from("workspaces")
    .insert({ name: name.trim(), slug: cleanSlug })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Seed default pipeline with 5 stages
  const { data: pipeline, error: pipelineErr } = await supabase
    .from("pipelines")
    .insert({ workspace_id: workspace.id, name: "Główny" })
    .select("id")
    .single();

  if (pipelineErr) {
    return NextResponse.json({ error: `pipeline: ${pipelineErr.message}` }, { status: 500 });
  }

  const stagesRows = DEFAULT_STAGES.map((s) => ({
    pipeline_id: pipeline.id,
    name: s.name,
    color: s.color,
    order: s.order,
  }));

  const { error: stagesErr } = await supabase.from("pipeline_stages").insert(stagesRows);
  if (stagesErr) {
    return NextResponse.json({ error: `stages: ${stagesErr.message}` }, { status: 500 });
  }

  // Auto-switch to new workspace
  const cfg = workspaceCookieConfig();
  const cookieStore = await cookies();
  cookieStore.set(cfg.name, workspace.id, cfg);

  invalidateWorkspaces();
  invalidatePipelines();
  invalidateStages();

  return NextResponse.json({ ok: true, workspace_id: workspace.id });
}
