import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { displayName } from "@/lib/display-name";

// Członkowie aktywnego workspace — używane przez Founder OS do stałych kolumn osób
// (centrum zespołu: każdy członek ma kolumnę, nawet bez zadań). Nazwy liczone tym
// samym displayName co owner_label zadań, więc kolumny pasują do przypisań.
export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const { data: membersRaw, error } = await supabase
    .from("workspace_members")
    .select("user_id, role")
    .eq("workspace_id", workspaceId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const members = await Promise.all(
    (membersRaw ?? []).map(async (m) => {
      try {
        const res = await fetch(`${supabaseUrl}/auth/v1/admin/users/${m.user_id}`, {
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        });
        if (res.ok) {
          const u = (await res.json()) as {
            email?: string;
            user_metadata?: { full_name?: string; name?: string };
          };
          return { id: m.user_id, role: m.role, name: displayName(u) };
        }
      } catch {
        // ignore — fall through to null name (odfiltrowane niżej)
      }
      return { id: m.user_id, role: m.role, name: null as string | null };
    }),
  );

  return NextResponse.json({ data: members.filter((m) => m.name) });
}
