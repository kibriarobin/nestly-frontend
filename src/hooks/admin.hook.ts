import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  getAdminUsers,
  getAllPropertiesForAdmin,
  getAuditLogs,
  getDashboardStats,
  getOwnerStats,
  updateUserStatus,
} from "@/api";
import { PROPERTY_STATUSES } from "@/constants/property";
import type {
  AdminUserStatus,
  IAdminUserQuery,
  IAuditLogQuery,
  PropertyStatus,
} from "@/types";
import { PROPERTY_KEYS } from "./property.hook";

export const ADMIN_KEYS = {
  users: ["admin", "users"] as const,
  logs: ["admin", "logs"] as const,
  stats: ["admin", "stats"] as const,
  owners: ["admin", "owners"] as const,
};

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

export function useAdminUsers(query: IAdminUserQuery) {
  return useQuery({
    queryKey: [...ADMIN_KEYS.users, query],
    queryFn: () => getAdminUsers(query),
  });
}

export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdminUserStatus }) =>
      updateUserStatus(id, status),
  });
}

export function useAuditLogs(query: IAuditLogQuery) {
  return useQuery({
    queryKey: [...ADMIN_KEYS.logs, query],
    queryFn: () => getAuditLogs(query),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ADMIN_KEYS.stats,
    queryFn: getDashboardStats,
  });
}

export function useOwnerStats() {
  return useQuery({
    queryKey: ADMIN_KEYS.owners,
    queryFn: getOwnerStats,
  });
}
