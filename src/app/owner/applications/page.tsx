import type { Metadata } from "next";
import OwnerApplicationList from "@/components/modules/owner/OwnerApplicationList";

export const metadata: Metadata = { title: "Applications" };

export default function OwnerApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Review tenant applications for your listings.
        </p>
      </div>
      <OwnerApplicationList />
    </div>
  );
}