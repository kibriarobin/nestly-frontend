import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to find your next home?
        </h2>
        <p className="opacity-90">
          Browse approved listings today, or create a free account to apply.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/properties"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Browse properties
          </Link>
          <Link
            href="/register"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
            })}
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
