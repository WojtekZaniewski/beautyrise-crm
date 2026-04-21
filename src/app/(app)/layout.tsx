import { Sidebar } from "@/components/sidebar";
import { getAllWorkspaces, getCurrentWorkspaceId } from "@/lib/workspace";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [workspaces, currentWorkspaceId] = await Promise.all([
    getAllWorkspaces(),
    getCurrentWorkspaceId(),
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar workspaces={workspaces} currentWorkspaceId={currentWorkspaceId} />
      <main className="flex-1 overflow-auto dot-grid min-h-0">
        {children}
      </main>
    </div>
  );
}
