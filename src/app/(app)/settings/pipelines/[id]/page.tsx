import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StagesEditor } from "./stages-editor";

export default async function PipelineEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: pipeline } = await supabase
    .from("pipelines")
    .select("id, name, workspace_id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!pipeline) notFound();

  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("id, name, color, order")
    .eq("pipeline_id", id)
    .order("order");

  return (
    <div className="px-8 py-8 w-full">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
        <Link href="/settings/pipelines" className="hover:text-[var(--text)] transition-colors">Pipeline&apos;y</Link>
        <span>/</span>
        <span className="text-[var(--text)]">{pipeline.name}</span>
      </div>
      <h1 className="text-2xl font-semibold mb-2">{pipeline.name}</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Dodawaj, zmieniaj nazwy i usuwaj etapy. Kolejność ustaw przyciskami ↑/↓.
      </p>
      <StagesEditor pipelineId={id} initialStages={stages ?? []} />
    </div>
  );
}
