import { CompanyFocusBanner } from "@/components/fos/company-focus-banner";
import { ExecutionMetrics } from "@/components/fos/execution-metrics";
import { WeeklyPrioritiesClient } from "@/components/fos/weekly-priorities-client";
import { WeeklyReviewForm } from "@/components/fos/weekly-review-form";
import { ActivityFeedClient } from "@/components/fos/activity-feed-client";

export default function FosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 anim-page">
      <div className="mb-2">
        <h1 className="text-[20px] font-semibold">Founder OS</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Egzekucja · Odpowiedzialność · Przejrzystość
        </p>
      </div>

      <div className="mt-5">
        <CompanyFocusBanner />
        <ExecutionMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WeeklyPrioritiesClient />
            <WeeklyReviewForm />
          </div>
          <div className="space-y-6">
            <ActivityFeedClient />
          </div>
        </div>
      </div>
    </div>
  );
}
