"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";

type Stage = { id: string; name: string; color: string };
type Tag = { id: string; name: string; color: string };

const inputStyle = {
  background: "var(--ba-4)",
  border: "1px solid var(--border-strong)",
  borderRadius: "6px",
  color: "var(--text)",
  fontSize: "13px",
  outline: "none",
  padding: "7px 12px",
};

export function LeadsFilters({ stages, tags }: { stages: Stage[]; tags: Tag[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [q, setQ] = useState(params.get("q") ?? "");
  const stage = params.get("stage") ?? "";
  const source = params.get("source") ?? "";
  const tag = params.get("tag") ?? "";

  useEffect(() => {
    const t = setTimeout(() => {
      update("q", q);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    startTransition(() => {
      router.push(`/leads?${next.toString()}`);
    });
  }

  function reset() {
    setQ("");
    startTransition(() => router.push("/leads"));
  }

  const hasFilters = q || stage || source || tag;

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Szukaj po nazwie, telefonie, e-mailu…"
        className="flex-1 min-w-[220px] transition-all"
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,76,0,0.45)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,76,0,0.09)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-strong)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      <select
        value={stage}
        onChange={(e) => update("stage", e.target.value)}
        className="transition-all"
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        <option value="">Wszystkie etapy</option>
        {stages.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <select
        value={source}
        onChange={(e) => update("source", e.target.value)}
        className="transition-all"
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        <option value="">Wszystkie źródła</option>
        <option value="manual">Ręcznie</option>
        <option value="meta_ads">Meta Ads</option>
        <option value="import">Import</option>
        <option value="webhook">Webhook</option>
        <option value="sms">SMS</option>
        <option value="email">E-mail</option>
      </select>

      {tags.length > 0 && (
        <select
          value={tag}
          onChange={(e) => update("tag", e.target.value)}
          className="transition-all"
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="">Wszystkie tagi</option>
          {tags.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      )}

      {hasFilters && (
        <button
          onClick={reset}
          className="text-[12.5px] px-3 py-1.5 rounded-md transition-colors"
          style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
        >
          Wyczyść
        </button>
      )}

      {pending && (
        <span className="text-[12px]" style={{ color: "var(--muted)" }}>
          Filtruję…
        </span>
      )}
    </div>
  );
}
