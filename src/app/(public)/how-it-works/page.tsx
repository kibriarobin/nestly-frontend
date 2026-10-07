import type { Metadata } from "next";
import FinalCta from "@/components/modules/home/FinalCta";
import HowItWorks from "@/components/modules/home/HowItWorks";
import OwnerCta from "@/components/modules/home/OwnerCta";
import WhyNestly from "@/components/modules/home/WhyNestly";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Nestly works: search listings, apply, get approved and pay securely online to confirm your booking.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks />
      <WhyNestly />
      <OwnerCta />
      <FinalCta />
    </>
  );
}
