"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Building2, MapPin, Trash2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { PROPERTY_KEYS, useDeleteProperty, useMyProperties } from "@/hooks";
import type { IMyProperty, PropertyStatus } from "@/types";
import { formatDate, getErrorMessage } from "@/utils";

const STATUS_NOTE: Partial<Record<PropertyStatus, string>> = {
  PENDING: "Waiting for admin approval. It will appear publicly once approved.",
  REJECTED:
    "This listing was rejected. Create a new listing with updated details.",
  SUSPENDED: "An admin suspended this listing. It is hidden from the public.",
};

export default function OwnerPropertyList() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch } = useMyProperties();
  const { mutate: remove, isPending: deleting } = useDeleteProperty();
  const [target, setTarget] = useState<IMyProperty | null>(null);

  const confirmDelete = () => {
    if (!target) return;
    remove(target.id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine });
        toast.success("Property deleted");
        setTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setTarget(null);
      },
    });
  };

  if (isPending) return <RowListSkeleton />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your properties"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const properties = data.data;

  if (properties.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No properties yet"
        description="Add your first property. An admin reviews it before it goes public."
        action={
          <Link href="/owner/properties/new" className={buttonVariants()}>
            Add property
          </Link>
        }
      />
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {properties.map((property) => (
          <li
            key={property.id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate font-semibold">{property.title}</h2>
                <StatusBadge status={property.status} />
              </div>
              <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {property.address}, {property.city}
              </p>
              <p className="text-sm text-muted-foreground">
                {property._count?.flats ?? 0} flats · Added{" "}
                {formatDate(property.createdAt)}
              </p>
              {STATUS_NOTE[property.status] && (
                <p className="text-xs text-warning">
                  {STATUS_NOTE[property.status]}
                </p>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              {property.status === "APPROVED" && (
                <Link
                  href={`/properties/${property.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  View public page
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                aria-label={`Delete ${property.title}`}
                onClick={() => setTarget(property)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        title="Delete this property?"
        description={`"${target?.title ?? ""}" and its flats will be removed. This cannot be undone. Properties with active bookings cannot be deleted.`}
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </>
  );
}
