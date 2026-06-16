import { SprintManager } from "@/components/fos/sprint-manager";

export default function SprintsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 anim-page">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold">Sprinty</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Jedna jednostka czasu. Jeden aktywny sprint.
        </p>
      </div>
      <SprintManager />
    </div>
  );
}
