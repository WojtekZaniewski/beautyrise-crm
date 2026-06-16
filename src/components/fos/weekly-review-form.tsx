"use client";

import { useEffect, useState } from "react";
import type { FosWeeklyReview } from "@/lib/fos-types";
import { getWeekStart } from "@/lib/fos-types";

const QUESTIONS = [
  { key: "done_this_week", label: "1. Co zostało wykonane?", placeholder: "Opisz, co udało się zrealizować..." },
  { key: "not_done", label: "2. Co nie zostało wykonane?", placeholder: "Co zostało nieukończone lub pominięte?" },
  { key: "blockers", label: "3. Co było blokadą?", placeholder: "Jakie przeszkody lub problemy wystąpiły?" },
  { key: "focus_next_week", label: "4. Na czym skupiam się w przyszłym tygodniu?", placeholder: "Główny fokus na kolejny tydzień..." },
] as const;

type ReviewKey = (typeof QUESTIONS)[number]["key"];

export function WeeklyReviewForm() {
  const [week, setWeek] = useState(getWeekStart());
  const [form, setForm] = useState<Record<ReviewKey, string>>({
    done_this_week: "",
    not_done: "",
    blockers: "",
    focus_next_week: "",
  });
  const [existingId, setExistingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [allReviews, setAllReviews] = useState<FosWeeklyReview[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadWeek = (w: string) => {
    fetch(`/api/fos/reviews?week=${w}`)
      .then((r) => r.json())
      .then((d) => {
        const rev: FosWeeklyReview | undefined = (d.data ?? [])[0];
        if (rev) {
          setExistingId(rev.id);
          setForm({
            done_this_week: rev.done_this_week ?? "",
            not_done: rev.not_done ?? "",
            blockers: rev.blockers ?? "",
            focus_next_week: rev.focus_next_week ?? "",
          });
        } else {
          setExistingId(null);
          setForm({ done_this_week: "", not_done: "", blockers: "", focus_next_week: "" });
        }
      });
  };

  const loadAll = () => {
    fetch("/api/fos/reviews")
      .then((r) => r.json())
      .then((d) => setAllReviews(d.data ?? []));
  };

  useEffect(() => { loadWeek(week); }, [week]);
  useEffect(() => { if (showHistory) loadAll(); }, [showHistory]);

  const save = async () => {
    setSaving(true); setSaved(false);
    const res = await fetch("/api/fos/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ week_start: week, ...form }),
    });
    if (res.ok) {
      const json = await res.json();
      setExistingId(json.data?.id ?? existingId);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  };

  const prevWeek = () => {
    const d = new Date(week); d.setDate(d.getDate() - 7);
    setWeek(d.toISOString().split("T")[0]);
  };
  const nextWeek = () => {
    const d = new Date(week); d.setDate(d.getDate() + 7);
    setWeek(d.toISOString().split("T")[0]);
  };

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-semibold">Weekly Review</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <button onClick={prevWeek} className="text-[var(--muted)] hover:text-[var(--text)] text-[11px]">‹</button>
            <span className="text-[11px] text-[var(--muted)] tabular-nums">{week}</span>
            <button onClick={nextWeek} className="text-[var(--muted)] hover:text-[var(--text)] text-[11px]">›</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {existingId && (
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "#FF4C0015", color: "#FF4C00", border: "1px solid #FF4C0030" }}>
              Zapisane
            </span>
          )}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-[11px] hover:underline" style={{ color: "var(--muted)" }}
          >
            {showHistory ? "Ukryj historię" : "Historia"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-[12px] font-medium block mb-1.5">{label}</label>
            <textarea
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-[13px] outline-none resize-none"
              style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={save}
          disabled={saving}
          className="px-5 py-2 rounded-lg text-[13px] font-medium text-white disabled:opacity-50"
          style={{ background: "var(--accent)" }}
        >
          {saving ? "Zapisuję..." : "Zapisz review"}
        </button>
        {saved && (
          <span className="text-[12px] font-medium" style={{ color: "#FF4C00" }}>
            ✓ Zapisano
          </span>
        )}
      </div>

      {showHistory && allReviews.length > 0 && (
        <div className="mt-5 space-y-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--muted)" }}>
            Historia reviewów
          </div>
          {allReviews.map((r) => (
            <div key={r.id} className="rounded-lg p-4 space-y-2"
              style={{ background: "var(--ba-4)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold tabular-nums">{r.week_start}</span>
                {r.user_label && <span className="text-[11px] text-[var(--muted)]">— {r.user_label}</span>}
              </div>
              {r.done_this_week && (
                <div>
                  <div className="text-[10px] uppercase font-semibold text-[var(--muted)] mb-0.5">Wykonano</div>
                  <p className="text-[12px]">{r.done_this_week}</p>
                </div>
              )}
              {r.focus_next_week && (
                <div>
                  <div className="text-[10px] uppercase font-semibold text-[var(--muted)] mb-0.5">Następny tydzień</div>
                  <p className="text-[12px]">{r.focus_next_week}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
