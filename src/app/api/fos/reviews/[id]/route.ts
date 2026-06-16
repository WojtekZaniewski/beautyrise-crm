import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { isWeeklyReviewDay, WEEKLY_REVIEW_LOCKED_MESSAGE } from "@/lib/fos-types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Twarda blokada: edycja weekly review możliwa tylko w niedzielę (Europe/Warsaw).
  if (!isWeeklyReviewDay())
    return NextResponse.json(
      { error: WEEKLY_REVIEW_LOCKED_MESSAGE, code: "NOT_SUNDAY" },
      { status: 403 },
    );

  const { id } = await params;
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json();
  const { done_this_week, not_done, blockers, focus_next_week } = body;
  const { error } = await supabase
    .from("fos_weekly_reviews")
    .update({
      done_this_week,
      not_done,
      blockers,
      focus_next_week,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("workspace_id", workspaceId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
