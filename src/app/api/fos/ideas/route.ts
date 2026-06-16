import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const status = new URL(req.url).searchParams.get("status");
  let q = supabase
    .from("fos_ideas")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data: { user } } = await supabase.auth.getUser();
  const body = await req.json();
  const { title, description, author_label } = body;
  if (!title) return NextResponse.json({ error: "title required" }, { status: 400 });
  const { data, error } = await supabase
    .from("fos_ideas")
    .insert({
      workspace_id: workspaceId,
      author_id: user?.id ?? null,
      author_label: author_label ?? user?.email ?? null,
      title,
      description: description ?? null,
      status: "backlog",
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
