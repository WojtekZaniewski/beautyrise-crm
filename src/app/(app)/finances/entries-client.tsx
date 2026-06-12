"use client";

import { useState, useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";

export type FinanceEntry = {
  id: string;
  type: "income" | "expense";
  status: "received" | "potential";
  amount_pln: number;
  category: string | null;
  description: string;
  client_name: string | null;
  date: string;
};

const INCOME_CATEGORIES = ["revenue", "other"];
const EXPENSE_CATEGORIES = ["ads", "tools", "salary", "office", "other"];

const CATEGORY_LABELS: Record<string, string> = {
  revenue: "Przychód",
  ads: "Reklamy",
  tools: "Narzędzia",
  salary: "Wynagrodzenia",
  office: "Biuro",
  other: "Inne",
};

function formatAmount(n: number) {
  return n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
}

function entryColor(entry: FinanceEntry): string {
  if (entry.type === "expense") return "#ef4444";
  return entry.status === "potential" ? "#f59e0b" : "#22c55e";
}

function CategoryChip({ cat }: { cat: string | null }) {
  if (!cat) return null;
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
      style={{ background: "var(--ba-4)", color: "var(--muted)" }}>
      {CATEGORY_LABELS[cat] ?? cat}
    </span>
  );
}

function PotentialChip() {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
      style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
      Potencjalny
    </span>
  );
}

type EntryRowProps = {
  entry: FinanceEntry;
  onDelete: (id: string) => void;
  onReceive: (id: string) => void;
  isDeleting: boolean;
  isReceiving: boolean;
};

function EntryRow({ entry, onDelete, onReceive, isDeleting, isReceiving }: EntryRowProps) {
  return (
    <div
      className="flex items-start gap-3 py-2.5 px-3 rounded-lg group"
      style={{
        opacity: isDeleting || isReceiving ? 0.4 : 1,
        transition: "opacity 0.15s",
        background: entry.status === "potential" ? "rgba(245,158,11,0.04)" : "transparent",
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium truncate">{entry.description}</div>
        {entry.client_name && (
          <div className="text-[11px] font-medium truncate" style={{ color: "var(--accent)" }}>
            {entry.client_name}
          </div>
        )}
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-[11px] text-[var(--muted)]">
            {new Date(entry.date + "T00:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          </span>
          <CategoryChip cat={entry.category} />
          {entry.type === "income" && entry.status === "potential" && <PotentialChip />}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div
          className="text-[14px] font-semibold tabular-nums"
          style={{ color: entryColor(entry) }}
        >
          {entry.type === "income" ? "+" : "-"}{formatAmount(entry.amount_pln)}
        </div>

        {/* Odbierz button — only for potential income */}
        {entry.type === "income" && entry.status === "potential" && (
          <button
            onClick={() => onReceive(entry.id)}
            disabled={isReceiving}
            className="text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors disabled:opacity-50"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >
            ✓ Odbierz
          </button>
        )}

        <button
          onClick={() => onDelete(entry.id)}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--ba-4)]"
          style={{ color: "var(--muted)" }}
          title="Usuń"
        >
          <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
            <path d="M3 4h9M6 4V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V4M5.5 4l.5 8M9.5 4l-.5 8"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

type AddFormProps = {
  type: "income" | "expense";
  month: string;
  onAdded: (entry: FinanceEntry) => void;
  onClose: () => void;
};

function AddForm({ type, month, onAdded, onClose }: AddFormProps) {
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(type === "income" ? "revenue" : "ads");
  const [date, setDate] = useState(month + "-01");
  const [incomeStatus, setIncomeStatus] = useState<"received" | "potential">("received");
  const [error, setError] = useState("");

  const cats = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function submit() {
    const parsed = parseFloat(amount.replace(",", "."));
    if (!description.trim() || !parsed || parsed <= 0) {
      setError("Wypełnij opis i kwotę");
      return;
    }
    setError("");
    startTransition(async () => {
      const res = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          amount_pln: parsed,
          category,
          description: description.trim(),
          date,
          status: type === "income" ? incomeStatus : "received",
          client_name: clientName.trim() || null,
        }),
      });
      if (res.ok) {
        const entry = await res.json() as FinanceEntry;
        onAdded(entry);
        onClose();
      } else {
        const j = await res.json() as { error?: string };
        setError(j.error ?? "Błąd");
      }
    });
  }

  const submitColor = type === "expense" ? "#ef4444"
    : incomeStatus === "potential" ? "#f59e0b" : "#22c55e";

  return (
    <div className="mt-2 mb-1 rounded-xl p-3.5 flex flex-col gap-2.5"
      style={{ background: "var(--ba-3)", border: "1px solid var(--border)" }}>

      <div className="flex gap-2">
        <input
          type="text" placeholder="Opis / tytuł" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />
        <input
          type="number" placeholder="Kwota PLN" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]"
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
      </div>

      {/* Client name */}
      <input
        type="text" placeholder="Klientka / klient (opcjonalnie)" value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]"
      />

      <div className="flex gap-2 flex-wrap">
        <select
          value={category} onChange={(e) => setCategory(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none flex-1 min-w-[120px]">
          {cats.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
          ))}
        </select>
        <input
          type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none"
        />
      </div>

      {/* Status toggle — only for income */}
      {type === "income" && (
        <div className="flex gap-1.5">
          <button
            onClick={() => setIncomeStatus("received")}
            className="px-3 py-1 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: incomeStatus === "received" ? "rgba(34,197,94,0.15)" : "var(--ba-4)",
              color: incomeStatus === "received" ? "#22c55e" : "var(--muted)",
            }}
          >
            ✓ Otrzymany
          </button>
          <button
            onClick={() => setIncomeStatus("potential")}
            className="px-3 py-1 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: incomeStatus === "potential" ? "rgba(245,158,11,0.15)" : "var(--ba-4)",
              color: incomeStatus === "potential" ? "#f59e0b" : "var(--muted)",
            }}
          >
            ◌ Potencjalny
          </button>
        </div>
      )}

      {error && <p className="text-[12px]" style={{ color: "var(--danger)" }}>{error}</p>}

      <div className="flex gap-2 justify-end">
        <button onClick={onClose}
          className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] hover:bg-[var(--ba-4)]">
          Anuluj
        </button>
        <button onClick={submit} disabled={isPending}
          className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-white disabled:opacity-50"
          style={{ background: submitColor }}>
          {isPending ? "Dodawanie…" : "Dodaj"}
        </button>
      </div>
    </div>
  );
}

