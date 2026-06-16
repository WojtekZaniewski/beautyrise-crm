"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteCampaignButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    setLoading(false);
    setConfirming(false);
    router.refresh();
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-[11px]" style={{ color: "var(--muted)" }}>
          Usunąć?
        </span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-[11px] font-medium px-2 py-0.5 rounded"
          style={{
            background: "rgba(0,0,0,0.1)",
            color: "#1C1917",
            border: "1px solid rgba(0,0,0,0.25)",
          }}
        >
          {loading ? "…" : "Tak"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[11px] px-2 py-0.5 rounded"
          style={{
            background: "var(--ba-4)",
            color: "var(--muted)",
            border: "1px solid var(--border)",
          }}
        >
          Nie
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirming(true);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-2 py-0.5 rounded"
      style={{
        color: "var(--muted)",
        border: "1px solid var(--border)",
        background: "var(--ba-4)",
      }}
      title={`Usuń kampanię: ${name}`}
    >
      Usuń
    </button>
  );
}
