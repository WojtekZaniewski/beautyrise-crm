import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { email, name, conversation_id } = await req.json();

  if (!email?.trim() && !name?.trim()) {
    return NextResponse.json({ error: "Brak adresu email lub nazwy" }, { status: 400 });
  }

  let existing = null;

  if (email?.trim()) {
    const normalizedEmail = email.trim().toLowerCase();
    const { data } = await supabase
      .from("leads")
      .select("id, full_name, email")
      .eq("workspace_id", workspaceId)
      .ilike("email", normalizedEmail)
      .maybeSingle();
    existing = data;

    if (!existing) {
      const fullName = name?.trim() || normalizedEmail;
      const { data: created, error } = await supabase
        .from("leads")
        .insert({ workspace_id: workspaceId, full_name: fullName, email: normalizedEmail, source: "manual" })
        .select("id, full_name, email")
        .single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      existing = created;
    }
  } else {
    // No email — create a new lead from name only (Messenger/Instagram contacts)
    const fullName = name!.trim();
    const { data: created, error } = await supabase
      .from("leads")
      .insert({ workspace_id: workspaceId, full_name: fullName, source: "manual" })
      .select("id, full_name, email")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    existing = created;
  }

  // Link the lead to the conversation so future views resolve instantly
  if (conversation_id && existing) {
    await supabase
      .from("conversations")
      .update({ lead_id: existing.id })
      .eq("id", conversation_id)
      .eq("workspace_id", workspaceId);
  }

  return NextResponse.json(existing);
}
