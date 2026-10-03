import { Skeleton } from "@/components/ui/skeleton";

export function RowListSkeleton({ count = 3 }: { count?: number }) {
  const rows = Array.from({ length: count }, (_, i) => `row-${i}`);

  return (
    <div className="space-y-4">
      {rows.map((id) => (
        <div
          key={id}
          className="flex items-center justify-between gap-4 rounded-xl border p-5"
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}
