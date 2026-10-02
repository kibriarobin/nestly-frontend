import { ArrowLeft, Building2, DoorOpen, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getRoomById } from "@/api/room.server";
import StatusBadge from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatRent } from "@/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: room } = await getRoomById(id);

  return {
    title: room.name,
    description: `${room.name} in ${room.flat.name}, ${room.flat.property.title}, ${room.flat.property.city}. ${formatRent(room.rent)}.`,
  };
}

export default async function RoomDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: room } = await getRoomById(id);
  const { flat } = room;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/rooms"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-3",
        )}
      >
        <ArrowLeft className="size-4" />
        Back to rooms
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{room.name}</h1>
          <StatusBadge status={room.status} />
        </div>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" />
          {flat.property.city}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/flats/${flat.id}`}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <DoorOpen className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Inside flat</p>
            <p className="truncate font-medium">{flat.name}</p>
          </div>
        </Link>
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
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Rent</dt>
          <dd className="mt-1 text-xl font-semibold text-primary">
            {formatRent(room.rent)}
          </dd>
        </div>
        <div className="rounded-xl border p-4">
          <dt className="text-sm text-muted-foreground">Availability</dt>
          <dd className="mt-1">
            <StatusBadge status={room.status} />
          </dd>
        </div>
      </dl>

      {room.description && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">About this room</h2>
          <p className="text-muted-foreground">{room.description}</p>
        </section>
      )}
    </div>
  );
}
