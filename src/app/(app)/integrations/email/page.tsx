"use client";

import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailAccount {
  id: string; email: string; display_name: string; purpose: string; is_active: boolean;
}
interface Campaign {
  id: string; name: string; subject: string; status: string; total_sent: number;
  sent_at: string | null; created_at: string;
  email_accounts: { email: string; display_name: string } | null;
  email_outreach_recipients: { status: string; opened_at: string | null; clicked_at: string | null; replied_at: string | null }[];
}
interface CampaignDetail extends Omit<Campaign, "email_outreach_recipients"> {
  body_html: string; body_text: string; account_id: string;
  stats: { total: number; sent: number; opened: number; clicked: number; replied: number; openRate: number; clickRate: number; replyRate: number };
  dailyStats: { date: string; opens: number; clicks: number }[];
  email_outreach_recipients: Recipient[];
}
interface Recipient {
  id: string; email: string; name: string | null; status: string;
  sent_at: string | null; opened_at: string | null; clicked_at: string | null; replied_at: string | null;
  reply_count?: number;
}
interface Thread {
  id: string; subject: string; participants: string[]; is_read: boolean;
  last_message_at: string; email_thread_messages: ThreadMessage[];
}
interface ThreadMessage {
  id: string; from_email: string; from_name: string | null;
  body_html: string | null; body_text: string | null;
  sent_at: string; direction: "inbound" | "outbound"; is_read: boolean;
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Panel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
      {children}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
      <div className="text-xs text-[var(--muted)] mb-1">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-[var(--muted)] mt-0.5">{sub}</div>}
    </div>
  );
}

const STATUS_STYLES: Record<string, [string, string]> = {
  sent: ["#22c55e1a", "#16a34a"],
  opened: ["#3b82f61a", "#2563eb"],
  clicked: ["#8b5cf61a", "#7c3aed"],
  replied: ["#f59e0b1a", "#d97706"],
  pending: ["rgba(0,0,0,0.05)", "#78716C"],
  failed: ["#ef44441a", "#dc2626"],
  draft: ["rgba(0,0,0,0.05)", "#78716C"],
};
const STATUS_LABELS: Record<string, string> = {
  sent: "Wysłano", opened: "Otwarto", clicked: "Kliknięto",
  replied: "Odpisano", pending: "Oczekuje", failed: "Błąd", draft: "Szkic",
};
function StatusBadge({ status }: { status: string }) {
  const [bg, color] = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: bg, color }}>{STATUS_LABELS[status] ?? status}</span>;
}

function Input({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--muted)] block mb-1">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2.5 text-sm"
        style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
    </div>
  );
}

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg rounded-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-auto" style={{ background: "var(--surface)", boxShadow: "var(--shadow-lg)" }}>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ icon = true, text }: { icon?: boolean; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-[var(--muted)] h-full py-12">
      {icon && (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto mb-3 opacity-30">
          <rect x="2" y="5" width="20" height="15" rx="2.5" /><path d="M2 8l10 7 10-7" />
        </svg>
      )}
      <p className="text-sm">{text}</p>
    </div>
  );
}

// ─── Outreach Tab ─────────────────────────────────────────────────────────────

