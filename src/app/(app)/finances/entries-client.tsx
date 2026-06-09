"use client";

import { useState, useTransition, useOptimistic } from "react";

type FinanceEntry = {
  id: string;
  type: "income" | "expense";
  amount_pln: number;
  category: string | null;
  description: string;
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

function CategoryChip({ cat }: { cat: string | null }) {
  if (!cat) return null;
  return (
    <span
      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
      style={{
        background: "var(--ba-4)",
        color: "var(--muted)",
      }}
    >
      {CATEGORY_LABELS[cat] ?? cat}
    </span>
  );
}

type EntryRowProps = {
  entry: FinanceEntry;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

function EntryRow({ entry, onDelete, isDeleting }: EntryRowProps) {
  return (
    <div
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg group"
      style={{ opacity: isDeleting ? 0.4 : 1, transition: "opacity 0.15s" }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium truncate">{entry.description}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-[var(--muted)]">
            {new Date(entry.date + "T00:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          </span>
          <CategoryChip cat={entry.category} />
        </div>
      </div>
      <div
        className="text-[14px] font-semibold tabular-nums"
        style={{ color: entry.type === "income" ? "#22c55e" : "#ef4444" }}
      >
        {entry.type === "income" ? "+" : "-"}{formatAmount(entry.amount_pln)}
      </div>
      <button
        onClick={() => onDelete(entry.id)}
        disabled={isDeleting}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--ba-4)]"
        style={{ color: "var(--muted)" }}
        title="Usuń"
      >
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
          <path d="M3 4h9M6 4V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V4M5.5 4l.5 8M9.5 4l-.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
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
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(type === "income" ? "revenue" : "ads");
  const [date, setDate] = useState(month + "-01");
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
        body: JSON.stringify({ type, amount_pln: parsed, category, description: description.trim(), date }),
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

  return (
    <div
      className="mt-2 mb-1 rounded-xl p-3.5 flex flex-col gap-2.5"
      style={{ background: "var(--ba-3)", border: "1px solid var(--border)" }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />
        <input
          type="number"
          placeholder="Kwota PLN"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none focus:border-[var(--accent)]"
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
      </div>
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none flex-1"
        >
          {cats.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] outline-none"
        />
      </div>
      {error && <p className="text-[12px]" style={{ color: "var(--danger)" }}>{error}</p>}
      <div className="flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] hover:bg-[var(--ba-4)]"
        >
          Anuluj
        </button>
        <button
          onClick={submit}
          disabled={isPending}
          className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-white disabled:opacity-50"
          style={{ background: type === "income" ? "#22c55e" : "#ef4444" }}
        >
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
};

export function FinanceColumn({ type, initialEntries, month }: ColumnProps) {
  const isIncome = type === "income";
  const label = isIncome ? "Przychody" : "Wydatki";
  const accentColor = isIncome ? "#22c55e" : "#ef4444";

  const [showForm, setShowForm] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const [entries, addOptimistic] = useOptimistic<FinanceEntry[], FinanceEntry>(
    initialEntries,
    (state, newEntry) => [newEntry, ...state],
  );

  const [localEntries, setLocalEntries] = useState<FinanceEntry[]>([]);
  const allEntries = [...localEntries.filter((e) => !initialEntries.some((i) => i.id === e.id)), ...initialEntries];

  function handleAdded(entry: FinanceEntry) {
    setLocalEntries((prev) => [entry, ...prev]);
  }

  async function handleDelete(id: string) {
    setDeletingIds((prev) => new Set([...prev, id]));
    const res = await fetch(`/api/finance/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLocalEntries((prev) => prev.filter((e) => e.id !== id));
      // Force re-fetch by navigating — or use router.refresh()
      window.location.reload();
    } else {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  void addOptimistic; // useOptimistic used via localEntries pattern above

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--panel)" }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: accentColor }}
          />
          <span className="font-semibold text-[14px]">{label}</span>
          <span
            className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ background: "var(--ba-4)", color: "var(--muted)" }}
          >
            {allEntries.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[12px] px-2.5 py-1 rounded-lg font-medium transition-colors"
          style={{
            background: showForm ? "var(--ba-4)" : `${accentColor}15`,
            color: showForm ? "var(--muted)" : accentColor,
          }}
        >
          {showForm ? "Anuluj" : "+ Dodaj"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[500px]">
        {showForm && (
          <div className="px-3 pt-2">
            <AddForm
              type={type}
              month={month}
              onAdded={handleAdded}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        {allEntries.length === 0 && !showForm ? (
          <div className="px-4 py-8 text-center text-[13px] text-[var(--muted)]">
            Brak wpisów
          </div>
        ) : (
          <div className="px-1 py-1">
            {allEntries.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
                isDeleting={deletingIds.has(entry.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
