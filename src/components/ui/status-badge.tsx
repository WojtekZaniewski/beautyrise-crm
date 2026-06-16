import { TONE_VARS, type Tone } from "@/lib/status-colors";

// One pill component for every status/type chip. Reads design tokens by tone,
// so the whole app shares one disciplined palette instead of inline hex maps.
export function StatusBadge({
  label,
  tone = "neutral",
  dot = false,
  className = "",
}: {
  label: string;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  const c = TONE_VARS[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${className}`}
      style={{ background: c.bg, color: c.color }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }} />}
      {label}
    </span>
  );
}
