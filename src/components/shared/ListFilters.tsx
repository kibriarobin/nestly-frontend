"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FilterSelect {
  param: string;
  label: string;
  allLabel?: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}

interface ListFiltersProps {
  searchPlaceholder: string;
  selects?: FilterSelect[];
}

const selectClass =
  "h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function ListFilters({
  searchPlaceholder,
  selects = [],
}: ListFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlTerm = searchParams.get("searchTerm") ?? "";
  const [value, setValue] = useState(urlTerm);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParam = useCallback(
    (key: string, next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set(key, next);
      else params.delete(key);
      params.delete("page");

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const latestUpdate = useRef(updateParam);
  useEffect(() => {
    latestUpdate.current = updateParam;
  });

  useEffect(() => {
    if (timer.current === null) setValue(urlTerm);
  }, [urlTerm]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleSearch = (next: string) => {
    setValue(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      latestUpdate.current("searchTerm", next.trim());
    }, 400);
  };

  const clearParams = new URLSearchParams(searchParams.toString());
  clearParams.delete("searchTerm");
  clearParams.delete("page");
  for (const select of selects) clearParams.delete(select.param);
  const clearQuery = clearParams.toString();
  const clearHref = clearQuery ? `${pathname}?${clearQuery}` : pathname;

  const hasFilters =
    searchParams.has("searchTerm") ||
    selects.some((select) => searchParams.has(select.param));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="pl-9"
        />
      </div>

      {selects.map((select) => (
        <select
          key={select.param}
          aria-label={select.label}
          value={searchParams.get(select.param) ?? select.defaultValue ?? ""}
          onChange={(e) =>
            updateParam(
              select.param,
              e.target.value === (select.defaultValue ?? "")
                ? ""
                : e.target.value,
            )
          }
          className={selectClass}
        >
          {select.allLabel !== undefined && (
            <option value="">{select.allLabel}</option>
          )}
          {select.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}

      {hasFilters && (
        <Link
          href={clearHref}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}
