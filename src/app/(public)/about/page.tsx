import {
  CreditCard,
  FileCheck2,
  type LucideIcon,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nestly connects property owners and tenants through a verified, structured rental process - no middlemen, no guesswork.",
};

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: SearchCheck,
    title: "Search",
    description:
      "Browse approved properties, flats and rooms by city, price or availability.",
  },
  {
    icon: FileCheck2,
    title: "Apply",
    description:
      "Submit an application for the room or flat you want. Owners review and respond directly on the platform.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description:
      "Confirm your booking with a secure online payment once your application is approved.",
  },
];

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Verified listings",
    description:
      "Every property is reviewed by our admin team before it goes live, so you're never browsing fake or outdated listings.",
  },
  {
    icon: Users,
    title: "No middlemen",
    description:
      "Owners and tenants deal directly through the platform - no brokers, no extra commission, no back-and-forth over the phone.",
  },
  {
    icon: Sparkles,
    title: "Built for trust",
    description:
      "Transparent application status, audit-logged admin actions, and real payment confirmation at every step.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A simpler way to rent a home
        </h1>
        <p className="text-muted-foreground">
          Nestly is a housing and roommate management platform where property
          owners list verified flats and rooms, and tenants search, apply and
          book online - with real payments and no unorganized Facebook groups or
          middlemen in between.
        </p>
      </div>

      <section className="space-y-8">
        <div className="mx-auto max-w-xl space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-muted-foreground">
            From search to move-in, every step happens on one platform.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="relative space-y-3 rounded-xl border bg-card p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <h3 className="font-semibold">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="mx-auto max-w-xl space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Why Nestly</h2>
          <p className="text-muted-foreground">
            We built the platform we wished existed when searching for a place
            to live.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="space-y-3 rounded-xl border bg-card p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-card px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to find your next place?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Browse approved listings or list your own property in minutes.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/properties" className={buttonVariants({ size: "lg" })}>
            Browse properties
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            List your property
          </Link>
        </div>
      </section>
    </div>
  );
}
