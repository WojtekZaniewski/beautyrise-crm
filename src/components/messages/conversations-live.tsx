"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ConversationsList, type Conversation } from "./conversations-list";

export function ConversationsLive({
  initialConversations,
  workspaceId,
}: {
  initialConversations: Conversation[];
  workspaceId: string;
}) {
  const [conversations, setConversations] = useState<Conversation[]>(
    [...initialConversations].sort(
      (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime(),
    ),
  );
  const supabase = createClient();

  // Request browser notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Supabase Realtime — subscribe to conversation inserts + updates for this workspace
  useEffect(() => {
    const channel = supabase
      .channel(`convs:${workspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `workspace_id=eq.${workspaceId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const conv = payload.new as Conversation;
            setConversations((prev) => {
              if (prev.some((c) => c.id === conv.id)) return prev;
              const next = [conv, ...prev];
              return next;
            });
            if (
              "Notification" in window &&
              Notification.permission === "granted" &&
              document.visibilityState !== "visible"
            ) {
              new Notification(conv.sender_name ?? "Nowa wiadomość", {
                body: conv.last_message_preview ?? "",
                icon: "/favicon.ico",
              });
            }
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as Conversation;
            setConversations((prev) => {
              const next = prev.map((c) => (c.id === updated.id ? updated : c));
              return [...next].sort(
                (a, b) =>
                  new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime(),
              );
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workspaceId, supabase]);

  return <ConversationsList conversations={conversations} />;
}
