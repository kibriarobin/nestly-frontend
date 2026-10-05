import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelBooking, getBookingById } from "@/api";

export const BOOKING_KEYS = {
  detail: (id: string) => ["bookings", "detail", id] as const,
};

export function useBookingDetail(id: string | undefined) {
  return useQuery({
    queryKey: BOOKING_KEYS.detail(id ?? ""),
    queryFn: () => getBookingById(id as string),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useCancelBooking() {
  return useMutation({ mutationFn: cancelBooking });
}
