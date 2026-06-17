import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { displayName } from "@/lib/display-name";

export async function GET() {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const workspaceId = await getCurrentWorkspaceId();
  return NextResponse.json({ id: user.id, name: displayName(user), workspaceId });
}
