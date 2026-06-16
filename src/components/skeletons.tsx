export function SkeletonBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ background: "var(--ba-8)" }}
    />
  );
}

export function SkeletonTableRow({ cols = 6 }: { cols?: number }) {
  return (
    <tr className="border-b border-[var(--border)]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3">
          <SkeletonBar className="h-3 w-24" />
        </td>
      ))}
    </tr>
  );
}

export function PageSkeleton({ title }: { title: string }) {
  return (
    <div className="px-7 py-7 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
      </div>
      <div
        className="overflow-hidden"
        style={{
          background: "var(--panel-solid)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <div className="p-4 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBar key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
