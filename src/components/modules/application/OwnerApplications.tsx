// components/modules/application/OwnerApplications.tsx
"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  Phone,
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
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  APPLICATION_KEYS,
  PROPERTY_KEYS,
  useApproveApplication,
  useOwnerApplications,
  useRejectApplication,
} from "@/hooks";
import type { ApplicationStatus, IOwnerApplication } from "@/types";
import { formatDate, formatRent, getErrorMessage } from "@/utils";

const PAGE_SIZE = 6;

const TABS: {
  value: string;
  label: string;
  match: (status: ApplicationStatus) => boolean;
}[] = [
  { value: "all", label: "All", match: () => true },
  {
    value: "review",
    label: "In review",
    match: (s) => s === "PENDING" || s === "UNDER_REVIEW",
  },
  {
    value: "approved",
    label: "Awaiting payment",
    match: (s) => s === "APPROVED",
  },
  { value: "confirmed", label: "Confirmed", match: (s) => s === "CONFIRMED" },
  {
    value: "closed",
    label: "Closed",
    match: (s) => s === "REJECTED" || s === "CANCELLED",
  },
];

const isOpen = (status: ApplicationStatus) =>
  status === "PENDING" || status === "UNDER_REVIEW";

interface Decision {
  application: IOwnerApplication;
  kind: "approve" | "reject";
}

export default function OwnerApplications() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data, isPending, isError, error, refetch } = useOwnerApplications();
  const { mutate: approve, isPending: approving } = useApproveApplication();
  const { mutate: reject, isPending: rejecting } = useRejectApplication();
  const [decision, setDecision] = useState<Decision | null>(null);

  const tab =
    TABS.find((item) => item.value === searchParams.get("status")) ?? TABS[0];
  const term = searchParams.get("searchTerm")?.trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const confirmDecision = () => {
    if (!decision) return;
    const { application, kind } = decision;

    const options = {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: APPLICATION_KEYS.owner }),
          queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.root }),
        ]);
        toast.success(
          kind === "approve"
            ? "Application approved. The tenant can now pay to confirm the booking."
            : "Application rejected",
        );
        setDecision(null);
      },
      onError: (err: unknown) => {
        toast.error(getErrorMessage(err));
        setDecision(null);
      },
    };

    if (kind === "approve") approve(application.id, options);
    else reject(application.id, options);
  };

  const tabHref = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("status");
    else params.set("status", value);
    params.delete("page");
    const query = params.toString();
    return query ? `/owner/applications?${query}` : "/owner/applications";
  };

  if (isPending) return <RowListSkeleton count={4} />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load applications"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const applications = data.data;

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No applications yet"
        description="Tenants who apply to your flats and rooms will appear here."
      />
    );
  }

  const count = (match: (status: ApplicationStatus) => boolean) =>
    applications.filter((application) => match(application.status)).length;

  const matchesSearch = (application: IOwnerApplication) =>
    !term ||
    [
      application.tenant.name,
      application.tenant.email,
      application.flat.name,
      application.room?.name,
      application.flat.property.title,
    ].some((value) => value?.toLowerCase().includes(term));

  const filtered = applications.filter(
    (application) =>
      tab.match(application.status) && matchesSearch(application),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const listingName = (application: IOwnerApplication) =>
    application.rentalType === "ROOM" && application.room
      ? application.room.name
      : application.flat.name;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="In review"
          value={count(isOpen)}
          icon={Clock}
          tone="warning"
        />
        <StatCard
          label="Awaiting payment"
          value={count((s) => s === "APPROVED")}
          icon={ClipboardList}
        />
        <StatCard
          label="Confirmed"
          value={count((s) => s === "CONFIRMED")}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <Link
            key={item.value}
            href={tabHref(item.value)}
            aria-current={item.value === tab.value ? "page" : undefined}
            className={buttonVariants({
              variant: item.value === tab.value ? "default" : "outline",
              size: "sm",
            })}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <ListFilters searchPlaceholder="Search by tenant, flat, room or property" />

      {visible.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nothing here"
          description="No applications match this filter or search."
        />
      ) : (
        <ul className="space-y-4">
          {visible.map((application) => {
            const isRoom =
              application.rentalType === "ROOM" && application.room;

            return (
              <li
                key={application.id}
                className="space-y-3 rounded-xl border bg-card p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-semibold">
                        {listingName(application)}
                      </h2>
                      <StatusBadge status={application.status} />
                      <Badge variant="outline">
                        {isRoom ? "Room" : "Whole flat"}
                      </Badge>
                    </div>
                    <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      {application.flat.property.title}
                      {isRoom ? ` · ${application.flat.name}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">
                        {formatRent(application.rent)}
                      </span>{" "}
                      · Applied {formatDate(application.createdAt)}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="size-4 text-muted-foreground" />
                        {application.tenant.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="size-4" />
                        {application.tenant.email}
                      </span>
                      {application.tenant.phone && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="size-4" />
                          {application.tenant.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {isOpen(application.status) && (
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          setDecision({ application, kind: "approve" })
                        }
                      >
                        <Check className="size-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDecision({ application, kind: "reject" })
                        }
                      >
                        <X className="size-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                {application.message && (
                  <p className="rounded-lg bg-muted p-3 text-sm">
                    {application.message}
                  </p>
                )}
                {application.status === "APPROVED" && (
                  <p className="text-sm text-warning">
                    Approved. The listing is reserved until the tenant pays.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        basePath="/owner/applications"
        params={{
          status: tab.value === "all" ? undefined : tab.value,
          searchTerm: searchParams.get("searchTerm")?.trim() || undefined,
        }}
      />

      <ConfirmDialog
        open={decision !== null}
        onOpenChange={(open) => {
          if (!open) setDecision(null);
        }}
        title={
          decision?.kind === "approve"
            ? "Approve this application?"
            : "Reject this application?"
        }
        description={
          decision?.kind === "approve"
            ? `${decision.application.tenant.name} gets a booking for "${listingName(decision.application)}" and the listing is reserved until they pay. Other applicants cannot apply meanwhile.`
            : `${decision?.application.tenant.name ?? "The tenant"} will be told their application was rejected.`
        }
        confirmLabel={decision?.kind === "approve" ? "Approve" : "Reject"}
        variant={decision?.kind === "approve" ? "default" : "destructive"}
        pending={approving || rejecting}
        onConfirm={confirmDecision}
      />
    </div>
  );
}
