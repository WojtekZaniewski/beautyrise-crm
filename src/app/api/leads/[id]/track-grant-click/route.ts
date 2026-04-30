import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const FORM_URL = "https://conpro.pl/formularz/dotacje/";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();

  // Only record first click per lead
  const { data: existing } = await supabase
    .from("lead_events")
    .select("id")
    .eq("lead_id", id)
    .eq("type", "grant_form_clicked")
    .maybeSingle();

  if (!existing) {
    await supabase.from("lead_events").insert({
      lead_id: id,
      type: "grant_form_clicked",
      payload: { clicked_at: new Date().toISOString() },
    });
  }

  return NextResponse.redirect(FORM_URL);
}
