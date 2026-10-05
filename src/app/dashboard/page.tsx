import type { Metadata } from "next";
import { Suspense } from "react";
import TenantActivity from "@/components/modules/application/TenantActivity";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "My Activity" };

export default function TenantPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">My activity</h1>
        <p className="text-sm text-muted-foreground">
          Track the applications you sent and where each one stands.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={4} />}>
        <TenantActivity />
      </Suspense>
    </div>
  );
}
