import { SkeletonBar } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Kanban</h1>
        <SkeletonBar className="h-8 w-40" />
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="min-w-64 flex flex-col gap-2">
            <SkeletonBar className="h-6 w-32" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="bg-[var(--panel)] border border-[var(--border)] rounded-lg p-3 flex flex-col gap-2"
              >
                <SkeletonBar className="h-3 w-3/4" />
                <SkeletonBar className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
