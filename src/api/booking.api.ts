import apiClient from "@/lib/clientApi";
import type { ApiResponse, BookingStatus, IBookingDetail } from "@/types";

export function cancelBooking(
  id: string,
): Promise<ApiResponse<{ id: string; status: BookingStatus }>> {
  return apiClient(`/bookings/cancel/${id}`, { method: "PATCH" });
}

export function getBookingById(
  id: string,
): Promise<ApiResponse<IBookingDetail>> {
  return apiClient(`/bookings/${id}`);
}
