import apiClient from "@/lib/clientApi";
import type { ApiResponse, IUpdateProfilePayload, IUser } from "@/types";

export function updateProfile(
  payload: IUpdateProfilePayload,
): Promise<ApiResponse<IUser>> {
  return apiClient("/users/me", { method: "PATCH", body: payload });
}