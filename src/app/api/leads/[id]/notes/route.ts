import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: lead } = await supabase
    .from("leads")
    .select("id, full_name")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono leada" }, { status: 404 });

  const { data: notes } = await supabase
    .from("lead_events")
    .select("id, payload, created_at")
    .eq("lead_id", id)
    .eq("type", "note")
    .order("created_at", { ascending: false });

  return NextResponse.json({ lead, notes: notes ?? [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { text, context_type, campaign_id, campaign_name } = await req.json();

  if (!text?.trim()) return NextResponse.json({ error: "Brak treści notatki" }, { status: 400 });

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono leada" }, { status: 404 });

  const payload: Record<string, string> = { text: text.trim(), context_type: context_type || "general" };
  if (campaign_id) payload.campaign_id = campaign_id;
  if (campaign_name) payload.campaign_name = campaign_name;

  const { data, error } = await supabase
    .from("lead_events")
    .insert({ lead_id: id, type: "note", payload })
    .select("id, payload, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) return NextResponse.json({ error: "Brak eventId" }, { status: 400 });

  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!lead) return NextResponse.json({ error: "Nie znaleziono leada" }, { status: 404 });

  const { error } = await supabase
    .from("lead_events")
    .delete()
    .eq("id", eventId)
    .eq("lead_id", id)
    .eq("type", "note");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
