"use client";

import {
  CheckCircle2,
  Clock,
  CreditCard,
  SearchX,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { RowListSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMyPayments } from "@/hooks";
import type { PaymentStatus } from "@/types";
import { formatDate, formatMoney, getErrorMessage } from "@/utils";

const PAGE_SIZE = 6;

const TABS: {
  value: string;
  label: string;
  match: (status: PaymentStatus) => boolean;
}[] = [
  { value: "all", label: "All", match: () => true },
  { value: "paid", label: "Paid", match: (s) => s === "PAID" },
  { value: "pending", label: "Pending", match: (s) => s === "PENDING" },
  {
    value: "other",
    label: "Failed or refunded",
    match: (s) => s === "FAILED" || s === "CANCELLED" || s === "REFUNDED",
  },
];

export default function TenantPayments() {
  const searchParams = useSearchParams();
  const { data, isPending, isError, error, refetch } = useMyPayments();

  const tab =
    TABS.find((item) => item.value === searchParams.get("status")) ?? TABS[0];
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const tabHref = (value: string) =>
    value === "all"
      ? "/dashboard/payments"
      : `/dashboard/payments?status=${value}`;

  if (isPending) return <RowListSkeleton count={4} />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your payments"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const payments = data.data;

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No payments yet"
        description="Once an owner approves your application, you can pay from My activity to confirm your booking."
        action={
          <Link href="/dashboard" className={buttonVariants()}>
            Go to my activity
          </Link>
        }
      />
    );
  }

  const paid = payments.filter((payment) => payment.status === "PAID");
  const totalPaid = paid.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0,
  );

  const filtered = payments.filter((payment) => tab.match(payment.status));
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
          label="Total paid"
          value={formatMoney(totalPaid)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Successful payments"
          value={paid.length}
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value={payments.filter((p) => p.status === "PENDING").length}
          icon={Clock}
          tone="warning"
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
          description="No payments match this filter."
        />
      ) : (
        <ul className="space-y-4">
          {visible.map((payment) => {
            const { booking } = payment;
            const name = booking.room?.name ?? booking.flat.name;

            return (
              <li
                key={payment.id}
                className="space-y-2 rounded-xl border bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-semibold">{name}</h2>
                      <StatusBadge status={payment.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {booking.flat.property.title}
                      {booking.room ? ` · ${booking.flat.name}` : ""}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-primary">
                    {formatMoney(payment.amount)}
                  </p>
                </div>

                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    {payment.status === "PAID" && payment.paidAt
                      ? `Paid on ${formatDate(payment.paidAt)}`
                      : `Started on ${formatDate(payment.createdAt)}`}
                  </span>
                  <span className="font-mono">{payment.transactionId}</span>
                </p>

                {payment.status === "PENDING" && (
                  <p className="text-xs text-warning">
                    This payment was not completed. Open My activity to try
                    again.
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
        basePath="/dashboard/payments"
        params={{ status: tab.value === "all" ? undefined : tab.value }}
      />
    </div>
  );
}
