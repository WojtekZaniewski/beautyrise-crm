import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getPipelines, getStagesForWorkspace } from "@/lib/pipeline";
import { PipelinesManager } from "./manager";

export default async function PipelinesPage() {
  const workspaceId = await getCurrentWorkspaceId();
  const [pipelines, stages] = await Promise.all([
    getPipelines(workspaceId),
    getStagesForWorkspace(workspaceId),
  ]);

  const stageCounts: Record<string, number> = {};
  const stageToPipeline: Record<string, string> = {};
  for (const s of stages) {
    stageCounts[s.pipeline_id] = (stageCounts[s.pipeline_id] ?? 0) + 1;
    stageToPipeline[s.id] = s.pipeline_id;
  }

  // Single query to get all leads + their stage_id, then group by pipeline
  const leadCounts: Record<string, number> = {};
  if (stages.length > 0) {
    const supabase = createServiceClient();
    const { data: leads } = await supabase
      .from("leads")
      .select("stage_id")
      .eq("workspace_id", workspaceId)
      .eq("archived", false)
      .in("stage_id", stages.map((s) => s.id));

    for (const lead of leads ?? []) {
      if (!lead.stage_id) continue;
      const pipelineId = stageToPipeline[lead.stage_id];
      if (pipelineId) {
        leadCounts[pipelineId] = (leadCounts[pipelineId] ?? 0) + 1;
      }
    }
  }

  return (
    <div className="px-8 py-8 max-w-3xl mx-auto anim-page">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold">Pipeline&apos;y</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Twórz osobne pipeline&apos;y dla różnych źródeł leadów (Meta Ads, outreach ręczny, kontakty prywatne).
        </p>
      </div>
      <PipelinesManager
        initialPipelines={pipelines}
        stageCounts={stageCounts}
        leadCounts={leadCounts}
      />
    </div>
  );
}
