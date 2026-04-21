"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export type Message = {
  id: string;
  direction: "inbound" | "outbound";
  text: string | null;
  created_at: string;
  meta_message_id: string;
};

export function ChatWindow({
  conversationId,
  initialMessages,
}: {
  conversationId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Supabase Realtime — subscribe to new inbound messages for this conversation
  useEffect(() => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.meta_message_id === newMsg.meta_message_id))
              return prev;
            return [...prev, newMsg];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = replyText.trim();
      if (!text || sending) return;

      setSending(true);
      setError(null);

      // Optimistic UI
      const optimisticId = `opt-${Date.now()}`;
      const optimistic: Message = {
        id: optimisticId,
        direction: "outbound",
        text,
        created_at: new Date().toISOString(),
        meta_message_id: optimisticId,
      };
      setMessages((prev) => [...prev, optimistic]);
      setReplyText("");

      const res = await fetch(`/api/messages/${conversationId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Błąd wysyłania" }));
        setError((data as { error?: string }).error ?? "Błąd wysyłania");
        // Roll back optimistic message
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      } else {
        // Realtime will deliver the real persisted message; remove optimistic after short delay
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => !m.id.startsWith("opt-")));
        }, 1200);
      }

      setSending(false);
    },
    [conversationId, replyText, sending],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
        {messages.length === 0 && (
          <div
            className="text-center text-[12.5px] mt-10"
            style={{ color: "var(--muted)" }}
          >
            Brak wiadomości w tej konwersacji.
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[72%] px-4 py-2.5 rounded-2xl text-[13px] leading-[1.5]"
              style={
                msg.direction === "outbound"
                  ? {
                      background: "var(--accent)",
                      color: "white",
                      borderBottomRightRadius: "4px",
                      opacity: msg.id.startsWith("opt-") ? 0.6 : 1,
                    }
                  : {
                      background: "var(--panel-solid)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      borderBottomLeftRadius: "4px",
                    }
              }
            >
              {msg.text && <p className="break-words">{msg.text}</p>}
              <div
                className="text-[10.5px] mt-1 text-right"
                style={{ opacity: 0.55 }}
              >
                {new Date(msg.created_at).toLocaleTimeString("pl-PL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="px-5 py-2 text-[12.5px] shrink-0"
          style={{
            background: "rgba(220,38,38,0.06)",
            color: "var(--danger)",
            borderTop: "1px solid rgba(220,38,38,0.15)",
          }}
        >
          {error}
          <button
            className="ml-2 underline opacity-70"
            onClick={() => setError(null)}
          >
            Zamknij
          </button>
        </div>
      )}

      {/* Reply input */}
      <form
        onSubmit={handleSend}
        className="flex items-end gap-2.5 px-5 py-3.5 shrink-0"
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napisz wiadomość… (Enter = wyślij, Shift+Enter = nowa linia)"
          rows={2}
          className="flex-1 rounded-lg px-3 py-2 text-[13px] outline-none resize-none transition-colors"
          style={{
            background: "var(--ba-4)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !replyText.trim()}
          className="btn-primary px-4 py-2 rounded-lg text-[13px] font-medium shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? "…" : "Wyślij"}
        </button>
      </form>
    </div>
  );
}
