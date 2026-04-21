"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewWorkspaceForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function slugify(v: string) {
    return v
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), slug: slug.trim() || slugify(name) }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Błąd tworzenia");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4">
      {error && (
        <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div>
        <label className="text-sm text-[var(--muted)] block mb-1">Nazwa klienta</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slug) setSlug(slugify(e.target.value));
          }}
          placeholder="np. Salon Monika"
          className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>

      <div>
        <label className="text-sm text-[var(--muted)] block mb-1">Slug (URL-safe)</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          placeholder="salon-monika"
          className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="text-xs text-[var(--muted)] mt-1">
          Używany wewnętrznie. Generowany automatycznie z nazwy.
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 rounded-lg py-2.5 text-sm font-semibold transition-opacity"
      >
        {loading ? "Tworzę…" : "Utwórz klienta"}
      </button>
    </form>
  );
}
