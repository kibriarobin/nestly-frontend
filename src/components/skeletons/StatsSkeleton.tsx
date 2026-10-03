import { Skeleton } from "@/components/ui/skeleton";

const CARDS = ["stat-a", "stat-b", "stat-c", "stat-d"];

export function StatsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((id) => (
          <Skeleton key={id} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}
