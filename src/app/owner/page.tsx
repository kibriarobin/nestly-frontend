import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import OwnerPropertyList from "@/components/modules/owner/OwnerPropertyList";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Properties" };

export default function OwnerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">My properties</h1>
          <p className="text-sm text-muted-foreground">
            Track approval status and manage your listings.
          </p>
        </div>
        <Link href="/owner/properties/new" className={buttonVariants()}>
          <Plus className="size-4" />
          Add property
        </Link>
      </div>
      <OwnerPropertyList />
    </div>
  );
}
