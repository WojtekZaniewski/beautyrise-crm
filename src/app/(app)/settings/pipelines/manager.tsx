"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Pipeline = { id: string; name: string; created_at: string };

export function PipelinesManager({
  initialPipelines,
  stageCounts,
  leadCounts,
}: {
  initialPipelines: Pipeline[];
  stageCounts: Record<string, number>;
  leadCounts: Record<string, number>;
}) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function create() {
    if (!newName.trim()) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/pipelines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Błąd");
      return;
    }
    setNewName("");
    router.refresh();
  }

  async function rename(id: string, currentName: string) {
    const name = window.prompt("Nowa nazwa", currentName);
    if (!name || name === currentName) return;
    await fetch(`/api/pipelines/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    router.refresh();
  }

  async function remove(id: string, name: string) {
    if (!window.confirm(`Usunąć pipeline "${name}"?`)) return;
    const res = await fetch(`/api/pipelines/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? "Błąd");
      return;
    }
    router.refresh();
  }

  return (
    <>
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5 mb-6">
        <div className="text-sm font-medium mb-3">Nowy pipeline</div>
        {error && (
          <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2 mb-3">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && create()}
            placeholder="np. Outreach ręczny, Leady od taty"
            className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={create}
            disabled={loading || !newName.trim()}
            className="bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            {loading ? "…" : "Utwórz"}
          </button>
        </div>
      </div>

      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl overflow-hidden">
        {initialPipelines.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-[var(--muted)]">
            Brak pipeline&apos;ów. Utwórz pierwszy powyżej.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="text-left px-5 py-3 font-medium">Nazwa</th>
                <th className="text-right px-5 py-3 font-medium">Etapy</th>
                <th className="text-right px-5 py-3 font-medium">Leady</th>
                <th className="text-right px-5 py-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {initialPipelines.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-5 py-3">
                    <Link
                      href={`/settings/pipelines/${p.id}`}
                      className="font-medium hover:text-[var(--accent)] transition-colors"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-right text-[var(--muted)]">
                    {stageCounts[p.id] ?? 0}
                  </td>
                  <td className="px-5 py-3 text-right text-[var(--muted)]">
                    {leadCounts[p.id] ?? 0}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => rename(p.id, p.name)}
                      className="text-xs text-[var(--muted)] hover:text-white mr-3"
                    >
                      Zmień nazwę
                    </button>
                    <button
                      onClick={() => remove(p.id, p.name)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
