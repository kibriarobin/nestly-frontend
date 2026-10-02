"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("searchTerm") ?? "");
  const debounced = useDebounce(value.trim());

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounced === (params.get("searchTerm") ?? "")) return;

    if (debounced) params.set("searchTerm", debounced);
    else params.delete("searchTerm");
    params.delete("page");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [debounced, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, address or city"
        aria-label="Search properties"
        className="pl-9"
      />
    </div>
  );
}
