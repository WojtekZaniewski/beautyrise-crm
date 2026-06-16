import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const date = new URL(req.url).searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_founder_journal")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("date", date);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { author_label, date, went_well, problem, biggest_win } = body;
  if (!author_label || !date)
    return NextResponse.json({ error: "author_label and date required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_founder_journal")
    .upsert(
      {
        workspace_id: workspaceId,
        author_label,
        date,
        went_well: went_well ?? null,
        problem: problem ?? null,
        biggest_win: biggest_win ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workspace_id,author_label,date" }
    )
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
