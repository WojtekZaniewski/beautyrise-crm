"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type MetaChannel = "messenger" | "instagram";

type MetaConversation = {
  id: string;
  channel: MetaChannel;
  sender_name: string | null;
  sender_profile_pic: string | null;
  last_message_at: string;
  last_message_preview: string | null;
  unread_count: number;
  lead_id: string | null;
  leads?: { id: string; full_name: string } | null;
};

type MetaMessage = {
  id: string;
  direction: "inbound" | "outbound";
  text: string | null;
  created_at: string;
  meta_message_id: string;
};

const CHANNEL_LABEL: Record<MetaChannel, string> = {
  messenger: "Messenger",
  instagram: "Instagram DM",
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
}

export function MetaPanel({
  channel,
  workspaceId,
  onConversationRead,
}: {
  channel: MetaChannel;
  workspaceId: string;
  onConversationRead?: (channel: MetaChannel, unreadCount: number) => void;
}) {
  const supabase = createClient();
  const [conversations, setConversations] = useState<MetaConversation[]>([]);
  const [convLoading, setConvLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MetaMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedConv = conversations.find((c) => c.id === selectedId) ?? null;

  const loadConversations = useCallback(async () => {
    setConvLoading(true);
    const { data } = await supabase
      .from("conversations")
      .select(`
        id, channel, sender_name, sender_profile_pic, last_message_at,
        last_message_preview, unread_count, lead_id,
        leads ( id, full_name )
      `)
      .eq("workspace_id", workspaceId)
      .eq("channel", channel)
      .order("last_message_at", { ascending: false })
      .limit(100);
    setConversations(((data ?? []) as unknown) as MetaConversation[]);
    setConvLoading(false);
  }, [supabase, workspaceId, channel]);

  useEffect(() => {
    setSelectedId(null);
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const ch = supabase
      .channel(`meta-panel-convs:${workspaceId}:${channel}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `workspace_id=eq.${workspaceId}`,
        },
        (payload) => {
          const row = (payload.new ?? payload.old) as MetaConversation;
          if (row?.channel !== channel) return;
          if (payload.eventType === "INSERT") {
            setConversations((prev) => (prev.some((c) => c.id === row.id) ? prev : [row, ...prev]));
          } else if (payload.eventType === "UPDATE") {
            setConversations((prev) =>
              [...prev.map((c) => (c.id === row.id ? { ...c, ...row } : c))].sort(
                (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime(),
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setConversations((prev) => prev.filter((c) => c.id !== row.id));
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [supabase, workspaceId, channel]);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    setMsgLoading(true);
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("id, direction, text, created_at, meta_message_id")
        .eq("conversation_id", selectedId)
        .order("created_at", { ascending: true })
        .limit(200);
      setMessages(((data ?? []) as unknown) as MetaMessage[]);
      setMsgLoading(false);
    })();
    // Optimistically clear unread badge for the selected conversation
    setConversations((prev) => {
      const conv = prev.find((c) => c.id === selectedId);
      const unread = conv?.unread_count ?? 0;
      if (unread > 0) {
        supabase.from("conversations").update({ unread_count: 0 }).eq("id", selectedId);
        onConversationRead?.(channel, unread);
      }
      return prev.map((c) => (c.id === selectedId ? { ...c, unread_count: 0 } : c));
    });
  }, [selectedId, supabase, channel, onConversationRead]);

  useEffect(() => {
    if (!selectedId) return;
    const ch = supabase
      .channel(`meta-panel-msgs:${selectedId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedId}`,
        },
        (payload) => {
          const msg = payload.new as MetaMessage;
          setMessages((prev) =>
            prev.some((m) => m.meta_message_id === msg.meta_message_id) ? prev : [...prev, msg],
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [supabase, selectedId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedId || replySending) return;
    setReplySending(true);
    setReplyError("");

    const optId = `opt-${Date.now()}`;
    const optimistic: MetaMessage = {
      id: optId,
      direction: "outbound",
      text: replyText.trim(),
      created_at: new Date().toISOString(),
      meta_message_id: optId,
    };
    setMessages((prev) => [...prev, optimistic]);
    const text = replyText.trim();
    setReplyText("");

    const res = await fetch(`/api/messages/${selectedId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setReplyError((d as { error?: string }).error ?? "Błąd wysyłania");
      setMessages((prev) => prev.filter((m) => m.id !== optId));
    } else {
      setTimeout(() => setMessages((prev) => prev.filter((m) => !m.id.startsWith("opt-"))), 1200);
    }
    setReplySending(false);
  };

  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (c.sender_name ?? "").toLowerCase().includes(q) ||
      (c.last_message_preview ?? "").toLowerCase().includes(q) ||
      (c.leads?.full_name ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-1 min-w-0 overflow-hidden">
      {/* Lista */}
      <div
        className="flex flex-col w-72 shrink-0"
        style={{ borderRight: "1px solid var(--border)", background: "var(--panel)" }}
      >
        <div className="px-4 py-3 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <span className="text-sm font-semibold">{CHANNEL_LABEL[channel]}</span>
          <button
            onClick={loadConversations}
            className="text-xs px-2 py-1 rounded-md transition-colors"
            style={{ color: "var(--muted)", background: "var(--ba-4)" }}
            title="Odśwież"
          >
            ↻
          </button>
        </div>

        <div className="px-3 py-2 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <input
            type="text"
            placeholder="Szukaj..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg outline-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {convLoading ? (
            <div className="p-4 text-sm text-[var(--muted)]">Ładowanie…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-[var(--muted)]">
              {search ? "Brak wyników." : "Brak konwersacji."}
            </div>
          ) : (
            filtered.map((conv) => {
              const name = conv.sender_name ?? "Nieznany";
              const isSelected = conv.id === selectedId;
              const hasUnread = (conv.unread_count ?? 0) > 0;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className="w-full text-left px-4 py-3 transition-colors flex items-center gap-3"
                  style={{
                    background: isSelected ? "var(--accent-subtle)" : undefined,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                    style={{ background: "var(--ba-8)" }}>
                    {conv.sender_profile_pic ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={conv.sender_profile_pic} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[12px] font-semibold" style={{ color: "var(--muted)" }}>
                        {name[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[13px] font-medium truncate"
                        style={{ color: isSelected ? "var(--accent)" : "var(--text)" }}
                      >
                        {name}
                      </span>
                      <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>
                        {formatTime(conv.last_message_at)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs truncate" style={{ color: "var(--muted)" }}>
                        {conv.last_message_preview ?? ""}
                      </span>
                      {hasUnread && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: "var(--accent)", color: "#fff" }}
                        >
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Wątek */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--bg)" }}>
        {!selectedConv ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2" style={{ color: "var(--muted)" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".3">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-sm">Wybierz konwersację</span>
          </div>
        ) : (
          <>
            <div
              className="px-5 py-3 flex items-center justify-between shrink-0"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)" }}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{selectedConv.sender_name ?? "Nieznany"}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {CHANNEL_LABEL[selectedConv.channel]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/messages/${selectedConv.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  Pełny widok →
                </Link>
                {selectedConv.lead_id && (
                  <Link
                    href={`/leads/${selectedConv.lead_id}`}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}
                  >
                    Otwórz lead →
                  </Link>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2">
              {msgLoading ? (
                <div className="text-sm text-[var(--muted)]">Ładowanie…</div>
              ) : messages.length === 0 ? (
                <div className="text-sm text-[var(--muted)]">Brak wiadomości.</div>
              ) : (
                messages.map((msg) => {
                  const isOut = msg.direction === "outbound";
                  return (
                    <div key={msg.id} className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm"
                        style={{
                          background: isOut ? "var(--accent)" : "var(--panel)",
                          color: isOut ? "#fff" : "var(--text)",
                          border: isOut ? "none" : "1px solid var(--border)",
                          borderBottomRightRadius: isOut ? "4px" : undefined,
                          borderBottomLeftRadius: !isOut ? "4px" : undefined,
                          opacity: msg.id.startsWith("opt-") ? 0.6 : 1,
                        }}
                      >
                        {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}
                        <p
                          className="text-[10px] mt-1 text-right"
                          style={{ color: isOut ? "rgba(255,255,255,0.65)" : "var(--muted)" }}
                        >
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            <div className="shrink-0 px-4 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--panel)" }}>
              {replyError && <div className="text-xs text-red-500 mb-2">{replyError}</div>}
              <form onSubmit={handleReply} className="flex gap-2 items-end">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleReply(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="Napisz wiadomość… (Enter = wyślij, Shift+Enter = nowa linia)"
                  rows={2}
                  className="flex-1 resize-none text-sm px-3 py-2 rounded-xl outline-none"
                  style={{
                    background: "var(--ba-4)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    maxHeight: "120px",
                  }}
                />
                <button
                  type="submit"
                  disabled={replySending || !replyText.trim()}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {replySending ? "…" : "Wyślij"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
