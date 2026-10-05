import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  ApplicationStatus,
  IApplication,
  ICreateApplicationPayload,
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