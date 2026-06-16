import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type AuthUserish = { email?: string | null; user_metadata?: { full_name?: string; name?: string } | null };

export function displayName(u: AuthUserish): string {
  const meta = u.user_metadata ?? {};
  const n = (meta.full_name || meta.name || "").trim();
  if (n) return n;
  const local = (u.email ?? "").split("@")[0] || "Użytkownik";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export async function GET() {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ id: user.id, name: displayName(user) });
}
