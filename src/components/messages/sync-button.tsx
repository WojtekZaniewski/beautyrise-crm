"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MessagesSyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function sync() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/integrations/meta/sync-messages", {
        method: "POST",
      });
      const data = await res.json() as {
        ok?: boolean;
        conversations?: number;
        messages?: number;
        errors?: string[];
        error?: string;
      };

      if (!res.ok) {
        setMsg(data.error ?? "Błąd synchronizacji");
      } else {
        const parts: string[] = [];
        if ((data.conversations ?? 0) > 0)
          parts.push(`${data.conversations} nowych konwersacji`);
        if ((data.messages ?? 0) > 0)
          parts.push(`${data.messages} wiadomości`);
        setMsg(
          parts.length > 0
            ? `Zsynchronizowano: ${parts.join(", ")}`
            : "Wszystko aktualne",
        );
        router.refresh();
      }
    } catch {
      setMsg("Błąd połączenia");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {msg && (
        <span className="text-[12px]" style={{ color: "var(--muted)" }}>
          {msg}
        </span>
      )}
      <button
        onClick={sync}
        disabled={loading}
        className="transition-colors disabled:opacity-40 px-4 py-2 rounded-lg text-[13px] font-medium"
        style={{
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
      >
        {loading ? "Synchronizuję…" : "Synchronizuj wiadomości"}
      </button>
    </div>
  );
}
