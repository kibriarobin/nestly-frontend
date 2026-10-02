import { ArrowLeft, DoorOpen, MapPin, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPropertyById } from "@/api/property.server";
import FlatCard from "@/components/modules/flat/FlatCard";
import EmptyState from "@/components/shared/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: property } = await getPropertyById(id);

  return {
    title: property.title,
    description:
      property.description ??
      `${property.title} in ${property.city}. Browse its flats and rooms on Nestly.`,
  };
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: property } = await getPropertyById(id);

  const rooms = property.flats.flatMap((flat) => flat.rooms ?? []);
  const availableFlats = property.flats.filter(
    (flat) => flat.status === "AVAILABLE",
  ).length;
  const availableRooms = rooms.filter(
    (room) => room.status === "AVAILABLE",
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/properties"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-3",
        )}
      >
        <ArrowLeft className="size-4" />
        Back to properties
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" />
          {property.address}, {property.city}
        </p>
        {property.owner && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="size-4" />
            Listed by {property.owner.name}
          </p>
        )}
        {property.description && (
          <p className="max-w-3xl text-muted-foreground">
            {property.description}
          </p>
        )}
      </header>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Flats</dt>
          <dd className="mt-1 text-2xl font-semibold">
            {property.flats.length}
          </dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Available flats</dt>
          <dd className="mt-1 text-2xl font-semibold text-success">
            {availableFlats}
          </dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Rooms</dt>
          <dd className="mt-1 text-2xl font-semibold">{rooms.length}</dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Available rooms</dt>
          <dd className="mt-1 text-2xl font-semibold text-success">
            {availableRooms}
          </dd>
        </div>
      </dl>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Flats in this property</h2>
        {property.flats.length === 0 ? (
          <EmptyState
            icon={DoorOpen}
            title="No flats listed yet"
            description="The owner has not added any flats to this property."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {property.flats.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
