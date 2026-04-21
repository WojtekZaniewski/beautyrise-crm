import { MetaClient } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";

type MetaParticipant = { id: string; name: string; email?: string };

type MetaConversation = {
  id: string;
  participants?: { data: MetaParticipant[] };
  updated_time: string;
  snippet?: string;
};

type MetaMessage = {
  id: string;
  message: string;
  from: { id: string; name: string };
  created_time: string;
};

/**
 * Sync existing Messenger conversations for a page into the conversations/messages tables.
 * Idempotent: skips conversations and messages that already exist (upsert).
 */
export async function syncMessengerConversations(
  supabase: SupabaseClient,
  pageId: string,
  pageToken: string,
  workspaceId: string,
): Promise<{ conversations: number; messages: number }> {
  const client = new MetaClient(pageToken);

  const convData = await client.paginate<MetaConversation>(
    `${pageId}/conversations`,
    { fields: "id,participants,updated_time,snippet" },
    20, // max 20 pages × 100 = 2 000 konwersacji
  );

  let convCount = 0;
  let msgCount = 0;

  for (const metaConv of convData) {
    const customer = metaConv.participants?.data?.find((p) => p.id !== pageId);
    if (!customer) continue;

    // Upsert conversation
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("sender_psid", customer.id)
      .eq("page_id", pageId)
      .maybeSingle();

    let conversationId: string;

    if (existing) {
      conversationId = existing.id;
      await supabase
        .from("conversations")
        .update({
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId);
    } else {
      const { data: created } = await supabase
        .from("conversations")
        .insert({
          workspace_id: workspaceId,
          channel: "messenger" as const,
          sender_psid: customer.id,
          page_id: pageId,
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          unread_count: 0,
        })
        .select("id")
        .single();

      if (!created) continue;
      conversationId = created.id;
      convCount++;
    }

    // Fetch messages for this conversation (Meta returns newest-first)
    let messages: MetaMessage[] = [];
    try {
      messages = await client.paginate<MetaMessage>(
        `${metaConv.id}/messages`,
        { fields: "id,message,from,created_time" },
        5, // max 500 messages per conversation
      );
    } catch {
      // Permission not granted for this conversation — skip messages
      continue;
    }

    if (messages.length === 0) continue;

    const rows = messages.map((msg) => ({
      conversation_id: conversationId,
      workspace_id: workspaceId,
      meta_message_id: msg.id,
      direction: (msg.from.id === pageId ? "outbound" : "inbound") as
        | "outbound"
        | "inbound",
      text: msg.message || null,
      attachments: [],
      created_at: msg.created_time,
    }));

    const { data: inserted } = await supabase
      .from("messages")
      .upsert(rows, { onConflict: "meta_message_id", ignoreDuplicates: true })
      .select("id");

    msgCount += inserted?.length ?? 0;

    // Update conversation with latest message preview
    const latestMsg = messages[0]; // newest first
    if (latestMsg) {
      await supabase
        .from("conversations")
        .update({
          last_message_at: latestMsg.created_time,
          last_message_preview: latestMsg.message?.slice(0, 100) ?? null,
        })
        .eq("id", conversationId);
    }
  }

  return { conversations: convCount, messages: msgCount };
}

/**
 * Sync Instagram DM conversations for a page.
 * Requires instagram_manage_messages scope AND the page must have a linked Instagram Business Account.
 */
export async function syncInstagramConversations(
  supabase: SupabaseClient,
  pageId: string,
  pageToken: string,
  workspaceId: string,
): Promise<{ conversations: number; messages: number }> {
  const client = new MetaClient(pageToken);

  // Resolve Instagram Business Account ID from the page
  const pageData = await client.get<{
    instagram_business_account?: { id: string };
  }>(`${pageId}`, { fields: "instagram_business_account" });

  const igAccountId = pageData.instagram_business_account?.id ?? "";
  if (!igAccountId) {
    throw new Error(
      "Brak konta Instagram Business powiązanego z tą stroną. Połącz Instagram z Facebook Page w Meta Business Suite.",
    );
  }

  const convData = await client.paginate<MetaConversation>(
    `${igAccountId}/conversations`,
    { platform: "instagram", fields: "id,participants,updated_time,snippet" },
    20,
  );

  let convCount = 0;
  let msgCount = 0;

  for (const metaConv of convData) {
    const customer = metaConv.participants?.data?.find((p) => p.id !== igAccountId);
    if (!customer) continue;

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("sender_psid", customer.id)
      .eq("page_id", pageId)
      .maybeSingle();

    let conversationId: string;

    if (existing) {
      conversationId = existing.id;
      await supabase
        .from("conversations")
        .update({
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId);
    } else {
      const { data: created } = await supabase
        .from("conversations")
        .insert({
          workspace_id: workspaceId,
          channel: "instagram" as const,
          sender_psid: customer.id,
          page_id: pageId,
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          unread_count: 0,
        })
        .select("id")
        .single();

      if (!created) continue;
      conversationId = created.id;
      convCount++;
    }

    let messages: MetaMessage[] = [];
    try {
      messages = await client.paginate<MetaMessage>(
        `${metaConv.id}/messages`,
        { fields: "id,message,from,created_time" },
        5,
      );
    } catch {
      continue;
    }

    if (messages.length === 0) continue;

    const rows = messages.map((msg) => ({
      conversation_id: conversationId,
      workspace_id: workspaceId,
      meta_message_id: msg.id,
      direction: (msg.from.id === igAccountId ? "outbound" : "inbound") as
        | "outbound"
        | "inbound",
      text: msg.message || null,
      attachments: [],
      created_at: msg.created_time,
    }));

    const { data: inserted } = await supabase
      .from("messages")
      .upsert(rows, { onConflict: "meta_message_id", ignoreDuplicates: true })
      .select("id");

    msgCount += inserted?.length ?? 0;

    const latestMsg = messages[0];
    if (latestMsg) {
      await supabase
        .from("conversations")
        .update({
          last_message_at: latestMsg.created_time,
          last_message_preview: latestMsg.message?.slice(0, 100) ?? null,
        })
        .eq("id", conversationId);
    }
  }

  return { conversations: convCount, messages: msgCount };
}
