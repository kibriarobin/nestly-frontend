import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  ApplicationStatus,
  IApplication,
  ICreateApplicationPayload,
  IOwnerApplication,
} from "@/types";

interface ApplicationResult {
  id: string;
  status: ApplicationStatus;
}

export function createApplication(
  payload: ICreateApplicationPayload,
): Promise<ApiResponse<ApplicationResult>> {
  return apiClient("/applications", { method: "POST", body: payload });
}

export function getMyApplications(): Promise<ApiResponse<IApplication[]>> {
  return apiClient("/applications/my-applications");
}

export function cancelApplication(
  id: string,
): Promise<ApiResponse<ApplicationResult>> {
  return apiClient(`/applications/cancel/${id}`, { method: "PATCH" });
}

export function getOwnerApplications(): Promise<
  ApiResponse<IOwnerApplication[]>
> {
  return apiClient("/applications/owner-applications");
}

export function approveApplication(
  id: string,
): Promise<
  ApiResponse<{ application: ApplicationResult; booking: { id: string } }>
> {
  return apiClient(`/applications/approve/${id}`, { method: "PATCH" });
}

export function rejectApplication(
  id: string,
): Promise<ApiResponse<ApplicationResult>> {
  return apiClient(`/applications/reject/${id}`, { method: "PATCH" });
}
