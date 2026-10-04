import { MapPinOff } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <Logo />

      <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MapPinOff className="size-8" />
      </span>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          404 — Page not found
        </h1>
        <p className="mx-auto max-w-sm text-muted-foreground">
          The page you're looking for doesn't exist, or the listing may have
          been removed.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({})}>
          Back to home
        </Link>
        <Link
          href="/properties"
          className={buttonVariants({ variant: "outline" })}
        >
          Browse properties
        </Link>
      </div>
    </div>
  );
}
