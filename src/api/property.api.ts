import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  ICreatePropertyPayload,
  IMyProperty,
  IProperty,
  IPropertyDetail,
  IPropertyQuery,
  IUpdatePropertyPayload,
  PaginatedResponse,
  PropertyStatusUpdate,
} from "@/types";

export function createProperty(
  payload: ICreatePropertyPayload,
): Promise<ApiResponse<IProperty>> {
  return apiClient("/properties", { method: "POST", body: payload });
}

export function getMyProperties(): Promise<ApiResponse<IMyProperty[]>> {
  return apiClient("/properties/my-properties");
}

export function getAllProperties(
  query: IPropertyQuery = {},
): Promise<PaginatedResponse<IProperty>> {
  const params = new URLSearchParams({
    page: String(query.page ?? 1),
    limit: String(query.limit ?? 10),
  });
  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query.status) params.set("status", query.status);

  return apiClient(`/properties?${params}`);
}

export function getAllPropertiesForAdmin(
  params: IPropertyQuery,
): Promise<PaginatedResponse<IProperty>> {
  return apiClient("/properties/admin/list", { params });
}

export function getPropertyDetail(
  id: string,
): Promise<ApiResponse<IPropertyDetail>> {
  return apiClient(`/properties/${id}`);
}

export function updateProperty(
  id: string,
  payload: IUpdatePropertyPayload,
): Promise<ApiResponse<IProperty>> {
  return apiClient(`/properties/${id}`, { method: "PATCH", body: payload });
}

export function deleteProperty(id: string): Promise<ApiResponse<IProperty>> {
  return apiClient(`/properties/${id}`, { method: "DELETE" });
}

export function updatePropertyStatus(
  id: string,
  status: PropertyStatusUpdate,
): Promise<ApiResponse<IProperty>> {
  return apiClient(`/properties/status/${id}`, {
    method: "PATCH",
    body: { status },
  });
}