function OutreachTab({ accounts }: { accounts: EmailAccount[] }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<CampaignDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", subject: "", body_html: "", body_text: "", account_id: "" });
  const [recipientsText, setRecipientsText] = useState("");
  const [sending, setSending] = useState(false);
  const [recipientPanel, setRecipientPanel] = useState<{
    recipient: Recipient;
    campaign: { id: string; account_id: string; subject: string; body_text: string; body_html: string };
    threads: Thread[];
  } | null>(null);
  const [loadingPanel, setLoadingPanel] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replyMode, setReplyMode] = useState<"text" | "html">("text");
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [syncingReplies, setSyncingReplies] = useState(false);
  const [viewedRecipients, setViewedRecipients] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/email/outreach/campaigns");
    const data = await res.json();
    setCampaigns(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (accounts.length > 0) setNewForm(f => ({ ...f, account_id: f.account_id || accounts[0].id }));
  }, [load, accounts]);

  const selectCampaign = async (id: string) => {
    const res = await fetch(`/api/email/outreach/campaigns/${id}`);
    const data = await res.json();
    setSelected(data);
    if (data?.id !== selected?.id) setViewedRecipients(new Set());
  };

  const createCampaign = async () => {
    if (!newForm.name || !newForm.subject || !newForm.account_id) return;
    const res = await fetch("/api/email/outreach/campaigns", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newForm),
    });
    if (res.ok) {
      setShowNew(false);
      setNewForm(f => ({ ...f, name: "", subject: "", body_html: "", body_text: "" }));
      await load();
    }
  };

  const sendCampaign = async () => {
    if (!selected) return;
    setSending(true);
    const lines = recipientsText.split(/[\n,;]/).map(s => s.trim()).filter(Boolean);
    const recipients = lines.map(line => {
      const [email, name] = line.split("|").map(s => s.trim());
      return { email, name: name || undefined };
    });
    const res = await fetch(`/api/email/outreach/campaigns/${selected.id}/send`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recipients }),
    });
    const data = await res.json();
    setSending(false);
    if (res.ok) {
      setShowSend(false);
      setRecipientsText("");
      await selectCampaign(selected.id);
      await load();
    } else {
      alert(data.error ?? "Błąd wysyłki");
    }
  };

  const deleteCampaign = async () => {
    if (!selected || !confirm(`Usuń kampanię "${selected.name}"?`)) return;
    await fetch(`/api/email/outreach/campaigns/${selected.id}`, { method: "DELETE" });
    setSelected(null);
    await load();
  };

  const recipientCount = recipientsText.split(/[\n,;]/).map(s => s.trim()).filter(Boolean).length;

  const openRecipientPanel = async (r: Recipient) => {
    if (!selected) return;
    setLoadingPanel(true);
    setRecipientPanel(null);
    setReplyText("");
    setReplySubject(`Re: ${selected.subject}`);
    setViewedRecipients(prev => new Set(prev).add(r.id));
    const res = await fetch(`/api/email/outreach/campaigns/${selected.id}/recipients/${r.id}/correspondence`);
    const data = await res.json();
    setRecipientPanel(data);
    setLoadingPanel(false);
  };

  const syncReplies = async (recipientId?: string) => {
    if (!selected) return;
    setSyncingReplies(true);
    await fetch(`/api/email/inbox?account_id=${selected.account_id}&sync=1`);
    await selectCampaign(selected.id);
    const panelRecipientId = recipientId ?? recipientPanel?.recipient.id;
    if (panelRecipientId) {
      const res = await fetch(`/api/email/outreach/campaigns/${selected.id}/recipients/${panelRecipientId}/correspondence`);
      setRecipientPanel(await res.json());
    }
    setSyncingReplies(false);
  };

  const sendFollowUp = async () => {
    if (!recipientPanel || !replyText.trim() || !selected) return;
    setSendingReply(true);
    const { recipient, campaign, threads } = recipientPanel;
    const existingThread = threads[0];
    await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: campaign.account_id,
        to: recipient.email,
        to_name: recipient.name ?? undefined,
        subject: replySubject || `Re: ${campaign.subject}`,
        html: replyMode === "html" ? replyText : `<p>${replyText.replace(/\n/g, "<br>")}</p>`,
        text: replyMode === "html" ? replyText.replace(/<[^>]+>/g, "") : replyText,
        thread_id: existingThread?.id ?? undefined,
      }),
    });
    setReplyText("");
    setSendingReply(false);
    const res = await fetch(`/api/email/outreach/campaigns/${selected.id}/recipients/${recipient.id}/correspondence`);
    setRecipientPanel(await res.json());
  };

  return (
    <div className="flex gap-4 h-full min-h-0">
      {/* Campaign list */}
      <div className="w-72 shrink-0 flex flex-col gap-2">
        <button onClick={() => setShowNew(true)} className="w-full rounded-lg py-2.5 text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>
          + Nowa kampania
        </button>
        <Panel className="flex-1 overflow-auto">
          {loading ? (
            <div className="p-4 text-sm text-[var(--muted)]">Ładowanie…</div>
          ) : campaigns.length === 0 ? (
            <EmptyState text="Brak kampanii. Utwórz pierwszą." />
          ) : campaigns.map((c, i) => {
            const recps = c.email_outreach_recipients ?? [];
            const sentCount = recps.filter(r => r.status === "sent").length;
            const isActive = selected?.id === c.id;
            return (
              <button key={c.id} onClick={() => selectCampaign(c.id)}
                className="w-full text-left px-4 py-3 transition-colors"
                style={{
                  background: isActive ? "var(--accent-subtle)" : undefined,
                  borderBottom: i < campaigns.length - 1 ? "1px solid var(--border)" : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-sm font-medium truncate" style={{ color: isActive ? "var(--accent)" : "var(--text)" }}>{c.name}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div className="text-xs text-[var(--muted)] truncate">{c.subject}</div>
                {sentCount > 0 && <div className="text-xs text-[var(--muted)] mt-0.5">{sentCount} wysłanych</div>}
              </button>
            );
          })}
        </Panel>
      </div>

      {/* Campaign detail */}
      <div className="flex-1 min-w-0 overflow-auto flex flex-col gap-4">
        {!selected ? (
          <Panel className="flex-1"><EmptyState text="Wybierz kampanię z listy lub utwórz nową" /></Panel>
        ) : (
          <>
            <Panel className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg font-semibold">{selected.name}</h2>
                    <StatusBadge status={selected.status} />
                  </div>
                  <div className="text-sm text-[var(--muted)]">Temat: {selected.subject}</div>
                  {selected.email_accounts && (
                    <div className="text-xs text-[var(--muted)] mt-0.5">
                      Od: {selected.email_accounts.display_name} &lt;{selected.email_accounts.email}&gt;
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => syncReplies()} disabled={syncingReplies} title="Pobierz odpowiedzi ze skrzynki"
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                    {syncingReplies ? "…" : "↻ Synchronizuj odpowiedzi"}
                  </button>
                  <button onClick={() => setShowSend(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>Wyślij kampanię</button>
                  <button onClick={deleteCampaign} className="px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-red-600 transition-colors">Usuń</button>
                </div>
              </div>
            </Panel>

            <div className="grid grid-cols-4 gap-3">
              <Stat label="Wysłane" value={selected.stats.sent} />
              <Stat label="Otwarte" value={selected.stats.opened} sub={`${selected.stats.openRate}% open rate`} />
              <Stat label="Kliknięcia" value={selected.stats.clicked} sub={`${selected.stats.clickRate}% click rate`} />
              <Stat label="Odpowiedzi" value={selected.stats.replied} sub={`${selected.stats.replyRate}% reply rate`} />
            </div>

            <Panel className="p-5">
              <div className="text-sm font-medium mb-4">Aktywność dzienna</div>
              {selected.dailyStats.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-sm text-[var(--muted)]">Brak danych — wyślij kampanię aby zobaczyć statystyki</div>
              ) : (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selected.dailyStats} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                      <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
                      <XAxis dataKey="date" stroke="#78716C" style={{ fontSize: 11 }}
                        tickFormatter={d => new Date(d).toLocaleDateString("pl-PL", { month: "short", day: "numeric" })} />
                      <YAxis stroke="#78716C" style={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 7, fontSize: 12, color: "#0C0A08", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                      <Line type="monotone" dataKey="opens" stroke="#FF4C00" strokeWidth={2} dot={false} name="Otwarcia" />
                      <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} dot={false} name="Kliknięcia" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Panel>

            <Panel className="p-5">
              <div className="text-sm font-medium mb-3">Odbiorcy ({selected.email_outreach_recipients.length})</div>
              {selected.email_outreach_recipients.length === 0 ? (
                <div className="text-sm text-[var(--muted)]">Brak odbiorców. Kliknij "Wyślij kampanię" aby dodać odbiorców i wysłać maile.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-[var(--muted)]" style={{ borderBottom: "1px solid var(--border)" }}>
                        {["Email", "Imię", "Status", "Wysłano", "Otwarto", ""].map(h => (
                          <th key={h} className="text-left pb-2.5 pr-4 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selected.email_outreach_recipients.map(r => (
                        <tr key={r.id} className="cursor-pointer hover:bg-[var(--ba-4)] transition-colors"
                          style={{ borderBottom: "1px solid var(--border)" }}
                          onClick={() => openRecipientPanel(r)}>
                          <td className="py-2.5 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{r.email}</span>
                              {(r.reply_count ?? 0) > 0 && !viewedRecipients.has(r.id) && (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white shrink-0"
                                  style={{ background: "#dc2626", fontSize: 10 }}>
                                  {r.reply_count}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 pr-4 text-[var(--muted)]">{r.name ?? "—"}</td>
                          <td className="py-2.5 pr-4"><StatusBadge status={r.status} /></td>
                          <td className="py-2.5 pr-4 text-[var(--muted)]">{r.sent_at ? new Date(r.sent_at).toLocaleDateString("pl-PL") : "—"}</td>
                          <td className="py-2.5 pr-4 text-[var(--muted)]">{r.opened_at ? new Date(r.opened_at).toLocaleDateString("pl-PL") : "—"}</td>
                          <td className="py-2.5">
                            <span className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
                              style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
                              Korespondencja →
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel className="p-5">
              <div className="text-sm font-medium mb-3">Podgląd treści</div>
              <textarea readOnly rows={5} className="w-full text-sm rounded-lg p-3 resize-none"
                value={selected.body_text || selected.body_html?.replace(/<[^>]+>/g, "") || ""}
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
            </Panel>
          </>
        )}
      </div>

      {/* New campaign modal */}
      {showNew && (
        <Modal onClose={() => setShowNew(false)}>
          <h3 className="text-base font-semibold">Nowa kampania</h3>
          {accounts.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">Najpierw dodaj konto email w zakładce Konta.</p>
          ) : (
            <>
              <Input label="Nazwa kampanii" value={newForm.name} onChange={v => setNewForm(f => ({ ...f, name: v }))} placeholder="np. Lead Magnet Wrzesień 2026" />
              <Input label="Temat wiadomości" value={newForm.subject} onChange={v => setNewForm(f => ({ ...f, subject: v }))} placeholder="np. Odbierz swój bezpłatny poradnik" />
              <div>
                <label className="text-xs text-[var(--muted)] block mb-1">Konto nadawcy</label>
                <select value={newForm.account_id} onChange={e => setNewForm(f => ({ ...f, account_id: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }}>
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.display_name} ({a.email})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--muted)] block mb-1">Treść wiadomości (HTML)</label>
                <textarea rows={7} placeholder="<p>Treść emaila...</p>" value={newForm.body_html}
                  onChange={e => setNewForm(f => ({ ...f, body_html: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm resize-none font-mono"
                  style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--muted)" }}>Anuluj</button>
                <button onClick={createCampaign} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>Utwórz kampanię</button>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* Recipient correspondence drawer */}
      {(loadingPanel || recipientPanel) && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={e => e.target === e.currentTarget && setRecipientPanel(null)}>
          <div className="w-full max-w-lg h-full flex flex-col shadow-2xl"
            style={{ background: "var(--surface)", borderLeft: "1px solid var(--border)" }}>
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="min-w-0">
                <div className="font-semibold truncate">
                  {recipientPanel?.recipient.name
                    ? `${recipientPanel.recipient.name} — ${recipientPanel.recipient.email}`
                    : recipientPanel?.recipient.email ?? "Ładowanie…"}
                </div>
                {recipientPanel && (
                  <div className="text-xs text-[var(--muted)] mt-0.5 flex items-center gap-2">
                    <StatusBadge status={recipientPanel.recipient.status} />
                    {recipientPanel.recipient.sent_at && (
                      <span>Wysłano {new Date(recipientPanel.recipient.sent_at).toLocaleDateString("pl-PL")}</span>
                    )}
                  </div>
                )}
              </div>
              <button onClick={() => { setRecipientPanel(null); setReplyText(""); }}
                className="ml-4 shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors text-lg leading-none">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-5 flex flex-col gap-3">
              {loadingPanel && !recipientPanel ? (
                <div className="text-sm text-[var(--muted)]">Ładowanie korespondencji…</div>
              ) : (
                <>
                  {/* Original campaign email */}
                  <div className="rounded-xl p-4 text-sm"
                    style={{ background: "var(--accent-subtle)", border: "1px solid rgba(255,76,0,0.18)" }}>
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <span className="font-medium text-xs">
                        {recipientPanel?.campaign.subject
                          ? `📧 ${recipientPanel.campaign.subject}`
                          : "Oryginalny email kampanii"}
                      </span>
                      {recipientPanel?.recipient.sent_at && (
                        <span className="text-xs text-[var(--muted)] shrink-0">
                          {new Date(recipientPanel.recipient.sent_at).toLocaleString("pl-PL")}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--muted)] mb-1">Wysłano jako część kampanii</div>
                    <div className="text-sm" style={{ whiteSpace: "pre-wrap", color: "var(--text)", lineHeight: 1.6 }}>
                      {recipientPanel?.campaign.body_text
                        || recipientPanel?.campaign.body_html?.replace(/<[^>]+>/g, "")
                        || ""}
                    </div>
                  </div>

                  {/* Thread messages */}
                  {recipientPanel?.threads.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-6">
                      <p className="text-xs text-center text-[var(--muted)]">
                        Brak odpowiedzi w bazie — pobierz skrzynkę aby wczytać replies.
                      </p>
                      <button onClick={() => syncReplies(recipientPanel?.recipient.id)}
                        disabled={syncingReplies}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}>
                        {syncingReplies ? "Pobieranie…" : "↻ Pobierz odpowiedzi ze skrzynki"}
                      </button>
                    </div>
                  ) : (
                    recipientPanel?.threads.flatMap(thread =>
                      [...(thread.email_thread_messages ?? [])]
                        .sort((a, b) => a.sent_at.localeCompare(b.sent_at))
                        .map(msg => (
                          <div key={msg.id}
                            className={`rounded-xl p-4 text-sm ${msg.direction === "outbound" ? "ml-4" : "mr-4"}`}
                            style={{
                              background: msg.direction === "outbound" ? "var(--accent-subtle)" : "var(--ba-4)",
                              border: `1px solid ${msg.direction === "outbound" ? "rgba(255,76,0,0.18)" : "var(--border)"}`,
                            }}>
                            <div className="flex justify-between items-center gap-4 mb-2">
                              <span className="font-medium text-xs">
                                {msg.direction === "outbound" ? "Ty" : (msg.from_name || msg.from_email)}
                              </span>
                              <span className="text-xs text-[var(--muted)] shrink-0">
                                {new Date(msg.sent_at).toLocaleString("pl-PL")}
                              </span>
                            </div>
                            <div style={{ whiteSpace: "pre-wrap", color: "var(--text)", lineHeight: 1.6 }}>
                              {msg.body_text || msg.body_html?.replace(/<[^>]+>/g, "") || ""}
                            </div>
                          </div>
                        ))
                    )
                  )}
                </>
              )}
            </div>

            {/* Reply composer */}
            <div className="shrink-0 flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
              {/* Composer header row */}
              <div className="flex items-center justify-between px-5 pt-3 pb-2">
                <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">Odpowiedz</span>
                <div className="flex items-center gap-1 rounded-lg overflow-hidden text-xs font-medium"
                  style={{ border: "1px solid var(--border)" }}>
                  {(["text", "html"] as const).map(m => (
                    <button key={m} onClick={() => { setReplyMode(m); setShowHtmlPreview(false); }}
                      className="px-3 py-1 transition-colors"
                      style={{
                        background: replyMode === m ? "var(--accent)" : "transparent",
                        color: replyMode === m ? "#fff" : "var(--muted)",
                      }}>
                      {m === "text" ? "Tekst" : "HTML"}
                    </button>
                  ))}
                </div>
              </div>

              {/* To / Subject */}
              <div className="flex items-center gap-3 px-5 py-2" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <span className="text-xs text-[var(--muted)] w-12 shrink-0">Do:</span>
                <span className="text-sm">{recipientPanel?.recipient.email ?? ""}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-xs text-[var(--muted)] w-12 shrink-0">Temat:</span>
                <input value={replySubject} onChange={e => setReplySubject(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none"
                  style={{ color: "var(--text)" }} />
              </div>

              {/* Body — code editor in HTML mode */}
              {replyMode === "html" && showHtmlPreview ? (
                <div className="mx-5 my-3 rounded-lg overflow-auto" style={{ height: 140, border: "1px solid var(--border)" }}>
                  <iframe
                    srcDoc={replyText}
                    sandbox="allow-same-origin"
                    className="w-full h-full"
                    style={{ background: "#fff" }}
                  />
                </div>
              ) : (
                <textarea rows={5} placeholder={replyMode === "html" ? "<p>Treść maila w HTML…</p>" : "Treść wiadomości…"}
                  value={replyText} onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendFollowUp(); } }}
                  className="mx-5 my-3 rounded-lg px-3 py-2.5 text-sm resize-none"
                  style={{
                    background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none",
                    fontFamily: replyMode === "html" ? "monospace" : undefined,
                    fontSize: replyMode === "html" ? 12 : undefined,
                  }} />
              )}

              {/* Footer */}
              <div className="flex items-center justify-between px-5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)]">Ctrl+Enter aby wysłać</span>
                  {replyMode === "html" && replyText.trim() && (
                    <button onClick={() => setShowHtmlPreview(v => !v)}
                      className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                      style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                      {showHtmlPreview ? "Kod" : "Podgląd"}
                    </button>
                  )}
                </div>
                <button onClick={sendFollowUp} disabled={sendingReply || !replyText.trim()}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "var(--accent)" }}>
                  {sendingReply ? "Wysyłanie…" : "Wyślij →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send modal */}
      {showSend && selected && (
        <Modal onClose={() => setShowSend(false)}>
          <h3 className="text-base font-semibold">Wyślij kampanię: {selected.name}</h3>
          <div>
            <label className="text-xs text-[var(--muted)] block mb-1">
              Odbiorcy — jeden per linię, opcjonalnie: <code className="px-1 rounded" style={{ background: "var(--ba-8)" }}>email|Imię</code>
            </label>
            <textarea rows={8} placeholder={"jan@example.com\nanna@firma.pl|Anna\nbiuro@example.com|Firma ABC"}
              value={recipientsText} onChange={e => setRecipientsText(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm font-mono resize-none"
              style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
            <div className="text-xs text-[var(--muted)] mt-1">{recipientCount} {recipientCount === 1 ? "odbiorca" : "odbiorców"}</div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowSend(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--muted)" }}>Anuluj</button>
            <button onClick={sendCampaign} disabled={sending || recipientCount === 0}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: "var(--accent)" }}>
              {sending ? "Wysyłanie…" : `Wyślij do ${recipientCount}`}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Inbox Tab ────────────────────────────────────────────────────────────────

function InboxTab({ accounts }: { accounts: EmailAccount[] }) {
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  const loadThreads = useCallback(async (sync = false) => {
    if (!accountId) return;
    sync ? setSyncing(true) : setLoading(true);
    try {
      const res = await fetch(`/api/email/inbox?account_id=${accountId}${sync ? "&sync=1" : ""}`);
      const data = await res.json();
      setThreads(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, [accountId]);

  useEffect(() => {
    setSelected(null);
    loadThreads();
  }, [loadThreads]);

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    setReplying(true);
    const msgs = [...(selected.email_thread_messages ?? [])].sort((a, b) => a.sent_at.localeCompare(b.sent_at));
    const last = msgs[msgs.length - 1];
    await fetch("/api/email/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: accountId,
        to: last?.from_email,
        to_name: last?.from_name,
        subject: `Re: ${selected.subject.replace(/^Re:\s*/i, "")}`,
        html: `<p>${reply.replace(/\n/g, "<br>")}</p>`,
        text: reply,
        thread_id: selected.id,
      }),
    });
    setReply("");
    setReplying(false);
    await loadThreads();
  };

  const sortedMessages = selected
    ? [...(selected.email_thread_messages ?? [])].sort((a, b) => a.sent_at.localeCompare(b.sent_at))
    : [];

  return (
    <div className="flex gap-4 h-full min-h-0">
      {/* Thread list */}
      <div className="w-72 shrink-0 flex flex-col gap-2">
        <div className="flex gap-2">
          <select value={accountId} onChange={e => setAccountId(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }}>
            {accounts.map(a => <option key={a.id} value={a.id}>{a.email}</option>)}
          </select>
          <button onClick={() => loadThreads(true)} disabled={syncing} title="Synchronizuj IMAP"
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>
            {syncing ? "…" : "↻"}
          </button>
        </div>
        <Panel className="flex-1 overflow-auto">
          {loading ? (
            <div className="p-4 text-sm text-[var(--muted)]">Ładowanie…</div>
          ) : threads.length === 0 ? (
            <EmptyState text="Brak wiadomości. Kliknij ↻ aby synchronizować ze skrzynką." />
          ) : threads.map((t, i) => {
            const lastMsg = t.email_thread_messages?.[0];
            const isActive = selected?.id === t.id;
            return (
              <button key={t.id} onClick={() => setSelected(t)}
                className="w-full text-left px-4 py-3 transition-colors hover:bg-[var(--ba-4)]"
                style={{ background: isActive ? "var(--accent-subtle)" : undefined, borderBottom: i < threads.length - 1 ? "1px solid var(--border)" : undefined }}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  {!t.is_read && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                  <span className={`text-sm truncate ${!t.is_read ? "font-semibold" : ""}`}
                    style={{ color: isActive ? "var(--accent)" : "var(--text)" }}>{t.subject}</span>
                </div>
                {lastMsg && <div className="text-xs text-[var(--muted)] truncate">{lastMsg.from_email}: {lastMsg.body_text?.slice(0, 55)}</div>}
                <div className="text-xs text-[var(--muted)] mt-0.5">{new Date(t.last_message_at).toLocaleDateString("pl-PL")}</div>
              </button>
            );
          })}
        </Panel>
      </div>

      {/* Thread detail + reply */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        {!selected ? (
          <Panel className="flex-1"><EmptyState text="Wybierz wątek z listy" /></Panel>
        ) : (
          <>
            <Panel className="flex-1 overflow-auto p-5 flex flex-col gap-3 min-h-0">
              <h2 className="text-base font-semibold pb-2.5 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>{selected.subject}</h2>
              <div className="flex-1 overflow-auto flex flex-col gap-3">
                {sortedMessages.map(msg => (
                  <div key={msg.id}
                    className={`rounded-xl p-4 text-sm ${msg.direction === "outbound" ? "ml-auto" : ""}`}
                    style={{
                      maxWidth: "85%",
                      background: msg.direction === "outbound" ? "var(--accent-subtle)" : "var(--ba-4)",
                      border: `1px solid ${msg.direction === "outbound" ? "rgba(255,76,0,0.18)" : "var(--border)"}`,
                    }}>
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <span className="font-medium text-xs">{msg.from_name || msg.from_email}</span>
                      <span className="text-xs text-[var(--muted)] shrink-0">{new Date(msg.sent_at).toLocaleString("pl-PL")}</span>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", color: "var(--text)", lineHeight: 1.6 }}>
                      {msg.body_text || msg.body_html?.replace(/<[^>]+>/g, "") || ""}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-4 flex gap-3 items-end shrink-0">
              <textarea rows={3} placeholder="Napisz odpowiedź… (Cmd+Enter aby wysłać)"
                value={reply} onChange={e => setReply(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendReply(); } }}
                className="flex-1 rounded-lg px-3 py-2.5 text-sm resize-none"
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
              <button onClick={sendReply} disabled={replying || !reply.trim()}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50 shrink-0"
                style={{ background: "var(--accent)" }}>
                {replying ? "…" : "Wyślij"}
              </button>
            </Panel>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Accounts Tab ─────────────────────────────────────────────────────────────

const PURPOSES: Record<string, string> = {
  general: "Ogólne", outreach: "Outreach", contact: "Kontakt",
  newsletter: "Newsletter", seo: "SEO", social: "Social media",
};

function AccountsTab({ onChanged }: { onChanged: () => void }) {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", display_name: "", purpose: "general" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/email/accounts");
    const data = await res.json();
    setAccounts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { load(); }, []);

  const addAccount = async () => {
    if (!form.email || !form.password) { setError("Email i hasło są wymagane"); return; }
    setSaving(true); setError("");
    const res = await fetch("/api/email/accounts", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setShowAdd(false);
      setForm({ email: "", password: "", display_name: "", purpose: "general" });
      await load();
      onChanged();
    } else {
      setError(data.error ?? "Błąd podczas dodawania konta");
    }
  };

  const deleteAccount = async (id: string) => {
    if (!confirm("Usuń to konto email?")) return;
    await fetch(`/api/email/accounts?id=${id}`, { method: "DELETE" });
    await load();
    onChanged();
  };

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Konta email ({accounts.length})</h2>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>
          + Dodaj konto
        </button>
      </div>

      <Panel>
        {accounts.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--muted)]">
            Brak skrzynek pocztowych. Dodaj konto aby zacząć wysyłać i odbierać maile.
          </div>
        ) : accounts.map((a, i) => (
          <div key={a.id} className="flex items-center px-5 py-4 gap-3"
            style={{ borderBottom: i < accounts.length - 1 ? "1px solid var(--border)" : undefined }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
              style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
              {a.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{a.display_name}</div>
              <div className="text-xs text-[var(--muted)] truncate">{a.email} · {PURPOSES[a.purpose] ?? a.purpose}</div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
              style={{ background: a.is_active ? "#22c55e1a" : "var(--ba-6)", color: a.is_active ? "#16a34a" : "var(--muted)" }}>
              {a.is_active ? "Aktywne" : "Nieaktywne"}
            </span>
            <button onClick={() => deleteAccount(a.id)} className="text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>Usuń</button>
          </div>
        ))}
      </Panel>

      <div className="mt-4 rounded-xl p-4 text-sm" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
        <p className="font-medium mb-1">Dane serwera LH.pl</p>
        <p className="text-[var(--muted)]">SMTP: mail-serwer359077.lh.pl · port 465 SSL</p>
        <p className="text-[var(--muted)]">IMAP: mail-serwer359077.lh.pl · port 993 SSL</p>
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 className="text-base font-semibold">Dodaj konto email</h3>
          <div className="rounded-lg p-3 text-xs text-[var(--muted)]" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
            Serwer: mail-serwer359077.lh.pl · SMTP 465 SSL · IMAP 993 SSL
          </div>
          <Input label="Adres email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" placeholder="jakub@beautyrise.pl" />
          <Input label="Hasło" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} type="password" />
          <Input label="Nazwa wyświetlana" value={form.display_name} onChange={v => setForm(f => ({ ...f, display_name: v }))} placeholder="Jakub – BeautyRise" />
          <div>
            <label className="text-xs text-[var(--muted)] block mb-1">Przeznaczenie</label>
            <select value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }}>
              {Object.entries(PURPOSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--muted)" }}>Anuluj</button>
            <button onClick={addAccount} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: "var(--accent)" }}>
              {saving ? "Dodawanie…" : "Dodaj konto"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = "outreach" | "kontakt" | "konta";
const TABS: { id: TabId; label: string }[] = [
  { id: "outreach", label: "Outreach" },
  { id: "kontakt", label: "Kontakt" },
  { id: "konta", label: "Konta" },
];

export default function EmailPage() {
  const [tab, setTab] = useState<TabId>("outreach");
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);

  const loadAccounts = useCallback(async () => {
    const res = await fetch("/api/email/accounts");
    const data = await res.json();
    setAccounts(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { loadAccounts(); }, [loadAccounts]);

  return (
    <div className="flex flex-col h-full anim-page" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="heat-glow px-8 pt-8 pb-0 shrink-0">
        <h1 className="text-2xl font-semibold mb-1">Email</h1>
        <p className="text-sm text-[var(--muted)] mb-4">Zarządzaj kampaniami outreach i skrzynkami pocztowymi</p>
        <div className="flex gap-0.5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-2 text-sm font-medium transition-colors rounded-t-lg"
              style={{
                background: tab === t.id ? "var(--surface)" : "transparent",
                color: tab === t.id ? "var(--text)" : "var(--muted)",
                border: tab === t.id ? "1px solid var(--border)" : "1px solid transparent",
                borderBottom: tab === t.id ? "1px solid var(--surface)" : "1px solid transparent",
                marginBottom: tab === t.id ? "-1px" : 0,
                position: "relative",
                zIndex: tab === t.id ? 1 : 0,
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 px-8 py-5" style={{ borderTop: "1px solid var(--border)" }}>
        {tab === "outreach" && (
          accounts.length === 0
            ? <div className="text-sm text-[var(--muted)] pt-4">Najpierw dodaj konto email w zakładce <button onClick={() => setTab("konta")} className="underline" style={{ color: "var(--accent)" }}>Konta</button>.</div>
            : <OutreachTab accounts={accounts} />
        )}
        {tab === "kontakt" && (
          accounts.length === 0
            ? <div className="text-sm text-[var(--muted)] pt-4">Najpierw dodaj konto email w zakładce <button onClick={() => setTab("konta")} className="underline" style={{ color: "var(--accent)" }}>Konta</button>.</div>
            : <InboxTab accounts={accounts} />
        )}
        {tab === "konta" && <AccountsTab onChanged={loadAccounts} />}
      </div>
    </div>
  );
}
