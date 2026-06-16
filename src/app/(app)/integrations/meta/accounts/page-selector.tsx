"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Page = { id: string; name: string };

export function PageSelector({
  pages,
  selectedId,
}: {
  pages: Page[];
  selectedId: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState(selectedId ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    setLoading(true);
    setError("");
    setSaved(false);
    const res = await fetch("/api/integrations/meta/select-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_id: value }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Błąd zapisu");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  if (pages.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Brak stron Facebook w integracji — połącz ponownie przez OAuth.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--danger)", background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.16)" }}
        >
          {error}
        </div>
      )}

      {pages.map((p) => (
        <label
          key={p.id}
          className="flex items-center gap-3 border border-[var(--border)] hover:border-[var(--accent)] rounded-lg px-4 py-3 cursor-pointer transition-colors"
          style={{ borderColor: value === p.id ? "var(--accent)" : undefined }}
        >
          <input
            type="radio"
            name="page"
            value={p.id}
            checked={value === p.id}
            onChange={(e) => { setValue(e.target.value); setSaved(false); }}
            className="accent-[var(--accent)]"
          />
          <div className="flex-1">
            <div className="font-medium text-[13px]">{p.name}</div>
            <div className="text-[11px] text-[var(--muted)]">ID: {p.id}</div>
          </div>
        </label>
      ))}

      <button
        onClick={save}
        disabled={!value || loading}
        className="mt-1 bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 rounded-lg py-2.5 text-sm font-semibold transition-opacity"
      >
        {loading ? "Zapisywanie…" : saved ? "Zapisano ✓" : "Zapisz stronę"}
      </button>
    </div>
  );
}
