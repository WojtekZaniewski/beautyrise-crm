import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import Link from "next/link";

export default async function WorkspacesPage() {
  const supabase = createServiceClient();
  const currentId = await getCurrentWorkspaceId();

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: true });

  return (
    <div className="px-8 py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Klienci</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Każdy klient ma osobny workspace z własnymi leadami, kampaniami i integracjami.
          </p>
        </div>
        <Link
          href="/settings/workspaces/new"
          className="bg-[var(--accent)] hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
        >
          + Nowy klient
        </Link>
      </div>

      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)]">
              <th className="text-left px-5 py-3 font-medium">Nazwa</th>
              <th className="text-left px-5 py-3 font-medium">Slug</th>
              <th className="text-left px-5 py-3 font-medium">Utworzony</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(workspaces ?? []).map((w) => (
              <tr key={w.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3 font-medium">{w.name}</td>
                <td className="px-5 py-3 text-[var(--muted)]">{w.slug}</td>
                <td className="px-5 py-3 text-[var(--muted)]">
                  {new Date(w.created_at).toLocaleDateString("pl-PL")}
                </td>
                <td className="px-5 py-3">
                  {w.id === currentId ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                      Aktywny
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--muted)]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
