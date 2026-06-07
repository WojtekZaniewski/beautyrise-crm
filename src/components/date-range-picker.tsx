"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PRESETS = [
  { label: "7 dni",  days: 7   },
  { label: "30 dni", days: 30  },
  { label: "90 dni", days: 90  },
  { label: "Rok",    days: 365 },
];

const DROP_W = 220;

function toStr(d: Date) {
  return d.toISOString().split("T")[0];
}

export function DateRangePicker({ from, to }: { from: string; to: string }) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();

  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState<{ top: number; left: number } | null>(null);
  const [cf, setCf]     = useState(from);
  const [ct, setCt]     = useState(to);

  useEffect(() => { setCf(from); }, [from]);
  useEffect(() => { setCt(to); }, [to]);

  const btnRef  = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const openDropdown = useCallback(() => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      // right-align dropdown with button, clamped to viewport bounds
      const left = Math.max(8, Math.min(rect.right - DROP_W, window.innerWidth - DROP_W - 8));
      setPos({ top: rect.bottom + 6, left });
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (
        btnRef.current  && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function go(f: string, t: string) {
    const p = new URLSearchParams(params.toString());
    p.set("from", f);
    p.set("to", t);
    router.push(`${pathname}?${p.toString()}`);
    setOpen(false);
  }

  const todayStr = toStr(new Date());

  const matchedPreset = PRESETS.find((p) => {
    const f = toStr(new Date(Date.now() - p.days * 86400000));
    return from === f && to === todayStr;
  });

  const fmt = (d: string) => {
    const [y, m, day] = d.split("-");
    return `${day}.${m}.${y.slice(2)}`;
  };
  const label = matchedPreset ? matchedPreset.label : `${fmt(from)} – ${fmt(to)}`;

  const dropdown = open && pos ? (
    <div
      ref={dropRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: DROP_W,
        zIndex: 99999,
        background: "var(--panel-solid)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
        borderRadius: "0.75rem",
        padding: "0.75rem",
      }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Zakres</p>
      <div className="grid grid-cols-2 gap-1 mb-3">
        {PRESETS.map((p) => {
          const active = matchedPreset?.label === p.label;
          return (
            <button
              key={p.label}
              onClick={() => go(toStr(new Date(Date.now() - p.days * 86400000)), todayStr)}
              className="px-2.5 py-1.5 rounded-md text-[11px] font-medium text-left transition-all"
              style={{
                background: active ? "var(--accent-subtle)" : "var(--ba-3)",
                color:      active ? "var(--accent-2)"       : "var(--text)",
                border:     active ? "1px solid rgba(255,76,0,0.2)" : "1px solid var(--border)",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="h-px mb-3" style={{ background: "var(--border)" }} />
      <p className="text-[10px] font-medium mb-1.5" style={{ color: "var(--muted)" }}>Własny zakres</p>
      <div className="flex flex-col gap-1.5">
        <input
          type="date" value={cf} max={ct}
          onChange={(e) => setCf(e.target.value)}
          className="w-full px-2 py-1.5 rounded-md text-[11px]"
          style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <input
          type="date" value={ct} min={cf} max={todayStr}
          onChange={(e) => setCt(e.target.value)}
          className="w-full px-2 py-1.5 rounded-md text-[11px]"
          style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          onClick={() => cf && ct && go(cf, ct)}
          className="w-full py-1.5 rounded-md text-[11px] font-semibold btn-primary mt-0.5"
        >
          Zastosuj
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
        style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {typeof document !== "undefined" && dropdown && createPortal(dropdown, document.body)}
    </>
  );
}
