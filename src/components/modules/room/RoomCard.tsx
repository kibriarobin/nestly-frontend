import { BedDouble, MapPin } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import type { IRoom } from "@/types";
import { formatRent } from "@/utils";

export default function RoomCard({ room }: { room: IRoom }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BedDouble className="size-5" />
        </span>
        <StatusBadge status={room.status} />
      </div>

      <div className="space-y-1">
        <h2 className="line-clamp-1 text-lg font-semibold">{room.name}</h2>
        {room.flat && (
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-2">
              {room.flat.name} · {room.flat.property.title},{" "}
              {room.flat.property.city}
            </span>
          </p>
        )}
      </div>

      {room.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {room.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <p className="font-semibold text-primary">{formatRent(room.rent)}</p>
        <Link
          href={`/rooms/${room.id}`}
          className={buttonVariants({ size: "sm" })}
        >
          View details
        </Link>
      </div>
    </article>
  );
}
