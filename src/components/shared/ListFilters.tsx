"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

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

  const [value, setValue] = useState(searchParams.get("searchTerm") ?? "");
  const debounced = useDebounce(value.trim());

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

  useEffect(() => {
    if (debounced !== (searchParams.get("searchTerm") ?? "")) {
      updateParam("searchTerm", debounced);
    }
  }, [debounced, searchParams, updateParam]);

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
          onChange={(e) => setValue(e.target.value)}
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
          href={pathname}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}
