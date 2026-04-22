import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: conv } = await supabase
    .from("sms_conversations")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (!conv) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  await supabase
    .from("sms_conversations")
    .update({ unread_count: 0 })
    .eq("id", id);

  const { data: messages } = await supabase
    .from("sms_messages")
    .select("id, direction, body, status, created_at, sent_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json(messages ?? []);
}
