"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookingDetail } from "@/hooks";
import { formatDate, formatMoney } from "@/utils";

export default function PaymentSuccess({ bookingId }: { bookingId?: string }) {
  const { data, isPending } = useBookingDetail(bookingId);
  const booking = data?.data;

  return (
    <div className="space-y-6 rounded-xl border bg-card p-8 text-center">
      <CheckCircle2 className="mx-auto size-12 text-success" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Payment successful
        </h1>
        <p className="text-sm text-muted-foreground">
          Thank you. Your booking is confirmed and the owner has been updated.
        </p>
      </div>

      {bookingId && isPending && (
        <div className="space-y-2">
          <Skeleton className="mx-auto h-4 w-56" />
          <Skeleton className="mx-auto h-4 w-40" />
        </div>
      )}

      {booking && (
        <dl className="space-y-3 rounded-lg bg-muted p-4 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Listing</dt>
            <dd className="font-medium">
              {booking.room?.name ?? booking.flat.name}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Property</dt>
            <dd className="font-medium">
              {booking.flat.property.title}, {booking.flat.property.city}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Amount</dt>
            <dd className="font-medium">
              {formatMoney(booking.payment?.amount ?? booking.rent)}
            </dd>
          </div>
          {booking.payment?.paidAt && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Paid on</dt>
              <dd className="font-medium">
                {formatDate(booking.payment.paidAt)}
              </dd>
            </div>
          )}
          {booking.payment?.transactionId && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Transaction</dt>
              <dd className="truncate font-mono text-xs">
                {booking.payment.transactionId}
              </dd>
            </div>
          )}
        </dl>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/dashboard" className={buttonVariants()}>
          My activity
        </Link>
        <Link
          href="/dashboard/payments"
          className={buttonVariants({ variant: "outline" })}
        >
          View payments
        </Link>
      </div>
    </div>
  );
}
