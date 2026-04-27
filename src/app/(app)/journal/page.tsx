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
      .select("id, date, content, created_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .gte("date", since)
      .order("created_at", { ascending: true }),
    supabase
      .from("todo_items")
      .select("id, date, text, completed, waiting, completed_at")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .gte("date", since)
      .order("created_at", { ascending: true }),
  ]);

  type NoteRow = { id: string; date: string; content: string; created_at: string };
  type TodoRow = { id: string; date: string; text: string; completed: boolean; waiting: boolean; completed_at: string | null };
  type DayEntry = { date: string; notes: NoteRow[]; todos: TodoRow[] };

  const map = new Map<string, DayEntry>();
  for (const n of (notes ?? []) as NoteRow[]) {
    if (!map.has(n.date)) map.set(n.date, { date: n.date, notes: [], todos: [] });
    map.get(n.date)!.notes.push(n);
  }
  for (const t of (todos ?? []) as TodoRow[]) {
    if (!map.has(t.date)) map.set(t.date, { date: t.date, notes: [], todos: [] });
    map.get(t.date)!.todos.push(t);
  }

  const days = Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 max-w-3xl mx-auto anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Dziennik</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Archiwum notatek i zadań z ostatnich 90 dni.
        </p>
      </div>
      <JournalClient initialDays={days} />
    </div>
  );
}

