"use client";

import { useState } from "react";

type Workspace = { id: string; name: string; slug: string; created_at: string };
type Member = { id: string; user_id: string; role: string; email: string | null; name: string | null };

export function WorkspaceSettingsForm({
  workspace,
  members,
}: {
  workspace: Workspace;
  members: Member[];
}) {
  const [name, setName] = useState(workspace.name);
  const [slug, setSlug] = useState(workspace.slug);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = name !== workspace.name || slug !== workspace.slug;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!dirty || saving) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/workspace", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug }),
    });
    const data = await res.json().catch(() => ({})) as { error?: string };

    if (!res.ok) {
      setError(data.error ?? "Błąd zapisywania");
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  }

  function slugify(val: string) {
    return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  const roleLabel: Record<string, string> = { owner: "Właściciel", admin: "Admin", member: "Członek" };

  return (
    <div className="flex flex-col gap-8">
      {/* General */}
      <section>
        <h2 className="text-[13px] font-semibold mb-4" style={{ color: "var(--muted)" }}>
          OGÓLNE
        </h2>
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Nazwa workspace'u</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
              style={{
                background: "var(--ba-4)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              placeholder="Np. BeautyRise"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">Slug (URL)</label>
            <div className="flex items-center gap-2">
              <span className="text-[13px]" style={{ color: "var(--muted)" }}>
                beautyrise-crm.vercel.app/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="flex-1 rounded-lg px-3 py-2 text-[13px] outline-none font-mono"
                style={{
                  background: "var(--ba-4)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
                placeholder="beautyrise"
              />
            </div>
            <p className="text-[11.5px] mt-1.5" style={{ color: "var(--muted)" }}>
              Zmiana sluga nie wpływa na działanie aplikacji — służy tylko do identyfikacji.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">ID workspace'u</label>
            <div
              className="px-3 py-2 rounded-lg text-[12px] font-mono select-all"
              style={{
                background: "var(--ba-4)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              {workspace.id}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!dirty || saving}
              className="btn-primary px-4 py-2 rounded-lg text-[13px] font-medium disabled:opacity-40"
            >
              {saving ? "Zapisywanie…" : "Zapisz zmiany"}
            </button>
            {success && (
              <span className="text-[12.5px]" style={{ color: "var(--success, #22c55e)" }}>
                Zapisano ✓
              </span>
            )}
            {error && (
              <span className="text-[12.5px]" style={{ color: "var(--danger)" }}>
                {error}
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Members */}
      <section>
        <h2 className="text-[13px] font-semibold mb-4" style={{ color: "var(--muted)" }}>
          CZŁONKOWIE
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {members.length === 0 ? (
            <div className="px-5 py-4 text-[13px]" style={{ color: "var(--muted)" }}>
              Brak przypisanych członków.
            </div>
          ) : (
            members.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center justify-between px-5 py-3"
                style={{
                  borderBottom: i < members.length - 1 ? "1px solid var(--border)" : undefined,
                  background: "var(--panel)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                    style={{ background: avatarColor(m.user_id) }}
                  >
                    {(m.name ?? m.email ?? "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium">{m.name ?? m.email ?? "Nieznany"}</div>
                    {m.email && m.name && (
                      <div className="text-[11.5px]" style={{ color: "var(--muted)" }}>
                        {m.email}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "var(--accent-subtle)",
                    color: "var(--accent)",
                  }}
                >
                  {roleLabel[m.role] ?? m.role}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Info */}
      <section>
        <h2 className="text-[13px] font-semibold mb-4" style={{ color: "var(--muted)" }}>
          INFORMACJE
        </h2>
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex justify-between">
            <span style={{ color: "var(--muted)" }}>Utworzony</span>
            <span>{new Date(workspace.created_at).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--muted)" }}>Liczba członków</span>
            <span>{members.length}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function avatarColor(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${Math.abs(hash) % 360}, 55%, 55%)`;
}
