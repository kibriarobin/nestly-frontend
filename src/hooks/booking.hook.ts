import { useQuery } from "@tanstack/react-query";
import { getOwnerBookings } from "@/api";

export const BOOKING_KEYS = {
  owner: ["bookings", "owner"] as const,
};

export function useOwnerBookings() {
  return useQuery({
    queryKey: BOOKING_KEYS.owner,
    queryFn: getOwnerBookings,
  });
}