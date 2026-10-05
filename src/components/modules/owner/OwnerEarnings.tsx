"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Receipt,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { StatsSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { useOwnerBookings } from "@/hooks";
import {
  buildMonthlyEarnings,
  formatDate,
  formatMoney,
  getErrorMessage,
  isSameMonth,
} from "@/utils";
import EarningsChart from "./EarningsChart";

const RECENT_LIMIT = 8;

export default function OwnerEarnings() {
  const { data, isPending, isError, error, refetch } = useOwnerBookings();

  if (isPending) return <StatsSkeleton />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load your earnings"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  const bookings = data.data;

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No earnings yet"
        description="Earnings appear here once tenants pay for the bookings you approved."
        action={
          <Link href="/owner/applications" className={buttonVariants()}>
            Review applications
          </Link>
        }
      />
    );
  }

  const payments = bookings.flatMap((booking) =>
    booking.payment?.status === "PAID"
      ? [
          {
            booking,
            amount: Number(booking.payment.amount) || 0,
            date: booking.payment.paidAt ?? booking.createdAt,
            transactionId: booking.payment.transactionId,
          },
        ]
      : [],
  );

  const totalEarned = payments.reduce((sum, item) => sum + item.amount, 0);
  const thisMonth = payments
    .filter((item) => isSameMonth(item.date))
    .reduce((sum, item) => sum + item.amount, 0);
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const awaiting = bookings
    .filter((b) => b.status === "PENDING")
    .reduce((sum, b) => sum + (Number(b.rent) || 0), 0);

  const monthly = buildMonthlyEarnings(
    payments.map(({ amount, date }) => ({ amount, date })),
  );
  const recent = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, RECENT_LIMIT);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total earned"
          value={formatMoney(totalEarned)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="This month"
          value={formatMoney(thisMonth)}
          icon={CalendarDays}
        />
        <StatCard
          label="Confirmed bookings"
          value={confirmed}
          icon={CheckCircle2}
        />
        <StatCard
          label="Awaiting payment"
          value={formatMoney(awaiting)}
          icon={Clock}
          tone="warning"
          href="/owner/applications?status=approved"
        />
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">Earnings by month</h2>
        <EarningsChart data={monthly} />
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Receipt className="size-5" />
          Recent payments
        </h2>

        {recent.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No payments received yet. Approved bookings are waiting for the
            tenant to pay.
          </p>
        ) : (
          <ul className="divide-y rounded-xl border bg-card">
            {recent.map(({ booking, amount, date, transactionId }) => (
              <li
                key={booking.id}
                className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-medium">
                    {booking.room?.name ?? booking.flat.name}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {booking.flat.property.title}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.tenant.name} · {formatDate(date)}
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {transactionId}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status="PAID" />
                  <p className="text-lg font-semibold text-primary">
                    {formatMoney(amount)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
