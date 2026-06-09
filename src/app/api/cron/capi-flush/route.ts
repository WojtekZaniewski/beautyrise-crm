import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEvents } from "@/lib/meta/graph";
import { resolveCapiConfig } from "@/lib/meta/capi";
import type { ServerEvent } from "@/lib/meta/event";

const BATCH_SIZE = 100;
const MAX_ATTEMPTS = 8;

function nextAttemptAt(attempts: number): string {
  const delayMs = Math.pow(2, Math.min(attempts, 7)) * 60 * 1000;
  return new Date(Date.now() + delayMs).toISOString();
}

export async function GET(req: NextRequest) {
  // Verify cron secret
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date().toISOString();

  // Fetch pending events ready for retry
  const { data: pending, error: fetchError } = await supabase
    .from("capi_events")
    .select("id, workspace_id, event_name, payload, match_keys, attempts")
    .eq("status", "pending")
    .lte("next_attempt_at", now)
    .lt("attempts", MAX_ATTEMPTS)
    .order("next_attempt_at", { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const rows = (pending ?? []) as Array<{
    id: string;
    workspace_id: string;
    event_name: string;
    payload: unknown;
    match_keys: string[] | null;
    attempts: number;
  }>;

  if (rows.length === 0) {
    return NextResponse.json({ processed: 0, sent: 0, retried: 0, failed: 0 });
  }

  let sent = 0;
  let retried = 0;
  let failed = 0;

  // Group by workspace to avoid redundant config lookups
  const workspaceConfigs = new Map<string, Awaited<ReturnType<typeof resolveCapiConfig>>>();

  for (const row of rows) {
    // Resolve config (cached per workspace within this run)
    if (!workspaceConfigs.has(row.workspace_id)) {
      workspaceConfigs.set(row.workspace_id, await resolveCapiConfig(row.workspace_id));
    }
    const config = workspaceConfigs.get(row.workspace_id)!;

    if (!config) {
      // No pixel configured — mark failed so it doesn't loop forever
      await supabase
        .from("capi_events")
        .update({ status: "failed", last_error: "No CAPI config for workspace", attempts: row.attempts + 1 })
        .eq("id", row.id);
      failed++;
      continue;
    }

    const serverEvent = row.payload as ServerEvent;
    const keys = row.match_keys ?? [];

    let result;
    try {
      result = await sendEvents({
        pixelId: config.pixelId,
        accessToken: config.accessToken,
        events: [serverEvent],
        testEventCode: config.testEventCode,
        matchKeys: keys,
      });
    } catch {
      result = { ok: false, matchKeys: keys, error: { message: "Network error", retryable: true } };
    }

    const nextAttempts = row.attempts + 1;
    const isFatal = result.error ? result.error.retryable === false : false;
    const exhausted = nextAttempts >= MAX_ATTEMPTS;

    if (result.ok) {
      await supabase
        .from("capi_events")
        .update({
          status: "sent",
          attempts: nextAttempts,
          fbtrace_id: result.fbtraceId ?? null,
          events_received: result.eventsReceived ?? null,
          last_error: null,
          sent_at: new Date().toISOString(),
          next_attempt_at: null,
        })
        .eq("id", row.id);
      sent++;

      // Mirror to capi_logs
      supabase.from("capi_logs").insert({
        workspace_id: row.workspace_id,
        event_name: row.event_name,
        match_keys: keys,
        ok: true,
        events_received: result.eventsReceived ?? null,
        fbtrace_id: result.fbtraceId ?? null,
        error_message: null,
      }).then(() => {}, () => {});
    } else if (isFatal || exhausted) {
      await supabase
        .from("capi_events")
        .update({
          status: "failed",
          attempts: nextAttempts,
          last_error: result.error?.message ?? "Unknown error",
          next_attempt_at: null,
        })
        .eq("id", row.id);
      failed++;
    } else {
      await supabase
        .from("capi_events")
        .update({
          attempts: nextAttempts,
          last_error: result.error?.message ?? "Unknown error",
          next_attempt_at: nextAttemptAt(nextAttempts),
        })
        .eq("id", row.id);
      retried++;
    }
  }

  return NextResponse.json({
    processed: rows.length,
    sent,
    retried,
    failed,
  });
}
