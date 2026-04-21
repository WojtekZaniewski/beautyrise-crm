import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { getPipelines } from "@/lib/pipeline";
import { NewLeadForm } from "./form";

export default async function NewLeadPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const pipelines = await getPipelines(WORKSPACE_ID);
  const pipelineIds = pipelines.map((p) => p.id);

  const { data: stages } = pipelineIds.length > 0
    ? await supabase
        .from("pipeline_stages")
        .select("id, name, pipeline_id")
        .in("pipeline_id", pipelineIds)
        .order("order")
    : { data: [] };

  return (
    <div className="px-8 py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Nowy lead</h1>
      <NewLeadForm
        pipelines={pipelines}
        stages={stages ?? []}
        workspaceId={WORKSPACE_ID}
      />
    </div>
  );
}
