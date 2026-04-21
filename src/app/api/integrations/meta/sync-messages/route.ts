import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import {
  syncMessengerConversations,
  syncInstagramConversations,
} from "@/lib/meta/sync-messages";

export const maxDuration = 60;

export async function POST() {
  try {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: integration } = await supabase
    .from("integrations")
    .select("credentials")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("type", "meta_ads")
    .eq("status", "connected")
    .single();

  if (!integration) {
    return NextResponse.json(
      { error: "Brak połączonej integracji Meta" },
      { status: 400 },
    );
  }

  const creds = integration.credentials as {
    pages?: Array<{ id: string; access_token: string; name: string }>;
  };

  const pages = creds.pages ?? [];
  if (pages.length === 0) {
    return NextResponse.json(
      { error: "Brak stron Facebook w integracji — połącz ponownie" },
      { status: 400 },
    );
  }

  let totalConversations = 0;
  let totalMessages = 0;
  const errors: string[] = [];

  await Promise.allSettled(
    pages.map(async (page) => {
      // Messenger
      try {
        const r = await syncMessengerConversations(
          supabase,
          page.id,
          page.access_token,
          WORKSPACE_ID,
        );
        totalConversations += r.conversations;
        totalMessages += r.messages;
      } catch (e) {
        errors.push(
          `Messenger [${page.name}]: ${e instanceof Error ? e.message : String(e)}`,
        );
      }

      // Instagram DM (gracefully skipped if scope not granted)
      try {
        const r = await syncInstagramConversations(
          supabase,
          page.id,
          page.access_token,
          WORKSPACE_ID,
        );
        totalConversations += r.conversations;
        totalMessages += r.messages;
      } catch (e) {
        // Silent — Instagram scope often not available
        errors.push(
          `Instagram [${page.name}]: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }),
  );

  return NextResponse.json({
    ok: true,
    conversations: totalConversations,
    messages: totalMessages,
    errors,
  });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
