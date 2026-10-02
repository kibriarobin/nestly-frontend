import { ArrowLeft, Building2, Layers, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getFlatById } from "@/api/flat.server";
import StatusBadge from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatRent } from "@/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: flat } = await getFlatById(id);

  return {
    title: flat.name,
    description: `${flat.name} at ${flat.property.title}, ${flat.property.city}. ${formatRent(flat.rent)}.`,
  };
}

export default async function FlatDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: flat } = await getFlatById(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/flats"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-3",
        )}
      >
        <ArrowLeft className="size-4" />
        Back to flats
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{flat.name}</h1>
          <StatusBadge status={flat.status} />
        </div>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" />
          {flat.property.city}
        </p>
      </header>

      <Link
        href={`/properties/${flat.property.id}`}
        className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Building2 className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Part of property</p>
          <p className="truncate font-medium">
            {flat.property.title}, {flat.property.city}
          </p>
        </div>
      </Link>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Rent</dt>
          <dd className="mt-1 text-xl font-semibold text-primary">
            {formatRent(flat.rent)}
          </dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Floor</dt>
          <dd className="mt-1 text-xl font-semibold">
            {typeof flat.floor === "number" ? flat.floor : "N/A"}
          </dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Rooms</dt>
          <dd className="mt-1 text-xl font-semibold">{flat.rooms.length}</dd>
        </div>
      </dl>

      {flat.description && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">About this flat</h2>
          <p className="text-muted-foreground">{flat.description}</p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Layers className="size-5" />
          Rooms in this flat
        </h2>
        {flat.rooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            This flat has no separate rooms. It is rented as a whole.
          </p>
        ) : (
          <ul className="divide-y rounded-xl border">
            {flat.rooms.map((room) => (
              <li key={room.id}>
                <Link
                  href={`/rooms/${room.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{room.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatRent(room.rent)}
                    </p>
                  </div>
                  <StatusBadge status={room.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
