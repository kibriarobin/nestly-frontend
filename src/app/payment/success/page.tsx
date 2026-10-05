import type { Metadata } from "next";
import PaymentSuccess from "@/components/modules/payment/PaymentSuccess";

export const metadata: Metadata = {
  title: "Payment Successful",
  robots: { index: false },
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <PaymentSuccess bookingId={bookingId} />
    </div>
  );
}
