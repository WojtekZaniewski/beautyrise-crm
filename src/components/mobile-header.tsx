"use client";

import { useNav } from "./nav-context";

export function MobileHeader() {
  const { setOpen } = useNav();

  return (
    <div
      className="lg:hidden flex items-center gap-3 px-4 h-12 shrink-0"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-md transition-colors hover:bg-[var(--ba-4)]"
        style={{ color: "var(--muted)" }}
        aria-label="Otwórz menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <span className="text-[14px] font-semibold tracking-tight" style={{ color: "var(--text)" }}>
        BeautyRise
      </span>
    </div>
  );
}
