import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  // Verify campaign belongs to workspace
  const { data: campaign } = await supabase
    .from("email_outreach_campaigns")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!campaign) return NextResponse.json({ error: "Nie znaleziono kampanii" }, { status: 404 });

  const { data, error } = await supabase
    .from("email_outreach_recipients")
    .select("*")
    .eq("campaign_id", id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: campaign } = await supabase
    .from("email_outreach_campaigns")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!campaign) return NextResponse.json({ error: "Nie znaleziono kampanii" }, { status: 404 });

  const body = await req.json();
  const recipients: Array<{ email: string; name?: string; lead_id?: string }> = body.recipients ?? [body];

  const rows = recipients.map((r) => ({
    campaign_id: id,
    email: r.email,
    name: r.name ?? null,
    lead_id: r.lead_id ?? null,
    status: "pending",
  }));

  const { data, error } = await supabase
    .from("email_outreach_recipients")
    .insert(rows)
    .select("id, email, name, status");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: campaign } = await supabase
    .from("email_outreach_campaigns")
    .select("id")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();

  if (!campaign) return NextResponse.json({ error: "Nie znaleziono kampanii" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const recipientId = searchParams.get("recipient_id");

  if (!recipientId) return NextResponse.json({ error: "Brak recipient_id" }, { status: 400 });

  const { error } = await supabase
    .from("email_outreach_recipients")
    .delete()
    .eq("id", recipientId)
    .eq("campaign_id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
