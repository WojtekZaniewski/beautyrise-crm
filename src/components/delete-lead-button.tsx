"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteLeadButton({ leadId }: { leadId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    startTransition(() => router.refresh());
  }

  if (confirming) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <button
          onClick={() => { setConfirming(false); handleDelete(); }}
          disabled={pending}
          style={{
            fontSize: "11.5px", padding: "2px 8px", borderRadius: "5px", cursor: "pointer",
            background: "#1C1917", color: "#fff", border: "none", fontWeight: 600,
            opacity: pending ? 0.5 : 1,
          }}
        >
          Usuń
        </button>
        <button
          onClick={() => setConfirming(false)}
          style={{
            fontSize: "11.5px", padding: "2px 8px", borderRadius: "5px", cursor: "pointer",
            background: "var(--ba-4)", color: "var(--muted)",
            border: "1px solid var(--border-strong)",
          }}
        >
          Anuluj
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
      title="Przenieś do kosza"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "26px", height: "26px", borderRadius: "6px",
        border: "1px solid var(--border-strong)", background: "transparent",
        color: "var(--muted)", cursor: "pointer", transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#1C1917";
        (e.currentTarget as HTMLElement).style.borderColor = "#1C1917";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--muted)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    </button>
  );
}
