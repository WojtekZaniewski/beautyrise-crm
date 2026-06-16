import { WeeklyReviewForm } from "@/components/fos/weekly-review-form";

export default function ReviewsPage() {
  return (
    <div className="w-full px-4 py-8 anim-page">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold">Weekly Review</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Raz w tygodniu. Cztery pytania. Pełna retrospektywa.
        </p>
      </div>
      <WeeklyReviewForm />
    </div>
  );
}
