import { XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment Not Completed",
  robots: { index: false },
};

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="space-y-6 rounded-xl border bg-card p-8 text-center">
        <XCircle className="mx-auto size-12 text-destructive" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Payment not completed
          </h1>
          <p className="text-sm text-muted-foreground">
            We could not confirm your payment, so your booking is not confirmed
            yet. The listing stays reserved for you while the booking is
            pending. You can try again or cancel the booking from My activity.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/dashboard" className={buttonVariants()}>
            Try again from My activity
          </Link>
          <Link
            href="/dashboard/payments"
            className={buttonVariants({ variant: "outline" })}
          >
            View payments
          </Link>
        </div>
      </div>
    </div>
  );
}
