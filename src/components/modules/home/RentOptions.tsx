import { ArrowRight, BedDouble, DoorOpen } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";

const OPTIONS = [
  {
    href: "/flats",
    icon: DoorOpen,
    title: "Rent a whole flat",
    text: "Take a complete flat with its own space. Good for families and groups sharing the rent.",
  },
  {
    href: "/rooms",
    icon: BedDouble,
    title: "Rent a single room",
    text: "Pick one room inside a shared flat. A lower rent and an easy way to find a place of your own.",
  },
];

export default function RentOptions() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Flat or room, your choice"
          description="Nestly lists both, so you can search the way that fits your budget."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {OPTIONS.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group flex items-start gap-5 rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <option.icon className="size-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.text}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Browse now
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
