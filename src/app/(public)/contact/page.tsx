import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/form/ContactForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Nestly team for support, partnerships or general questions.",
};

const SITE_CONTACT = {
  email: "support@nestly.com",
  phone: "+880 1700-000000",
  address: "House 12, Road 5, Banani, Dhaka 1213, Bangladesh",
  hours: "Sat – Thu, 9:00 AM – 6:00 PM",
} as const;

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: SITE_CONTACT.email },
  { icon: Phone, label: "Phone", value: SITE_CONTACT.phone },
  { icon: MapPin, label: "Address", value: SITE_CONTACT.address },
  { icon: Clock, label: "Support hours", value: SITE_CONTACT.hours },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
        <p className="text-muted-foreground">
          Questions about a listing, a booking or a payment? Send us a message
          and we'll respond as soon as we can.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {CONTACT_DETAILS.map((detail) => (
            <div
              key={detail.label}
              className="flex items-start gap-4 rounded-xl border bg-card p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <detail.icon className="size-5" />
              </span>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                <p className="font-medium">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Card className="lg:col-span-3">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
