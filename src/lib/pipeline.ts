import { cache } from "react";
import { cookies } from "next/headers";
import { unstable_cache, revalidateTag } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { toPaletteColor } from "@/lib/palette";

export type Pipeline = {
  id: string;
  workspace_id: string;
  name: string;
  created_at: string;
};

export type PipelineStage = {
  id: string;
  pipeline_id: string;
  name: string;
  color: string;
  order: number;
};

const PIPELINE_COOKIE = "current_pipeline_id";
const PIPELINES_TAG = "pipelines";
const STAGES_TAG = "stages";

const fetchPipelines = unstable_cache(
  async (workspaceId: string): Promise<Pipeline[]> => {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("pipelines")
      .select("id, workspace_id, name, created_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: true });
    return data ?? [];
  },
  ["pipelines-by-workspace"],
  { tags: [PIPELINES_TAG], revalidate: 300 },
);

export const getPipelines = cache(async (workspaceId: string): Promise<Pipeline[]> => {
  return fetchPipelines(workspaceId);
});

export const getCurrentPipelineId = cache(async (workspaceId: string): Promise<string | null> => {
  const [cookieStore, pipelines] = await Promise.all([cookies(), getPipelines(workspaceId)]);
  if (pipelines.length === 0) return null;

  const cookieValue = cookieStore.get(PIPELINE_COOKIE)?.value;
  if (cookieValue && pipelines.some((p) => p.id === cookieValue)) {
    return cookieValue;
  }

  return pipelines[0].id;
});

const fetchStagesForPipeline = unstable_cache(
  async (pipelineId: string): Promise<PipelineStage[]> => {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("pipeline_stages")
      .select("id, pipeline_id, name, color, order")
      .eq("pipeline_id", pipelineId)
      .order("order");
    return (data ?? []).map((s) => ({ ...s, color: toPaletteColor(s.color) }));
  },
  ["stages-by-pipeline"],
  { tags: [STAGES_TAG], revalidate: 300 },
);

export const getStagesForPipeline = cache(async (pipelineId: string): Promise<PipelineStage[]> => {
  return fetchStagesForPipeline(pipelineId);
});

export const getStagesForWorkspace = cache(async (workspaceId: string): Promise<PipelineStage[]> => {
  const pipelines = await getPipelines(workspaceId);
  if (pipelines.length === 0) return [];
  const stageArrays = await Promise.all(pipelines.map((p) => getStagesForPipeline(p.id)));
  return stageArrays.flat();
});

export function pipelineCookieConfig() {
  return {
    name: PIPELINE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax" as const,
    httpOnly: false,
  };
}

export function invalidatePipelines() {
  revalidateTag(PIPELINES_TAG, "max");
}

export function invalidateStages() {
  revalidateTag(STAGES_TAG, "max");
}
