import type { Metadata } from "next";
import PropertyWizard from "@/components/modules/owner/wizard/PropertyWizard";

export const metadata: Metadata = { title: "Add Property" };

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Add a property</h1>
        <p className="text-sm text-muted-foreground">
          Create your listing in three short steps.
        </p>
      </div>
      <PropertyWizard />
    </div>
  );
}
