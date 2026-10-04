import type { Metadata } from "next";
import OwnerProfileForm from "@/components/modules/owner/OwnerProfileForm";

export const metadata: Metadata = { title: "Profile" };

export default function OwnerProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your contact details.
        </p>
      </div>
      <OwnerProfileForm />
    </div>
  );
}