import { CreditCard, Home, LayoutDashboard, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Reviewed listings",
    text: "Every property is checked by an admin before it appears for tenants.",
  },
  {
    icon: Home,
    title: "Whole flat or one room",
    text: "Choose the option that suits your budget instead of settling for one.",
  },
  {
    icon: CreditCard,
    title: "Secure online payment",
    text: "Pay through SSLCommerz. No cash handed over, and every payment is recorded.",
  },
  {
    icon: LayoutDashboard,
    title: "Everything in one place",
    text: "Track applications, bookings and payments from your own dashboard.",
  },
];

export default function WhyNestly() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Nestly"
          description="Renting should not mean unorganised groups and middlemen."
          align="center"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <li key={point.title} className="space-y-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <point.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
