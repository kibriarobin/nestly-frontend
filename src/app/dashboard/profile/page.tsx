import type { Metadata } from "next";
import ProfileSettings from "@/components/modules/profile/ProfileSettings";

export const metadata: Metadata = { title: "Profile" };

export default function TenantProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account details.
        </p>
      </div>
      <ProfileSettings />
    </div>
  );
}