"use client";

import { CheckCircle2, Clock, TriangleAlert, Wallet } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { StatsSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useOwnerBookings } from "@/hooks";
import type { IOwnerBooking } from "@/types";
import {
  formatCurrency,
  formatDate,
  formatRent,
  getErrorMessage,
} from "@/utils";

function sumPaid(bookings: IOwnerBooking[]) {
  return bookings
    .filter((booking) => booking.payment?.status === "PAID")
    .reduce(
      (total, booking) => total + Number(booking.payment?.amount ?? 0),
      0,
    );
}

function sumPending(bookings: IOwnerBooking[]) {
  return bookings
    .filter(
      (booking) =>
        booking.status !== "CANCELLED" &&
        (!booking.payment || booking.payment.status === "PENDING"),
    )
    .reduce((total, booking) => total + Number(booking.rent), 0);
}

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
  const totalEarned = sumPaid(bookings);
  const pendingAmount = sumPending(bookings);
  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No bookings yet"
        description="Once a tenant's application is approved and they pay, your earnings will show up here."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total earned"
          value={formatCurrency(totalEarned)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Pending payment"
          value={formatCurrency(pendingAmount)}
          icon={Clock}
          tone="warning"
        />
        <StatCard
          label="Confirmed bookings"
          value={confirmedCount}
          icon={CheckCircle2}
          tone="default"
        />
        <StatCard
          label="Completed bookings"
          value={completedCount}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Booking history</h2>
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">
                    {booking.flat.property.title} — {booking.flat.name}
                    {booking.room && ` · ${booking.room.name}`}
                  </h3>
                  <StatusBadge status={booking.status} />
                  {booking.payment && (
                    <StatusBadge status={booking.payment.status} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {booking.tenant.name} ({booking.tenant.email})
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatRent(booking.rent)} · Booked{" "}
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
