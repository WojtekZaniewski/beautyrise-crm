"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { useNav } from "./nav-context";

type Workspace = { id: string; name: string; slug: string };

// Clean SVG icons matching Firecrawl's minimal style
const Icons = {
  dashboard: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9" />
      <rect x="8" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="1" y="8" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="8" y="8" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3" />
    </svg>
  ),
  leads: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="5.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 12c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.3" opacity=".55" />
      <path d="M13 12c0-1.8-1-3-2.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
    </svg>
  ),
  kanban: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="1" width="3.5" height="11" rx="1.2" fill="currentColor" opacity=".9" />
      <rect x="5.75" y="1" width="3.5" height="7.5" rx="1.2" fill="currentColor" opacity=".55" />
      <rect x="10.5" y="1" width="3.5" height="5" rx="1.2" fill="currentColor" opacity=".35" />
    </svg>
  ),
  campaigns: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M1.5 11V10l9-7.5 1 1.5-9 7.5h-1z" fill="currentColor" opacity=".9" />
      <circle cx="11.5" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.3" opacity=".6" />
      <path d="M3.5 10.5 2 14h2l1-3.5" fill="currentColor" opacity=".45" />
    </svg>
  ),
  meta: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M1.5 9.5C1.5 7 3 4.5 4.5 4.5c.8 0 1.5.7 2 1.8.5-1 1.2-1.8 2-1.8 1.5 0 3 2.5 3 5 0 1.5-.6 2.5-1.5 2.5-.6 0-1.1-.4-1.6-1.3-.4.9-.9 1.3-1.5 1.3-.6 0-1.1-.4-1.5-1.3-.5.9-1 1.3-1.6 1.3C2.1 12 1.5 11 1.5 9.5z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  email: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sms: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="4" y="1" width="7" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7.5" cy="11.5" r="0.9" fill="currentColor" />
      <path d="M6 4.5h3M6 6.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  clients: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2 13V5.5L7.5 2l5.5 3.5V13H9.5v-3.5h-4V13H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="5.5" y="5.5" width="4" height="3" rx=".8" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
    </svg>
  ),
  pipelines: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2 3.5h11M4 7.5h7M6 11.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tags: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M1.5 1.5h5.8l6 6-5.8 5.8-6-6V1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="4.8" cy="4.8" r="1.1" fill="currentColor" opacity=".7" />
    </svg>
  ),
  wallet: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 6.5h13" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10.5" cy="9" r="1" fill="currentColor" opacity=".7" />
    </svg>
  ),
  signal: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M1.5 11.5c1-2 2-3 3-3s2 1 3 1 2-1 3-1 2 1 2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3.5 8.5c.5-1.5 1.5-2.5 4-2.5s3.5 1 4 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      <path d="M5.5 6C6 4 6.5 2.5 7.5 2.5S9 4 9.5 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".35" />
    </svg>
  ),
  trash: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M3 4h9M6 4V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V4M5.5 4l.5 8M9.5 4l-.5 8M3 4l.8 8.5a1 1 0 0 0 1 .9h4.4a1 1 0 0 0 1-.9L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/>
    </svg>
  ),
  workspace: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.5 1v1.5M7.5 12.5V14M14 7.5h-1.5M2.5 7.5H1M11.7 3.3l-1.1 1.1M4.4 10.6l-1.1 1.1M11.7 11.7l-1.1-1.1M4.4 4.4 3.3 3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
    </svg>
  ),
  messages: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M1.5 2.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4.5l-3 2.5V3.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 6h6M4.5 8.5h3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  ),
  journal: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="2.5" y="1.5" width="10" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5h5M5 7.5h5M5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
    </svg>
  ),
  teamChat: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10.5" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.3" opacity=".6" />
      <path d="M1 12c0-2 1.8-3.2 4-3.2s4 1.2 4 3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.5 12c0-1.5 1.3-2.4 3-2.4s1.5.6 1.5 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
    </svg>
  ),
  logs: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2 12.5V2.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4.5 4.5h6M4.5 7h6M4.5 9.5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
    </svg>
  ),
  signout: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M6 2H2.5A1.5 1.5 0 0 0 1 3.5v8A1.5 1.5 0 0 0 2.5 13H6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M10 10.5 13 7.5 10 4.5M13 7.5H5.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fos: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M7.5 1L9.5 5.5H14L10.5 8.5L12 13L7.5 10L3 13L4.5 8.5L1 5.5H5.5L7.5 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  sprint: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.5 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  priority: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M3 2.5h9M3 5.5h6M3 8.5h7M3 11.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
      <circle cx="12" cy="11.5" r="2" fill="currentColor" opacity=".5" />
    </svg>
  ),
  review: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="2" y="1.5" width="11" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5.5h5M5 8h5M5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      <path d="M4.5 5.5L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  idea: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M7.5 1.5a4 4 0 0 1 1.5 7.7V10.5H6V9.2A4 4 0 0 1 7.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 11.5h3M6.5 13h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
};

