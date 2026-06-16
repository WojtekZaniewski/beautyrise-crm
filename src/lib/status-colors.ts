// Single source of truth for status/type labels and their semantic tone.
// Tones map to design tokens in globals.css via <StatusBadge> — no hardcoded hex.

export type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "accent";

export const TONE_VARS: Record<Tone, { color: string; bg: string }> = {
  success: { color: "var(--success)", bg: "var(--success-bg)" },
  warning: { color: "var(--warning)", bg: "var(--warning-bg)" },
  danger:  { color: "var(--danger)",  bg: "var(--danger-bg)" },
  info:    { color: "var(--info)",    bg: "var(--info-bg)" },
  neutral: { color: "var(--muted)",   bg: "var(--ba-4)" },
  accent:  { color: "var(--accent-2)", bg: "var(--accent-subtle)" },
};

type Entry = { label: string; tone: Tone };

// Campaign types (email + sms) — collapsed from a 6-hue rainbow to disciplined tones.
export const CAMPAIGN_TYPE: Record<string, Entry> = {
  outreach:   { label: "Outreach",      tone: "info" },
  followup:   { label: "Follow-up",     tone: "accent" },
  promo:      { label: "Promocja",      tone: "warning" },
  newsletter: { label: "Newsletter",    tone: "success" },
  reminder:   { label: "Przypomnienie", tone: "success" },
  welcome:    { label: "Powitanie",     tone: "info" },
  info:       { label: "Informacja",    tone: "neutral" },
  other:      { label: "Inne",          tone: "neutral" },
};

// Campaign / message send status.
export const CAMPAIGN_STATUS: Record<string, Entry> = {
  draft:   { label: "Szkic",     tone: "neutral" },
  sending: { label: "Wysyłanie", tone: "warning" },
  sent:    { label: "Wysłana",   tone: "success" },
  queued:  { label: "W kolejce", tone: "warning" },
  failed:  { label: "Błąd",      tone: "danger" },
};

export function campaignType(key: string | null | undefined): Entry {
  return (key && CAMPAIGN_TYPE[key]) || CAMPAIGN_TYPE.other;
}

export function campaignStatus(key: string | null | undefined): Entry {
  return (key && CAMPAIGN_STATUS[key]) || CAMPAIGN_STATUS.draft;
}
