import { createClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { NextResponse } from "next/server";

type ImportLead = {
  full_name: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
  stage_id: string | null;
};

export async function POST(request: Request) {
  const { leads } = (await request.json()) as { leads: ImportLead[] };

  if (!Array.isArray(leads) || leads.length === 0) {
    return NextResponse.json({ error: "Brak leadów do importu" }, { status: 400 });
  }

  const supabase = await createClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const rows = leads
    .filter((l) => l.full_name?.trim())
    .map((l) => ({
      workspace_id: WORKSPACE_ID,
      full_name: l.full_name.trim(),
      phone: l.phone?.trim() || null,
      email: l.email?.trim() || null,
      notes: l.notes?.trim() || null,
      stage_id: l.stage_id || null,
      source: "import" as const,
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "Wszystkie wiersze puste" }, { status: 400 });
  }

  const { data: inserted, error } = await supabase
    .from("leads")
    .insert(rows)
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // log events
  const events = (inserted ?? []).map((l) => ({
    lead_id: l.id,
    type: "created" as const,
    payload: { source: "import" },
  }));

  if (events.length > 0) {
    await supabase.from("lead_events").insert(events);
  }

  return NextResponse.json({ imported: inserted?.length ?? 0 });
}
