import apiClient from "@/lib/clientApi";
import type { ApiResponse, ICreateFlatPayload, IFlat } from "@/types";

export function createFlat(
  payload: ICreateFlatPayload,
): Promise<ApiResponse<IFlat>> {
  return apiClient("/flats", { method: "POST", body: payload });
}
