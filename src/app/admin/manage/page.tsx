import type { Metadata } from "next";
import { Suspense } from "react";
import AdminPropertyManager from "@/components/modules/admin/AdminPropertyManager";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "Manage Properties" };

export default function AdminManagePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Manage properties</h1>
        <p className="text-sm text-muted-foreground">
          Review new listings and control what is visible to the public.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={4} />}>
        <AdminPropertyManager />
      </Suspense>
    </div>
  );
}
