import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const status = new URL(req.url).searchParams.get("status"); // 'pending' | 'decided' | null (both)
  let q = supabase
    .from("fos_decisions")
    .select("*")
    .eq("workspace_id", workspaceId);
  if (status) q = q.eq("status", status);
  // pending: oldest first (show what's been waiting longest); decided: newest first
  if (status === "pending") {
    q = q.order("created_at", { ascending: true });
  } else {
    q = q.order("decided_at", { ascending: false }).limit(30);
  }
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { title, description, author_label, decided_at, status, reason } = body;
  if (!title)
    return NextResponse.json({ error: "title required" }, { status: 400 });
  const decisionStatus = status ?? "decided";
  const { data, error } = await supabase
    .from("fos_decisions")
    .insert({
      workspace_id: workspaceId,
      title,
      description: description ?? null,
      author_label: author_label ?? null,
      decided_at: decided_at ?? new Date().toISOString().split("T")[0],
      status: decisionStatus,
      reason: reason ?? null,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