const fosNav = [
  { href: "/fos", label: "FOS Hub", icon: Icons.fos },
  { href: "/fos/sprints", label: "Sprinty", icon: Icons.sprint },
  { href: "/fos/priorities", label: "Priorytety", icon: Icons.priority },
  { href: "/fos/reviews", label: "Weekly Review", icon: Icons.review },
  { href: "/fos/ideas", label: "Idea Backlog", icon: Icons.idea },
];

const salesNav = [
  { href: "/", label: "Dashboard", icon: Icons.dashboard },
  { href: "/leads", label: "Leady", icon: Icons.leads },
  { href: "/leads/kanban", label: "Kanban", icon: Icons.kanban },
  { href: "/leads/deleted", label: "Kosz", icon: Icons.trash },
];

const commsNav = [
  { href: "/messages", label: "Skrzynka", icon: Icons.messages, isMessages: true },
  { href: "/team-chat", label: "Czat zespołu", icon: Icons.teamChat },
  { href: "/journal", label: "Dziennik", icon: Icons.journal },
];

const marketingNav = [
  { href: "/campaigns", label: "Kampanie Meta", icon: Icons.campaigns },
  { href: "/email-campaigns", label: "Kampanie Email", icon: Icons.email },
  { href: "/sms-campaigns", label: "Kampanie SMS", icon: Icons.sms },
];

const financesNav = [
  { href: "/finances", label: "Finanse", icon: Icons.wallet },
];

const settingsNav = [
  { href: "/settings/workspaces", label: "Klienci", icon: Icons.clients },
  { href: "/settings/workspace", label: "Workspace", icon: Icons.workspace },
  { href: "/settings/pipelines", label: "Pipeline'y", icon: Icons.pipelines },
  { href: "/settings/tags", label: "Tagi", icon: Icons.tags },
  { href: "/integrations/meta", label: "Integracje", icon: Icons.meta },
  { href: "/integrations/meta/capi", label: "Jakość CAPI", icon: Icons.signal },
  { href: "/logs", label: "Logi systemu", icon: Icons.logs },
];

