import type { Metadata } from "next";
import AdminOverview from "@/components/modules/admin/AdminOverview";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          A snapshot of listings across the platform.
        </p>
      </div>
      <AdminOverview />
    </div>
  );
}
