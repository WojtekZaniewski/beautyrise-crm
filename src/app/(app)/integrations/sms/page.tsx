"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LeadNotesPanel } from "@/components/lead-notes-panel";

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

const STATUS_MAP: Record<string, [string, string, string]> = {
  sent:    ["#22c55e1a", "#16a34a", "Wysłany"],
  pending: ["rgba(0,0,0,0.05)", "#78716C", "Oczekuje"],
  failed:  ["#ef44441a", "#dc2626", "Błąd"],
};
function StatusBadge({ status }: { status: string }) {
  const [bg, color, label] = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: bg, color }}>{label}</span>;
}

// ─── Config Tab ───────────────────────────────────────────────────────────────

interface SmsConfig { configured: boolean; status?: string; connected_at?: string; apikey_hint?: string | null; }

function ConfigTab({ onChanged }: { onChanged: () => void }) {
  const [config, setConfig] = useState<SmsConfig | null>(null);
  const [apikey, setApikey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/sms/config");
    setConfig(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!apikey.trim()) { setError("Wklej API Key z SMSMobileAPI"); return; }
    setSaving(true); setError(""); setSuccess("");
    const res = await fetch("/api/sms/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apikey }) });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error ?? "Błąd zapisu"); return; }
    setSuccess(data.verified ? "Połączono i zweryfikowano klucz API." : "Klucz zapisany (brak potwierdzenia od API — sprawdź numer w aplikacji).");
    setApikey(""); await load(); onChanged();
  };

  const disconnect = async () => {
    if (!confirm("Odłączyć bramkę SMS?")) return;
    await fetch("/api/sms/config", { method: "DELETE" });
    setSuccess(""); await load(); onChanged();
  };

  return (
    <div className="max-w-lg flex flex-col gap-5">
      <Panel className="p-5 flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--accent-subtle)", border: "1px solid rgba(255,76,0,0.15)" }}>
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
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>Odłącz</button>
        )}
      </Panel>

      <Panel className="p-5 flex flex-col gap-3">
        <div className="font-medium text-sm">Jak skonfigurować</div>
        <ol className="text-sm text-[var(--muted)] flex flex-col gap-2 list-decimal list-inside">
          <li>Zaloguj się na <span className="font-mono text-xs px-1 rounded" style={{ background: "var(--ba-8)" }}>smsmobileapi.com</span></li>
          <li>Przejdź do <strong>Dashboard → API Key</strong></li>
          <li>Skopiuj klucz i wklej poniżej</li>
          <li>Upewnij się, że aplikacja SMSMobileAPI działa na Twoim telefonie z kartą SIM</li>
        </ol>
      </Panel>

      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">{config?.configured ? "Zmień API Key" : "Podłącz bramkę SMS"}</div>
        <Input label="API Key" value={apikey} onChange={setApikey} type="password" placeholder="Wklej klucz z SMSMobileAPI Dashboard" hint="Klucz jest szyfrowany przed zapisem" />
        {error && <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>}
        {success && <p className="text-sm" style={{ color: "#16a34a" }}>{success}</p>}
        <button onClick={save} disabled={saving || !apikey.trim()} className="rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: "var(--accent)" }}>
          {saving ? "Zapisywanie…" : config?.configured ? "Zaktualizuj klucz" : "Połącz"}
        </button>
      </Panel>
    </div>
  );
}

// ─── Single Send Tab ──────────────────────────────────────────────────────────

