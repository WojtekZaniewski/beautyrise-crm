import { Sidebar } from "@/components/sidebar";
import { getAllWorkspaces, getCurrentWorkspaceId } from "@/lib/workspace";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [workspaces, currentWorkspaceId] = await Promise.all([
    getAllWorkspaces(),
    getCurrentWorkspaceId(),
  ]);

  return (
    <div className="flex min-h-screen">
      <Sidebar workspaces={workspaces} currentWorkspaceId={currentWorkspaceId} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
