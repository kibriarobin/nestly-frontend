import { BedDouble, Building2, DoorOpen } from "lucide-react";
import { getFlats } from "@/api/flat.server";
import { getProperties } from "@/api/property.server";
import { getRooms } from "@/api/room.server";
import { safely } from "@/lib/safely";

export default async function HomeStats() {
  const [properties, flats, rooms] = await Promise.all([
    safely(() => getProperties({ limit: 1 })),
    safely(() => getFlats({ limit: 1 })),
    safely(() => getRooms({ limit: 1 })),
  ]);

  if (!properties || !flats || !rooms) return null;

  const items = [
    {
      label: "Approved properties",
      value: properties.meta.total,
      icon: Building2,
    },
    { label: "Flats to rent", value: flats.meta.total, icon: DoorOpen },
    { label: "Rooms to rent", value: rooms.meta.total, icon: BedDouble },
  ];

  return (
    <section aria-label="Platform summary" className="border-b bg-muted/30">
      <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </span>
            <div>
              <dd className="text-2xl font-bold">{item.value}</dd>
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
