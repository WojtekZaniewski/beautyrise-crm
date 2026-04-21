"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MessagesSyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  async function sync() {
    setLoading(true);
    setMsg("");
    setHasError(false);
    try {
      const res = await fetch("/api/integrations/meta/sync-messages", {
        method: "POST",
      });

      let data: {
        ok?: boolean;
        conversations?: number;
        messages?: number;
        cleaned?: number;
        errors?: string[];
        error?: string;
      } = {};
      try {
        data = await res.json();
      } catch {
        setMsg(`Błąd serwera (${res.status} ${res.statusText})`);
        setHasError(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setMsg(data.error ?? "Błąd synchronizacji");
        setHasError(true);
      } else {
        const parts: string[] = [];
        if ((data.cleaned ?? 0) > 0)
          parts.push(`usunięto ${data.cleaned} obcych konwersacji`);
        if ((data.conversations ?? 0) > 0)
          parts.push(`${data.conversations} nowych konwersacji`);
        if ((data.messages ?? 0) > 0)
          parts.push(`${data.messages} wiadomości`);

        const errorLines = data.errors ?? [];
        const errInfo = errorLines.length
          ? ` ⚠ ${errorLines.join(" | ")}`
          : "";

        setMsg(
          parts.length > 0
            ? `Zsynchronizowano: ${parts.join(", ")}${errInfo}`
            : `Wszystko aktualne${errInfo}`,
        );
        setHasError(errorLines.length > 0);
        router.refresh();
      }
    } catch (e) {
      setMsg(`Błąd połączenia: ${e instanceof Error ? e.message : String(e)}`);
      setHasError(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {msg && (
        <span
          className="text-[12px] max-w-[340px] text-right leading-snug"
          style={{ color: hasError ? "var(--warning, #f59e0b)" : "var(--muted)" }}
        >
          {msg}
        </span>
      )}
      <button
        onClick={sync}
        disabled={loading}
        className="transition-colors disabled:opacity-40 px-4 py-2 rounded-lg text-[13px] font-medium shrink-0"
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
