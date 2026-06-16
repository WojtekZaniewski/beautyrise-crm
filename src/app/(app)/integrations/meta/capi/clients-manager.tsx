"use client";

import { useState, useTransition } from "react";

type CapiClient = {
  id: string;
  name: string;
  pixel_id: string;
  test_event_code: string | null;
  active: boolean;
  created_at?: string;
};

function MaskToken({ token }: { token: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-mono text-[11px]">
        {show ? token : token.slice(0, 6) + "•".repeat(Math.min(20, token.length - 10)) + token.slice(-4)}
      </span>
      <button
        onClick={() => setShow((v) => !v)}
        className="text-[10px] text-[var(--muted)] hover:text-[var(--text)] underline"
      >
        {show ? "ukryj" : "pokaż"}
      </button>
    </span>
  );
}

function AddClientForm({ onAdded }: { onAdded: (c: CapiClient) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [pixelId, setPixelId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [testCode, setTestCode] = useState("");
  const [error, setError] = useState("");

  function submit() {
    if (!name.trim() || !pixelId.trim() || !accessToken.trim()) {
      setError("Wypełnij wszystkie wymagane pola");
      return;
    }
    setError("");
    startTransition(async () => {
      const res = await fetch("/api/capi-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pixel_id: pixelId, access_token: accessToken, test_event_code: testCode }),
      });
      if (res.ok) {
        const client = await res.json() as CapiClient;
        onAdded(client);
        setName(""); setPixelId(""); setAccessToken(""); setTestCode("");
        setOpen(false);
      } else {
        const j = await res.json() as { error?: string };
        setError(j.error ?? "Błąd");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg text-[13px] font-medium text-white"
        style={{ background: "var(--accent)" }}
      >
        + Dodaj klienta CAPI
      </button>
    );
  }

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 mt-2"
      style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
    >
      <div className="text-[13px] font-semibold">Nowy klient CAPI</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11px] text-[var(--muted)] mb-1 block">Nazwa klienta *</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            placeholder="np. beautyrise"
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]" />
        </div>
        <div>
          <label className="text-[11px] text-[var(--muted)] mb-1 block">Pixel ID *</label>
          <input value={pixelId} onChange={(e) => setPixelId(e.target.value)}
            placeholder="1234567890"
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[11px] text-[var(--muted)] mb-1 block">Access Token *</label>
          <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)}
            type="password"
            placeholder="EAAxxxx..."
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]" />
        </div>
        <div>
          <label className="text-[11px] text-[var(--muted)] mb-1 block">Test Event Code (opcjonalny)</label>
          <input value={testCode} onChange={(e) => setTestCode(e.target.value)}
            placeholder="TEST12345"
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]" />
        </div>
      </div>
      {error && <p className="text-[12px]" style={{ color: "var(--danger)" }}>{error}</p>}
      <div className="flex gap-2 justify-end">
        <button onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] hover:bg-[var(--ba-4)]">
          Anuluj
        </button>
        <button onClick={submit} disabled={isPending}
          className="px-4 py-1.5 rounded-lg text-[13px] font-medium text-white disabled:opacity-50"
          style={{ background: "var(--accent)" }}>
          {isPending ? "Zapisywanie…" : "Zapisz"}
        </button>
      </div>
    </div>
  );
}

export function CapiClientsManager({ initialClients }: { initialClients: CapiClient[] }) {
  const [clients, setClients] = useState(initialClients);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  async function handleToggle(id: string, active: boolean) {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, active } : c)));
    await fetch(`/api/capi-clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
  }

  async function handleDelete(id: string) {
    setDeletingIds((prev) => new Set([...prev, id]));
    const res = await fetch(`/api/capi-clients/${id}`, { method: "DELETE" });
    if (res.ok) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
    setDeletingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-[14px]">Klienci CAPI</div>
          <p className="text-[12px] text-[var(--muted)] mt-0.5">
            Konfiguracja pixel + token z gateway-style — zastępuje credentials z Meta Ads
          </p>
        </div>
        <AddClientForm onAdded={(c) => setClients((prev) => [...prev, c])} />
      </div>

      {clients.length === 0 ? (
        <div
          className="rounded-xl p-6 text-center text-[13px] text-[var(--muted)]"
          style={{ border: "1px dashed var(--border)" }}
        >
          Brak skonfigurowanych klientów CAPI.<br />
          Dodaj klienta lub skorzystaj z tabeli <code>capi_clients</code> w Supabase.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-xl p-4 flex items-start gap-4"
              style={{
                border: "1px solid var(--border)",
                background: "var(--panel)",
                opacity: deletingIds.has(client.id) ? 0.4 : 1,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: client.active ? "#FF4C00" : "#6b7280" }}
                  />
                  <span className="font-semibold text-[14px]">{client.name}</span>
                  {client.test_event_code && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "#FF8C4220", color: "#FF8C42" }}
                    >
                      TEST: {client.test_event_code}
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-[var(--muted)] mb-1">
                  Pixel: <span className="font-mono">{client.pixel_id}</span>
                </div>
                <div className="text-[12px] text-[var(--muted)]">
                  ID: <span className="font-mono text-[11px]">{client.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(client.id, !client.active)}
                  className="text-[12px] px-2.5 py-1 rounded-lg"
                  style={{
                    background: client.active ? "rgba(255,76,0,0.1)" : "var(--ba-4)",
                    color: client.active ? "#FF4C00" : "var(--muted)",
                  }}
                >
                  {client.active ? "Aktywny" : "Nieaktywny"}
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-1.5 rounded-lg hover:bg-[var(--ba-4)] text-[var(--muted)]"
                  title="Usuń"
                >
                  <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                    <path d="M3 4h9M6 4V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V4M5.5 4l.5 8M9.5 4l-.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
