import apiClient from "@/lib/clientApi";
import type { ApiResponse, IPayment, IPaymentSession } from "@/types";

export function createPayment(
  bookingId: string,
): Promise<ApiResponse<IPaymentSession>> {
  return apiClient("/payments/create", {
    method: "POST",
    body: { bookingId },
  });
}

export function getMyPayments(): Promise<ApiResponse<IPayment[]>> {
  return apiClient("/payments");
}
