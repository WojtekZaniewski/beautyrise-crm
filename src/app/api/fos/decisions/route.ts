import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data, error } = await supabase
    .from("fos_decisions")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("decided_at", { ascending: false })
    .limit(30);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { title, description, author_label, decided_at } = body;
  if (!title || !decided_at)
    return NextResponse.json({ error: "title and decided_at required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_decisions")
    .insert({ workspace_id: workspaceId, title, description: description ?? null, author_label: author_label ?? null, decided_at })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
