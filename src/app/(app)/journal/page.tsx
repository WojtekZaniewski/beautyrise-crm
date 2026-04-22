import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { JournalClient } from "./journal-client";

export default async function JournalPage() {
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return null;

  const workspaceId = await getCurrentWorkspaceId();
  const supabase = createServiceClient();
  const since = new Date(Date.now() - 90 * 86400000).toISOString().split("T")[0];

  const [{ data: notes }, { data: todos }] = await Promise.all([
    supabase
      .from("journal_notes")
      .select("date, content")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .gte("date", since)
      .order("date", { ascending: false }),
    supabase
      .from("todo_items")
      .select("id, date, text, completed, completed_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .gte("date", since)
      .order("created_at", { ascending: true }),
  ]);

  // Group by date
  const map = new Map<string, { date: string; content: string; todos: typeof todos }>();
  for (const n of notes ?? []) {
    if (!map.has(n.date)) map.set(n.date, { date: n.date, content: "", todos: [] });
    map.get(n.date)!.content = n.content;
  }
  for (const t of todos ?? []) {
    if (!map.has(t.date)) map.set(t.date, { date: t.date, content: "", todos: [] });
    map.get(t.date)!.todos!.push(t);
  }

  const days = Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-8 py-8 max-w-3xl mx-auto anim-page">
      <div className="heat-glow -mx-8 -mt-8 px-8 pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Dziennik</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Historia notatek i zadań z ostatnich 90 dni.
        </p>
      </div>
      <JournalClient initialDays={days} />
    </div>
  );
}
