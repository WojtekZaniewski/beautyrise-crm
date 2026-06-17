"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

type Toast = { id: string; actor: string | null; message: string };

// Listens on the workspace activity channel and shows a small popup when ANY
// account does something (add/complete/delete a task, add a note, …). Skips the
// current user's own actions. Mounted app-wide so it works on every page.
export function ActivityToaster({ workspaceId, meName }: { workspaceId: string; meName: string | null }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const remove = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  useEffect(() => {
    if (!workspaceId) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`activity:${workspaceId}`)
      .on("broadcast", { event: "fos-activity" }, (msg) => {
        const p = (msg.payload ?? {}) as { actor?: string | null; message?: string };
        if (!p.message) return;
        if (p.actor && meName && p.actor === meName) return; // don't notify about my own actions
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((t) => [...t.slice(-4), { id, actor: p.actor ?? null, message: p.message! }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 6000);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [workspaceId, meName]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed z-[200] bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => remove(t.id)}
          className="pointer-events-auto anim-fade flex items-start gap-2.5 max-w-[340px] rounded-xl px-3.5 py-2.5 text-left"
          style={{ background: "var(--panel-solid)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          title="Zamknij"
        >
          <span
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
          >
            {(t.actor ?? "•").charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            {t.actor && (
              <span className="block text-[12px] font-semibold leading-tight" style={{ color: "var(--accent)" }}>
                {t.actor}
              </span>
            )}
            <span className="block text-[12.5px] leading-snug" style={{ color: "var(--text)" }}>
              {t.message}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
