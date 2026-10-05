import apiClient from "@/lib/clientApi";
import type {
  ApiResponse,
  BookingStatus,
  IBookingDetail,
  IOwnerBooking,
} from "@/types";

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

export function getOwnerBookings(): Promise<ApiResponse<IOwnerBooking[]>> {
  return apiClient("/bookings/owner-bookings");
}
