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

// Run promises with a max concurrency limit
async function pooled<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await fn(item);
    }
  });
  await Promise.all(workers);
}

export async function syncMessengerConversations(
  supabase: SupabaseClient,
  pageId: string,
  pageToken: string,
  workspaceId: string,
): Promise<{ conversations: number; messages: number }> {
  const client = new MetaClient(pageToken);

  // Fetch up to 3 pages (300 conversations) — keeps us well under 60s
  const convData = await client.paginate<MetaConversation>(
    `${pageId}/conversations`,
    { fields: "id,participants,updated_time,snippet" },
    3,
  );

  if (convData.length === 0) return { conversations: 0, messages: 0 };

  // Build a map: psid → metaConversation (skip entries with no customer)
  type ConvEntry = { customer: MetaParticipant; metaConv: MetaConversation };
  const entries: ConvEntry[] = [];
  for (const metaConv of convData) {
    const customer = metaConv.participants?.data?.find((p) => p.id !== pageId);
    if (customer) entries.push({ customer, metaConv });
  }

  // Batch-check which PSIDs already exist
  const psids = entries.map((e) => e.customer.id);
  const { data: existingRows } = await supabase
    .from("conversations")
    .select("id, sender_psid")
    .eq("workspace_id", workspaceId)
    .eq("page_id", pageId)
    .in("sender_psid", psids);

  const existingMap = new Map((existingRows ?? []).map((r) => [r.sender_psid, r.id]));

  // Separate new vs existing
  const toInsert = entries.filter((e) => !existingMap.has(e.customer.id));
  const toUpdate = entries.filter((e) => existingMap.has(e.customer.id));

  // Update existing conversations (metadata only, no message fetch)
  if (toUpdate.length > 0) {
    await Promise.all(
      toUpdate.map(({ customer, metaConv }) =>
        supabase
          .from("conversations")
          .update({
            sender_name: customer.name ?? null,
            last_message_at: metaConv.updated_time,
            last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingMap.get(customer.id)!),
      ),
    );
  }

  // Insert new conversations in batch
  let newIds: Array<{ id: string; sender_psid: string }> = [];
  if (toInsert.length > 0) {
    const { data: inserted } = await supabase
      .from("conversations")
      .insert(
        toInsert.map(({ customer, metaConv }) => ({
          workspace_id: workspaceId,
          channel: "messenger" as const,
          sender_psid: customer.id,
          page_id: pageId,
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          unread_count: 0,
        })),
      )
      .select("id, sender_psid");
    newIds = inserted ?? [];
  }

  // Fetch messages only for new conversations — in parallel, max 5 at a time
  let msgCount = 0;
  const newEntryMap = new Map(toInsert.map((e) => [e.customer.id, e]));

  await pooled(newIds, 5, async ({ id: conversationId, sender_psid }) => {
    const entry = newEntryMap.get(sender_psid);
    if (!entry) return;

    let messages: MetaMessage[] = [];
    try {
      messages = await client.paginate<MetaMessage>(
        `${entry.metaConv.id}/messages`,
        { fields: "id,message,from,created_time" },
        2, // 200 messages max per conversation
      );
    } catch {
      return;
    }

    if (messages.length === 0) return;

    const rows = messages.map((msg) => ({
      conversation_id: conversationId,
      workspace_id: workspaceId,
      meta_message_id: msg.id,
      direction: (msg.from.id === pageId ? "outbound" : "inbound") as "outbound" | "inbound",
      text: msg.message || null,
      attachments: [],
      created_at: msg.created_time,
    }));

    const { data: ins } = await supabase
      .from("messages")
      .upsert(rows, { onConflict: "meta_message_id", ignoreDuplicates: true })
      .select("id");
    msgCount += ins?.length ?? 0;

    const latest = messages[0];
    if (latest) {
      await supabase
        .from("conversations")
        .update({
          last_message_at: latest.created_time,
          last_message_preview: latest.message?.slice(0, 100) ?? null,
        })
        .eq("id", conversationId);
    }
  });

  return { conversations: newIds.length, messages: msgCount };
}

export async function syncInstagramConversations(
  supabase: SupabaseClient,
  pageId: string,
  pageToken: string,
  workspaceId: string,
  igAccountId?: string | null,
): Promise<{ conversations: number; messages: number }> {
  const resolvedIgAccountId = igAccountId ?? "";
  if (!resolvedIgAccountId) {
    throw new Error(
      "Brak konta Instagram Business powiązanego z tą stroną. Połącz Instagram z Facebook Page w Meta Business Suite.",
    );
  }

  const client = new MetaClient(pageToken);

  const convData = await client.paginate<MetaConversation>(
    `${resolvedIgAccountId}/conversations`,
    { platform: "instagram", fields: "id,participants,updated_time,snippet" },
    3,
  );

  if (convData.length === 0) return { conversations: 0, messages: 0 };

  type ConvEntry = { customer: MetaParticipant; metaConv: MetaConversation };
  const entries: ConvEntry[] = [];
  for (const metaConv of convData) {
    const customer = metaConv.participants?.data?.find((p) => p.id !== resolvedIgAccountId);
    if (customer) entries.push({ customer, metaConv });
  }

  const psids = entries.map((e) => e.customer.id);
  const { data: existingRows } = await supabase
    .from("conversations")
    .select("id, sender_psid")
    .eq("workspace_id", workspaceId)
    .eq("page_id", pageId)
    .in("sender_psid", psids);

  const existingMap = new Map((existingRows ?? []).map((r) => [r.sender_psid, r.id]));

  const toInsert = entries.filter((e) => !existingMap.has(e.customer.id));
  const toUpdate = entries.filter((e) => existingMap.has(e.customer.id));

  if (toUpdate.length > 0) {
    await Promise.all(
      toUpdate.map(({ customer, metaConv }) =>
        supabase
          .from("conversations")
          .update({
            sender_name: customer.name ?? null,
            last_message_at: metaConv.updated_time,
            last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingMap.get(customer.id)!),
      ),
    );
  }

  let newIds: Array<{ id: string; sender_psid: string }> = [];
  if (toInsert.length > 0) {
    const { data: inserted } = await supabase
      .from("conversations")
      .insert(
        toInsert.map(({ customer, metaConv }) => ({
          workspace_id: workspaceId,
          channel: "instagram" as const,
          sender_psid: customer.id,
          page_id: pageId,
          sender_name: customer.name ?? null,
          last_message_at: metaConv.updated_time,
          last_message_preview: metaConv.snippet?.slice(0, 100) ?? null,
          unread_count: 0,
        })),
      )
      .select("id, sender_psid");
    newIds = inserted ?? [];
  }

  let msgCount = 0;
  const newEntryMap = new Map(toInsert.map((e) => [e.customer.id, e]));

  await pooled(newIds, 5, async ({ id: conversationId, sender_psid }) => {
    const entry = newEntryMap.get(sender_psid);
    if (!entry) return;

    let messages: MetaMessage[] = [];
    try {
      messages = await client.paginate<MetaMessage>(
        `${entry.metaConv.id}/messages`,
        { fields: "id,message,from,created_time" },
        2,
      );
    } catch {
      return;
    }

    if (messages.length === 0) return;

    const rows = messages.map((msg) => ({
      conversation_id: conversationId,
      workspace_id: workspaceId,
      meta_message_id: msg.id,
      direction: (msg.from.id === resolvedIgAccountId ? "outbound" : "inbound") as "outbound" | "inbound",
      text: msg.message || null,
      attachments: [],
      created_at: msg.created_time,
    }));

    const { data: ins } = await supabase
      .from("messages")
      .upsert(rows, { onConflict: "meta_message_id", ignoreDuplicates: true })
      .select("id");
    msgCount += ins?.length ?? 0;

    const latest = messages[0];
    if (latest) {
      await supabase
        .from("conversations")
        .update({
          last_message_at: latest.created_time,
          last_message_preview: latest.message?.slice(0, 100) ?? null,
        })
        .eq("id", conversationId);
    }
  });

  return { conversations: newIds.length, messages: msgCount };
}
