import { useMutation, useQuery } from "@tanstack/react-query";
import { createPayment, getMyPayments } from "@/api";

export const PAYMENT_KEYS = {
  mine: ["payments", "mine"] as const,
};

export function useMyPayments() {
  return useQuery({
    queryKey: PAYMENT_KEYS.mine,
    queryFn: getMyPayments,
  });
}

export function useInitiatePayment() {
  return useMutation({ mutationFn: createPayment });
}
