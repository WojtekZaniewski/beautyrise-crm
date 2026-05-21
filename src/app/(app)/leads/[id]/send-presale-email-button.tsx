"use client";

import { useState } from "react";

export function SendPresaleEmailButton({ leadId, hasEmail }: { leadId: string; hasEmail: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleClick() {
    if (!hasEmail || state === "sending" || state === "sent") return;
    setState("sending");
    try {
      const res = await fetch(`/api/leads/${leadId}/send-presale-email`, { method: "POST" });
      if (res.ok) {
        setState("sent");
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
    <button
      onClick={handleClick}
      disabled={!hasEmail || state === "sending" || state === "sent"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "9px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: !hasEmail || state === "sending" || state === "sent" ? "default" : "pointer",
        border: state === "sent" ? "1px solid #16a34a40" : "1px solid #7c3aed40",
        background: !hasEmail ? "var(--ba-4)" : state === "sent" ? "#f0fdf4" : "#f5f3ff",
        color: !hasEmail ? "var(--muted)" : state === "sent" ? "#16a34a" : "#7c3aed",
        transition: "all 0.15s",
        opacity: state === "sending" ? 0.7 : 1,
        flex: 1,
        justifyContent: "center",
      }}
      title={!hasEmail ? "Uzupełnij e-mail leada aby wysłać" : undefined}
    >
      {state === "sending" ? (
        <>
          <SpinIcon />
          Wysyłam...
        </>
      ) : state === "sent" ? (
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
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
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
