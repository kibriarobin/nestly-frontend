import { serverFetch } from "@/lib/serverFetch";
import type {
  ApiResponse,
  FlatStatus,
  IRoom,
  IRoomDetail,
  PaginatedResponse,
} from "@/types";

interface RoomQuery {
  searchTerm?: string;
  city?: string;
  status?: FlatStatus;
  flatId?: string;
  page?: number;
  limit?: number;
}

export function getRooms({ page = 1, limit = 9, ...filters }: RoomQuery) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }

  return serverFetch<PaginatedResponse<IRoom>>(`/rooms?${params}`, {
    next: { revalidate: 60 },
  });
}

export function getRoomById(id: string) {
  return serverFetch<ApiResponse<IRoomDetail>>(`/rooms/${id}`, {
    next: { revalidate: 60 },
  });
}
