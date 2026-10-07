import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FOOTER_LINK_GROUPS, SITE_CONTACT, SITE_NAME } from "@/constants/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${SITE_CONTACT.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4 sm:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Search, apply and book approved flats and rooms online. No
            middlemen, no hassle.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Log in
            </Link>
            <Link href="/register" className={buttonVariants({ size: "sm" })}>
              Create account
            </Link>
          </div>
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <nav aria-label={group.title} className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="break-all transition-colors hover:text-primary"
              >
                {SITE_CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={phoneHref}
                className="transition-colors hover:text-primary"
              >
                {SITE_CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{SITE_CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{SITE_CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-success" />
            Payments are processed by SSLCommerz (test mode)
          </p>
        </div>
      </div>
    </footer>
  );
}
