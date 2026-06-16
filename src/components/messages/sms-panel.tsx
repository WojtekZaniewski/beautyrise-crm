"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type SmsConversation = {
  id: string;
  phone: string;
  last_message_at: string;
  last_message_preview: string | null;
  unread_count: number;
  lead_id: string | null;
  campaign_id: string | null;
  leads?: { full_name: string } | null;
  sms_campaigns?: { name: string } | null;
};

type SmsMessage = {
  id: string;
  direction: "inbound" | "outbound";
  body: string;
  status: string;
  created_at: string;
  sent_at: string | null;
};

function getWorkspaceIdFromCookie(): string | null {
  const match = document.cookie.match(/workspace_id=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
}

export function SmsPanel({ initialConversationId }: { initialConversationId?: string | null }) {
  const supabase = createClient();
  const [conversations, setConversations] = useState<SmsConversation[]>([]);
  const [convLoading, setConvLoading] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(initialConversationId ?? null);
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedConv = conversations.find((c) => c.id === selectedConvId) ?? null;

  const loadConversations = useCallback(async () => {
    setConvLoading(true);
    const data = await fetch("/api/sms/conversations").then((r) => r.json());
    setConversations(Array.isArray(data) ? data : []);
    setConvLoading(false);
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const workspaceId = getWorkspaceIdFromCookie();
    if (!workspaceId) return;

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const channel = supabase
      .channel(`sms-panel-convs:${workspaceId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sms_conversations", filter: `workspace_id=eq.${workspaceId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const conv = payload.new as SmsConversation;
            setConversations((prev) => (prev.some((c) => c.id === conv.id) ? prev : [conv, ...prev]));
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as SmsConversation;
            setConversations((prev) =>
              [...prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))].sort(
                (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime(),
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    if (!selectedConvId) {
      setMessages([]);
      return;
    }
    setMsgLoading(true);
    fetch(`/api/sms/conversations/${selectedConvId}/messages`)
      .then((r) => r.json())
      .then((d) => {
        setMessages(Array.isArray(d) ? d : []);
        setMsgLoading(false);
      });
    setConversations((prev) => prev.map((c) => (c.id === selectedConvId ? { ...c, unread_count: 0 } : c)));
  }, [selectedConvId]);

  useEffect(() => {
    if (!selectedConvId) return;
    const channel = supabase
      .channel(`sms-panel-msgs:${selectedConvId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sms_messages", filter: `conversation_id=eq.${selectedConvId}` },
        (payload) => {
          const msg = payload.new as SmsMessage;
          setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, selectedConvId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConvId || replySending) return;
    setReplySending(true);
    setReplyError("");

    const optimisticId = `opt-${Date.now()}`;
    const optimistic: SmsMessage = {
      id: optimisticId,
      direction: "outbound",
      body: replyText.trim(),
      status: "sent",
      created_at: new Date().toISOString(),
      sent_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    const textToSend = replyText.trim();
    setReplyText("");

    const res = await fetch(`/api/sms/conversations/${selectedConvId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textToSend }),
    });

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setReplyError((d as { error?: string }).error ?? "Błąd wysyłania");
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
    } else {
      setTimeout(() => setMessages((prev) => prev.filter((m) => !m.id.startsWith("opt-"))), 1200);
    }
    setReplySending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply(e as unknown as React.FormEvent);
    }
  };

  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.phone.includes(q) ||
      (c.leads?.full_name ?? "").toLowerCase().includes(q) ||
      (c.last_message_preview ?? "").toLowerCase().includes(q)
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">SMS</span>
          </div>
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
              const name = conv.leads?.full_name ?? conv.phone;
              const isSelected = conv.id === selectedConvId;
              const hasUnread = (conv.unread_count ?? 0) > 0;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className="w-full text-left px-4 py-3 transition-colors flex flex-col gap-0.5"
                  style={{
                    background: isSelected ? "var(--accent-subtle)" : undefined,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
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
                  {conv.sms_campaigns?.name && (
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                      {conv.sms_campaigns.name.replace(/^\[[a-z]+\]\s*/i, "")}
                    </span>
                  )}
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
            <svg width="36" height="36" viewBox="0 0 15 15" fill="none" opacity=".3">
              <rect x="4" y="1" width="7" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="7.5" cy="11.5" r="0.9" fill="currentColor" />
              <path d="M6 4.5h3M6 6.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
                <span className="text-sm font-semibold">
                  {selectedConv.leads?.full_name ?? selectedConv.phone}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {selectedConv.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
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
                        }}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                        <p
                          className="text-[10px] mt-1 text-right"
                          style={{ color: isOut ? "rgba(255,255,255,0.65)" : "var(--muted)" }}
                        >
                          {formatTime(msg.sent_at ?? msg.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            <div className="shrink-0 px-4 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--panel)" }}>
              {replyError && <div className="text-xs text-[#1C1917] mb-2">{replyError}</div>}
              <form onSubmit={handleReply} className="flex gap-2 items-end">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={handleKeyDown}
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
