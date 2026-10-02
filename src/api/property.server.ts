import { PROPERTY_SORT, type PropertySortKey } from "@/constants/property";
import { serverFetch } from "@/lib/serverFetch";
import type {
  ApiResponse,
  IProperty,
  IPropertyDetail,
  PaginatedResponse,
} from "@/types";

interface PropertyQuery {
  searchTerm?: string;
  city?: string;
  sort?: PropertySortKey;
  page?: number;
  limit?: number;
}

export function getProperties({
  searchTerm,
  city,
  sort = "newest",
  page = 1,
  limit = 9,
}: PropertyQuery) {
  const { sortBy, sortOrder } = PROPERTY_SORT[sort];
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (city) params.set("city", city);

  return serverFetch<PaginatedResponse<IProperty>>(`/properties?${params}`, {
    next: { revalidate: 60 },
  });
}

export async function getCities() {
  const { data } = await getProperties({ limit: 100 });
  return [...new Set(data.map((property) => property.city))].sort();
}

export function getPropertyById(id: string) {
  return serverFetch<ApiResponse<IPropertyDetail>>(`/properties/${id}`, {
    next: { revalidate: 60 },
  });
}
