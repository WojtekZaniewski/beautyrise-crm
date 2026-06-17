// Broadcasts a small "who did what" activity event to all clients in a workspace,
// via Supabase Realtime's HTTP broadcast endpoint. Best-effort: never blocks the action.
// Uses the public anon key + URL (no secret), so it is safe even if referenced client-side.

type ActivityPayload = { actor: string | null; message: string };

export async function broadcastActivity(workspaceId: string, payload: ActivityPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !workspaceId) return;
  try {
    await fetch(`${url}/realtime/v1/api/broadcast`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ topic: `activity:${workspaceId}`, event: "fos-activity", payload }],
      }),
    });
  } catch {
    // best-effort — notifications are non-critical
  }
}
