import apiClient from "@/lib/clientApi";
import type { ApiResponse, ICreateRoomPayload, IRoom } from "@/types";

export function createRoom(
  payload: ICreateRoomPayload,
): Promise<ApiResponse<IRoom>> {
  return apiClient("/rooms", { method: "POST", body: payload });
}
