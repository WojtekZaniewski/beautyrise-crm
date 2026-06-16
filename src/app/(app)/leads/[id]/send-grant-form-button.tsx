"use client";

import { useState } from "react";

export function SendGrantFormButton({ leadId, hasEmail }: { leadId: string; hasEmail: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleClick() {
    if (state === "sending" || state === "sent") return;
    setState("sending");
    try {
      const res = await fetch(`/api/leads/${leadId}/send-grant-form`, { method: "POST" });
      if (res.ok) {
        setState("sent");
        setTimeout(() => setState("idle"), 5000);
      } else {
        const data = await res.json();
        alert(data.error ?? "Blad wysylania");
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  if (!hasEmail) return null;

  return (
    <button
      onClick={handleClick}
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
      }}
    >
      {state === "sending" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Wysylam...
        </>
      ) : state === "sent" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Formularz wyslany!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Wyslij formularz dotacyjny
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
