"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Workspace = { id: string; name: string; slug: string };

export function WorkspaceSwitcher({
  workspaces,
  currentWorkspaceId,
}: {
  workspaces: Workspace[];
  currentWorkspaceId: string;
}) {
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = workspaces.find((w) => w.id === currentWorkspaceId);
  const initial = current?.name?.charAt(0).toUpperCase() ?? "—";

  async function switchTo(id: string) {
    if (id === currentWorkspaceId) {
      setOpen(false);
      return;
    }
    setSwitching(true);
    await fetch("/api/workspace/switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspace_id: id }),
    });
    setOpen(false);
    router.refresh();
    setSwitching(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={switching}
        className="w-full flex items-center gap-3 px-3.5 py-3.5 hover:bg-[var(--ba-4)] transition-colors"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Image
          src="/logo.png"
          alt="BeautyRise"
          width={28}
          height={28}
          className="shrink-0 object-contain"
        />
        <div className="flex-1 text-left min-w-0">
          <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]/60 font-semibold">
            Workspace
          </div>
          <div className="text-[13px] font-semibold leading-tight truncate text-[var(--text)]">
            {current?.name ?? "—"}
          </div>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="shrink-0 text-[var(--muted)]/60"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 150ms" }}
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-2 right-2 z-20 mt-1 rounded-lg overflow-hidden max-h-72 overflow-y-auto"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {workspaces.map((w) => (
            <button
              key={w.id}
              onClick={() => switchTo(w.id)}
              className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--ba-4)] flex items-center justify-between transition-colors"
              style={{ color: w.id === currentWorkspaceId ? "var(--accent)" : "var(--text)" }}
            >
              <span className="truncate">{w.name}</span>
              {w.id === currentWorkspaceId && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </button>
          ))}
          <Link
            href="/settings/workspaces/new"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-[13px] hover:bg-[var(--ba-4)] transition-colors"
            style={{
              color: "var(--accent)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Nowy klient
          </Link>
        </div>
      )}
    </div>
  );
}
