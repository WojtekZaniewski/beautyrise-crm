"use client";

import { useState, useEffect, useCallback } from "react";

type Thread = {
  id: string;
  subject: string;
  participants: string[];
  is_read: boolean;
  last_message_at: string;
  email_thread_messages: ThreadMessage[];
};
type ThreadMessage = {
  id: string;
  from_email: string;
  from_name: string | null;
  body_text: string | null;
  body_html?: string | null;
  sent_at: string;
  direction: "inbound" | "outbound";
  is_read: boolean;
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" });
}

type LiveMessage = {
  uid: number;
  messageId: string;
  from: { email: string; name: string };
  subject: string;
  bodyText: string;
  bodyHtml: string;
  date: string;
  isRead: boolean;
};

const FOLDER_LABELS: Record<string, string> = {
  INBOX: "📥 Skrzynka",
  Sent: "📤 Wysłane",
  "INBOX.Sent": "📤 Wysłane",
  Spam: "🚫 Spam",
  "INBOX.Spam": "🚫 Spam",
  Junk: "🚫 Spam",
  Trash: "🗑 Kosz",
  "INBOX.Trash": "🗑 Kosz",
  Drafts: "✏️ Szkice",
  "INBOX.Drafts": "✏️ Szkice",
};

export function EmailPanel({ accountId, accountEmail }: { accountId: string; accountEmail: string }) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [replyMode, setReplyMode] = useState<"text" | "html">("text");
  const [replying, setReplying] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [folders, setFolders] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState("INBOX");
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([]);
  const [selectedLive, setSelectedLive] = useState<LiveMessage | null>(null);

  const loadThreads = useCallback(
    async (sync = false) => {
      if (!accountId) return;
      if (sync) setSyncing(true);
      else setLoading(true);
      try {
        const res = await fetch(`/api/email/inbox?account_id=${accountId}${sync ? "&sync=1" : ""}`);
        const data = await res.json();
        setThreads(Array.isArray(data) ? data : []);
        if (selected) {
          const updated = (data as Thread[])?.find((t) => t.id === selected.id);
          if (updated) setSelected(updated);
        }
      } finally {
        setLoading(false);
        setSyncing(false);
      }
    },
    [accountId, selected],
  );

  useEffect(() => {
    setSelected(null);
    setActiveFolder("INBOX");
    loadThreads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useEffect(() => {
    if (!accountId) return;
    fetch(`/api/email/folders?account_id=${accountId}`)
      .then((r) => r.json())
      .then((data) => setFolders(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [accountId]);

  useEffect(() => {
    if (activeFolder === "INBOX") {
      setLiveMessages([]);
      setSelectedLive(null);
      return;
    }
    setLoading(true);
    setSelected(null);
    setSelectedLive(null);
    setLiveMessages([]);
    fetch(`/api/email/folders?account_id=${accountId}&folder=${encodeURIComponent(activeFolder)}`)
      .then((r) => r.json())
      .then((data) => setLiveMessages(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeFolder, accountId]);

  const sendReply = async () => {
    if (!selected || !reply.trim() || replying) return;
    setReplying(true);
    setReplyError("");
    const msgs = [...(selected.email_thread_messages ?? [])].sort((a, b) =>
      a.sent_at.localeCompare(b.sent_at),
    );
    const lastInbound = [...msgs].reverse().find((m) => m.direction === "inbound") ?? msgs[msgs.length - 1];
    const replyTo = lastInbound?.from_email;
    if (!replyTo) {
      setReplyError("Nie udało się ustalić odbiorcy");
      setReplying(false);
      return;
    }
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: accountId,
        to: replyTo,
        to_name: lastInbound?.from_name ?? undefined,
        subject: `Re: ${selected.subject.replace(/^Re:\s*/i, "")}`,
        html: replyMode === "html" ? reply : `<p>${reply.replace(/\n/g, "<br>")}</p>`,
        text: replyMode === "html" ? reply.replace(/<[^>]+>/g, "") : reply,
        thread_id: selected.id,
      }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setReplyError((d as { error?: string }).error ?? "Błąd wysyłania");
    } else {
      setReply("");
      await loadThreads();
    }
    setReplying(false);
  };

  const filtered = threads.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.subject.toLowerCase().includes(q) ||
      (t.participants ?? []).some((p) => p.toLowerCase().includes(q))
    );
  });

  const sortedMessages = selected
    ? [...(selected.email_thread_messages ?? [])].sort((a, b) => a.sent_at.localeCompare(b.sent_at))
    : [];

  return (
    <div className="flex flex-1 min-w-0 overflow-hidden">
      {/* Lista wątków */}
      <div
        className="flex flex-col w-80 shrink-0"
        style={{ borderRight: "1px solid var(--border)", background: "var(--panel)" }}
      >
        <div className="px-4 py-3 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{accountEmail}</div>
            <div className="text-[10.5px]" style={{ color: "var(--muted)" }}>
              {threads.length} {threads.length === 1 ? "wątek" : "wątków"}
            </div>
          </div>
          <button
            onClick={() => loadThreads(true)}
            disabled={syncing}
            className="text-xs px-2 py-1 rounded-md transition-colors disabled:opacity-50"
            style={{ color: "var(--muted)", background: "var(--ba-4)" }}
            title="Synchronizuj IMAP"
          >
            {syncing ? "…" : "↻"}
          </button>
        </div>

        {folders.length > 0 && (
          <div className="px-2 py-2 flex flex-wrap gap-1 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
            {["INBOX", ...folders.filter((f) => f !== "INBOX")].map((folder) => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className="text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors"
                style={{
                  background: activeFolder === folder ? "var(--accent)" : "var(--ba-4)",
                  color: activeFolder === folder ? "#fff" : "var(--muted)",
                  border: `1px solid ${activeFolder === folder ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                {FOLDER_LABELS[folder] ?? folder}
              </button>
            ))}
          </div>
        )}

        <div className="px-3 py-2 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <input
            type="text"
            placeholder="Szukaj wątków..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg outline-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-sm text-[var(--muted)]">Ładowanie…</div>
          ) : activeFolder !== "INBOX" ? (
            liveMessages.length === 0 ? (
              <div className="p-6 text-center text-sm text-[var(--muted)]">Brak wiadomości w tym folderze.</div>
            ) : (
              liveMessages.filter((m) => {
                if (!search.trim()) return true;
                const q = search.toLowerCase();
                return m.subject.toLowerCase().includes(q) || m.from.email.toLowerCase().includes(q) || (m.from.name ?? "").toLowerCase().includes(q);
              }).map((m) => {
                const isSel = selectedLive?.uid === m.uid;
                return (
                  <button
                    key={m.uid}
                    onClick={() => setSelectedLive(m)}
                    className="w-full text-left px-4 py-3 transition-colors flex flex-col gap-0.5"
                    style={{
                      background: isSel ? "var(--accent-subtle)" : undefined,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {!m.isRead && (
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                      )}
                      <span
                        className={`text-[13px] truncate ${!m.isRead ? "font-semibold" : "font-medium"}`}
                        style={{ color: isSel ? "var(--accent)" : "var(--text)" }}
                      >
                        {m.subject || "(brak tematu)"}
                      </span>
                      <span className="text-[10px] ml-auto shrink-0" style={{ color: "var(--muted)" }}>
                        {formatTime(m.date)}
                      </span>
                    </div>
                    <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      <span className="font-medium">{m.from.name || m.from.email}:</span>{" "}
                      {(m.bodyText ?? "").slice(0, 60)}
                    </div>
                  </button>
                );
              })
            )
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-[var(--muted)]">
              {threads.length === 0
                ? "Brak wiadomości. Kliknij ↻ aby pobrać ze skrzynki."
                : "Brak wyników."}
            </div>
          ) : (
            filtered.map((t) => {
              const isSelected = selected?.id === t.id;
              const lastMsg = [...(t.email_thread_messages ?? [])].sort((a, b) =>
                b.sent_at.localeCompare(a.sent_at),
              )[0];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="w-full text-left px-4 py-3 transition-colors flex flex-col gap-0.5"
                  style={{
                    background: isSelected ? "var(--accent-subtle)" : undefined,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {!t.is_read && (
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    )}
                    <span
                      className={`text-[13px] truncate ${!t.is_read ? "font-semibold" : "font-medium"}`}
                      style={{ color: isSelected ? "var(--accent)" : "var(--text)" }}
                    >
                      {t.subject || "(brak tematu)"}
                    </span>
                    <span className="text-[10px] ml-auto shrink-0" style={{ color: "var(--muted)" }}>
                      {formatTime(t.last_message_at)}
                    </span>
                  </div>
                  {lastMsg && (
                    <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      <span className="font-medium">{lastMsg.from_name || lastMsg.from_email}:</span>{" "}
                      {(lastMsg.body_text ?? "").slice(0, 60)}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Wątek / wiadomość */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--bg)" }}>
        {selectedLive ? (
          <>
            <div
              className="px-5 py-3 flex items-center justify-between shrink-0"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)" }}
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{selectedLive.subject || "(brak tematu)"}</div>
                <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                  Od: {selectedLive.from.name ? `${selectedLive.from.name} <${selectedLive.from.email}>` : selectedLive.from.email}
                </div>
              </div>
              <button
                onClick={() => setSelectedLive(null)}
                className="text-xs ml-4 shrink-0"
                style={{ color: "var(--muted)" }}
              >✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div
                className="rounded-xl p-4 text-sm mr-auto"
                style={{ maxWidth: "85%", background: "var(--panel)", border: "1px solid var(--border)" }}
              >
                <div className="flex justify-between items-center gap-4 mb-2">
                  <span className="font-medium text-xs">{selectedLive.from.name || selectedLive.from.email}</span>
                  <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
                    {new Date(selectedLive.date).toLocaleString("pl-PL")}
                  </span>
                </div>
                {selectedLive.bodyHtml ? (
                  <div
                    className="text-sm"
                    style={{ color: "var(--text)", lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: selectedLive.bodyHtml }}
                  />
                ) : (
                  <div style={{ whiteSpace: "pre-wrap", color: "var(--text)", lineHeight: 1.6 }}>
                    {selectedLive.bodyText || ""}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : !selected ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2" style={{ color: "var(--muted)" }}>
            <svg width="36" height="36" viewBox="0 0 15 15" fill="none" opacity=".3">
              <rect x="1" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Wybierz wiadomość</span>
          </div>
        ) : (
          <>
            <div
              className="px-5 py-3 flex items-center justify-between shrink-0"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)" }}
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{selected.subject || "(brak tematu)"}</div>
                <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                  {(selected.participants ?? []).join(", ")}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {sortedMessages.map((msg) => {
                const isOut = msg.direction === "outbound";
                return (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-4 text-sm ${isOut ? "ml-auto" : "mr-auto"}`}
                    style={{
                      maxWidth: "85%",
                      background: isOut ? "var(--accent-subtle)" : "var(--panel)",
                      border: `1px solid ${isOut ? "rgba(255,76,0,0.18)" : "var(--border)"}`,
                    }}
                  >
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <span className="font-medium text-xs">
                        {isOut ? "Ty" : (msg.from_name || msg.from_email)}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
                        {new Date(msg.sent_at).toLocaleString("pl-PL")}
                      </span>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", color: "var(--text)", lineHeight: 1.6 }}>
                      {msg.body_text || msg.body_html?.replace(/<[^>]+>/g, "") || ""}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 flex flex-col" style={{ borderTop: "1px solid var(--border)", background: "var(--panel)" }}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                  Odpowiedz
                </span>
                <div className="flex items-center gap-1 rounded-lg overflow-hidden text-xs font-medium"
                  style={{ border: "1px solid var(--border)" }}>
                  {(["text", "html"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setReplyMode(m)}
                      className="px-3 py-1 transition-colors"
                      style={{
                        background: replyMode === m ? "var(--accent)" : "transparent",
                        color: replyMode === m ? "#fff" : "var(--muted)",
                      }}
                    >
                      {m === "text" ? "Tekst" : "HTML"}
                    </button>
                  ))}
                </div>
              </div>

              {replyError && (
                <div className="px-4 text-xs text-red-500 mb-2">{replyError}</div>
              )}

              <textarea
                rows={4}
                placeholder={replyMode === "html" ? "<p>Treść maila w HTML…</p>" : "Napisz odpowiedź… (Cmd+Enter = wyślij)"}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
                className="mx-4 mb-2 rounded-lg px-3 py-2.5 text-sm resize-none"
                style={{
                  background: "var(--ba-4)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  outline: "none",
                  fontFamily: replyMode === "html" ? "monospace" : undefined,
                  fontSize: replyMode === "html" ? 12 : undefined,
                }}
              />

              <div className="flex items-center justify-between px-4 pb-4">
                <span className="text-xs" style={{ color: "var(--muted)" }}>Cmd+Enter aby wysłać</span>
                <button
                  onClick={sendReply}
                  disabled={replying || !reply.trim()}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "var(--accent)" }}
                >
                  {replying ? "Wysyłanie…" : "Wyślij →"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
