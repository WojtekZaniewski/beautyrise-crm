"use client";

import { useNav } from "./nav-context";

export function MobileHeader() {
  const { setOpen } = useNav();

  return (
    <div
      className="lg:hidden flex items-center gap-3 px-4 h-12 shrink-0"
      style={{
        background: "linear-gradient(127.09deg, rgba(6,11,40,0.94) 19.41%, rgba(10,14,35,0.49) 76.65%)",
        backdropFilter: "blur(42px)",
        WebkitBackdropFilter: "blur(42px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-md transition-colors"
        style={{ color: "rgba(255,255,255,0.55)" }}
        aria-label="Otwórz menu"
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <span className="text-[14px] font-semibold tracking-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
        BeautyRise
      </span>
    </div>
  );
}
