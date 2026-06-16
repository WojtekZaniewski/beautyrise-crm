"use client";

import { useEffect, useState } from "react";
import type { FosActivityItem } from "@/lib/fos-types";

const TYPE_CONFIG: Record<FosActivityItem["type"], { icon: string; color: string }> = {
  priority_completed: { icon: "✓", color: "#22c55e" },
  idea_added: { icon: "💡", color: "#f97316" },
  review_submitted: { icon: "📋", color: "#3b82f6" },
  lead_added: { icon: "👤", color: "#8b5cf6" },
  sprint_started: { icon: "🚀", color: "var(--accent)" },
};

function timeAgo(iso: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "przed chwilą";
  if (min < 60) return `${min} min temu`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} godz. temu`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} dni temu`;
  return new Date(iso).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

export function ActivityFeedClient() {
  const [items, setItems] = useState<FosActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fos/activity")
      .then((r) => r.json())
      .then((d) => { setItems(d.data ?? []); setLoading(false); });
  }, []);

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <h2 className="text-[14px] font-semibold mb-4">Founder Activity</h2>

      {loading ? (
        <div className="text-[13px] py-4 text-center" style={{ color: "var(--muted)" }}>
          Ładowanie...
        </div>
      ) : items.length === 0 ? (
        <div className="text-[13px] py-8 text-center" style={{ color: "var(--muted)" }}>
          Brak aktywności w ostatnich 14 dniach.
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item) => {
            const cfg = TYPE_CONFIG[item.type] ?? { icon: "·", color: "var(--muted)" };
            return (
              <div
                key={item.id}
                className="flex items-start gap-2.5 py-2 rounded-lg px-2 transition-colors hover:bg-[var(--ba-4)]"
              >
                <div
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] mt-0.5"
                  style={{ background: `${cfg.color}15` }}
                >
                  <span style={{ lineHeight: 1 }}>{cfg.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] leading-snug line-clamp-2">{item.label}</div>
                  <div className="text-[10px] mt-0.5 flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
                    {item.actor && <span>{item.actor}</span>}
                    {item.actor && <span>·</span>}
                    <span className="tabular-nums">{timeAgo(item.created_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
