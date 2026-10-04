import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  ICreateRoomPayload,
  IRoom,
  IUpdateRoomPayload,
} from "@/types";

export function createRoom(
  payload: ICreateRoomPayload,
): Promise<ApiResponse<IRoom>> {
  return apiClient("/rooms", { method: "POST", body: payload });
}

export function updateRoom(
  id: string,
  payload: IUpdateRoomPayload,
): Promise<ApiResponse<IRoom>> {
  return apiClient(`/rooms/${id}`, { method: "PATCH", body: payload });
}

export function deleteRoom(id: string): Promise<ApiResponse<IRoom>> {
  return apiClient(`/rooms/${id}`, { method: "DELETE" });
}
