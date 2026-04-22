import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data } = await supabase
    .from("integrations")
    .select("id, credentials, status, connected_at")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .maybeSingle();

  if (!data) return NextResponse.json({ configured: false });

  const creds = data.credentials as Record<string, string> | null;
  return NextResponse.json({
    configured: data.status === "connected",
    status: data.status,
    connected_at: data.connected_at,
    apikey_hint: creds?.apikey ? `${creds.apikey.slice(0, 6)}…` : null,
  });
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const { apikey } = await req.json();

  if (!apikey?.trim()) {
    return NextResponse.json({ error: "Brak API Key" }, { status: 400 });
  }

  // Verify the key by sending a test ping to SMSMobileAPI
  let verified = false;
  try {
    const params = new URLSearchParams({ apikey: apikey.trim() });
    const res = await fetch(`https://api.smsmobileapi.com/verifytoken?${params}`, {
      signal: AbortSignal.timeout(8000),
    });
    const text = await res.text();
    // SMSMobileAPI returns status=OK or similar
    verified = res.ok && !text.toLowerCase().includes("error") && !text.toLowerCase().includes("invalid");
  } catch {
    // Network error or timeout — still save but mark as unverified
  }

  const { data: existing } = await supabase
    .from("integrations")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway")
    .maybeSingle();

  const payload = {
    workspace_id: workspaceId,
    type: "sms_gateway" as const,
    credentials: { apikey: apikey.trim() },
    status: "connected",
    connected_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    await supabase.from("integrations").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("integrations").insert(payload);
  }

  return NextResponse.json({ ok: true, verified });
}

export async function DELETE() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  await supabase
    .from("integrations")
    .update({ status: "disconnected", credentials: {}, updated_at: new Date().toISOString() })
    .eq("workspace_id", workspaceId)
    .eq("type", "sms_gateway");

  return NextResponse.json({ ok: true });
}
