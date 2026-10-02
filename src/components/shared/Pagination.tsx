import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  if (page > 1) search.set("page", String(page));
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function Pagination({
  page,
  totalPages,
  basePath,
  params = {},
}: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const disabled = "pointer-events-none opacity-50";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-3"
    >
      <Link
        href={buildHref(basePath, params, page - 1)}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          !hasPrev && disabled,
        )}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Link>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildHref(basePath, params, page + 1)}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          !hasNext && disabled,
        )}
      >
        Next
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
