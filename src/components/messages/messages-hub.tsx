"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChannelsSidebar,
  type ChannelKey,
  type EmailAccountItem,
  type UnreadSummary,
} from "./channels-sidebar";
import { MetaPanel } from "./meta-panel";
import { SmsPanel } from "./sms-panel";
import { EmailPanel } from "./email-panel";

function MessagesHubInner({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const channelParam = (searchParams.get("channel") as ChannelKey | null) ?? "messenger";
  const accountParam = searchParams.get("account");
  const initialConv = searchParams.get("conversation");

  const [emailAccounts, setEmailAccounts] = useState<EmailAccountItem[]>([]);
  const [summary, setSummary] = useState<UnreadSummary | null>(null);

  const loadAccounts = useCallback(async () => {
    try {
      const res = await fetch("/api/email/accounts");
      const data = await res.json();
      setEmailAccounts(Array.isArray(data) ? data : []);
    } catch {
      setEmailAccounts([]);
    }
  }, []);

  const loadSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/messages/unread-summary");
      if (!res.ok) return;
      setSummary(await res.json());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadAccounts();
    loadSummary();
    const id = setInterval(loadSummary, 30_000);
    return () => clearInterval(id);
  }, [loadAccounts, loadSummary]);

  const handleSelect = (channel: ChannelKey, accountId?: string) => {
    const params = new URLSearchParams();
    params.set("channel", channel);
    if (channel === "email" && accountId) params.set("account", accountId);
    router.replace(`/messages?${params.toString()}`);
  };

  // Auto-pick first email account if entering email channel without one
  useEffect(() => {
    if (channelParam === "email" && !accountParam && emailAccounts.length > 0) {
      const first = emailAccounts[0];
      const params = new URLSearchParams(searchParams.toString());
      params.set("account", first.id);
      router.replace(`/messages?${params.toString()}`);
    }
  }, [channelParam, accountParam, emailAccounts, router, searchParams]);

  const renderPanel = () => {
    if (channelParam === "messenger" || channelParam === "instagram") {
      return <MetaPanel channel={channelParam} workspaceId={workspaceId} />;
    }
    if (channelParam === "sms") {
      return <SmsPanel initialConversationId={initialConv} />;
    }
    if (channelParam === "email") {
      if (emailAccounts.length === 0) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 p-8" style={{ color: "var(--muted)" }}>
            <div className="text-sm">Brak skonfigurowanych kont email.</div>
            <a
              href="/integrations/email?tab=konta"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              Dodaj konto email
            </a>
          </div>
        );
      }
      const account = emailAccounts.find((a) => a.id === accountParam) ?? emailAccounts[0];
      return <EmailPanel accountId={account.id} accountEmail={account.email} />;
    }
    return null;
  };

  return (
    <div className="flex" style={{ height: "calc(100vh - 56px)", overflow: "hidden" }}>
      <ChannelsSidebar
        current={channelParam}
        currentAccountId={accountParam}
        onSelect={handleSelect}
        emailAccounts={emailAccounts}
        summary={summary}
      />
      {renderPanel()}
    </div>
  );
}

export function MessagesHub({ workspaceId }: { workspaceId: string }) {
  return (
    <Suspense fallback={<div className="p-4 text-sm" style={{ color: "var(--muted)" }}>Ładowanie…</div>}>
      <MessagesHubInner workspaceId={workspaceId} />
    </Suspense>
  );
}
