import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();

  const { full_name, phone, email, nip, source, stage_id, notes } = body;

  if (!full_name?.trim()) {
    return NextResponse.json({ error: "Imię i nazwisko jest wymagane" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      workspace_id: workspaceId,
      full_name: full_name.trim(),
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      nip: nip?.trim() || null,
      source: source || "manual",
      stage_id: stage_id || null,
      notes: notes?.trim() || null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("lead_events").insert({
    lead_id: data.id,
    type: "created",
    payload: { source: source || "manual" },
  });

  return NextResponse.json({ id: data.id });
}
