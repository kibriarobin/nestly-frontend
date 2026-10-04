import apiClient from "@/lib/clientApi";
import type { ApiResponse, IOwnerBooking } from "@/types";

export function getOwnerBookings(): Promise<ApiResponse<IOwnerBooking[]>> {
  return apiClient("/bookings/owner-bookings");
}