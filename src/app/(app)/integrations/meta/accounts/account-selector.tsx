"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AdAccount = {
  id: string;
  account_id: string;
  name: string;
  account_status: number;
  currency: string;
};

export function AccountSelector({
  accounts,
  selectedId,
}: {
  accounts: AdAccount[];
  selectedId: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState(selectedId ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/integrations/meta/select-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: value }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Błąd zapisu");
      return;
    }
    // trigger initial sync
    fetch("/api/cron/sync-meta-insights", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MANUAL_SYNC ?? "manual"}` },
    });
    router.push("/campaigns");
    router.refresh();
  }

  return (
    <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4">
      {error && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--danger)", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.16)" }}
        >
          {error}
        </div>
      )}

      {accounts.map((a) => (
        <label
          key={a.id}
          className="flex items-center gap-3 border border-[var(--border)] hover:border-[var(--accent)] rounded-lg px-4 py-3 cursor-pointer transition-colors"
          style={{
            borderColor: value === a.account_id ? "var(--accent)" : undefined,
          }}
        >
          <input
            type="radio"
            name="ad_account"
            value={a.account_id}
            checked={value === a.account_id}
            onChange={(e) => setValue(e.target.value)}
            className="accent-[var(--accent)]"
          />
          <div className="flex-1">
            <div className="font-medium">{a.name}</div>
            <div className="text-xs text-[var(--muted)]">
              ID: {a.account_id} · {a.currency} · status:{" "}
              {a.account_status === 1 ? "active" : String(a.account_status)}
            </div>
          </div>
        </label>
      ))}

      <button
        onClick={save}
        disabled={!value || loading}
        className="mt-2 bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 rounded-lg py-2.5 text-sm font-semibold transition-opacity"
      >
        {loading ? "Zapisywanie…" : "Zapisz i rozpocznij synchronizację"}
      </button>
    </div>
  );
}
