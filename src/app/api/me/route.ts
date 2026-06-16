import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { displayName } from "@/lib/display-name";

export async function GET() {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ id: user.id, name: displayName(user) });
}
