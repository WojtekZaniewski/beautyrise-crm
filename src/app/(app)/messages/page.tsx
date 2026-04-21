import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { ConversationsList, type Conversation } from "@/components/messages/conversations-list";
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

  const { data } = await query;

  const conversations = (data ?? []) as unknown as Conversation[];

  return (
    <div className="px-7 py-7 max-w-4xl mx-auto anim-page">
      <div
        className="flex items-center justify-between heat-glow -mx-7 -mt-7 px-7 pt-7 pb-5 mb-6"
      >
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Wiadomości</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
            Messenger i Instagram DM
          </p>
        </div>
        <MessagesSyncButton />
      </div>

      <ConversationsList conversations={conversations} />
    </div>
  );
}
