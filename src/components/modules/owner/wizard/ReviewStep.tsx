"use client";

import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { formatRent } from "@/utils";
import type { PropertyWizardValues } from "@/validation";

export default function ReviewStep() {
  const { getValues } = useFormContext<PropertyWizardValues>();
  const { property, flats } = getValues();
  const roomCount = flats.reduce((sum, flat) => sum + flat.rooms.length, 0);

  return (
    <div className="space-y-6">
      <section className="space-y-1 rounded-xl border p-5">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm text-muted-foreground">
          {property.address}, {property.city}
        </p>
        <p className="pt-2 text-sm">{property.description}</p>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold">
          {flats.length} {flats.length === 1 ? "flat" : "flats"} · {roomCount}{" "}
          {roomCount === 1 ? "room" : "rooms"}
        </h3>
        <ul className="space-y-3">
          {flats.map((flat, flatIndex) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: read-only review list
              key={flatIndex}
              className="space-y-2 rounded-xl border p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">
                  {flat.name} · Floor {flat.floor}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatRent(flat.rent)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {flat.description}
              </p>
              {flat.rooms.length > 0 && (
                <ul className="divide-y rounded-lg border text-sm">
                  {flat.rooms.map((room, roomIndex) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: read-only review list
                      key={roomIndex}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <span>{room.name}</span>
                      <span className="text-muted-foreground">
                        {formatRent(room.rent)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="flex items-start gap-2 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        An admin reviews every new property. Yours will not appear publicly
        until it is approved. You can follow its status in My properties.
      </p>
    </div>
  );
}
