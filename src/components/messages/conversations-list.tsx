import Link from "next/link";

type Lead = { id: string; full_name: string } | null;

export type Conversation = {
  id: string;
  channel: "messenger" | "instagram";
  sender_name: string | null;
  sender_profile_pic: string | null;
  last_message_at: string;
  last_message_preview: string | null;
  unread_count: number;
  leads: Lead;
};

const CHANNEL_LABEL: Record<"messenger" | "instagram", string> = {
  messenger: "Messenger",
  instagram: "Instagram DM",
};

const CHANNEL_COLOR: Record<"messenger" | "instagram", string> = {
  messenger: "#0084ff",
  instagram: "#e1306c",
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) {
    return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

export function ConversationsList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const panelStyle: React.CSSProperties = {
    background: "var(--panel-solid)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    boxShadow: "var(--shadow-sm)",
  };

  if (conversations.length === 0) {
    return (
      <div style={panelStyle} className="p-14 text-center">
        <div className="text-[15px] font-semibold tracking-tight mb-1.5">
          Brak wiadomości
        </div>
        <div className="text-[13px]" style={{ color: "var(--muted)" }}>
          Wiadomości pojawią się tutaj, gdy ktoś napisze na Messenger lub Instagram DM.
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle} className="overflow-hidden">
      {conversations.map((conv, i) => (
        <Link
          key={conv.id}
          href={`/messages/${conv.id}`}
          className="flex items-center gap-3.5 px-5 py-3.5 transition-colors table-row-hover"
          style={{
            borderBottom:
              i < conversations.length - 1 ? "1px solid var(--border)" : undefined,
          }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
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
                className="text-[13px] font-semibold"
                style={{ color: "var(--muted)" }}
              >
                {(conv.sender_name ?? "?")[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-[13px] truncate">
                {conv.sender_name ?? "Nieznany"}
              </span>
              <span
                className="text-[10.5px] px-1.5 py-0.5 rounded-full font-medium shrink-0"
                style={{
                  background: CHANNEL_COLOR[conv.channel] + "18",
                  color: CHANNEL_COLOR[conv.channel],
                  border: `1px solid ${CHANNEL_COLOR[conv.channel]}30`,
                }}
              >
                {CHANNEL_LABEL[conv.channel]}
              </span>
              {conv.leads && (
                <span
                  className="text-[11px] truncate"
                  style={{ color: "var(--muted)" }}
                >
                  → {conv.leads.full_name}
                </span>
              )}
            </div>
            <div
              className="text-[12.5px] truncate"
              style={{ color: "var(--muted)" }}
            >
              {conv.last_message_preview ?? "—"}
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="text-[11.5px]" style={{ color: "var(--muted)" }}>
              {formatTime(conv.last_message_at)}
            </div>
            {conv.unread_count > 0 && (
              <span
                className="min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1"
                style={{ background: "var(--accent)", color: "white" }}
              >
                {conv.unread_count}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
