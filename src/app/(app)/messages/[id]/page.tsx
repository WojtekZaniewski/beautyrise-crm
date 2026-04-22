import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChatWindow, type Message } from "@/components/messages/chat-window";
import { LeadNotesPanel } from "@/components/lead-notes-panel";

const CHANNEL_LABEL: Record<string, string> = {
  messenger: "Messenger",
  instagram: "Instagram DM",
};

const CHANNEL_COLOR: Record<string, string> = {
  messenger: "#0084ff",
  instagram: "#e1306c",
};

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const [convRes, messagesRes] = await Promise.all([
    supabase
      .from("conversations")
      .select(
        "id, channel, sender_name, sender_profile_pic, page_id, unread_count, leads ( id, full_name )",
      )
      .eq("id", id)
      .eq("workspace_id", WORKSPACE_ID)
      .single(),
    supabase
      .from("messages")
      .select("id, direction, text, attachments, created_at, meta_message_id")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true })
      .limit(200),
  ]);

  if (!convRes.data) notFound();

  const conv = convRes.data;
  const lead = (conv.leads as unknown) as { id: string; full_name: string } | null;

  // Mark as read
  if (conv.unread_count > 0) {
    await supabase
      .from("conversations")
      .update({ unread_count: 0, updated_at: new Date().toISOString() })
      .eq("id", id);
  }

  const initialMessages = (messagesRes.data ?? []) as Message[];
  const channel = conv.channel as string;

  return (
    <div
      className="flex flex-col anim-page"
      style={{ height: "calc(100vh - 0px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3 shrink-0"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <Link
          href="/messages"
          className="text-[12.5px] font-medium px-2.5 py-1.5 rounded-md transition-colors"
          style={{ color: "var(--muted)" }}
        >
          ← Wstecz
        </Link>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: "var(--ba-8)" }}
        >
          {conv.sender_profile_pic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={conv.sender_profile_pic}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--muted)" }}
            >
              {(conv.sender_name ?? "?")[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-medium text-[13px] truncate">
            {conv.sender_name ?? "Nieznany"}
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10.5px] px-1.5 py-0.5 rounded-full font-medium"
              style={{
                background: (CHANNEL_COLOR[channel] ?? "#888") + "18",
                color: CHANNEL_COLOR[channel] ?? "#888",
                border: `1px solid ${(CHANNEL_COLOR[channel] ?? "#888")}30`,
              }}
            >
              {CHANNEL_LABEL[channel] ?? channel}
            </span>
          </div>
        </div>

        {lead && (
          <Link
            href={`/leads/${lead.id}`}
            className="text-[12px] px-2.5 py-1.5 rounded-md shrink-0 transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            Lead: {lead.full_name}
          </Link>
        )}
        <LeadNotesPanel
          leadId={lead?.id}
          leadName={lead?.full_name ?? conv.sender_name ?? undefined}
          fallbackName={conv.sender_name ?? undefined}
          conversationId={id}
        />
      </div>

      {/* Chat — client component handles realtime + reply */}
      <ChatWindow conversationId={id} initialMessages={initialMessages} />
    </div>
  );
}
