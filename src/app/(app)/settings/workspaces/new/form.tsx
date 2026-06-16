"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none transition-all";
const inputStyle = {
  background: "var(--ba-4)",
  border: "1px solid var(--border-strong)",
  color: "var(--text)",
};

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
      .replace(/[̀-ͯ]/g, "")
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
    <form
      onSubmit={submit}
      className="rounded-xl p-6 flex flex-col gap-4"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {error && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--danger)", background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.16)" }}
        >
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
          className={inputClass}
          style={inputStyle}
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
          className={inputClass}
          style={inputStyle}
        />
        <div className="text-xs text-[var(--muted)] mt-1">
          Używany wewnętrznie. Generowany automatycznie z nazwy.
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="btn-primary disabled:opacity-40 rounded-lg py-2.5 text-sm font-semibold"
      >
        {loading ? "Tworzę…" : "Utwórz klienta"}
      </button>
    </form>
  );
}
