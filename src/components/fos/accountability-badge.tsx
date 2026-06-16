interface Props {
  score: number;
  size?: "sm" | "md";
}

export function AccountabilityBadge({ score, size = "md" }: Props) {
  const color = score >= 80 ? "#FF4C00" : score >= 50 ? "#FF8C42" : "#1C1917";
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full tabular-nums ${
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-[12px] px-2 py-0.5"
      }`}
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {score}%
    </span>
  );
}
