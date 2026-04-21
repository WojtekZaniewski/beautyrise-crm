"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function sync() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/cron/sync-meta-insights", {
        method: "POST",
        headers: { Authorization: "Bearer manual" },
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Błąd synchronizacji");
      } else {
        const r = data.results?.[0];
        if (r?.ok) {
          setMsg(`Zsynchronizowano: ${r.campaigns ?? 0} kampanii, ${r.metrics ?? 0} metryk, ${r.leads ?? 0} nowych leadów`);
        } else {
          setMsg(r?.error ?? "Brak danych do synchronizacji");
        }
        router.refresh();
      }
    } catch {
      setMsg("Błąd połączenia");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {msg && <span className="text-xs text-[var(--muted)]">{msg}</span>}
      <button
        onClick={sync}
        disabled={loading}
        className="border border-[var(--border)] hover:border-[var(--accent)] px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-40"
      >
        {loading ? "Synchronizuję…" : "Synchronizuj teraz"}
      </button>
    </div>
  );
}