type ColumnProps = {
  type: "income" | "expense";
  initialEntries: FinanceEntry[];
  month: string;
  metaSpend?: number;
};

export function FinanceColumn({ type, initialEntries, month, metaSpend = 0 }: ColumnProps) {
  const isIncome = type === "income";
  const label = isIncome ? "Przychody" : "Wydatki";
  const accentColor = isIncome ? "#22c55e" : "#ef4444";
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [receivingIds, setReceivingIds] = useState<Set<string>>(new Set());

  const [, addOptimistic] = useOptimistic<FinanceEntry[], FinanceEntry>(
    initialEntries,
    (state, newEntry) => [newEntry, ...state],
  );

  const [localEntries, setLocalEntries] = useState<FinanceEntry[]>([]);
  const allEntries = [
    ...localEntries.filter((e) => !initialEntries.some((i) => i.id === e.id)),
    ...initialEntries,
  ];

  const potentialCount = isIncome ? allEntries.filter((e) => e.status === "potential").length : 0;

  function handleAdded(entry: FinanceEntry) {
    setLocalEntries((prev) => [entry, ...prev]);
  }

  async function handleDelete(id: string) {
    setDeletingIds((prev) => new Set([...prev, id]));
    const res = await fetch(`/api/finance/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLocalEntries((prev) => prev.filter((e) => e.id !== id));
      router.refresh();
    } else {
      setDeletingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }

  async function handleReceive(id: string) {
    setReceivingIds((prev) => new Set([...prev, id]));
    const res = await fetch(`/api/finance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "received" }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setReceivingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }

  void addOptimistic;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
          <span className="font-semibold text-[14px]">{label}</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ background: "var(--ba-4)", color: "var(--muted)" }}>
            {allEntries.length}
          </span>
          {potentialCount > 0 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
              {potentialCount} potenj.
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[12px] px-2.5 py-1 rounded-lg font-medium transition-colors"
          style={{
            background: showForm ? "var(--ba-4)" : `${accentColor}15`,
            color: showForm ? "var(--muted)" : accentColor,
          }}>
          {showForm ? "Anuluj" : "+ Dodaj"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[500px]">
        {showForm && (
          <div className="px-3 pt-2">
            <AddForm type={type} month={month} onAdded={handleAdded} onClose={() => setShowForm(false)} />
          </div>
        )}
        {/* Auto-synced Meta Ads spend — pinned, not deletable */}
        {metaSpend > 0 && (
          <div className="flex items-start gap-3 py-2.5 px-3 mx-1 mt-1 rounded-lg"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px dashed var(--border)" }}>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium">Meta Ads — wydatki na reklamy</div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: "var(--ba-4)", color: "var(--muted)" }}>
                  {CATEGORY_LABELS.ads}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(124,92,255,0.12)", color: "var(--accent-2)" }}>
                  Auto-sync
                </span>
              </div>
            </div>
            <div className="text-[14px] font-semibold tabular-nums" style={{ color: "#ef4444" }}>
              -{formatAmount(metaSpend)}
            </div>
          </div>
        )}
        {allEntries.length === 0 && metaSpend === 0 && !showForm ? (
          <div className="px-4 py-8 text-center text-[13px] text-[var(--muted)]">Brak wpisów</div>
        ) : (
          <div className="px-1 py-1">
            {allEntries.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
                onReceive={handleReceive}
                isDeleting={deletingIds.has(entry.id)}
                isReceiving={receivingIds.has(entry.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
