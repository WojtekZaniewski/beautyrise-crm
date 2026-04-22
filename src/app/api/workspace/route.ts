import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId, invalidateWorkspaces } from "@/lib/workspace";

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; slug?: string };
    const workspaceId = await getCurrentWorkspaceId();
    const supabase = createServiceClient();

    const updates: Record<string, string> = {};

    if (body.name !== undefined) {
      const name = body.name.trim();
      if (!name) return NextResponse.json({ error: "Nazwa nie może być pusta" }, { status: 400 });
      updates.name = name;
    }

    if (body.slug !== undefined) {
      const slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      if (!slug) return NextResponse.json({ error: "Slug nie może być pusty" }, { status: 400 });
      // check uniqueness
      const { data: existing } = await supabase
        .from("workspaces")
        .select("id")
        .eq("slug", slug)
        .neq("id", workspaceId)
        .maybeSingle();
      if (existing) return NextResponse.json({ error: "Slug jest już zajęty" }, { status: 409 });
      updates.slug = slug;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Brak zmian" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("workspaces")
      .update(updates)
      .eq("id", workspaceId)
      .select("id, name, slug")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    invalidateWorkspaces();
    return NextResponse.json({ ok: true, workspace: data });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
