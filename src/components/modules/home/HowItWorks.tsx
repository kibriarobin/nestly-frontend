import { CheckCircle2, CreditCard, Search, Send } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    text: "Browse approved properties, flats and rooms. Filter by city and availability.",
  },
  {
    icon: Send,
    title: "Apply",
    text: "Send an application with a short message to introduce yourself to the owner.",
  },
  {
    icon: CheckCircle2,
    title: "Get approved",
    text: "The owner reviews your application. Once approved, the listing is reserved for you.",
  },
  {
    icon: CreditCard,
    title: "Pay and confirm",
    text: "Pay securely online through SSLCommerz. Your booking is confirmed after payment.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionHeading
        title="How Nestly works"
        description="From searching to moving in, in four simple steps."
        align="center"
      />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative space-y-3 rounded-xl border bg-card p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </span>
            <p className="text-xs font-medium text-muted-foreground">
              Step {index + 1}
            </p>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
