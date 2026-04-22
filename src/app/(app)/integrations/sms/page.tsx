"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Panel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", ...style }}>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", hint }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; hint?: string;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--muted)] block mb-1">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2.5 text-sm"
        style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
      {hint && <p className="text-xs text-[var(--muted)] mt-1">{hint}</p>}
    </div>
  );
}

// ─── Config Tab ───────────────────────────────────────────────────────────────

interface SmsConfig {
  configured: boolean;
  status?: string;
  connected_at?: string;
  apikey_hint?: string | null;
}

function ConfigTab({ onChanged }: { onChanged: () => void }) {
  const [config, setConfig] = useState<SmsConfig | null>(null);
  const [apikey, setApikey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/sms/config");
    const data = await res.json();
    setConfig(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!apikey.trim()) { setError("Wklej API Key z SMSMobileAPI"); return; }
    setSaving(true); setError(""); setSuccess("");
    const res = await fetch("/api/sms/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apikey }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error ?? "Błąd zapisu"); return; }
    setSuccess(data.verified ? "Połączono i zweryfikowano klucz API." : "Klucz zapisany (brak potwierdzenia od API — sprawdź numer w aplikacji).");
    setApikey("");
    await load();
    onChanged();
  };

  const disconnect = async () => {
    if (!confirm("Odłączyć bramkę SMS?")) return;
    await fetch("/api/sms/config", { method: "DELETE" });
    setSuccess("");
    await load();
    onChanged();
  };

  return (
    <div className="max-w-lg flex flex-col gap-5">
      {/* Provider card */}
      <Panel className="p-5 flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--accent-subtle)", border: "1px solid rgba(255,76,0,0.15)" }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
            <rect x="5" y="2" width="12" height="18" rx="2.5" stroke="var(--accent)" strokeWidth="1.6" />
            <circle cx="11" cy="17" r="1.1" fill="var(--accent)" />
            <path d="M8 6h6M8 9h4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium mb-0.5">SMSMobileAPI</div>
          <div className="text-xs text-[var(--muted)]">smsmobileapi.com · Twój telefon jako bramka SMS</div>
          {config?.configured ? (
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-xs" style={{ color: "#16a34a" }}>Połączono</span>
              {config.apikey_hint && <span className="text-xs text-[var(--muted)]">klucz: {config.apikey_hint}</span>}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#78716C" }} />
              <span className="text-xs text-[var(--muted)]">Niepołączono</span>
            </div>
          )}
        </div>
        {config?.configured && (
          <button onClick={disconnect} className="text-xs shrink-0 transition-colors" style={{ color: "var(--muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            Odłącz
          </button>
        )}
      </Panel>

      {/* Setup instructions */}
      <Panel className="p-5 flex flex-col gap-3">
        <div className="font-medium text-sm">Jak skonfigurować</div>
        <ol className="text-sm text-[var(--muted)] flex flex-col gap-2 list-decimal list-inside">
          <li>Zaloguj się na <span className="font-mono text-xs px-1 rounded" style={{ background: "var(--ba-8)" }}>smsmobileapi.com</span></li>
          <li>Przejdź do <strong>Dashboard → API Key</strong></li>
          <li>Skopiuj klucz i wklej poniżej</li>
          <li>Upewnij się, że aplikacja SMSMobileAPI działa na Twoim telefonie z kartą eSIM</li>
        </ol>
      </Panel>

      {/* Key input */}
      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">{config?.configured ? "Zmień API Key" : "Podłącz bramkę SMS"}</div>
        <Input
          label="API Key"
          value={apikey}
          onChange={setApikey}
          type="password"
          placeholder="Wklej klucz z SMSMobileAPI Dashboard"
          hint="Klucz jest szyfrowany przed zapisem"
        />
        {error && <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>}
        {success && <p className="text-sm" style={{ color: "#16a34a" }}>{success}</p>}
        <button onClick={save} disabled={saving || !apikey.trim()}
          className="rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--accent)" }}>
          {saving ? "Zapisywanie…" : config?.configured ? "Zaktualizuj klucz" : "Połącz"}
        </button>
      </Panel>
    </div>
  );
}

// ─── Send Tab ─────────────────────────────────────────────────────────────────

