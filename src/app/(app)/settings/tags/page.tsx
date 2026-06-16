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
    <div className="px-4 py-4 sm:px-8 sm:py-8 w-full anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Tagi</h1>
        <p className="text-sm text-[var(--muted)]">Tagi pomagają w organizacji i filtrowaniu leadów.</p>
      </div>
      <TagsManager initialTags={tags ?? []} workspaceId={WORKSPACE_ID} />
    </div>
  );
}

