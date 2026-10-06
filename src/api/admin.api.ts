import apiClient from "@/lib/clientApi";
import type {
  AdminUserStatus,
  ApiResponse,
  IAdminUser,
  IAdminUserQuery,
  IAuditLog,
  IAuditLogQuery,
  IDashboardStats,
  IOwnerStat,
  PaginatedResponse,
} from "@/types";

export function getAdminUsers(
  query: IAdminUserQuery,
): Promise<PaginatedResponse<IAdminUser>> {
  return apiClient("/admin/users", { params: query });
}

export function updateUserStatus(
  id: string,
  status: AdminUserStatus,
): Promise<
  ApiResponse<Pick<IAdminUser, "id" | "name" | "email" | "role" | "status">>
> {
  return apiClient(`/admin/users/status/${id}`, {
    method: "PATCH",
    body: { status },
  });
}

export function getDashboardStats(): Promise<ApiResponse<IDashboardStats>> {
  return apiClient("/admin/dashboard-stats");
}

export function getOwnerStats(): Promise<ApiResponse<IOwnerStat[]>> {
  return apiClient("/admin/owner-stats");
}

export function getAuditLogs(
  query: IAuditLogQuery,
): Promise<PaginatedResponse<IAuditLog>> {
  return apiClient("/admin/audit-logs", { params: query });
}
