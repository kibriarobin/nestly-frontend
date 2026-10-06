"use client";

import {
  Ban,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  DoorOpen,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";
import StatCard from "@/components/shared/StatCard";
import { StatsSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDashboardStats,
  useOwnerStats,
  usePropertyStatusCounts,
} from "@/hooks";
import { formatMoney, getErrorMessage } from "@/utils";
import OwnerStatsChart from "./OwnerStatsChart";
import PropertyStatusChart from "./PropertyStatusChart";

export default function AdminOverview() {
  const property = usePropertyStatusCounts();
  const stats = useDashboardStats();
  const owners = useOwnerStats();

  if (property.isPending || stats.isPending) return <StatsSkeleton />;

  if (property.isError || stats.isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load the overview"
        description={getErrorMessage(property.error ?? stats.error)}
        action={
          <Button
            onClick={() => {
              property.refetch();
              stats.refetch();
            }}
          >
            Try again
          </Button>
        }
      />
    );
  }

  const { counts } = property;
  const platform = stats.data.data;
  const total =
    counts.PENDING + counts.APPROVED + counts.REJECTED + counts.SUSPENDED;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value={platform.users.total}
          icon={Users}
          href="/admin/users"
          hint={`${platform.users.owners} owners · ${platform.users.tenants} tenants`}
        />
        <StatCard
          label="Flats"
          value={platform.flats}
          icon={DoorOpen}
          hint={`${platform.rooms} rooms`}
        />
        <StatCard
          label="Active bookings"
          value={platform.bookings.active}
          icon={ClipboardList}
          hint={`${platform.bookings.completed} completed`}
        />
        <StatCard
          label="Revenue"
          value={formatMoney(platform.revenue)}
          icon={Wallet}
          tone="success"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total properties" value={total} icon={Building2} />
        <StatCard
          label="Pending review"
          value={counts.PENDING}
          icon={Clock}
          tone="warning"
          href="/admin/manage?status=PENDING"
          hint={counts.PENDING > 0 ? "Review now" : undefined}
        />
        <StatCard
          label="Approved"
          value={counts.APPROVED}
          icon={CheckCircle2}
          tone="success"
          href="/admin/manage?status=APPROVED"
        />
        <StatCard
          label="Rejected or suspended"
          value={counts.REJECTED + counts.SUSPENDED}
          icon={Ban}
          tone="danger"
          href="/admin/manage?status=REJECTED"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">Properties by status</h2>
          <PropertyStatusChart counts={counts} />
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">Properties per owner</h2>
          {owners.isPending ? (
            <Skeleton className="h-72 w-full" />
          ) : owners.isError ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Could not load owner statistics.
            </p>
          ) : (
            <OwnerStatsChart owners={owners.data.data} />
          )}
        </section>
      </div>

      {counts.PENDING > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warning/40 bg-warning/5 p-5">
          <p className="text-sm">
            {counts.PENDING}{" "}
            {counts.PENDING === 1 ? "property is" : "properties are"} waiting
            for your review.
          </p>
          <Link
            href="/admin/manage?status=PENDING"
            className={buttonVariants({ size: "sm" })}
          >
            Review pending properties
          </Link>
        </div>
      )}
    </div>
  );
}
