"use client";

interface Props {
  daysActive: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SprintGoalModal({ daysActive, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="rounded-xl p-6 max-w-md w-full mx-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="text-[15px] font-semibold mb-1">Zmiana celu sprintu</div>
        <p className="text-[13px] mb-5" style={{ color: "var(--muted)" }}>
          Sprint trwa już od{" "}
          <strong style={{ color: "var(--text)" }}>
            {daysActive} {daysActive === 1 ? "dnia" : "dni"}
          </strong>
          . Zmiana kierunku przed zakończeniem sprintu może obniżyć skuteczność wykonania. Czy na pewno chcesz kontynuować?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-[var(--ba-4)]"
            style={{ border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Zmień mimo wszystko
          </button>
        </div>
      </div>
    </div>
  );
}
