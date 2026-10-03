import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-apartment.jpg"
        alt="Modern apartment building surrounded by green gardens"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-32">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Find your next home,
          <br />
          <span className="text-[#e8734a]">flat or room, your choice.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Browse approved listings, apply online, and pay securely to confirm
          your booking. No middlemen, no hassle.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/properties" className={buttonVariants({ size: "lg" })}>
            Browse Properties
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
            )}
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}