function SendTab({ configured }: { configured: boolean }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const send = async () => {
    if (!to.trim() || !message.trim()) return;
    setSending(true); setResult(null);
    const res = await fetch("/api/sms/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, message }) });
    const data = await res.json();
    setSending(false);
    if (res.ok) { setResult({ ok: true, msg: "SMS wysłany pomyślnie." }); setTo(""); setMessage(""); }
    else setResult({ ok: false, msg: data.error ?? "Błąd wysyłki" });
  };

  if (!configured) return (
    <div className="max-w-lg">
      <Panel className="p-8 text-center flex flex-col items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 22 22" fill="none" className="opacity-30">
          <rect x="5" y="2" width="12" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="11" cy="17" r="1.1" fill="currentColor" />
          <path d="M8 6h6M8 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-[var(--muted)]">Najpierw skonfiguruj bramkę SMS w zakładce <strong>Konfiguracja</strong>.</p>
      </Panel>
    </div>
  );

  return (
    <div className="max-w-lg flex flex-col gap-4">
      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">Wyślij SMS</div>
        <Input label="Numer odbiorcy" value={to} onChange={setTo} type="tel" placeholder="+48600000000" hint="Podaj numer w formacie międzynarodowym" />
        <div>
          <label className="text-xs text-[var(--muted)] block mb-1">Treść wiadomości</label>
          <textarea rows={4} placeholder="Treść SMS…" value={message} onChange={e => setMessage(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm resize-none"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" }} />
          <div className="text-xs text-[var(--muted)] mt-1 text-right">{message.length} / 160 znaków</div>
        </div>
        {result && <p className="text-sm" style={{ color: result.ok ? "#16a34a" : "#dc2626" }}>{result.msg}</p>}
        <button onClick={send} disabled={sending || !to.trim() || !message.trim()} className="rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: "var(--accent)" }}>
          {sending ? "Wysyłanie…" : "Wyślij SMS →"}
        </button>
      </Panel>
    </div>
  );
}

// ─── Campaign Tab ─────────────────────────────────────────────────────────────

type Recipient = { phone: string; name: string; email: string; lead_id?: string };
type CrmLead = { id: string; full_name: string; phone: string; email: string | null; source: string };

const VARS = [
  { label: "{{imię}}", desc: "Imię i nazwisko odbiorcy" },
  { label: "{{telefon}}", desc: "Numer telefonu" },
  { label: "{{email}}", desc: "Adres email" },
];

function applyTemplate(template: string, r: Recipient): string {
  return template
    .replace(/\{\{imię\}\}/gi, r.name || "")
    .replace(/\{\{telefon\}\}/gi, r.phone || "")
    .replace(/\{\{email\}\}/gi, r.email || "");
}

function parsePhoneLine(line: string): Recipient | null {
  const parts = line.split(/[|,;]/).map(s => s.trim());
  const phone = parts[0]?.replace(/\s/g, "");
  if (!phone || !/^\+?\d{7,}$/.test(phone)) return null;
  return { phone, name: parts[1] ?? "", email: parts[2] ?? "" };
}

function parseCsvText(text: string): Recipient[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return [];
  const result: Recipient[] = [];

  // Detect separator
  const sep = lines[0].includes(";") ? ";" : ",";

  // Detect header row
  const firstParts = lines[0].split(sep).map(s => s.trim().toLowerCase());
  const isHeader = firstParts.some(p => ["telefon", "phone", "imię", "name", "numer"].includes(p));
  const startIdx = isHeader ? 1 : 0;

  // Column mapping from header
  let phoneCol = 0, nameCol = 1, emailCol = 2;
  if (isHeader) {
    firstParts.forEach((p, i) => {
      if (["telefon", "phone", "numer"].includes(p)) phoneCol = i;
      if (["imię", "name", "nazwisko", "full_name"].includes(p)) nameCol = i;
      if (["email", "mail"].includes(p)) emailCol = i;
    });
  }

  for (let i = startIdx; i < lines.length; i++) {
    const parts = lines[i].split(sep).map(s => s.trim().replace(/^["']|["']$/g, ""));
    const phone = (parts[phoneCol] ?? "").replace(/\s/g, "");
    if (!phone || !/^\+?\d{7,}$/.test(phone)) continue;
    result.push({ phone, name: parts[nameCol] ?? "", email: parts[emailCol] ?? "" });
  }
  return result;
}

function CampaignTab({ configured }: { configured: boolean }) {
  const [template, setTemplate] = useState("");
  const [sourceMode, setSourceMode] = useState<"paste" | "crm" | "csv">("paste");
  const [pasteText, setPasteText] = useState("");
  const [crmLeads, setCrmLeads] = useState<CrmLead[]>([]);
  const [crmLoading, setCrmLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [crmSearch, setCrmSearch] = useState("");
  const [csvRecipients, setCsvRecipients] = useState<Recipient[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; failed: number } | null>(null);
  const [done, setDone] = useState(false);
  const stopRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const recipients = useMemo((): Recipient[] => {
    if (sourceMode === "paste") return pasteText.split("\n").map(parsePhoneLine).filter(Boolean) as Recipient[];
    if (sourceMode === "crm") return crmLeads.filter(l => selectedIds.has(l.id)).map(l => ({ phone: l.phone, name: l.full_name, email: l.email ?? "", lead_id: l.id }));
    return csvRecipients;
  }, [sourceMode, pasteText, crmLeads, selectedIds, csvRecipients]);

  const loadCrm = useCallback(async () => {
    if (crmLeads.length > 0) return;
    setCrmLoading(true);
    const res = await fetch("/api/leads/with-phone");
    if (res.ok) setCrmLeads(await res.json());
    setCrmLoading(false);
  }, [crmLeads.length]);

  useEffect(() => { if (sourceMode === "crm") loadCrm(); }, [sourceMode, loadCrm]);

  const filteredCrm = useMemo(() => {
    const q = crmSearch.toLowerCase();
    return crmLeads.filter(l => !q || l.full_name.toLowerCase().includes(q) || l.phone.includes(q));
  }, [crmLeads, crmSearch]);

  const toggleLead = (id: string) => setSelectedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const selectAll = () => setSelectedIds(new Set(filteredCrm.map(l => l.id)));
  const clearAll = () => setSelectedIds(new Set());

  const handleCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = ev => setCsvRecipients(parseCsvText(ev.target?.result as string));
    reader.readAsText(file, "UTF-8");
  };

  const insertVar = (v: string) => {
    const el = textareaRef.current;
    if (!el) { setTemplate(t => t + v); return; }
    const start = el.selectionStart, end = el.selectionEnd;
    const next = template.slice(0, start) + v + template.slice(end);
    setTemplate(next);
    setTimeout(() => { el.selectionStart = el.selectionEnd = start + v.length; el.focus(); }, 0);
  };

  const previewMsg = recipients[0] ? applyTemplate(template, recipients[0]) : applyTemplate(template, { phone: "+48600000000", name: "Jan Kowalski", email: "jan@example.com" });
  const charCount = previewMsg.length;
  const smsCount = Math.ceil(charCount / 160) || 1;

  const startSend = async () => {
    if (!recipients.length || !template.trim()) return;
    setSending(true); setDone(false); stopRef.current = false;
    setProgress({ done: 0, total: recipients.length, failed: 0 });
    let failed = 0;
    for (let i = 0; i < recipients.length; i++) {
      if (stopRef.current) break;
      const r = recipients[i];
      const message = applyTemplate(template, r);
      try {
        const res = await fetch("/api/sms/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to: r.phone, message, lead_id: r.lead_id }) });
        if (!res.ok) failed++;
      } catch { failed++; }
      setProgress({ done: i + 1, total: recipients.length, failed });
    }
    setSending(false); setDone(true);
  };

  if (!configured) return (
    <div className="max-w-2xl">
      <Panel className="p-8 text-center flex flex-col items-center gap-3">
        <p className="text-sm text-[var(--muted)]">Najpierw skonfiguruj bramkę SMS w zakładce <strong>Konfiguracja</strong>.</p>
      </Panel>
    </div>
  );

  const inputStyle: React.CSSProperties = { background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)", outline: "none" };

  return (
    <div className="max-w-3xl flex flex-col gap-5">

      {/* Step 1: Template */}
      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">1. Treść wiadomości</div>

        {/* Variable chips */}
        <div className="flex flex-wrap gap-2">
          {VARS.map(v => (
            <button key={v.label} onClick={() => insertVar(v.label)} title={v.desc}
              className="text-xs px-2.5 py-1 rounded-lg font-mono transition-colors"
              style={{ background: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid rgba(255,76,0,0.2)" }}>
              {v.label}
            </button>
          ))}
          <span className="text-xs self-center" style={{ color: "var(--muted)" }}>— kliknij aby wstawić</span>
        </div>

        <div>
          <textarea
            ref={textareaRef}
            rows={5}
            placeholder="Cześć {{imię}}, mamy dla Ciebie specjalną ofertę..."
            value={template}
            onChange={e => setTemplate(e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm resize-none font-mono"
            style={inputStyle}
          />
          <div className="flex items-center justify-between mt-1.5">
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              {smsCount > 1 && <span className="mr-2" style={{ color: "#f59e0b" }}>⚠ {smsCount} SMS-y na odbiorcę</span>}
            </div>
            <div className="text-xs" style={{ color: charCount > 160 ? "#f59e0b" : "var(--muted)" }}>
              {charCount} znaków
            </div>
          </div>
        </div>

        {/* Live preview */}
        {template.trim() && (
          <div className="rounded-lg p-3 text-sm" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
            <div className="text-xs mb-1.5" style={{ color: "var(--muted)" }}>Podgląd dla pierwszego odbiorcy:</div>
            <div className="whitespace-pre-wrap" style={{ color: "var(--text)" }}>{previewMsg}</div>
          </div>
        )}
      </Panel>

      {/* Step 2: Recipients */}
      <Panel className="p-5 flex flex-col gap-4">
        <div className="font-medium text-sm">2. Odbiorcy</div>

        {/* Mode tabs */}
        <div className="flex gap-1 rounded-lg p-1" style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
          {(["paste", "crm", "csv"] as const).map((m) => {
            const labels = { paste: "Wklej listę", crm: "Z CRM", csv: "Import CSV" };
            return (
              <button key={m} onClick={() => setSourceMode(m)}
                className="flex-1 py-1.5 text-xs font-medium rounded-md transition-colors"
                style={{ background: sourceMode === m ? "var(--surface)" : "transparent", color: sourceMode === m ? "var(--text)" : "var(--muted)" }}>
                {labels[m]}
              </button>
            );
          })}
        </div>

        {/* Paste mode */}
        {sourceMode === "paste" && (
          <div>
            <textarea rows={6} placeholder={"+48600000000 | Jan Kowalski | jan@example.com\n+48601000001 | Anna Nowak"} value={pasteText}
              onChange={e => setPasteText(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm resize-none font-mono" style={inputStyle} />
            <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
              Jeden wiersz = jeden odbiorca. Format: <code className="px-1 rounded" style={{ background: "var(--ba-8)" }}>telefon | imię | email</code> — telefon wymagany, reszta opcjonalna.
            </p>
          </div>
        )}

        {/* CRM mode */}
        {sourceMode === "crm" && (
          <div className="flex flex-col gap-3">
            {crmLoading ? (
              <div className="text-sm text-[var(--muted)]">Ładowanie leadów…</div>
            ) : crmLeads.length === 0 ? (
              <div className="text-sm text-[var(--muted)]">Brak leadów z numerem telefonu w CRM.</div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <input value={crmSearch} onChange={e => setCrmSearch(e.target.value)} placeholder="Szukaj po nazwie lub numerze…"
                    className="flex-1 rounded-lg px-3 py-2 text-sm" style={inputStyle} />
                  <button onClick={selectAll} className="text-xs px-3 py-2 rounded-lg" style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>Zaznacz wszystkich</button>
                  <button onClick={clearAll} className="text-xs px-3 py-2 rounded-lg" style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>Wyczyść</button>
                </div>
                <div className="rounded-lg overflow-hidden max-h-64 overflow-y-auto" style={{ border: "1px solid var(--border)" }}>
                  {filteredCrm.map((l, i) => (
                    <label key={l.id} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-[var(--ba-4)]"
                      style={{ borderBottom: i < filteredCrm.length - 1 ? "1px solid var(--border)" : undefined }}>
                      <input type="checkbox" checked={selectedIds.has(l.id)} onChange={() => toggleLead(l.id)} className="accent-[var(--accent)]" />
                      <span className="text-sm font-medium flex-1 truncate">{l.full_name}</span>
                      <span className="text-xs font-mono shrink-0" style={{ color: "var(--muted)" }}>{l.phone}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* CSV mode */}
        {sourceMode === "csv" && (
          <div className="flex flex-col gap-3">
            <label className="flex flex-col items-center gap-2 rounded-xl py-8 cursor-pointer transition-colors hover:bg-[var(--ba-4)]"
              style={{ border: "2px dashed var(--border-strong)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" /><line x1="12" y1="12" x2="12" y2="18" /><line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              <span className="text-sm font-medium">{csvFileName || "Kliknij aby wybrać plik CSV"}</span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Format: telefon, imię, email (nagłówek opcjonalny)</span>
              <input type="file" accept=".csv,.txt" className="hidden" onChange={handleCsvFile} />
            </label>
            {csvRecipients.length > 0 && (
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between px-4 py-2" style={{ background: "var(--ba-4)", borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                    Wczytano {csvRecipients.length} odbiorców — podgląd (pierwsze 5):
                  </span>
                  <button
                    onClick={() => { setCsvRecipients([]); setCsvFileName(""); }}
                    className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded transition-colors hover:bg-red-50"
                    style={{ color: "#dc2626" }}
                    title="Usuń listę"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                    Usuń listę
                  </button>
                </div>
                {csvRecipients.slice(0, 5).map((r, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-2 text-sm" style={{ borderBottom: i < Math.min(csvRecipients.length, 5) - 1 ? "1px solid var(--border)" : undefined }}>
                    <span className="font-mono text-xs shrink-0">{r.phone}</span>
                    <span className="truncate flex-1">{r.name || <span style={{ color: "var(--muted)" }}>—</span>}</span>
                    <span className="text-xs truncate" style={{ color: "var(--muted)" }}>{r.email || "—"}</span>
                    <div onClick={e => e.stopPropagation()} className="shrink-0">
                      <LeadNotesPanel
                        leadId={r.lead_id}
                        leadName={r.name || r.phone}
                        fallbackEmail={r.email || undefined}
                        fallbackName={r.name || r.phone}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {recipients.length > 0 && (
          <div className="text-sm font-medium" style={{ color: "#16a34a" }}>
            ✓ {recipients.length} {recipients.length === 1 ? "odbiorca" : recipients.length < 5 ? "odbiorców" : "odbiorców"} gotowych
          </div>
        )}
      </Panel>

      {/* Step 3: Preview & Send */}
      {recipients.length > 0 && template.trim() && (
        <Panel className="p-5 flex flex-col gap-4">
          <div className="font-medium text-sm">3. Podgląd i wyślij</div>

          {/* Preview table */}
          <div className="rounded-lg overflow-hidden text-sm" style={{ border: "1px solid var(--border)" }}>
            <div className="grid text-xs font-medium px-4 py-2.5" style={{ gridTemplateColumns: "160px 1fr", background: "var(--ba-4)", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
              <span>Telefon / Imię</span><span>SMS</span>
            </div>
            {recipients.slice(0, 4).map((r, i) => (
              <div key={i} className="grid items-start px-4 py-2.5 gap-4" style={{ gridTemplateColumns: "160px 1fr", borderBottom: i < Math.min(recipients.length, 4) - 1 ? "1px solid var(--border)" : undefined }}>
                <div>
                  <div className="font-mono text-xs">{r.phone}</div>
                  {r.name && <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{r.name}</div>}
                </div>
                <div className="text-xs whitespace-pre-wrap" style={{ color: "var(--muted)" }}>{applyTemplate(template, r)}</div>
              </div>
            ))}
            {recipients.length > 4 && (
              <div className="px-4 py-2 text-xs" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>…i {recipients.length - 4} więcej</div>
            )}
          </div>

          {/* Progress */}
          {progress && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--muted)" }}>
                  {sending ? `Wysyłanie… ${progress.done} / ${progress.total}` : `Zakończono: ${progress.done - progress.failed} wysłanych, ${progress.failed} błędów`}
                </span>
                {sending && (
                  <button onClick={() => { stopRef.current = true; }} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "#ef44441a", color: "#dc2626", border: "1px solid #ef444430" }}>
                    Zatrzymaj
                  </button>
                )}
              </div>
              <div className="w-full rounded-full h-1.5" style={{ background: "var(--ba-8)" }}>
                <div className="h-1.5 rounded-full transition-all" style={{ width: `${(progress.done / progress.total) * 100}%`, background: progress.failed > 0 ? "#f59e0b" : "var(--accent)" }} />
              </div>
              {done && progress.failed === 0 && <p className="text-sm" style={{ color: "#16a34a" }}>✓ Wszystkie SMS-y wysłane pomyślnie.</p>}
            </div>
          )}

          <button onClick={startSend} disabled={sending || !recipients.length || !template.trim()}
            className="rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--accent)" }}>
            {sending ? `Wysyłanie ${progress?.done ?? 0} / ${recipients.length}…` : `Wyślij kampanię do ${recipients.length} ${recipients.length === 1 ? "osoby" : "osób"} →`}
          </button>
        </Panel>
      )}
    </div>
  );
}

// ─── History Tab ──────────────────────────────────────────────────────────────

interface SmsMessage { id: string; to: string; body: string; status: string; sent_at: string | null; created_at: string; lead_id: string | null; leads?: { full_name: string } | null; }

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
        <button onClick={load} className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--muted)" }}>↻ Odśwież</button>
      </div>
      <Panel>
        {loading ? <div className="p-6 text-sm text-[var(--muted)]">Ładowanie…</div>
          : messages.length === 0 ? <div className="p-10 text-center text-sm text-[var(--muted)]">Brak wysłanych SMS.</div>
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-[var(--muted)]" style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Odbiorca", "Lead", "Treść", "Status", "Data"].map(h => <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m, i) => (
                    <tr key={m.id} style={{ borderBottom: i < messages.length - 1 ? "1px solid var(--border)" : undefined }}>
                      <td className="px-5 py-3 font-mono text-xs whitespace-nowrap">{m.to}</td>
                      <td className="px-5 py-3 text-[var(--muted)]">{m.leads?.full_name ?? <span className="opacity-40">—</span>}</td>
                      <td className="px-5 py-3 max-w-xs"><span className="line-clamp-2 text-xs text-[var(--muted)]">{m.body}</span></td>
                      <td className="px-5 py-3"><StatusBadge status={m.status} /></td>
                      <td className="px-5 py-3 text-xs text-[var(--muted)] whitespace-nowrap">{new Date(m.sent_at ?? m.created_at).toLocaleString("pl-PL")}</td>
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

type TabId = "config" | "send" | "campaign" | "history";
const TABS: { id: TabId; label: string }[] = [
  { id: "config",   label: "Konfiguracja" },
  { id: "send",     label: "Wyślij SMS" },
  { id: "campaign", label: "Kampania SMS" },
  { id: "history",  label: "Historia" },
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
      <div className="heat-glow px-8 pt-8 pb-0 shrink-0">
        <h1 className="text-2xl font-semibold mb-1">SMS</h1>
        <p className="text-sm text-[var(--muted)] mb-4">Wysyłaj SMS-y do leadów przez własną kartę SIM — bezpośrednio z Twojego telefonu.</p>
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
                position: "relative", zIndex: tab === t.id ? 1 : 0,
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6" style={{ borderTop: "1px solid var(--border)" }}>
        {tab === "config"   && <ConfigTab onChanged={refreshConfig} />}
        {tab === "send"     && <SendTab configured={configured} />}
        {tab === "campaign" && <CampaignTab configured={configured} />}
        {tab === "history"  && <HistoryTab />}
      </div>
    </div>
  );
}
