"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export type TeamMessage = {
  id: string;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  text: string;
  created_at: string;
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
  return (
    d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" }) +
    " " +
    d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })
  );
}

function displayName(msg: TeamMessage) {
  if (msg.user_name) return msg.user_name;
  if (msg.user_email) return msg.user_email.split("@")[0];
  return "Nieznany";
}

function avatarColor(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 55%)`;
}

export function TeamChatWindow({
  initialMessages,
  workspaceId,
  currentUserId,
}: {
  initialMessages: TeamMessage[];
  workspaceId: string;
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<TeamMessage[]>(initialMessages);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`team-chat:${workspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "team_messages",
          filter: `workspace_id=eq.${workspaceId}`,
        },
        (payload) => {
          const m = payload.new as TeamMessage;
          setMessages((prev) => {
            if (prev.some((x) => x.id === m.id)) return prev;
            return [...prev, m];
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [workspaceId, supabase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      setSending(true);
      setError(null);

      const optimisticId = `opt-${Date.now()}`;
      const optimistic: TeamMessage = {
        id: optimisticId,
        user_id: currentUserId,
        user_email: null,
        user_name: null,
        text: trimmed,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimistic]);
      setText("");

      const res = await fetch("/api/team-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json().catch(() => ({} as { error?: string; message?: TeamMessage }));

      if (!res.ok) {
        setError((data as { error?: string }).error ?? "Błąd wysyłania");
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      } else {
        const saved = (data as { message?: TeamMessage }).message;
        if (saved) {
          setMessages((prev) => {
            const withoutOptimistic = prev.filter((m) => m.id !== optimisticId);
            if (withoutOptimistic.some((m) => m.id === saved.id)) return withoutOptimistic;
            return [...withoutOptimistic, saved];
          });
        }
      }
      setSending(false);
    },
    [text, sending, currentUserId],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(e as unknown as React.FormEvent);
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-4">
        {messages.length === 0 && (
          <div
            className="text-center text-[13px] mt-10"
            style={{ color: "var(--muted)" }}
          >
            Brak wiadomości. Napisz pierwszą!
          </div>
        )}
        {messages.map((msg, i) => {
          const isMine = msg.user_id === currentUserId;
          const prev = messages[i - 1];
          const sameAuthorAsPrev =
            prev &&
            prev.user_id === msg.user_id &&
            new Date(msg.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isMine ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11.5px] font-semibold text-white"
                style={{
                  background: avatarColor(msg.user_id),
                  visibility: sameAuthorAsPrev ? "hidden" : "visible",
                }}
              >
                {displayName(msg)[0]?.toUpperCase()}
              </div>

              <div className={`max-w-[68%] flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                {!sameAuthorAsPrev && (
                  <div
                    className="text-[11.5px] mb-1 px-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {displayName(msg)} · {formatTime(msg.created_at)}
                  </div>
                )}
                <div
                  className="px-4 py-2.5 rounded-2xl text-[13px] leading-[1.5] whitespace-pre-wrap break-words"
                  style={
                    isMine
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
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div
          className="px-7 py-2 text-[12.5px] shrink-0"
          style={{
            background: "rgba(0,0,0,0.06)",
            color: "var(--danger)",
            borderTop: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          {error}
          <button className="ml-2 underline opacity-70" onClick={() => setError(null)}>
            Zamknij
          </button>
        </div>
      )}

      <form
        onSubmit={send}
        className="flex items-end gap-2.5 px-7 py-4 shrink-0"
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Napisz wiadomość… (Enter = wyślij, Shift+Enter = nowa linia)"
          rows={2}
          className="flex-1 rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
          style={{
            background: "var(--ba-4)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="btn-primary px-4 py-2 rounded-lg text-[13px] font-medium shrink-0 disabled:opacity-40"
        >
          {sending ? "…" : "Wyślij"}
        </button>
      </form>
    </div>
  );
}
