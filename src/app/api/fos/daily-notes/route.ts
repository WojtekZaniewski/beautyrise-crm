import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const date = new URL(req.url).searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_daily_notes")
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
  const { owner_label, date, content } = body;
  if (!owner_label || !date)
    return NextResponse.json({ error: "owner_label and date required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_daily_notes")
    .upsert(
      { workspace_id: workspaceId, owner_label, date, content: content ?? null, updated_at: new Date().toISOString() },
      { onConflict: "workspace_id,owner_label,date" }
    )
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
