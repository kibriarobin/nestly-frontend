import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { publicLinks } from "@/routes";
import Logo from "./Logo";

const COMPANY_HREFS = ["/about", "/contact"];

const SITE_CONTACT = {
  email: "support@nestly.com",
  phone: "+880 1700-000000",
  address: "House 12, Road 5, Banani, Dhaka 1213, Bangladesh",
  hours: "Sat – Thu, 9:00 AM – 6:00 PM",
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const exploreLinks = publicLinks.filter(
    (link) => !COMPANY_HREFS.includes(link.href),
  );
  const companyLinks = publicLinks.filter((link) =>
    COMPANY_HREFS.includes(link.href),
  );

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Search, apply and book verified flats and rooms online - no
            middlemen, no hassle.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Explore</h3>
          <nav aria-label="Explore" className="flex flex-col gap-2">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Company</h3>
          <nav aria-label="Company" className="flex flex-col gap-2">
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="hover:text-primary"
              >
                {SITE_CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a
                href={`tel:${SITE_CONTACT.phone}`}
                className="hover:text-primary"
              >
                {SITE_CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{SITE_CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {year} Nestly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}