function NavLink({
  href,
  label,
  icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      prefetch
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
        active
          ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
          : "text-[var(--muted)] hover:bg-[var(--ba-4)] hover:text-[var(--text)]"
      }`}
      style={active ? { boxShadow: "inset 3px 0 0 var(--accent)" } : undefined}
    >
      <span className="shrink-0">{icon}</span>
      <span className="tracking-tight flex-1">{label}</span>
      {badge != null && badge > 0 && (
        <span
          className="min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1 shrink-0"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}

function Section({ label }: { label: string }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.11em] text-[var(--muted)]/60 px-3 pt-5 pb-1 font-semibold">
      {label}
    </div>
  );
}

export function Sidebar({
  workspaces,
  currentWorkspaceId,
}: {
  workspaces: Workspace[];
  currentWorkspaceId: string;
}) {
  const path = usePathname();
  const { open: mobileOpen, setOpen } = useNav();

  // Most-specific match wins, so /leads doesn't light up on /leads/kanban etc.
  const allHrefs = [...fosNav, ...salesNav, ...commsNav, ...marketingNav, ...financesNav, ...settingsNav].map((i) => i.href);
  const activeHref = allHrefs.reduce((best, href) => {
    const matches = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
    return matches && href.length > best.length ? href : best;
  }, "");
  const isActive = (href: string) => href === activeHref;

  // Close drawer when navigating
  useEffect(() => { setOpen(false); }, [path, setOpen]);

  const [totalUnread, setTotalUnread] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch("/api/messages/unread-summary");
        if (!res.ok || cancelled) return;
        const data = await res.json() as { total: number };
        setTotalUnread(data.total ?? 0);
      } catch {
        // silently ignore — badge stays at 0
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, 30_000);

    const convsChannel = supabase
      .channel(`sidebar-convs:${currentWorkspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `workspace_id=eq.${currentWorkspaceId}`,
        },
        () => fetchCount(),
      )
      .subscribe();

    const smsChannel = supabase
      .channel(`sidebar-sms:${currentWorkspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sms_conversations",
          filter: `workspace_id=eq.${currentWorkspaceId}`,
        },
        () => fetchCount(),
      )
      .subscribe();

    const emailChannel = supabase
      .channel(`sidebar-email:${currentWorkspaceId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "email_threads",
          filter: `workspace_id=eq.${currentWorkspaceId}`,
        },
        () => fetchCount(),
      )
      .subscribe();

    return () => {
      cancelled = true;
      clearInterval(interval);
      supabase.removeChannel(convsChannel);
      supabase.removeChannel(smsChannel);
      supabase.removeChannel(emailChannel);
    };
  }, [currentWorkspaceId, supabase]);

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

    <aside
      className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:inset-auto lg:z-auto
        w-[250px] shrink-0 flex flex-col
        h-screen lg:h-[calc(100vh-32px)] lg:my-4 lg:ml-4 lg:rounded-[20px] lg:sticky lg:top-4
        transition-transform duration-200 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      style={{
        background: "linear-gradient(127.09deg, rgba(6,11,40,0.94) 19.41%, rgba(10,14,35,0.49) 76.65%)",
        backdropFilter: "blur(42px)",
        WebkitBackdropFilter: "blur(42px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0px 20px 27px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* Mobile close button */}
      <button
        className="lg:hidden absolute top-3 right-3 z-10 p-1.5 rounded-md transition-colors hover:bg-[var(--ba-4)]"
        style={{ color: "var(--muted)" }}
        onClick={() => setOpen(false)}
        aria-label="Zamknij menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <WorkspaceSwitcher
        workspaces={workspaces}
        currentWorkspaceId={currentWorkspaceId}
      />

      <nav className="flex-1 px-2.5 py-2.5 flex flex-col gap-0.5 overflow-y-auto">

        {/* ── Founder OS — hero link, na górze ───────────────── */}
        <Link
          href="/fos"
          prefetch
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1 transition-all"
          style={
            path.startsWith("/fos")
              ? {
                  background: "var(--accent)",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(255,76,0,0.35)",
                }
              : {
                  background: "var(--accent-subtle)",
                  color: "var(--accent)",
                  border: "1px solid rgba(255,76,0,0.2)",
                }
          }
        >
          <span className="shrink-0">{Icons.fos}</span>
          <span className="text-[13px] font-bold tracking-tight flex-1">Founder OS</span>
          <span className="text-[10px] font-semibold opacity-70">⌘</span>
        </Link>

        <Section label="Sprzedaż" />
        {salesNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} active={isActive(item.href)} />
        ))}

        <Section label="Komunikacja" />
        {commsNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActive(item.href)}
            badge={item.isMessages ? totalUnread : undefined}
          />
        ))}

        <Section label="Marketing" />
        {marketingNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} active={isActive(item.href)} />
        ))}

        <Section label="Finanse" />
        {financesNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} active={isActive(item.href)} />
        ))}

        <Section label="Ustawienia" />
        {settingsNav.map((item) => (
          <NavLink key={item.href} {...item} active={isActive(item.href)} />
        ))}
      </nav>

      <div
        className="px-2.5 pb-3 pt-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[var(--muted)] hover:bg-[var(--ba-4)] hover:text-[var(--text)] transition-all"
          >
            <span className="shrink-0">{Icons.signout}</span>
            <span className="tracking-tight">Wyloguj</span>
          </button>
        </form>
        <p className="text-[10px] text-[var(--muted)]/40 px-3 pt-1">v1.0.0</p>
      </div>
    </aside>
    </>
  );
}
