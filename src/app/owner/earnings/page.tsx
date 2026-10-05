import type { Metadata } from "next";
import OwnerEarnings from "@/components/modules/owner/OwnerEarnings";

export const metadata: Metadata = { title: "Earnings" };

export default function OwnerEarningsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Earnings</h1>
        <p className="text-sm text-muted-foreground">
          Track payments and booking activity across your listings.
        </p>
      </div>
      <OwnerEarnings />
    </div>
  );
}
