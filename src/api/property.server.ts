import { serverFetch } from "@/lib/serverFetch";
import type { PaginatedResponse } from "@/types";
import type { IProperty } from "@/types/property.type";

interface PropertyQuery {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export function getProperties({ searchTerm, page = 1, limit = 9 }: PropertyQuery) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (searchTerm) params.set("searchTerm", searchTerm);

  return serverFetch<PaginatedResponse<IProperty>>(`/properties?${params}`, {
    next: { revalidate: 60 },
  });
}