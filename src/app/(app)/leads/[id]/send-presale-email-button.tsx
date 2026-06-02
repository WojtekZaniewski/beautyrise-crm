"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SendPresaleEmailButton({
  leadId,
  hasEmail,
  leadEmail,
}: {
  leadId: string;
  hasEmail: boolean;
  leadEmail: string | null;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [currentEmail, setCurrentEmail] = useState(leadEmail);
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(leadEmail ?? "");
  const [savingEmail, setSavingEmail] = useState(false);
  const router = useRouter();

  const canSend = !!currentEmail;

  function openModal() {
    if (state === "sending" || state === "sent") return;
    setCurrentEmail(leadEmail);
    setEmailInput(leadEmail ?? "");
    setEditingEmail(!leadEmail);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEmail(false);
  }

  async function saveEmail() {
    const trimmed = emailInput.trim();
    setSavingEmail(true);
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed || null }),
    });
    setSavingEmail(false);
    setCurrentEmail(trimmed || null);
    setEditingEmail(false);
    router.refresh();
  }

  async function handleSend() {
    if (!currentEmail) return;
    setState("sending");
    try {
      const res = await fetch(`/api/leads/${leadId}/send-presale-email`, { method: "POST" });
      if (res.ok) {
        setState("sent");
        closeModal();
        setTimeout(() => setState("idle"), 5000);
      } else {
        const data = await res.json();
        alert(data.error ?? "Błąd wysyłania");
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        disabled={state === "sending" || state === "sent"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          padding: "9px 18px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: state === "sending" || state === "sent" ? "default" : "pointer",
          border: state === "sent" ? "1px solid #16a34a40" : "1px solid #7c3aed40",
          background: state === "sent" ? "#f0fdf4" : "#f5f3ff",
          color: state === "sent" ? "#16a34a" : "#7c3aed",
          transition: "all 0.15s",
          opacity: state === "sending" ? 0.7 : 1,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {state === "sent" ? (
          <>
            <CheckIcon />
            Wysłano!
          </>
        ) : (
          <>
            <PlayIcon />
            Przed-sprzedażowy
          </>
        )}
      </button>

      {modalOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            style={{
              background: "var(--panel-solid, #fff)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
              padding: "28px 32px",
              width: "440px",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>Mail przed-sprzedażowy</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "18px", padding: "0 4px" }}>✕</button>
            </div>

            <p style={{ margin: "0 0 16px", fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              Zostanie wysłany spersonalizowany mail z zaproszeniem na rozmowę.
            </p>

            {/* Email confirmation section */}
            <div
              style={{
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "24px",
                background: "var(--ba-4)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <div style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--muted)", marginBottom: "8px" }}>
                Mail zostanie wysłany na
              </div>

              {editingEmail ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    autoFocus
                    placeholder="adres@email.com"
                    style={{
                      flex: 1, minWidth: "180px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      outline: "none",
                      background: "var(--surface)",
                      border: "1.5px solid var(--accent)",
                      color: "var(--text)",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEmail();
                      if (e.key === "Escape") setEditingEmail(false);
                    }}
                  />
                  <button
                    onClick={saveEmail}
                    disabled={savingEmail}
                    style={{
                      padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                      background: "var(--accent)", color: "#fff", border: "none", cursor: savingEmail ? "default" : "pointer",
                      opacity: savingEmail ? 0.7 : 1,
                    }}
                  >
                    {savingEmail ? "…" : "Zapisz"}
                  </button>
                  {currentEmail && (
                    <button
                      onClick={() => { setEditingEmail(false); setEmailInput(currentEmail); }}
                      style={{ fontSize: "12px", color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Anuluj
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {currentEmail ? (
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{currentEmail}</span>
                  ) : (
                    <span style={{ fontSize: "13px", color: "var(--muted)", fontStyle: "italic" }}>Brak adresu e-mail — wpisz adres poniżej</span>
                  )}
                  <button
                    onClick={() => { setEmailInput(currentEmail ?? ""); setEditingEmail(true); }}
                    title="Zmień adres e-mail"
                    style={{
                      background: "none", border: "1px solid var(--border-strong)",
                      borderRadius: "5px", cursor: "pointer",
                      padding: "3px 7px", fontSize: "11px", color: "var(--muted)",
                      display: "flex", alignItems: "center", gap: "4px",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Zmień
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={closeModal}
                style={{
                  flex: 1, padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                  border: "1px solid var(--border)", background: "transparent", cursor: "pointer",
                  color: "var(--text)",
                }}
              >
                Anuluj
              </button>
              <a
                href={`/api/leads/${leadId}/presale-email-html`}
                download
                style={{
                  flex: 1, padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                  border: "1px solid var(--border)", background: "transparent", cursor: "pointer",
                  color: "var(--text)", textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                <DownloadIcon />
                Pobierz HTML
              </a>
              <button
                onClick={handleSend}
                disabled={!canSend || state === "sending" || editingEmail}
                style={{
                  flex: 2, padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                  border: "none", background: canSend ? "#7c3aed" : "var(--ba-4)",
                  color: canSend ? "#fff" : "var(--muted)",
                  cursor: !canSend || state === "sending" || editingEmail ? "default" : "pointer",
                  opacity: state === "sending" ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                {state === "sending" ? (
                  <>
                    <SpinIcon />
                    Wysyłam...
                  </>
                ) : (
                  "Wyślij mail"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

function SpinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
