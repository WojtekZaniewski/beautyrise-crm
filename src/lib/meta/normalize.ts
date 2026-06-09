/**
 * Field normalization for Meta Conversions API user_data.
 * Ported from ads-optimizer — handles Polish phone numbers (bare 9-digit → 48 prefix).
 */

function clean(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return "";
  return String(v).trim();
}

export function normalizeEmail(v: unknown): string | null {
  const s = clean(v).toLowerCase();
  return s || null;
}

/**
 * Phone → digits only, with country code, no +/spaces (e.g. 48510830344).
 * Handles: +48 510 830 344, 0048…, bare 9-digit PL 510830344, trunk 0510830344.
 */
export function normalizePhone(v: unknown, defaultCallingCode = "48"): string | null {
  let d = clean(v).replace(/\D/g, "");
  if (!d) return null;
  const cc = defaultCallingCode;
  const ccLen = cc.length;
  if (d.startsWith(cc) && d.length === ccLen + 9) return d;
  if (d.startsWith("00")) {
    d = d.slice(2);
    if (d.startsWith(cc) && d.length === ccLen + 9) return d;
  }
  d = d.replace(/^0+/, "");
  if (!d) return null;
  if (d.length === 9) return cc + d;
  if (d.length < 8 || d.length > 15) return null;
  return d;
}

export function normalizeName(v: unknown): string | null {
  const s = clean(v)
    .toLowerCase()
    .replace(/\d/g, "")
    .replace(/[^\p{L}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s'-]+|[\s'-]+$/g, "")
    .trim();
  return s && /\p{L}/u.test(s) ? s : null;
}

export function normalizeCity(v: unknown): string | null {
  const s = clean(v).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return s || null;
}

export function normalizeState(v: unknown): string | null {
  const s = clean(v).toLowerCase().replace(/[^\p{L}]/gu, "");
  return s || null;
}

export function normalizeZip(v: unknown): string | null {
  const s = clean(v).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s.length < 3 || s.length > 10) return null;
  return s;
}

const COUNTRY_MAP: Record<string, string> = {
  poland: "pl", polska: "pl", polish: "pl",
  usa: "us", "united states": "us",
  germany: "de", niemcy: "de",
  uk: "gb", "united kingdom": "gb",
};

export function normalizeCountry(v: unknown): string | null {
  const raw = clean(v).toLowerCase();
  if (!raw) return null;
  const letters = raw.replace(/[^a-z]/g, "");
  if (letters.length === 2) return letters;
  if (COUNTRY_MAP[raw]) return COUNTRY_MAP[raw];
  if (COUNTRY_MAP[letters]) return COUNTRY_MAP[letters];
  return letters.slice(0, 2) || null;
}
