import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  description,
  href,
  linkLabel,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        align === "center" && "flex-col items-center text-center",
      )}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
