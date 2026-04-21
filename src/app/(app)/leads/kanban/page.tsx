import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getPipelines, getCurrentPipelineId, getStagesForPipeline } from "@/lib/pipeline";
import { PipelineSelect } from "@/components/pipeline-select";
import { KanbanBoard } from "./board";

export default async function KanbanPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [pipelines, currentPipelineId] = await Promise.all([
    getPipelines(WORKSPACE_ID),
    getCurrentPipelineId(WORKSPACE_ID),
  ]);

  const stages = currentPipelineId ? await getStagesForPipeline(currentPipelineId) : [];
  const stageIds = stages.map((s) => s.id);

  const { data: leads } = stageIds.length > 0
    ? await supabase
        .from("leads")
        .select("id, full_name, phone, email, source, stage_id, created_at")
        .eq("workspace_id", WORKSPACE_ID)
        .eq("archived", false)
        .in("stage_id", stageIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="px-8 py-8 anim-page">
      <div className="flex items-center gap-3 heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold">Kanban</h1>
        <PipelineSelect pipelines={pipelines} currentPipelineId={currentPipelineId} />
      </div>
      <KanbanBoard stages={stages} initialLeads={leads ?? []} />
    </div>
  );
}
