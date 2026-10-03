"use client";

import {
  Ban,
  Building2,
  CheckCircle2,
  Clock,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";
import StatCard from "@/components/shared/StatCard";
import { StatsSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePropertyStatusCounts } from "@/hooks";
import { getErrorMessage } from "@/utils";
import PropertyStatusChart from "./PropertyStatusChart";

export default function AdminOverview() {
  const { counts, isPending, isError, error, refetch } =
    usePropertyStatusCounts();

  if (isPending) return <StatsSkeleton />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load the overview"
        description={getErrorMessage(error)}
        action={<Button onClick={refetch}>Try again</Button>}
      />
    );
  }

  const total =
    counts.PENDING + counts.APPROVED + counts.REJECTED + counts.SUSPENDED;

  return (
    <div className="space-y-8">
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

      <section className="space-y-4 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">Properties by status</h2>
        <PropertyStatusChart counts={counts} />
      </section>

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
