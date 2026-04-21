import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { TagsManager } from "./tags-manager";

export default async function TagsSettingsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();
  const { data: tags } = await supabase
    .from("tags")
    .select("id, name, color")
    .eq("workspace_id", WORKSPACE_ID)
    .order("name");

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto anim-page">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Tagi</h1>
        <p className="text-sm text-[var(--muted)]">Tagi pomagają w organizacji i filtrowaniu leadów.</p>
      </div>
      <TagsManager initialTags={tags ?? []} workspaceId={WORKSPACE_ID} />
    </div>
  );
}
