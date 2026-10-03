"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  Check,
  Loader2,
  MapPin,
  RotateCcw,
  SearchX,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import ListFilters from "@/components/shared/ListFilters";
import Pagination from "@/components/shared/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  PROPERTY_KEYS,
  useAdminProperties,
  useUpdatePropertyStatus,
} from "@/hooks";
import type { IProperty, PropertyStatus, PropertyStatusUpdate } from "@/types";
import { formatDate, getErrorMessage } from "@/utils";

const PAGE_SIZE = 8;

const TABS: { value: PropertyStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" },
];

interface PropertyAction {
  status: PropertyStatusUpdate;
  label: string;
  icon: LucideIcon;
  confirm?: string;
}

const ACTIONS: Record<PropertyStatus, PropertyAction[]> = {
  PENDING: [
    { status: "APPROVED", label: "Approve", icon: Check },
    {
      status: "REJECTED",
      label: "Reject",
      icon: X,
      confirm:
        "The owner will not be able to resubmit this listing and must create a new one.",
    },
  ],
  APPROVED: [
    {
      status: "SUSPENDED",
      label: "Suspend",
      icon: Ban,
      confirm: "It will be hidden from the public until you reinstate it.",
    },
  ],
  REJECTED: [{ status: "APPROVED", label: "Approve", icon: Check }],
  SUSPENDED: [{ status: "APPROVED", label: "Reinstate", icon: RotateCcw }],
};

const EMPTY_COPY: Record<PropertyStatus, string> = {
  PENDING: "No properties are waiting for review right now.",
  APPROVED: "No approved properties match your search.",
  REJECTED: "No rejected properties match your search.",
  SUSPENDED: "No suspended properties match your search.",
};

export default function AdminPropertyManager() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const status: PropertyStatus =
    TABS.find((tab) => tab.value === searchParams.get("status"))?.value ??
    "PENDING";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const searchTerm = searchParams.get("searchTerm")?.trim() || undefined;

  const { data, isPending, isError, error, refetch } = useAdminProperties({
    status,
    page,
    limit: PAGE_SIZE,
    searchTerm,
  });
  const {
    mutate: updateStatus,
    isPending: updating,
    variables,
  } = useUpdatePropertyStatus();

  const [confirm, setConfirm] = useState<{
    property: IProperty;
    action: PropertyAction;
  } | null>(null);

  const applyStatus = (property: IProperty, next: PropertyStatusUpdate) =>
    updateStatus(
      { id: property.id, status: next },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.all });
          toast.success(`"${property.title}" is now ${next.toLowerCase()}`);
          setConfirm(null);
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
          setConfirm(null);
        },
      },
    );

  const handleAction = (property: IProperty, action: PropertyAction) => {
    if (action.confirm) setConfirm({ property, action });
    else applyStatus(property, action.status);
  };

  const tabHref = (value: PropertyStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);
    params.delete("page");
    return `/admin/manage?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const active = tab.value === status;
          return (
            <Link
              key={tab.value}
              href={tabHref(tab.value)}
              aria-current={active ? "page" : undefined}
              className={buttonVariants({
                variant: active ? "default" : "outline",
                size: "sm",
              })}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <ListFilters searchPlaceholder="Search by title, address or city" />

      {isPending && <RowListSkeleton count={4} />}

      {isError && (
        <EmptyState
          icon={TriangleAlert}
          title="Could not load properties"
          description={getErrorMessage(error)}
          action={<Button onClick={() => refetch()}>Try again</Button>}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState
          icon={SearchX}
          title={`No ${status.toLowerCase()} properties`}
          description={EMPTY_COPY[status]}
        />
      )}

      {data && data.data.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.data.length} of {data.meta?.total ?? 0}{" "}
            {status.toLowerCase()} properties
          </p>

          <ul className="space-y-4">
            {data.data.map((property) => (
              <li
                key={property.id}
                className="flex flex-col gap-4 rounded-xl border bg-card p-5 lg:flex-row lg:items-center lg:justify-between"
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
                  <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                    {property.owner && (
                      <span className="flex items-center gap-1.5">
                        <User className="size-4" />
                        {property.owner.name} ({property.owner.email})
                      </span>
                    )}
                    <span>Added {formatDate(property.createdAt)}</span>
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/properties/${property.id}`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    View
                  </Link>
                  {ACTIONS[property.status].map((action) => {
                    const busy = updating && variables?.id === property.id;
                    return (
                      <Button
                        key={action.label}
                        size="sm"
                        variant={action.confirm ? "outline" : "default"}
                        disabled={updating}
                        onClick={() => handleAction(property, action)}
                      >
                        {busy ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <action.icon className="size-4" />
                        )}
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            page={data.meta?.page ?? page}
            totalPages={data.meta?.totalPages ?? 1}
            basePath="/admin/manage"
            params={{ status, searchTerm }}
          />
        </>
      )}

      <ConfirmDialog
        open={confirm !== null}
        onOpenChange={(open) => {
          if (!open) setConfirm(null);
        }}
        title={`${confirm?.action.label ?? ""} this property?`}
        description={`"${confirm?.property.title ?? ""}": ${confirm?.action.confirm ?? ""}`}
        confirmLabel={confirm?.action.label}
        pending={updating}
        onConfirm={() => {
          if (confirm) applyStatus(confirm.property, confirm.action.status);
        }}
      />
    </div>
  );
}
