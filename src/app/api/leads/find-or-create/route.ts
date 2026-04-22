import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { email, name } = await req.json();

  if (!email?.trim()) return NextResponse.json({ error: "Brak adresu email" }, { status: 400 });

  const normalizedEmail = email.trim().toLowerCase();

  // Try to find existing lead by email
  const { data: existing } = await supabase
    .from("leads")
    .select("id, full_name, email")
    .eq("workspace_id", workspaceId)
    .ilike("email", normalizedEmail)
    .maybeSingle();

  if (existing) return NextResponse.json(existing);

  // Create minimal lead
  const fullName = name?.trim() || normalizedEmail;
  const { data: created, error } = await supabase
    .from("leads")
    .insert({
      workspace_id: workspaceId,
      full_name: fullName,
      email: normalizedEmail,
      source: "manual",
    })
    .select("id, full_name, email")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(created);
}
