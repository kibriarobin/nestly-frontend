import type { Metadata } from "next";
import { Suspense } from "react";
import TenantPayments from "@/components/modules/payment/TenantPayments";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "Payments" };

export default function TenantPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Your payment history for confirmed and pending bookings.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={4} />}>
        <TenantPayments />
      </Suspense>
    </div>
  );
}
