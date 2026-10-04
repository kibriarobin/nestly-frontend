import apiClient from "@/lib/clientApi";
import type { ApiResponse, IOwnerApplication } from "@/types";

export function getOwnerApplications(): Promise<
  ApiResponse<IOwnerApplication[]>
> {
  return apiClient("/applications/owner-applications");
}

export function approveApplication(id: string): Promise<ApiResponse<unknown>> {
  return apiClient(`/applications/approve/${id}`, { method: "PATCH" });
}

export function rejectApplication(id: string): Promise<ApiResponse<unknown>> {
  return apiClient(`/applications/reject/${id}`, { method: "PATCH" });
}