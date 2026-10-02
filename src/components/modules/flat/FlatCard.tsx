import { DoorOpen, Layers, MapPin } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import type { IFlat } from "@/types";
import { formatRent } from "@/utils";

export default function FlatCard({ flat }: { flat: IFlat }) {
  const rooms = flat.rooms ?? [];
  const availableRooms = rooms.filter(
    (room) => room.status === "AVAILABLE",
  ).length;

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <DoorOpen className="size-5" />
        </span>
        <StatusBadge status={flat.status} />
      </div>

      <div className="space-y-1">
        <h2 className="line-clamp-1 text-lg font-semibold">{flat.name}</h2>
        {flat.property && (
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-2">
              {flat.property.title}, {flat.property.city}
            </span>
          </p>
        )}
        {typeof flat.floor === "number" && (
          <p className="text-sm text-muted-foreground">Floor {flat.floor}</p>
        )}
        {rooms.length > 0 && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Layers className="size-4" />
            {rooms.length} {rooms.length === 1 ? "room" : "rooms"} ·{" "}
            {availableRooms} available
          </p>
        )}
      </div>

      {flat.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {flat.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <p className="font-semibold text-primary">{formatRent(flat.rent)}</p>
        <Link
          href={`/flats/${flat.id}`}
          className={buttonVariants({ size: "sm" })}
        >
          View details
        </Link>
      </div>
    </article>
  );
}
