import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { ConversationsLive } from "@/components/messages/conversations-live";
import { type Conversation } from "@/components/messages/conversations-list";
import { MessagesSyncButton } from "@/components/messages/sync-button";

export default async function MessagesPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  // Get selected_page_id to filter conversations
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .maybeSingle();

  const selectedPageId = (
    integration?.credentials as { selected_page_id?: string | null }
  )?.selected_page_id ?? null;

  let query = supabase
    .from("conversations")
    .select(`
      id,
      channel,
      sender_name,
      sender_profile_pic,
      last_message_at,
      last_message_preview,
      unread_count,
      leads ( id, full_name )
    `)
    .eq("workspace_id", WORKSPACE_ID)
    .order("last_message_at", { ascending: false })
    .limit(100);

  if (selectedPageId) {
    query = query.eq("page_id", selectedPageId);
  }

  const [{ data }, { data: lastMsg }] = await Promise.all([
    query,
    supabase
      .from("messages")
      .select("created_at")
      .eq("workspace_id", WORKSPACE_ID)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const conversations = (data ?? []) as unknown as Conversation[];

  const hoursAgo = lastMsg
    ? Math.floor((Date.now() - new Date(lastMsg.created_at).getTime()) / 3_600_000)
    : null;
  const isStale = integration !== null && (hoursAgo === null || hoursAgo > 24);

  return (
    <div className="px-4 py-4 sm:px-7 sm:py-7 max-w-4xl mx-auto anim-page">
      <div
        className="flex flex-wrap items-center justify-between heat-glow -mx-4 sm:-mx-7 -mt-4 sm:-mt-7 px-4 sm:px-7 pt-4 sm:pt-7 pb-5 mb-6"
      >
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Wiadomości</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
            Messenger i Instagram DM
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isStale && (
            <div
              className="text-[11.5px] px-3 py-1.5 rounded-lg"
              style={{
                color: "var(--warning, #f59e0b)",
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              ⚠ Brak nowych wiadomości od {hoursAgo != null ? `${hoursAgo}h` : "dawna"}
            </div>
          )}
          <MessagesSyncButton />
        </div>
      </div>

      <ConversationsLive
        initialConversations={conversations}
        workspaceId={WORKSPACE_ID}
      />
    </div>
  );
}

