const API_VERSION = "v21.0";
const BASE = `https://graph.facebook.com/${API_VERSION}`;
const FETCH_TIMEOUT_MS = 15_000;
const RETRY_DELAY_MS = 500;

export class MetaApiError extends Error {
  constructor(message: string, public status: number, public body: unknown) {
    super(message);
  }
}

async function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export class MetaClient {
  constructor(private accessToken: string) {}

  private url(path: string, params: Record<string, string | number> = {}) {
    const clean = path.startsWith("/") ? path.slice(1) : path;
    const u = new URL(`${BASE}/${clean}`);
    u.searchParams.set("access_token", this.accessToken);
    for (const [k, v] of Object.entries(params)) {
      u.searchParams.set(k, String(v));
    }
    return u.toString();
  }

  async get<T = unknown>(
    path: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    const url = this.url(path, params);
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      if (res.status === 429 || res.status >= 500) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        const retry = await fetchWithTimeout(url);
        if (retry.ok) return retry.json() as Promise<T>;
      }
      const msg = (body as { error?: { message?: string } })?.error?.message ?? JSON.stringify(body);
      throw new MetaApiError(`Meta API ${res.status}: ${msg}`, res.status, body);
    }
    return res.json() as Promise<T>;
  }

  async post<T = unknown>(
    path: string,
    body: Record<string, unknown>,
  ): Promise<T> {
    const clean = path.startsWith("/") ? path.slice(1) : path;
    const u = new URL(`${BASE}/${clean}`);
    u.searchParams.set("access_token", this.accessToken);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(u.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const msg =
          (errBody as { error?: { message?: string } })?.error?.message ??
          JSON.stringify(errBody);
        throw new MetaApiError(`Meta API POST ${res.status}: ${msg}`, res.status, errBody);
      }
      return res.json() as Promise<T>;
    } finally {
      clearTimeout(timer);
    }
  }

  async sendMessage(
    pageId: string,
    recipientPsid: string,
    text: string,
  ): Promise<{ message_id: string; recipient_id: string }> {
    return this.post(`${pageId}/messages`, {
      recipient: { id: recipientPsid },
      message: { text },
      messaging_type: "RESPONSE",
    });
  }

  async paginate<T>(
    path: string,
    params: Record<string, string | number> = {},
    maxPages = 10,
  ): Promise<T[]> {
    const results: T[] = [];
    let next: string | null = this.url(path, { ...params, limit: 100 });
    let pages = 0;

    while (next && pages < maxPages) {
      const res: Response = await fetchWithTimeout(next);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = (body as { error?: { message?: string } })?.error?.message ?? JSON.stringify(body);
        throw new MetaApiError(`Meta API ${res.status}: ${msg}`, res.status, body);
      }
      const data: { data: T[]; paging?: { next?: string } } = await res.json();
      results.push(...(data.data ?? []));
      next = data.paging?.next ?? null;
      pages++;
    }

    return results;
  }
}

// ─── OAuth helpers ────────────────────────────────────────────────────────────

type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
};

export async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = process.env.META_REDIRECT_URI;

  if (!appId || !appSecret || !redirectUri) {
    throw new Error("Brakuje META_APP_ID / META_APP_SECRET / META_REDIRECT_URI");
  }

  const url = new URL(`${BASE}/oauth/access_token`);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new MetaApiError("Failed to exchange code", res.status, body);
  }
  return res.json() as Promise<TokenResponse>;
}

export async function getLongLivedToken(shortToken: string): Promise<TokenResponse> {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("Brakuje META_APP_ID / META_APP_SECRET");
  }

  const url = new URL(`${BASE}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("fb_exchange_token", shortToken);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new MetaApiError("Failed to exchange long-lived token", res.status, body);
  }
  return res.json() as Promise<TokenResponse>;
}

export function buildOAuthUrl(state: string): string {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI;
  if (!appId || !redirectUri) {
    throw new Error("Brakuje META_APP_ID lub META_REDIRECT_URI");
  }

  const scopes = [
    "ads_read",
    "ads_management",
    "leads_retrieval",
    "pages_show_list",
    "pages_manage_metadata",
    "pages_manage_ads",
    "business_management",
    "pages_messaging",
    "instagram_manage_messages",
  ];

  const url = new URL(`https://www.facebook.com/${API_VERSION}/dialog/oauth`);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", scopes.join(","));
  url.searchParams.set("response_type", "code");
  return url.toString();
}
