"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function MessagesSyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [hasError, setHasError] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();

  async function sync() {
    setLoading(true);
    setMsg("");
    setHasError(false);
    setTokenExpired(false);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55_000);
    try {
      const res = await fetch("/api/integrations/meta/sync-messages", {
        method: "POST",
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.status === 504) {
        setTokenExpired(true);
        setLoading(false);
        return;
      }

      let data: {
        ok?: boolean;
        conversations?: number;
        messages?: number;
        cleaned?: number;
        errors?: string[];
        error?: string;
        tokenExpired?: boolean;
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
      } else if (data.tokenExpired) {
        setTokenExpired(true);
        router.refresh();
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
      clearTimeout(timer);
      if (e instanceof DOMException && e.name === "AbortError") {
        setTokenExpired(true);
      } else {
        setMsg(`Błąd połączenia: ${e instanceof Error ? e.message : String(e)}`);
        setHasError(true);
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {tokenExpired ? (
        <div className="flex items-center gap-2">
          <span
            className="text-[12px] leading-snug"
            style={{ color: "var(--warning, #FF8C42)" }}
          >
            Token wygasł — wymagane ponowne połączenie
          </span>
          <Link
            href="/integrations/meta"
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-opacity hover:opacity-80"
            style={{ background: "#FF4C00", color: "#fff" }}
          >
            Połącz ponownie
          </Link>
        </div>
      ) : msg ? (
        <span
          className="text-[12px] max-w-[340px] text-right leading-snug"
          style={{ color: hasError ? "var(--warning, #FF8C42)" : "var(--muted)" }}
        >
          {msg}
        </span>
      ) : null}
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
