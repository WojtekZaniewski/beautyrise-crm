"use client";

function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  const hours = diff / (1000 * 60 * 60);
  const days = hours / 24;
  if (hours < 1) return "< 1h";
  if (hours < 24) return `${Math.floor(hours)}h temu`;
  if (days < 2) return "1 dzień";
  return `${Math.floor(days)} dni`;
}

export function LastContactBadge({
  lastContactAt,
}: {
  lastContactAt: string | null;
}) {
  const date = lastContactAt ? new Date(lastContactAt) : null;
  const diffDays = date
    ? (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    : Infinity;

  const label = date ? formatRelative(date) : "Brak";

  const isUrgent = diffDays > 2;
  const isWarning = !isUrgent && diffDays > 1;

  const style: React.CSSProperties = isUrgent
    ? { background: "rgba(0,0,0,0.12)", color: "#1C1917" }
    : isWarning
    ? { background: "rgba(249,115,22,0.12)", color: "#f97316" }
    : { background: "rgba(255,76,0,0.12)", color: "#FF4C00" };

  return (
    <span
      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full${isUrgent ? " animate-pulse" : ""}`}
      style={style}
      title={
        date
          ? `Ostatni kontakt: ${date.toLocaleString("pl-PL")}`
          : "Brak zarejestrowanego kontaktu"
      }
    >
      {label}
    </span>
  );
}