function SendTab({ configured }: { configured: boolean }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const send = async () => {
    if (!to.trim() || !message.trim()) return;
    setSending(true); setResult(null);
    const res = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, message }),
    });
    const data = await res.json();
    setSending(false);
    if (res.ok) {
      setResult({ ok: true, msg: "SMS wysłany pomyślnie." });
      setTo(""); setMessage("");
    } else {
      setResult({ ok: false, msg: data.error ?? "Błąd wysyłki" });
    }
  };

  if (!configured) {
    return (
      <div className="max-w-lg">
        <Panel className="p-8 text-center flex flex-col items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 22 22" fill="none" aria-hidden className="opacity-30">
            <rect x="5" y="2" width="12" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="11" cy="17" r="1.1" fill="currentColor" />
            <path d="M8 6h6M8 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-[var(--muted)]">Najpierw skonfiguruj bramkę SMS w zakładce <strong>Konfiguracja</strong>.</p>
        </Panel>
      </div>
    );
  }

  return (
    <div className="max-w-lg flex flex-col gap-4">
      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">Wyślij SMS</div>
        <Input
          label="Numer odbiorcy"
          value={to}
          onChange={setTo}
          type="tel"
          placeholder="+48 600 000 000"
          hint="Podaj numer w formacie międzynarodowym, np. +48600000000"
        />
        <div>
          <label className="text-xs text-[var(--muted)] block mb-1">Treść wiadomości</label>
          <textarea
            rows={4}
            placeholder="Treść SMS…"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm resize-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }}
          />
          <div className="text-xs text-[var(--muted)] mt-1 text-right">{message.length} / 160 znaków</div>
        </div>
        {result && (
          <p className="text-sm" style={{ color: result.ok ? "#16a34a" : "#dc2626" }}>{result.msg}</p>
        )}
        <button onClick={send} disabled={sending || !to.trim() || !message.trim()}
          className="rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--accent)" }}>
          {sending ? "Wysyłanie…" : "Wyślij SMS →"}
        </button>
      </Panel>
    </div>
  );
}

// ─── History Tab ──────────────────────────────────────────────────────────────

interface SmsMessage {
  id: string;
  to: string;
  body: string;
  status: string;
  sent_at: string | null;
  created_at: string;
  lead_id: string | null;
  leads?: { full_name: string } | null;
}

const STATUS_MAP: Record<string, [string, string, string]> = {
  sent:    ["#22c55e1a", "#16a34a", "Wysłany"],
  pending: ["rgba(0,0,0,0.05)", "#78716C", "Oczekuje"],
  failed:  ["#ef44441a", "#dc2626", "Błąd"],
};

function StatusBadge({ status }: { status: string }) {
  const [bg, color, label] = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: bg, color }}>
      {label}
    </span>
  );
}

function HistoryTab() {
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/sms/messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Historia SMS ({messages.length})</div>
        <button onClick={load} className="text-xs px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          ↻ Odśwież
        </button>
      </div>

      <Panel>
        {loading ? (
          <div className="p-6 text-sm text-[var(--muted)]">Ładowanie…</div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--muted)]">
            Brak wysłanych SMS. Wyślij pierwszą wiadomość w zakładce Wyślij SMS.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[var(--muted)]" style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Odbiorca", "Lead", "Treść", "Status", "Data"].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < messages.length - 1 ? "1px solid var(--border)" : undefined }}>
                    <td className="px-5 py-3 font-mono text-xs whitespace-nowrap">{m.to}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">
                      {m.leads?.full_name ?? <span className="opacity-40">—</span>}
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <span className="line-clamp-2 text-xs text-[var(--muted)]">{m.body}</span>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={m.status} /></td>
                    <td className="px-5 py-3 text-xs text-[var(--muted)] whitespace-nowrap">
                      {new Date(m.sent_at ?? m.created_at).toLocaleString("pl-PL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = "config" | "send" | "history";
const TABS: { id: TabId; label: string }[] = [
  { id: "config",  label: "Konfiguracja" },
  { id: "send",    label: "Wyślij SMS" },
  { id: "history", label: "Historia" },
];

export default function SmsIntegrationPage() {
  const [tab, setTab] = useState<TabId>("config");
  const [configured, setConfigured] = useState(false);

  const refreshConfig = useCallback(async () => {
    const res = await fetch("/api/sms/config");
    const data = await res.json();
    setConfigured(!!data.configured);
  }, []);

  useEffect(() => { refreshConfig(); }, [refreshConfig]);

  return (
    <div className="flex flex-col h-full anim-page" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="heat-glow px-8 pt-8 pb-0 shrink-0">
        <h1 className="text-2xl font-semibold mb-1">SMS</h1>
        <p className="text-sm text-[var(--muted)] mb-4">
          Wysyłaj SMS-y do leadów przez własną kartę eSIM — bezpośrednio z Twojego telefonu.
        </p>
        <div className="flex gap-0.5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-2 text-sm font-medium transition-colors rounded-t-lg"
              style={{
                background: tab === t.id ? "var(--surface)" : "transparent",
                color: tab === t.id ? "var(--text)" : "var(--muted)",
                border: tab === t.id ? "1px solid var(--border)" : "1px solid transparent",
                borderBottom: tab === t.id ? "1px solid var(--surface)" : "1px solid transparent",
                marginBottom: tab === t.id ? "-1px" : 0,
                position: "relative",
                zIndex: tab === t.id ? 1 : 0,
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto px-8 py-6" style={{ borderTop: "1px solid var(--border)" }}>
        {tab === "config"  && <ConfigTab onChanged={refreshConfig} />}
        {tab === "send"    && <SendTab configured={configured} />}
        {tab === "history" && <HistoryTab />}
      </div>
    </div>
  );
}
