import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { encryptPassword, decryptPassword } from "@/lib/email/crypto";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data, error } = await supabase
    .from("email_accounts")
    .select("id, email, display_name, purpose, is_active, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { email, display_name, purpose, password } = body;
  if (!email || !password) return NextResponse.json({ error: "Brak danych" }, { status: 400 });

  const { data, error } = await supabase
    .from("email_accounts")
    .insert({
      workspace_id: workspaceId,
      email,
      display_name: display_name ?? email,
      purpose: purpose ?? "general",
      password_enc: encryptPassword(password),
    })
    .select("id, email, display_name, purpose, is_active, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Brak id" }, { status: 400 });

  const { error } = await supabase
    .from("email_accounts")
    .delete()
    .eq("id", id)
    .eq("workspace_id", workspaceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function getAccountWithPassword(id: string) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { data } = await supabase
    .from("email_accounts")
    .select("*")
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .single();
  if (!data) return null;
  return {
    ...data,
    password: decryptPassword(data.password_enc),
  };
}
