import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCities, getProperties } from "@/api/property.server";
import PropertyCard from "@/components/modules/property/PropertyCard";
import EmptyState from "@/components/shared/EmptyState";
import ListFilters from "@/components/shared/ListFilters";
import Pagination from "@/components/shared/Pagination";
import { CardGridSkeleton } from "@/components/skeletons";
import {
  isPropertySortKey,
  PROPERTY_SORT,
  type PropertySortKey,
} from "@/constants/property";

export const metadata: Metadata = {
  title: "Browse Properties",
  description:
    "Search approved flats and rooms by title, address or city on Nestly.",
};

const PAGE_SIZE = 9;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

interface ResultsProps {
  searchTerm?: string;
  city?: string;
  sort: PropertySortKey;
  page: number;
}

async function PropertyResults({ searchTerm, city, sort, page }: ResultsProps) {
  const { data, meta } = await getProperties({
    searchTerm,
    city,
    sort,
    page,
    limit: PAGE_SIZE,
  });

  if (data.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No properties found"
        description={
          searchTerm || city
            ? "Nothing matches your filters. Try different keywords or clear the filters."
            : "There are no approved properties yet. Please check back soon."
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Showing {data.length} of {meta.total} properties
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        basePath="/properties"
        params={{
          searchTerm,
          city,
          sort: sort === "newest" ? undefined : sort,
        }}
      />
    </div>
  );
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const searchTerm = first(params.searchTerm)?.trim() || undefined;
  const city = first(params.city)?.trim() || undefined;
  const sortParam = first(params.sort);
  const sort: PropertySortKey = isPropertySortKey(sortParam)
    ? sortParam
    : "newest";
  const page = Math.max(1, Number(first(params.page)) || 1);

  const cities = await getCities();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Browse properties</h1>
        <p className="text-muted-foreground">
          Verified flats and rooms from approved owners.
        </p>
      </div>

      <ListFilters
        searchPlaceholder="Search by title, address or city"
        selects={[
          {
            param: "city",
            label: "Filter by city",
            allLabel: "All cities",
            options: cities.map((item) => ({ value: item, label: item })),
          },
          {
            param: "sort",
            label: "Sort properties",
            defaultValue: "newest",
            options: Object.entries(PROPERTY_SORT).map(
              ([value, { label }]) => ({
                value,
                label,
              }),
            ),
          },
        ]}
      />

      <Suspense
        key={`${searchTerm}-${city}-${sort}-${page}`}
        fallback={<CardGridSkeleton count={PAGE_SIZE} />}
      >
        <PropertyResults
          searchTerm={searchTerm}
          city={city}
          sort={sort}
          page={page}
        />
      </Suspense>
    </div>
  );
}
