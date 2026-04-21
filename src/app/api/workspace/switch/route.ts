import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/server";
import { workspaceCookieConfig } from "@/lib/workspace";

export async function POST(request: Request) {
  const { workspace_id } = (await request.json()) as { workspace_id: string };

  if (!workspace_id) {
    return NextResponse.json({ error: "workspace_id required" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("workspaces")
    .select("id")
    .eq("id", workspace_id)
    .maybeSingle();

  if (!data) {
    return NextResponse.json({ error: "Workspace nie istnieje" }, { status: 404 });
  }

  const cfg = workspaceCookieConfig();
  const cookieStore = await cookies();
  cookieStore.set(cfg.name, workspace_id, cfg);

  return NextResponse.json({ ok: true });
}
