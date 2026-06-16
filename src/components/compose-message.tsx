"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type EmailAccount = { id: string; email: string; display_name: string };
type LeadHit = { id: string; full_name: string; phone: string | null; email: string | null };

export function ComposeDialog({
  open,
  onClose,
  leadId: fixedLeadId,
  leadEmail,
  leadPhone,
}: {
  open: boolean;
  onClose: () => void;
  leadId?: string;
  leadEmail?: string | null;
  leadPhone?: string | null;
}) {
  const globalMode = !fixedLeadId;

  const [tab, setTab] = useState<"email" | "sms">("email");
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [accountId, setAccountId] = useState("");
  const [leadId, setLeadId] = useState<string | undefined>(fixedLeadId);
  const [to, setTo] = useState(leadEmail ?? "");
  const [phone, setPhone] = useState(leadPhone ?? "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [smsText, setSmsText] = useState("");
  const [bodyMode, setBodyMode] = useState<"text" | "html">("text");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Lead picker (global mode only)
  const [leadQuery, setLeadQuery] = useState("");
  const [leadResults, setLeadResults] = useState<LeadHit[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadHit | null>(null);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<number | undefined>(undefined);

  // Reset recipient state each time a global dialog opens
  useEffect(() => {
    if (open && globalMode) {
      setLeadId(undefined);
      setSelectedLead(null);
      setLeadQuery("");
      setLeadResults([]);
      setTo("");
      setPhone("");
    }
    if (open) { setError(""); setSuccess(""); }
  }, [open, globalMode]);

  useEffect(() => {
    if (open && tab === "email") {
      fetch("/api/email/accounts")
        .then((r) => r.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          setAccounts(list);
          if (list.length > 0 && !accountId) setAccountId(list[0].id);
        })
        .catch(() => {});
    }
  }, [open, tab, accountId]);

  // Debounced lead search
  useEffect(() => {
    if (!globalMode || selectedLead) return;
    const q = leadQuery.trim();
    if (q.length < 2) { setLeadResults([]); return; }
    window.clearTimeout(searchRef.current);
    searchRef.current = window.setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/leads/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setLeadResults(Array.isArray(data) ? data : []);
      } catch {
        setLeadResults([]);
      }
      setSearching(false);
    }, 250);
    return () => window.clearTimeout(searchRef.current);
  }, [leadQuery, globalMode, selectedLead]);

  function pickLead(l: LeadHit) {
    setSelectedLead(l);
    setLeadId(l.id);
    setTo(l.email ?? "");
    setPhone(l.phone ?? "");
    setLeadResults([]);
    setLeadQuery("");
  }

  function clearLead() {
    setSelectedLead(null);
    setLeadId(undefined);
    setTo("");
    setPhone("");
  }

  async function sendEmail() {
    if (!accountId || !to || !subject || !body) return;
    setSending(true);
    setError("");
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: accountId,
        to,
        subject,
        html: bodyMode === "html" ? body : body.replace(/\n/g, "<br>"),
        text: bodyMode === "html" ? body.replace(/<[^>]+>/g, "") : body,
        lead_id: leadId,
      }),
    });
    setSending(false);
    if (res.ok) {
      setSuccess("Mail wysłany!");
      setTimeout(() => { onClose(); setSuccess(""); setSubject(""); setBody(""); }, 1500);
    } else {
      const d = await res.json().catch(() => ({}));
      setError((d as { error?: string }).error ?? "Błąd wysyłania");
    }
  }

  async function sendSms() {
    if (!phone || !smsText) return;
    setSending(true);
    setError("");
    const res = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone, message: smsText, lead_id: leadId }),
    });
    setSending(false);
    if (res.ok) {
      setSuccess("SMS wysłany!");
      setTimeout(() => { onClose(); setSuccess(""); setSmsText(""); }, 1500);
    } else {
      const d = await res.json().catch(() => ({}));
      setError((d as { error?: string }).error ?? "Błąd wysyłania SMS");
    }
  }

  const inputStyle = { background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" } as const;
  const labelCls = "text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1";

  const modal = open ? (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "var(--panel-solid, #fff)", border: "1px solid var(--border)",
        borderRadius: "12px", boxShadow: "0 16px 48px rgba(0,0,0,0.32)",
        padding: "24px 28px", width: "500px", maxWidth: "calc(100vw - 32px)",
        position: "relative", zIndex: 10000,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>Nowa wiadomość</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "20px", padding: "0 4px" }}>✕</button>
        </div>

        {/* Lead picker — global mode */}
        {globalMode && (
          <div style={{ marginBottom: "14px" }}>
            <label className={labelCls} style={{ color: "var(--muted)" }}>Odbiorca</label>
            {selectedLead ? (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={inputStyle}>
                <span className="text-[13px] font-medium truncate">
                  {selectedLead.full_name}
                  <span className="text-[var(--muted)] font-normal"> · {selectedLead.email ?? selectedLead.phone ?? "brak kontaktu"}</span>
                </span>
                <button onClick={clearLead} className="text-[12px] shrink-0 ml-2" style={{ color: "var(--accent-2)" }}>Zmień</button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text" value={leadQuery} onChange={(e) => setLeadQuery(e.target.value)}
                  placeholder="Szukaj leada (imię, e-mail, telefon)…"
                  className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
                  style={inputStyle}
                />
                {(searching || leadResults.length > 0) && (
                  <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 max-h-56 overflow-y-auto"
                    style={{ background: "var(--surface)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-md)" }}>
                    {searching && leadResults.length === 0 ? (
                      <div className="px-3 py-2 text-[12px]" style={{ color: "var(--muted)" }}>Szukam…</div>
                    ) : (
                      leadResults.map((l) => (
                        <button key={l.id} onClick={() => pickLead(l)}
                          className="w-full text-left px-3 py-2 text-[13px] hover:bg-[var(--ba-4)] flex flex-col">
                          <span className="font-medium truncate">{l.full_name}</span>
                          <span className="text-[11px] truncate" style={{ color: "var(--muted)" }}>{l.email ?? l.phone ?? "—"}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
                <p className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>…lub wpisz adres/numer ręcznie poniżej.</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-1 mb-5 p-1 rounded-lg" style={{ background: "var(--ba-3)" }}>
          {(["email", "sms"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setSuccess(""); }}
              className="flex-1 py-1.5 rounded-md text-[12.5px] font-semibold transition-all"
              style={{
                background: tab === t ? "var(--panel-solid)" : "transparent",
                color: tab === t ? "var(--text)" : "var(--muted)",
                border: tab === t ? "1px solid var(--border)" : "1px solid transparent",
                boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t === "email" ? "📧 E-mail" : "💬 SMS"}
            </button>
          ))}
        </div>

        {tab === "email" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {accounts.length === 0 ? (
              <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                Brak skonfigurowanych kont email.{" "}
                <a href="/integrations/email" style={{ color: "var(--accent-2)" }}>Dodaj konto →</a>
              </p>
            ) : (
              <>
                <div>
                  <label className={labelCls} style={{ color: "var(--muted)" }}>Nadawca</label>
                  <select
                    value={accountId} onChange={(e) => setAccountId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none" style={inputStyle}
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.display_name || a.email} ({a.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} style={{ color: "var(--muted)" }}>Do</label>
                  <input
                    type="email" value={to} onChange={(e) => setTo(e.target.value)}
                    placeholder="adres@email.com"
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none" style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "var(--muted)" }}>Temat</label>
                  <input
                    type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                    placeholder="Temat wiadomości"
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none" style={inputStyle}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em]" style={{ color: "var(--muted)" }}>Treść</label>
                    <div className="flex items-center gap-0.5 rounded-md overflow-hidden text-[11px] font-medium" style={{ border: "1px solid var(--border)" }}>
                      {(["text", "html"] as const).map((m) => (
                        <button
                          key={m} type="button" onClick={() => setBodyMode(m)}
                          style={{
                            padding: "2px 8px",
                            background: bodyMode === m ? "var(--accent)" : "transparent",
                            color: bodyMode === m ? "#fff" : "var(--muted)",
                            border: "none", cursor: "pointer",
                          }}
                        >
                          {m === "text" ? "Tekst" : "HTML"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={body} onChange={(e) => setBody(e.target.value)}
                    rows={6} placeholder={bodyMode === "html" ? "<p>Treść maila w HTML…</p>" : "Treść wiadomości…"}
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                    style={{ ...inputStyle, fontFamily: bodyMode === "html" ? "monospace" : undefined, fontSize: bodyMode === "html" ? 12 : undefined }}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label className={labelCls} style={{ color: "var(--muted)" }}>Numer telefonu</label>
              <input
                type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+48 000 000 000"
                className="w-full px-3 py-2 rounded-lg text-[13px] outline-none" style={inputStyle}
              />
            </div>
            <div>
              <label className={labelCls} style={{ color: "var(--muted)" }}>Treść SMS</label>
              <textarea
                value={smsText} onChange={(e) => setSmsText(e.target.value)}
                rows={4} placeholder="Treść wiadomości SMS…"
                className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none" style={inputStyle}
              />
              <div className="text-[11px] text-right mt-0.5" style={{ color: "var(--muted)" }}>{smsText.length} znaków</div>
            </div>
          </div>
        )}

        {error && <p className="text-[12px] mt-2" style={{ color: "var(--danger)" }}>{error}</p>}
        {success && <p className="text-[12px] mt-2 font-semibold" style={{ color: "var(--success)" }}>{success}</p>}

        <div className="flex gap-2 mt-4">
          <button
            onClick={tab === "email" ? sendEmail : sendSms}
            disabled={sending || (tab === "email" ? !accountId || !to || !subject || !body : !phone || !smsText)}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all disabled:opacity-40"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {sending ? "Wysyłanie…" : `Wyślij ${tab === "email" ? "e-mail" : "SMS"}`}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return typeof document !== "undefined" && modal ? createPortal(modal, document.body) : null;
}

// Lead-scoped trigger (used on lead detail + kanban). Keeps the original API.
export function SendMessageButton({
  leadId,
  leadEmail,
  leadPhone,
}: {
  leadId: string;
  leadEmail: string | null;
  leadPhone: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors"
        style={{ background: "var(--accent-subtle)", color: "var(--accent-2)", border: "1px solid rgba(255,76,0,0.2)" }}
      >
        ✉ Wyślij wiadomość
      </button>
      <ComposeDialog open={open} onClose={() => setOpen(false)} leadId={leadId} leadEmail={leadEmail} leadPhone={leadPhone} />
    </>
  );
}

// Global trigger (used in the inbox header). No lead context — picker enabled.
export function ComposeButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all ${className}`}
        style={{ background: "var(--accent)" }}
      >
        ✉ Nowa wiadomość
      </button>
      <ComposeDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
