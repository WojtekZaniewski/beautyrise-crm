"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeletedLeadActions({ leadId }: { leadId: string }) {
  const [confirmingPermanent, setConfirmingPermanent] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function restore() {
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: false }),
    });
    startTransition(() => router.refresh());
  }

  async function permanentDelete() {
    await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
    startTransition(() => router.refresh());
  }

  const btnBase: React.CSSProperties = {
    fontSize: "12px", padding: "4px 10px", borderRadius: "6px",
    cursor: pending ? "not-allowed" : "pointer", fontWeight: 500,
    opacity: pending ? 0.5 : 1, transition: "all 0.15s",
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <button
        onClick={restore}
        disabled={pending}
        title="Przywróć lead"
        style={{
          ...btnBase,
          background: "var(--accent-subtle)",
          color: "var(--accent-2)",
          border: "1px solid rgba(255,76,0,0.2)",
        }}
      >
        Przywróć
      </button>

      {confirmingPermanent ? (
        <>
          <button
            onClick={() => { setConfirmingPermanent(false); permanentDelete(); }}
            disabled={pending}
            style={{ ...btnBase, background: "#1C1917", color: "#fff", border: "none", fontWeight: 600 }}
          >
            Usuń na stałe
          </button>
          <button
            onClick={() => setConfirmingPermanent(false)}
            style={{ ...btnBase, background: "var(--ba-4)", color: "var(--muted)", border: "1px solid var(--border-strong)" }}
          >
            Anuluj
          </button>
        </>
      ) : (
        <button
          onClick={() => setConfirmingPermanent(true)}
          disabled={pending}
          style={{ ...btnBase, background: "transparent", color: "#1C1917", border: "1px solid #1C191740" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1C191712"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          Usuń na stałe
        </button>
      )}
    </span>
  );
}
