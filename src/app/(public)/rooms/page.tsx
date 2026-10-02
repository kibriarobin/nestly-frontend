import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCities } from "@/api/property.server";
import { getRooms } from "@/api/room.server";
import RoomCard from "@/components/modules/room/RoomCard";
import EmptyState from "@/components/shared/EmptyState";
import ListFilters from "@/components/shared/ListFilters";
import Pagination from "@/components/shared/Pagination";
import { CardGridSkeleton } from "@/components/skeletons";
import {
  AVAILABILITY_OPTIONS,
  isAvailabilityStatus,
} from "@/constants/availability";
import type { FlatStatus } from "@/types";
import { first } from "@/utils";

export const metadata: Metadata = {
  title: "Browse Rooms",
  description:
    "Find single rooms for rent by name, city and availability on Nestly.",
};

const PAGE_SIZE = 9;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface ResultsProps {
  searchTerm?: string;
  city?: string;
  status?: FlatStatus;
  page: number;
}

async function RoomResults({ searchTerm, city, status, page }: ResultsProps) {
  const { data, meta } = await getRooms({
    searchTerm,
    city,
    status,
    page,
    limit: PAGE_SIZE,
  });

  if (data.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No rooms found"
        description={
          searchTerm || city || status
            ? "Nothing matches your filters. Try different keywords or clear the filters."
            : "There are no rooms listed yet. Please check back soon."
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Showing {data.length} of {meta.total} rooms
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        basePath="/rooms"
        params={{ searchTerm, city, status }}
      />
    </div>
  );
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const searchTerm = first(params.searchTerm)?.trim() || undefined;
  const city = first(params.city)?.trim() || undefined;
  const statusParam = first(params.status);
  const status = isAvailabilityStatus(statusParam) ? statusParam : undefined;
  const page = Math.max(1, Number(first(params.page)) || 1);

  const cities = await getCities();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Browse rooms</h1>
        <p className="text-muted-foreground">
          Single rooms inside approved flats, with rent and availability.
        </p>
      </div>

      <ListFilters
        searchPlaceholder="Search by room name or description"
        selects={[
          {
            param: "city",
            label: "Filter by city",
            allLabel: "All cities",
            options: cities.map((item) => ({ value: item, label: item })),
          },
          {
            param: "status",
            label: "Filter by availability",
            allLabel: "Any availability",
            options: AVAILABILITY_OPTIONS,
          },
        ]}
      />

      <Suspense
        key={`${searchTerm}-${city}-${status}-${page}`}
        fallback={<CardGridSkeleton count={PAGE_SIZE} />}
      >
        <RoomResults
          searchTerm={searchTerm}
          city={city}
          status={status}
          page={page}
        />
      </Suspense>
    </div>
  );
}
