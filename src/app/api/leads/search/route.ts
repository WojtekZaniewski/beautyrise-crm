import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

// Lead picker for the global composer. Matches name/email/phone.
export async function GET(request: Request) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { searchParams } = new URL(request.url);
  // Strip chars that would break the PostgREST .or() filter grammar.
  const q = (searchParams.get("q") ?? "").trim().replace(/[,()]/g, "");
  const limit = Math.min(Number(searchParams.get("limit")) || 30, 50);

  let query = supabase
    .from("leads")
    .select("id, full_name, phone, email")
    .eq("workspace_id", workspaceId)
    .eq("archived", false)
    .order("full_name")
    .limit(limit);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
