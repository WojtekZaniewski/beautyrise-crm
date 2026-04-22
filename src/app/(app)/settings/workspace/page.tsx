import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { WorkspaceSettingsForm } from "@/components/settings/workspace-settings-form";

export default async function WorkspaceSettingsPage() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const [{ data: workspace }, { data: membersRaw }] = await Promise.all([
    supabase
      .from("workspaces")
      .select("id, name, slug, created_at")
      .eq("id", workspaceId)
      .single(),
    supabase
      .from("workspace_members")
      .select("id, user_id, role")
      .eq("workspace_id", workspaceId),
  ]);

  // Enrich members with auth user info via service role admin API
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const members: { id: string; user_id: string; role: string; email: string | null; name: string | null }[] = [];

  for (const m of membersRaw ?? []) {
    try {
      const res = await fetch(`${supabaseUrl}/auth/v1/admin/users/${m.user_id}`, {
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      });
      if (res.ok) {
        const u = await res.json() as { email?: string; user_metadata?: { full_name?: string; name?: string } };
        members.push({
          id: m.id,
          user_id: m.user_id,
          role: m.role,
          email: u.email ?? null,
          name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? null,
        });
      } else {
        members.push({ id: m.id, user_id: m.user_id, role: m.role, email: null, name: null });
      }
    } catch {
      members.push({ id: m.id, user_id: m.user_id, role: m.role, email: null, name: null });
    }
  }

  if (!workspace) return <div className="px-8 py-8 text-[var(--muted)]">Workspace not found.</div>;

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Ustawienia workspace&apos;u</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Zarządzaj podstawowymi ustawieniami aktywnego workspace&apos;u.
        </p>
      </div>

      <WorkspaceSettingsForm workspace={workspace} members={members} />
    </div>
  );
}
