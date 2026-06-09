import { createHash } from "node:crypto";
import {
  normalizeEmail, normalizePhone, normalizeName, normalizeCity, normalizeState,
  normalizeZip, normalizeCountry, normalizeDob, normalizeGender, normalizeExternalId,
} from "./normalize";
import type { HashedUserData } from "./event";

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export type RawUserData = {
  em?: string | string[];
  ph?: string | string[];
  fn?: string;
  ln?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  db?: string;
  ge?: string;
  external_id?: string;
  fbc?: string;
  fbp?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fb_login_id?: string;
};

const PII_NORMALIZERS: Record<string, (v: unknown) => string | null> = {
  em: normalizeEmail,
  ph: normalizePhone,
  fn: normalizeName,
  ln: normalizeName,
  ct: normalizeCity,
  st: normalizeState,
  zp: normalizeZip,
  country: normalizeCountry,
  db: normalizeDob,
  ge: normalizeGender,
  external_id: normalizeExternalId,
};

const RAW_FIELDS = ["fbc", "fbp", "client_ip_address", "client_user_agent", "fb_login_id"] as const;

function isValidIp(v: string): boolean {
  if (/^(\d{1,3})(\.\d{1,3}){3}$/.test(v)) return v.split(".").every((o) => Number(o) <= 255);
  return v.includes(":") && /^[0-9a-fA-F:.]+$/.test(v);
}

export function buildUserData(raw: RawUserData): HashedUserData {
  const out: HashedUserData = {};
  const src = raw as Record<string, unknown>;

  for (const [key, normalize] of Object.entries(PII_NORMALIZERS)) {
    const val = src[key];
    if (Array.isArray(val)) {
      const hashed = val.map((v) => normalize(v)).filter((x): x is string => !!x).map(sha256);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (hashed.length === 1) (out as Record<string, unknown>)[key] = hashed[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else if (hashed.length > 1) (out as Record<string, unknown>)[key] = hashed;
    } else {
      const norm = normalize(val);
      if (norm) (out as Record<string, unknown>)[key] = sha256(norm);
    }
  }

  for (const key of RAW_FIELDS) {
    const val = raw[key];
    if (typeof val !== "string" || !val.trim()) continue;
    const trimmed = val.trim();
    if (key === "client_ip_address" && !isValidIp(trimmed)) continue;
    out[key] = trimmed;
  }

  return out;
}

export function matchKeys(ud: HashedUserData): string[] {
  return Object.keys(ud);
}
