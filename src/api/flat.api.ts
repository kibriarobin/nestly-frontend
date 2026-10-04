import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  ICreateFlatPayload,
  IFlat,
  IUpdateFlatPayload,
} from "@/types";

export function createFlat(
  payload: ICreateFlatPayload,
): Promise<ApiResponse<IFlat>> {
  return apiClient("/flats", { method: "POST", body: payload });
}

export function updateFlat(
  id: string,
  payload: IUpdateFlatPayload,
): Promise<ApiResponse<IFlat>> {
  return apiClient(`/flats/${id}`, { method: "PATCH", body: payload });
}

export function deleteFlat(id: string): Promise<ApiResponse<IFlat>> {
  return apiClient(`/flats/${id}`, { method: "DELETE" });
}
