import { SkeletonBar, SkeletonTableRow } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="px-8 py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Kampanie</h1>
        <SkeletonBar className="h-9 w-36" />
      </div>
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Nazwa", "Status", "Cel", "Spend", "Leady", "CPL"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-[var(--muted)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonTableRow key={i} cols={6} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
