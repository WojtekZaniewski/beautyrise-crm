"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function SendPostsaleEmailButton({
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
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState(leadEmail);
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(leadEmail ?? "");
  const [savingEmail, setSavingEmail] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function openModal() {
    if (state === "sending" || state === "sent") return;
    setCurrentEmail(leadEmail);
    setEmailInput(leadEmail ?? "");
    setEditingEmail(!leadEmail);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setFileName(null);
    setEditingEmail(false);
    if (fileRef.current) fileRef.current.value = "";
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
      const formData = new FormData();
      const file = fileRef.current?.files?.[0];
      if (file) formData.append("attachment", file);

      const res = await fetch(`/api/leads/${leadId}/send-postsale-email`, {
        method: "POST",
        body: formData,
      });

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
          border: state === "sent" ? "1px solid #FF4C0040" : "1px solid #ff6b0040",
          background: state === "sent" ? "#FFF7F0" : "#fff7f0",
          color: state === "sent" ? "#FF4C00" : "#ff6b00",
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
            <DocumentIcon />
            Po-sprzedażowy
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
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>Mail po-sprzedażowy</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "18px", padding: "0 4px" }}>✕</button>
            </div>

            {/* Email confirmation section */}
            <div
              style={{
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "20px",
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

            <p style={{ margin: "0 0 20px", fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              Zostanie wysłany spersonalizowany mail powitalny z linkiem do strefy klienta.
              Możesz opcjonalnie dołączyć umowę lub inne dokumenty.
            </p>

            {/* Upload załącznika */}
            <div
              style={{
                border: "1.5px dashed var(--border-strong, #d1d5db)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                textAlign: "center",
                cursor: "pointer",
                background: fileName ? "#FFF7F0" : "var(--ba-4, #fafafa)",
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              {fileName ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", color: "#FF4C00", fontWeight: 600 }}>
                  <PaperclipIcon />
                  {fileName}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  <PaperclipIcon />
                  <span style={{ marginLeft: "6px" }}>Kliknij aby wybrać plik (PDF, DOCX, JPG)</span>
                  <div style={{ fontSize: "11px", marginTop: "4px" }}>Pole nieobowiązkowe</div>
                </div>
              )}
            </div>

            {fileName && (
              <button
                onClick={() => { setFileName(null); if (fileRef.current) fileRef.current.value = ""; }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "var(--muted)", marginBottom: "16px", padding: 0 }}
              >
                ✕ Usuń załącznik
              </button>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
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
              <button
                onClick={handleSend}
                disabled={!currentEmail || state === "sending" || editingEmail}
                style={{
                  flex: 2, padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                  border: "none", background: currentEmail ? "#ff6b00" : "var(--ba-4)",
                  color: currentEmail ? "#fff" : "var(--muted)",
                  cursor: !currentEmail || state === "sending" || editingEmail ? "default" : "pointer",
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

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
