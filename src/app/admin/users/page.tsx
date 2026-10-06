import type { Metadata } from "next";
import { Suspense } from "react";
import AdminUsers from "@/components/modules/admin/AdminUsers";
import { RowListSkeleton } from "@/components/skeletons";

export const metadata: Metadata = { title: "Users" };

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Search owners and tenants, and block accounts that break the rules.
        </p>
      </div>
      <Suspense fallback={<RowListSkeleton count={5} />}>
        <AdminUsers />
      </Suspense>
    </div>
  );
}
