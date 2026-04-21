import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data, error } = await supabase
    .from("email_outreach_campaigns")
    .select(`
      id, name, subject, status, total_sent, sent_at, created_at,
      account_id,
      email_accounts ( email, display_name ),
      email_outreach_recipients ( id, status, opened_at, clicked_at, replied_at )
    `)
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { name, subject, body_html, body_text, account_id } = body;

  if (!name || !subject || !account_id) {
    return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("email_outreach_campaigns")
    .insert({
      workspace_id: workspaceId,
      account_id,
      name,
      subject,
      body_html: body_html ?? "",
      body_text: body_text ?? "",
      status: "draft",
    })
    .select("id, name, subject, status, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
