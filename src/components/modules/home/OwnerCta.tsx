import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const BENEFITS = [
  "Add your property, flats and rooms in one guided form",
  "Review applications and approve the tenant you prefer",
  "Receive rent online and track your earnings",
];

export default function OwnerCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 rounded-2xl border bg-card p-8 md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Own a flat or a room? List it on Nestly.
          </h2>
          <p className="text-muted-foreground">
            Reach tenants who are ready to apply, without the back-and-forth.
          </p>
          <Link href="/register" className={buttonVariants({ size: "lg" })}>
            List your property
          </Link>
        </div>
        <ul className="space-y-3">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="size-3.5" />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
