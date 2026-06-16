import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import type { FosActivityItem } from "@/lib/fos-types";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const since = new Date(Date.now() - 14 * 86400000).toISOString();

  const [completedRes, ideasRes, reviewsRes, leadsRes] = await Promise.all([
    supabase
      .from("fos_weekly_priorities")
      .select("id, title, owner_label, completed_at")
      .eq("workspace_id", workspaceId)
      .eq("status", "completed")
      .gte("completed_at", since)
      .order("completed_at", { ascending: false })
      .limit(20),
    supabase
      .from("fos_ideas")
      .select("id, title, author_label, created_at")
      .eq("workspace_id", workspaceId)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("fos_weekly_reviews")
      .select("id, user_label, week_start, created_at")
      .eq("workspace_id", workspaceId)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("leads")
      .select("id, full_name, created_at")
      .eq("workspace_id", workspaceId)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const items: FosActivityItem[] = [
    ...(completedRes.data ?? []).map((p) => ({
      id: `priority-${p.id}`,
      type: "priority_completed" as const,
      label: `Ukończono: ${p.title}`,
      actor: p.owner_label,
      created_at: p.completed_at ?? "",
    })),
    ...(ideasRes.data ?? []).map((i) => ({
      id: `idea-${i.id}`,
      type: "idea_added" as const,
      label: `Nowy pomysł: ${i.title}`,
      actor: i.author_label,
      created_at: i.created_at,
    })),
    ...(reviewsRes.data ?? []).map((r) => ({
      id: `review-${r.id}`,
      type: "review_submitted" as const,
      label: `Weekly review: tydzień ${r.week_start}`,
      actor: r.user_label,
      created_at: r.created_at,
    })),
    ...(leadsRes.data ?? []).map((l) => ({
      id: `lead-${l.id}`,
      type: "lead_added" as const,
      label: `Nowy lead: ${l.full_name}`,
      actor: null,
      created_at: l.created_at,
    })),
  ];

  items.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return NextResponse.json({ data: items.slice(0, 30) });
}
