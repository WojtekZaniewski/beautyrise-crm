import { NextResponse } from "next/server";
import { createServiceClient, createClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { MetaClient, MetaApiError } from "@/lib/meta/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  const { conversationId } = await params;

  let text: string;
  try {
    const body = await request.json() as { text?: unknown };
    text = typeof body.text === "string" ? body.text.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!text) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  // Fetch conversation — must belong to this workspace
  const { data: conv } = await supabase
    .from("conversations")
    .select("id, workspace_id, sender_psid, page_id")
    .eq("id", conversationId)
    .eq("workspace_id", WORKSPACE_ID)
    .single();

  if (!conv) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  // Fetch page access token from integrations
  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .single();

  const pages = (
    integration?.credentials as {
      pages?: Array<{ id: string; access_token: string }>;
    }
  )?.pages ?? [];

  const page = pages.find((p) => p.id === conv.page_id);
  if (!page) {
    return NextResponse.json(
      { error: "Nie znaleziono tokenu strony — sprawdź integrację Meta" },
      { status: 400 },
    );
  }

  // Get current user id for attribution
  const userClient = await createClient();
  const {
    data: { user },
  } = await userClient.auth.getUser();

  try {
    const metaClient = new MetaClient(page.access_token);
    const result = await metaClient.sendMessage(conv.page_id, conv.sender_psid, text);

    // Persist outbound message
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      workspace_id: WORKSPACE_ID,
      meta_message_id: result.message_id,
      direction: "outbound",
      text,
      sent_by_user_id: user?.id ?? null,
    });

    // Update conversation preview
    await supabase
      .from("conversations")
      .update({
        last_message_at: new Date().toISOString(),
        last_message_preview: text.slice(0, 100),
        unread_count: 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    return NextResponse.json({ ok: true, message_id: result.message_id });
  } catch (err) {
    if (err instanceof MetaApiError) {
      // Detect Meta's 24-hour messaging window error
      const is24h =
        err.message.includes("(#100)") ||
        err.message.includes("24") ||
        err.message.includes("outside the allowed window");

      if (is24h) {
        return NextResponse.json(
          { error: "Okno 24h minęło — nie możesz odpowiedzieć przez ten kanał" },
          { status: 422 },
        );
      }
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
