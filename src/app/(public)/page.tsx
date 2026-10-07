import type { Metadata } from "next";
import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import FaqSection from "@/components/modules/home/FaqSection";
import FeaturedProperties from "@/components/modules/home/FeaturedProperties";
import FinalCta from "@/components/modules/home/FinalCta";
import HomeStats from "@/components/modules/home/HomeStats";
import HowItWorks from "@/components/modules/home/HowItWorks";
import OwnerCta from "@/components/modules/home/OwnerCta";
import PopularCities from "@/components/modules/home/PopularCities";
import RentOptions from "@/components/modules/home/RentOptions";
import WhyNestly from "@/components/modules/home/WhyNestly";
import { CardGridSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: { absolute: "Nestly | Find Flats & Rooms to Rent" },
  description:
    "Browse approved flats and rooms, apply online, and pay securely to confirm your booking on Nestly.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<Skeleton className="h-28 w-full rounded-none" />}>
        <HomeStats />
      </Suspense>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <CardGridSkeleton count={3} />
          </div>
        }
      >
        <FeaturedProperties />
      </Suspense>

      <RentOptions />
      <HowItWorks />

      <Suspense fallback={null}>
        <PopularCities />
      </Suspense>

      <WhyNestly />
      <OwnerCta />
      <FaqSection />
      <FinalCta />
    </>
  );
}
