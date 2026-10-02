import { Skeleton } from "@/components/ui/skeleton";
import { CardGridSkeleton } from "./CardGridSkeleton";

export function ListPageSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>
      <Skeleton className="h-9 w-full max-w-md" />
      <CardGridSkeleton count={count} />
    </div>
  );
}
