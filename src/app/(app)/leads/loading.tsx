import { SkeletonBar, SkeletonTableRow } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Leady</h1>
        <div className="flex gap-2">
          <SkeletonBar className="h-9 w-24" />
          <SkeletonBar className="h-9 w-24" />
          <SkeletonBar className="h-9 w-32" />
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonBar className="h-8 w-40" />
        <SkeletonBar className="h-8 w-80" />
      </div>
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Imię i nazwisko", "Telefon", "E-mail", "Etap", "Tagi", "Źródło", "Data"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-[var(--muted)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonTableRow key={i} cols={7} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
