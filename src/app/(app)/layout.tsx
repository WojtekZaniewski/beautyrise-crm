import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { NavProvider } from "@/components/nav-context";
import { ActivityToaster } from "@/components/activity-toaster";
import { getAllWorkspaces, getCurrentWorkspaceId } from "@/lib/workspace";
import { createClient } from "@/lib/supabase/server";
import { displayName } from "@/lib/display-name";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [workspaces, currentWorkspaceId] = await Promise.all([
    getAllWorkspaces(),
    getCurrentWorkspaceId(),
  ]);

  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  const meName = user ? displayName(user) : null;

  return (
    <NavProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar workspaces={workspaces} currentWorkspaceId={currentWorkspaceId} />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <MobileHeader />
          <main className="flex-1 overflow-auto dot-grid min-h-0">
            {children}
          </main>
        </div>
      </div>
      <ActivityToaster workspaceId={currentWorkspaceId} meName={meName} />
    </NavProvider>
  );
}
