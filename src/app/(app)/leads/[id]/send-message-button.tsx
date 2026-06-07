"use client";

import { useState, useEffect } from "react";

type EmailAccount = { id: string; email: string; display_name: string };

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
  const [tab, setTab] = useState<"email" | "sms">("email");
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [accountId, setAccountId] = useState("");
  const [to, setTo] = useState(leadEmail ?? "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState(leadPhone ?? "");
  const [smsText, setSmsText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        html: body.replace(/\n/g, "<br>"),
        lead_id: leadId,
      }),
    });
    setSending(false);
    if (res.ok) {
      setSuccess("Mail wysłany!");
      setTimeout(() => { setOpen(false); setSuccess(""); setSubject(""); setBody(""); }, 1500);
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
      body: JSON.stringify({ phone, message: smsText, lead_id: leadId }),
    });
    setSending(false);
    if (res.ok) {
      setSuccess("SMS wysłany!");
      setTimeout(() => { setOpen(false); setSuccess(""); setSmsText(""); }, 1500);
    } else {
      const d = await res.json().catch(() => ({}));
      setError((d as { error?: string }).error ?? "Błąd wysyłania SMS");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors"
        style={{ background: "var(--accent-subtle)", color: "var(--accent-2)", border: "1px solid rgba(255,76,0,0.2)" }}
      >
        ✉ Wyślij wiadomość
      </button>

      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={{
            background: "var(--panel-solid, #fff)", border: "1px solid var(--border)",
            borderRadius: "14px", boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            padding: "24px 28px", width: "500px", maxWidth: "calc(100vw - 32px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>Wyślij wiadomość</h3>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "20px", padding: "0 4px" }}>✕</button>
            </div>

            {/* Tabs */}
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
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Nadawca</label>
                      <select
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
                        style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                      >
                        {accounts.map((a) => (
                          <option key={a.id} value={a.id}>{a.display_name || a.email} ({a.email})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Do</label>
                      <input
                        type="email" value={to} onChange={(e) => setTo(e.target.value)}
                        placeholder="adres@email.com"
                        className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
                        style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Temat</label>
                      <input
                        type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                        placeholder="Temat wiadomości"
                        className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
                        style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Treść</label>
                      <textarea
                        value={body} onChange={(e) => setBody(e.target.value)}
                        rows={5} placeholder="Treść wiadomości…"
                        className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                        style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Numer telefonu</label>
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+48 000 000 000"
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
                    style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <div>
                  <label className="text-[10.5px] font-semibold uppercase tracking-[0.09em] block mb-1" style={{ color: "var(--muted)" }}>Treść SMS</label>
                  <textarea
                    value={smsText} onChange={(e) => setSmsText(e.target.value)}
                    rows={4} placeholder="Treść wiadomości SMS…"
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
                    style={{ background: "var(--ba-3)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                  <div className="text-[11px] text-right mt-0.5" style={{ color: "var(--muted)" }}>{smsText.length} znaków</div>
                </div>
              </div>
            )}

            {error && <p className="text-[12px] mt-2" style={{ color: "#ef4444" }}>{error}</p>}
            {success && <p className="text-[12px] mt-2 font-semibold" style={{ color: "#22c55e" }}>{success}</p>}

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
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
