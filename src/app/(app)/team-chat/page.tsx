import { createServiceClient, createClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { TeamChatWindow } from "@/components/team-chat/window";

export default async function TeamChatPage() {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();

  if (!user) {
    return (
      <div className="px-7 py-7 max-w-3xl mx-auto">
        <p className="text-[13px]" style={{ color: "var(--muted)" }}>
          Musisz być zalogowany, żeby korzystać z czatu zespołu.
        </p>
      </div>
    );
  }

  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: messages } = await supabase
    .from("team_messages")
    .select("id, user_id, user_email, user_name, text, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true })
    .limit(200);

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div
        className="heat-glow px-7 pt-7 pb-5 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-[22px] font-semibold tracking-tight">Czat zespołu</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Wewnętrzna komunikacja — widoczna tylko dla członków tego workspace'u
        </p>
      </div>

      <TeamChatWindow
        initialMessages={messages ?? []}
        workspaceId={workspaceId}
        currentUserId={user.id}
      />
    </div>
  );
}
