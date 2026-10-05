import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="max-w-xl space-y-4 rounded-xl border p-6">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-28" />
    </div>
  );
}
