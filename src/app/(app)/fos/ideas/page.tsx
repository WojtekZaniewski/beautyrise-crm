import { IdeaBacklogClient } from "@/components/fos/idea-backlog-client";

export default function IdeasPage() {
  return (
    <div className="w-full px-4 py-8 anim-page">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold">Idea Backlog</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
          Każdy pomysł trafia tu. Nie do aktywnego sprintu.
        </p>
      </div>
      <IdeaBacklogClient />
    </div>
  );
}
