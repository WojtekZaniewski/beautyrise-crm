"use client";

import { useEffect, useState } from "react";

export type ChannelKey = "messenger" | "instagram" | "sms" | "email" | "tiktok";

export type EmailAccountItem = {
  id: string;
  email: string;
  display_name: string;
  is_active: boolean;
};

export type UnreadSummary = {
  messenger: number;
  instagram: number;
  sms: number;
  email: number;
  emailByAccount: Record<string, number>;
  total: number;
};

const CHANNEL_ICONS: Record<ChannelKey, React.ReactNode> = {
  messenger: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5l-2.5-2.7L5.6 14.5l5.4-5.7 2.6 2.7 4.9-2.7-5.5 5.7z" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  sms: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="4" y="1" width="7" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7.5" cy="11.5" r="0.9" fill="currentColor" />
      <path d="M6 4.5h3M6 6.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  email: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.6 6.4a4.7 4.7 0 0 1-3-1.1 4.7 4.7 0 0 1-1.5-2.3h-3.4v13.2a2.6 2.6 0 1 1-1.8-2.5V10.3a6 6 0 1 0 5.2 5.9V9.5a8 8 0 0 0 4.5 1.4z" />
    </svg>
  ),
};

export function ChannelsSidebar({
  current,
  currentAccountId,
  onSelect,
  emailAccounts,
  summary,
}: {
  current: ChannelKey;
  currentAccountId: string | null;
  onSelect: (channel: ChannelKey, accountId?: string) => void;
  emailAccounts: EmailAccountItem[];
  summary: UnreadSummary | null;
}) {
  const [emailOpen, setEmailOpen] = useState<boolean>(current === "email");

  useEffect(() => {
    if (current === "email") setEmailOpen(true);
  }, [current]);

  const Item = ({
    channel,
    label,
    count,
    disabled,
    badgeLabel,
  }: {
    channel: ChannelKey;
    label: string;
    count?: number;
    disabled?: boolean;
    badgeLabel?: string;
  }) => {
    const active = current === channel && (channel !== "email" || !currentAccountId);
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (channel === "email") {
            setEmailOpen((v) => !v || currentAccountId !== null);
            const first = emailAccounts[0];
            onSelect("email", first?.id);
          } else {
            onSelect(channel);
          }
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: active ? "var(--accent-subtle)" : undefined,
          color: active ? "var(--accent)" : "var(--muted)",
        }}
      >
        <span className="shrink-0">{CHANNEL_ICONS[channel]}</span>
        <span className="flex-1 truncate">{label}</span>
        {badgeLabel && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0"
            style={{ background: "var(--ba-6)", color: "var(--muted)" }}
          >
            {badgeLabel}
          </span>
        )}
        {count != null && count > 0 && (
          <span
            className="min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1 shrink-0"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div
      className="w-[220px] shrink-0 flex flex-col"
      style={{ borderRight: "1px solid var(--border)", background: "var(--panel)" }}
    >
      <div
        className="px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="text-[11px] uppercase tracking-[0.11em] font-semibold" style={{ color: "var(--muted)" }}>
          Kanały
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-0.5">
        <Item channel="messenger" label="Messenger" count={summary?.messenger} />
        <Item channel="instagram" label="Instagram" count={summary?.instagram} />
        <Item channel="sms" label="SMS" count={summary?.sms} />

        {/* Email — rozwijane konta */}
        <button
          type="button"
          onClick={() => {
            const isOpen = emailOpen;
            setEmailOpen(!isOpen);
            if (!isOpen) {
              const first = emailAccounts[0];
              if (first) onSelect("email", first.id);
            }
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left"
          style={{
            background: current === "email" ? "var(--accent-subtle)" : undefined,
            color: current === "email" ? "var(--accent)" : "var(--muted)",
          }}
        >
          <span className="shrink-0">{CHANNEL_ICONS.email}</span>
          <span className="flex-1 truncate">Email</span>
          {(summary?.email ?? 0) > 0 && (
            <span
              className="min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1 shrink-0"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {summary!.email > 99 ? "99+" : summary!.email}
            </span>
          )}
          <span className="text-[10px] shrink-0" style={{ color: "var(--muted)" }}>
            {emailOpen ? "▾" : "▸"}
          </span>
        </button>

        {emailOpen && (
          <div className="ml-3 flex flex-col gap-0.5 mb-1 mt-0.5">
            {emailAccounts.length === 0 ? (
              <div className="px-3 py-2 text-[11.5px]" style={{ color: "var(--muted)" }}>
                Brak kont email.{" "}
                <a href="/integrations/email?tab=konta" className="underline" style={{ color: "var(--accent)" }}>
                  Dodaj
                </a>
              </div>
            ) : (
              emailAccounts.map((a) => {
                const isActiveAccount = current === "email" && currentAccountId === a.id;
                const unread = summary?.emailByAccount?.[a.id] ?? 0;
                return (
                  <button
                    key={a.id}
                    onClick={() => onSelect("email", a.id)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] transition-all text-left"
                    style={{
                      background: isActiveAccount ? "var(--accent-subtle)" : undefined,
                      color: isActiveAccount ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: a.is_active ? "#22c55e" : "var(--ba-6)",
                      }}
                    />
                    <span className="flex-1 truncate">{a.email}</span>
                    {unread > 0 && (
                      <span
                        className="min-w-[16px] h-[16px] rounded-full text-[9px] font-semibold flex items-center justify-center px-1 shrink-0"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
            <a
              href="/integrations/email?tab=konta"
              className="px-3 py-1.5 text-[11.5px] rounded-lg transition-all"
              style={{ color: "var(--muted)" }}
            >
              + Zarządzaj kontami
            </a>
          </div>
        )}

        <Item channel="tiktok" label="TikTok" disabled badgeLabel="Wkrótce" />
      </nav>
    </div>
  );
}
