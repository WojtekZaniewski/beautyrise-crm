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

const DAYS_OPTIONS = [
  { label: "Wszystkie", value: 0 },
  { label: "> 1 dzień", value: 1 },
  { label: "> 2 dni",   value: 2 },
  { label: "> 3 dni",   value: 3 },
  { label: "> 7 dni",   value: 7 },
  { label: "> 14 dni",  value: 14 },
  { label: "> 30 dni",  value: 30 },
];

const DROP_W = 240;

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
  const [cMinScore, setCMinScore] = useState(() => parseInt(params.get("minScore") ?? "1"));
  const [cMaxScore, setCMaxScore] = useState(() => parseInt(params.get("maxScore") ?? "10"));
  const [cMinDays,  setCMinDays]  = useState(() => parseInt(params.get("minDays")  ?? "0"));

  useEffect(() => { setCf(from); }, [from]);
  useEffect(() => { setCt(to); }, [to]);
  useEffect(() => { setCMinScore(parseInt(params.get("minScore") ?? "1")); }, [params]);
  useEffect(() => { setCMaxScore(parseInt(params.get("maxScore") ?? "10")); }, [params]);
  useEffect(() => { setCMinDays(parseInt(params.get("minDays") ?? "0")); }, [params]);

  const btnRef  = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const openDropdown = useCallback(() => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
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

  function applyParams(overrides: Record<string, string | null>) {
    const p = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(overrides)) {
      if (v === null) p.delete(k); else p.set(k, v);
    }
    router.push(`${pathname}?${p.toString()}`);
    setOpen(false);
  }

  function go(f: string, t: string) {
    applyParams({ from: f, to: t });
  }

  function applyAll() {
    applyParams({
      from: cf,
      to: ct,
      minScore: cMinScore > 1  ? String(cMinScore) : null,
      maxScore: cMaxScore < 10 ? String(cMaxScore) : null,
      minDays:  cMinDays  > 0  ? String(cMinDays)  : null,
    });
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

  const activeMinScore = parseInt(params.get("minScore") ?? "1");
  const activeMaxScore = parseInt(params.get("maxScore") ?? "10");
  const activeMinDays  = parseInt(params.get("minDays")  ?? "0");
  const hasExtraFilters = activeMinScore > 1 || activeMaxScore < 10 || activeMinDays > 0;
  const extraCount = (activeMinScore > 1 ? 1 : 0) + (activeMaxScore < 10 ? 1 : 0) + (activeMinDays > 0 ? 1 : 0);

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
      <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Zakres dat</p>
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
      <div className="flex flex-col gap-1.5 mb-3">
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
      </div>

      <div className="h-px mb-3" style={{ background: "var(--border)" }} />

      <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Potencjał (1–10)</p>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1">
          <p className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>Od</p>
          <input
            type="number" min={1} max={cMaxScore} value={cMinScore}
            onChange={(e) => setCMinScore(Math.min(cMaxScore, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-2 py-1.5 rounded-md text-[11px] text-center"
            style={{ background: "var(--ba-3)", border: `1px solid ${cMinScore > 1 ? "rgba(255,76,0,0.4)" : "var(--border)"}`, color: "var(--text)" }}
          />
        </div>
        <span className="text-[11px] mt-4" style={{ color: "var(--muted)" }}>–</span>
        <div className="flex-1">
          <p className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>Do</p>
          <input
            type="number" min={cMinScore} max={10} value={cMaxScore}
            onChange={(e) => setCMaxScore(Math.max(cMinScore, Math.min(10, parseInt(e.target.value) || 10)))}
            className="w-full px-2 py-1.5 rounded-md text-[11px] text-center"
            style={{ background: "var(--ba-3)", border: `1px solid ${cMaxScore < 10 ? "rgba(255,76,0,0.4)" : "var(--border)"}`, color: "var(--text)" }}
          />
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>Dni bez kontaktu</p>
      <select
        value={cMinDays}
        onChange={(e) => setCMinDays(parseInt(e.target.value))}
        className="w-full px-2 py-1.5 rounded-md text-[11px] mb-3"
        style={{ background: "var(--ba-3)", border: `1px solid ${cMinDays > 0 ? "rgba(255,76,0,0.4)" : "var(--border)"}`, color: "var(--text)" }}
      >
        {DAYS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <button
        onClick={() => cf && ct && applyAll()}
        className="w-full py-1.5 rounded-md text-[11px] font-semibold btn-primary"
      >
        Zastosuj filtry
      </button>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
        style={{
          background: hasExtraFilters ? "var(--accent-subtle)" : "var(--ba-3)",
          border: hasExtraFilters ? "1px solid rgba(255,76,0,0.35)" : "1px solid var(--border)",
          color: hasExtraFilters ? "var(--accent-2)" : "var(--text)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {label}
        {hasExtraFilters && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white" style={{ background: "var(--accent)" }}>
            {extraCount}
          </span>
        )}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {typeof document !== "undefined" && dropdown && createPortal(dropdown, document.body)}
    </>
  );
}
