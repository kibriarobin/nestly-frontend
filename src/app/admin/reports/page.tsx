import type { Metadata } from "next";
import { Suspense } from "react";
import AuditLogs from "@/components/modules/admin/AuditLogs";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground">
          An audit log of important actions across the platform.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={6} />}>
        <AuditLogs />
      </Suspense>
    </div>
  );
}
