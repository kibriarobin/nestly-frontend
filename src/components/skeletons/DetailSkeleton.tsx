// components/skeletons/DetailSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const STATS = ["stat-a", "stat-b", "stat-c"];

export function DetailSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto space-y-8 px-4 py-10 sm:px-6 lg:px-8",
        wide ? "max-w-7xl" : "max-w-4xl",
      )}
    >
      <Skeleton className="h-8 w-36" />

      <div className="space-y-3">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-5 w-52" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((id) => (
          <Skeleton key={id} className="h-20 rounded-xl" />
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
