import { serverFetch } from "@/lib/serverFetch";
import type {
  ApiResponse,
  FlatStatus,
  IFlat,
  IFlatDetail,
  PaginatedResponse,
} from "@/types";

interface FlatQuery {
  searchTerm?: string;
  city?: string;
  status?: FlatStatus;
  propertyId?: string;
  page?: number;
  limit?: number;
}

export function getFlats({ page = 1, limit = 9, ...filters }: FlatQuery) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }

  return serverFetch<PaginatedResponse<IFlat>>(`/flats?${params}`, {
    next: { revalidate: 60 },
  });
}

export function getFlatById(id: string) {
  return serverFetch<ApiResponse<IFlatDetail>>(`/flats/${id}`, {
    next: { revalidate: 60 },
  });
}
