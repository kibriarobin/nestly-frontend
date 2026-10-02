import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-apartment.jpg"
        alt="Modern apartment building"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-32">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Find your next home -
          <br />
          <span className="text-primary">flat or room, your choice.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Browse verified properties, apply online, and move in with secure
          payments. No middlemen, no hassle.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
            <Link href="/register">List Your Property</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}