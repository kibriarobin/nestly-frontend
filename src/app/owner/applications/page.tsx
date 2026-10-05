import type { Metadata } from "next";
import { Suspense } from "react";
import OwnerApplications from "@/components/modules/application/OwnerApplications";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "Applications" };

export default function OwnerApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Review tenants who applied to your flats and rooms.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={4} />}>
        <OwnerApplications />
      </Suspense>
    </div>
  );
}
