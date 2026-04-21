import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const workspaceId = await getCurrentWorkspaceId();

    const { data, error } = await supabase
      .from("conversations")
      .select("unread_count")
      .eq("workspace_id", workspaceId)
      .gt("unread_count", 0);

    if (error) {
      return NextResponse.json({ total: 0 });
    }

    const total = (data ?? []).reduce((sum, row) => sum + (row.unread_count ?? 0), 0);
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
