import { useQueries } from "@tanstack/react-query";
import { getAllPropertiesForAdmin } from "@/api";
import { PROPERTY_STATUSES } from "@/constants/property";
import type { PropertyStatus } from "@/types";
import { PROPERTY_KEYS } from "./property.hook";

export function usePropertyStatusCounts() {
  const results = useQueries({
    queries: PROPERTY_STATUSES.map((status) => ({
      queryKey: [...PROPERTY_KEYS.all, "admin", { status, limit: 1 }],
      queryFn: () => getAllPropertiesForAdmin({ status, limit: 1 }),
    })),
  });

  const counts: Record<PropertyStatus, number> = {
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
    SUSPENDED: 0,
  };
  for (const [index, status] of PROPERTY_STATUSES.entries()) {
    counts[status] = results[index]?.data?.meta.total ?? 0;
  }

  const failed = results.find((result) => result.isError);

  return {
    counts,
    isPending: results.some((result) => result.isPending),
    isError: Boolean(failed),
    error: failed?.error,
    refetch: () => {
      for (const result of results) void result.refetch();
    },
  };
}
