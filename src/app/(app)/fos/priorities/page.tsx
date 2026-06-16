import { WeeklyPrioritiesClient } from "@/components/fos/weekly-priorities-client";

export default function PrioritiesPage() {
  return (
    <div className="w-full px-4 py-8 anim-page">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold">Weekly Priorities</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Maks. 3 priorytety na tydzień. Cel tygodnia ustawiasz w sprincie.
        </p>
      </div>
      <WeeklyPrioritiesClient />
    </div>
  );
}
