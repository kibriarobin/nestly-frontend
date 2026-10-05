"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  MapPin,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  APPLICATION_KEYS,
  useCancelApplication,
  useMyApplications,
} from "@/hooks";
import type { ApplicationStatus, IApplication } from "@/types";
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
  { value: "approved", label: "Approved", match: (s) => s === "APPROVED" },
  { value: "confirmed", label: "Confirmed", match: (s) => s === "CONFIRMED" },
  {
    value: "closed",
    label: "Closed",
    match: (s) => s === "REJECTED" || s === "CANCELLED",
  },
];

const isCancellable = (status: ApplicationStatus) =>
  status === "PENDING" || status === "UNDER_REVIEW";

export default function TenantActivity() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data, isPending, isError, error, refetch } = useMyApplications();
  const { mutate: cancel, isPending: cancelling } = useCancelApplication();
  const [target, setTarget] = useState<IApplication | null>(null);

  const tab =
    TABS.find((item) => item.value === searchParams.get("status")) ?? TABS[0];
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const tabHref = (value: string) =>
    value === "all" ? "/dashboard" : `/dashboard?status=${value}`;

  const confirmCancel = () => {
    if (!target) return;
    cancel(target.id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: APPLICATION_KEYS.mine,
        });
        toast.success("Application withdrawn");
        setTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setTarget(null);
      },
    });
  };

  if (isPending) return <RowListSkeleton count={4} />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your applications"
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
        description="Find a flat or a room you like and send your first application."
        action={
          <div className="flex gap-2">
            <Link href="/flats" className={buttonVariants()}>
              Browse flats
            </Link>
            <Link
              href="/rooms"
              className={buttonVariants({ variant: "outline" })}
            >
              Browse rooms
            </Link>
          </div>
        }
      />
    );
  }

  const count = (match: (status: ApplicationStatus) => boolean) =>
    applications.filter((application) => match(application.status)).length;

  const filtered = applications.filter((application) =>
    tab.match(application.status),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="In review"
          value={count((s) => s === "PENDING" || s === "UNDER_REVIEW")}
          icon={Clock}
          tone="warning"
        />
        <StatCard
          label="Approved"
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

      {visible.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nothing here"
          description="No applications match this filter."
        />
      ) : (
        <ul className="space-y-4">
          {visible.map((application) => {
            const isRoom =
              application.rentalType === "ROOM" && application.room;
            const name = isRoom
              ? application.room?.name
              : application.flat.name;
            const href = isRoom
              ? `/rooms/${application.room?.id}`
              : `/flats/${application.flat.id}`;

            return (
              <li
                key={application.id}
                className="space-y-3 rounded-xl border bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={href}
                        className="truncate font-semibold hover:underline"
                      >
                        {name}
                      </Link>
                      <StatusBadge status={application.status} />
                      <Badge variant="outline">
                        {isRoom ? "Room" : "Whole flat"}
                      </Badge>
                    </div>
                    <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      {application.flat.property.title}
                      {application.flat.property.city
                        ? `, ${application.flat.property.city}`
                        : ""}
                      {isRoom ? ` · ${application.flat.name}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">
                        {formatRent(application.rent)}
                      </span>{" "}
                      · Applied {formatDate(application.createdAt)}
                    </p>
                  </div>
                  {isCancellable(application.status) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTarget(application)}
                    >
                      Withdraw
                    </Button>
                  )}
                </div>

                {application.message && (
                  <p className="rounded-lg bg-muted p-3 text-sm">
                    {application.message}
                  </p>
                )}
                {application.status === "APPROVED" && (
                  <p className="text-sm text-warning">
                    The owner approved your application. Payment is the next
                    step to confirm your booking.
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
        basePath="/dashboard"
        params={{ status: tab.value === "all" ? undefined : tab.value }}
      />

      <ConfirmDialog
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        title="Withdraw this application?"
        description={`Your application for "${target?.room?.name ?? target?.flat.name ?? ""}" will be cancelled. You can apply again later.`}
        confirmLabel="Withdraw"
        pending={cancelling}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
