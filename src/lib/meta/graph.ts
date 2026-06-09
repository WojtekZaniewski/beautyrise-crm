import { classifyGraphError, type GraphError } from "./errors";
import type { ServerEvent } from "./event";

const API_VERSION = "v21.0";
const BASE = `https://graph.facebook.com/${API_VERSION}`;
const TIMEOUT_MS = 8_000;
const PARTNER_AGENT = "beautyrise-crm-1.0";

export interface SendResult {
  ok: boolean;
  eventsReceived?: number;
  fbtraceId?: string;
  messages?: unknown[];
  matchKeys: string[];
  error?: GraphError;
  raw?: unknown;
}

interface GraphSuccess {
  events_received?: number;
  messages?: unknown[];
  fbtrace_id?: string;
}

export async function sendEvents(opts: {
  pixelId: string;
  accessToken: string;
  events: ServerEvent[];
  testEventCode?: string | null;
  matchKeys?: string[];
}): Promise<SendResult> {
  const { pixelId, accessToken, events, testEventCode, matchKeys = [] } = opts;

  const url = new URL(`${BASE}/${pixelId}/events`);
  url.searchParams.set("access_token", accessToken);

  const body: Record<string, unknown> = { data: events, partner_agent: PARTNER_AGENT };
  if (testEventCode) body.test_event_code = testEventCode;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => null)) as unknown;

    if (!res.ok) {
      return { ok: false, matchKeys, error: classifyGraphError(res.status, json), raw: json };
    }

    const data = json as GraphSuccess | null;
    return {
      ok: true,
      eventsReceived: data?.events_received,
      fbtraceId: data?.fbtrace_id,
      messages: data?.messages,
      matchKeys,
      raw: json,
    };
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return {
      ok: false,
      matchKeys,
      error: {
        message: aborted ? "Graph request timed out" : String((e as Error)?.message ?? e),
        retryable: true,
      },
    };
  } finally {
    clearTimeout(timer);
  }
}
