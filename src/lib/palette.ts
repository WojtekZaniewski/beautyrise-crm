// Strict-palette mapper for DB-sourced colors (pipeline stages, tags, sources).
// The CRM lets users store arbitrary hex colors; this maps ANY color onto the
// app palette — orange / black / neutral grays — at render time, WITHOUT
// touching stored data. Deterministic: a given input always yields the same
// palette color, so distinct stages keep distinct (on-palette) shades.

const COLORED_RAMP = ["#FF4C00", "#FF6B35", "#C2410C", "#FF8C42", "#9A3412", "#FFA76B"];

export function toPaletteColor(input?: string | null): string {
  if (!input || typeof input !== "string") return "#78716C";
  let h = input.trim();

  // Non-hex tokens (CSS vars, named palette) — leave untouched.
  if (!h.startsWith("#")) return h;

  // Expand #abc → #aabbcc
  if (/^#[0-9a-fA-F]{3}$/.test(h)) {
    h = "#" + h.slice(1).split("").map((c) => c + c).join("");
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(h)) return "#78716C";

  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  // Near-grayscale → keep neutral, pick a gray by lightness.
  if (sat < 0.18) {
    const l = (max + min) / 2;
    if (l < 50) return "#1C1917";
    if (l < 110) return "#57534E";
    if (l < 175) return "#78716C";
    if (l < 225) return "#A8A29E";
    return "#D6D3D1";
  }

  // Warm/orange already (hue roughly 8–48°) → strongest brand orange.
  const hue = rgbHue(r, g, b);
  if (hue >= 8 && hue <= 48) return "#FF4C00";

  // Any other hue → deterministic on-palette shade (stable per input).
  const idx = (r * 2 + g * 3 + b * 5) % COLORED_RAMP.length;
  return COLORED_RAMP[idx];
}

function rgbHue(r: number, g: number, b: number): number {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  if (d === 0) return 0;
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}
