"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string };

const FIELDS = [
  { key: "full_name", label: "Imię i nazwisko *", required: true },
  { key: "phone", label: "Telefon", required: false },
  { key: "email", label: "E-mail", required: false },
  { key: "notes", label: "Notatki", required: false },
] as const;

const selectStyle = {
  background: "var(--ba-4)",
  border: "1px solid var(--border-strong)",
  color: "var(--text)",
};

export function ImportForm({ stages }: { stages: Stage[] }) {
  const router = useRouter();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [stageId, setStageId] = useState(stages[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ imported: number } | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResult(null);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        if (res.errors.length > 0) {
          setError("Błąd parsowania CSV: " + res.errors[0].message);
          return;
        }
        const hdrs = res.meta.fields ?? [];
        setHeaders(hdrs);
        setRows(res.data);

        // auto-guess mapping
        const guess: Record<string, string> = {};
        for (const f of FIELDS) {
          const match = hdrs.find((h) => {
            const lower = h.toLowerCase().trim();
            if (f.key === "full_name") return /name|imi|nazw/.test(lower);
            if (f.key === "phone") return /phone|tel|gsm/.test(lower);
            if (f.key === "email") return /mail/.test(lower);
            if (f.key === "notes") return /note|uwag|komen/.test(lower);
            return false;
          });
          if (match) guess[f.key] = match;
        }
        setMapping(guess);
      },
      error: (err) => setError(err.message),
    });
  }

  async function handleSubmit() {
    if (!mapping.full_name) {
      setError("Zmapuj kolumnę dla imienia i nazwiska");
      return;
    }
    setLoading(true);
    setError("");

    const payload = rows.map((row) => ({
      full_name: row[mapping.full_name]?.trim() ?? "",
      phone: mapping.phone ? row[mapping.phone]?.trim() || null : null,
      email: mapping.email ? row[mapping.email]?.trim() || null : null,
      notes: mapping.notes ? row[mapping.notes]?.trim() || null : null,
      stage_id: stageId || null,
    })).filter((l) => l.full_name);

    const res = await fetch("/api/leads/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leads: payload }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Błąd importu");
      return;
    }

    setResult({ imported: data.imported });
    setTimeout(() => {
      router.push("/leads");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--danger)", background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.16)" }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "var(--success)", background: "rgba(255,76,0,0.06)", border: "1px solid rgba(255,76,0,0.2)" }}
        >
          Zaimportowano {result.imported} leadów. Przekierowuję…
        </div>
      )}

      <div
        className="rounded-xl p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <label className="block text-sm text-[var(--muted)] mb-2">Plik CSV</label>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
          className="block w-full text-sm file:mr-3 file:border-0 file:bg-[var(--accent)] file:text-white file:rounded-lg file:px-4 file:py-2 file:cursor-pointer file:font-medium file:text-sm hover:file:opacity-90"
        />
      </div>

      {headers.length > 0 && (
        <div
          className="rounded-xl p-6 flex flex-col gap-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="text-sm font-medium mb-2 text-[var(--text)]">
            Mapowanie kolumn ({rows.length} wierszy wykrytych)
          </div>

          {FIELDS.map((f) => (
            <div key={f.key} className="flex items-center gap-3">
              <div className="w-44 text-sm text-[var(--muted)]">{f.label}</div>
              <select
                value={mapping[f.key] ?? ""}
                onChange={(e) =>
                  setMapping({ ...mapping, [f.key]: e.target.value })
                }
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                style={selectStyle}
              >
                <option value="">— nie importuj —</option>
                {headers.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          ))}

          <div
            className="flex items-center gap-3 mt-2 pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="w-44 text-sm text-[var(--muted)]">Etap startowy</div>
            <select
              value={stageId}
              onChange={(e) => setStageId(e.target.value)}
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
              style={selectStyle}
            >
              {stages.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !mapping.full_name}
            className="mt-2 btn-primary disabled:opacity-40 rounded-lg py-2.5 text-sm font-semibold"
          >
            {loading ? "Importuję…" : `Importuj ${rows.length} leadów`}
          </button>
        </div>
      )}
    </div>
  );
}
