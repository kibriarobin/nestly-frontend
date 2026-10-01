import { Building2, MapPin, User } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProperty } from "@/types/property.type";

export default function PropertyCard({ property }: { property: IProperty }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground transition-shadow hover:shadow-md">
      <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Building2 className="size-5" />
      </span>

      <div className="space-y-1">
        <h2 className="line-clamp-1 text-lg font-semibold">{property.title}</h2>
        <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-2">
            {property.address}, {property.city}
          </span>
        </p>
      </div>

      {property.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        {property.owner ? (
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <User className="size-3.5 shrink-0" />
            <span className="truncate">{property.owner.name}</span>
          </span>
        ) : (
          <span />
        )}
        <Link
          href={`/properties/${property.id}`}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          View details
        </Link>
      </div>
    </article>
  );
}