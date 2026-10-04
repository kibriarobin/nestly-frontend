"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PROPERTY_KEYS, useUpdateFlat, useUpdateRoom } from "@/hooks";
import type { FlatStatus, IFlat, IRoom } from "@/types";
import { formatRent, getErrorMessage } from "@/utils";
import AvailabilitySelect from "./AvailabilitySelect";

const isLocked = (status: FlatStatus) =>
  status === "RESERVED" || status === "OCCUPIED";

interface FlatPanelProps {
  flat: IFlat;
  propertyId: string;
  onEditFlat: (flat: IFlat) => void;
  onDeleteFlat: (flat: IFlat) => void;
  onAddRoom: (flat: IFlat) => void;
  onEditRoom: (flat: IFlat, room: IRoom) => void;
  onDeleteRoom: (room: IRoom) => void;
}

export default function FlatPanel({
  flat,
  propertyId,
  onEditFlat,
  onDeleteFlat,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
}: FlatPanelProps) {
  const queryClient = useQueryClient();
  const { mutate: updateFlat, isPending: updatingFlat } = useUpdateFlat();
  const { mutate: updateRoom, isPending: updatingRoom } = useUpdateRoom();
  const rooms = flat.rooms ?? [];

  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: PROPERTY_KEYS.detail(propertyId),
    });

  const changeFlatStatus = (status: FlatStatus) =>
    updateFlat(
      { id: flat.id, payload: { status } },
      {
        onSuccess: async () => {
          await refresh();
          toast.success("Flat availability updated");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );

  const changeRoomStatus = (room: IRoom, status: FlatStatus) =>
    updateRoom(
      { id: room.id, payload: { status } },
      {
        onSuccess: async () => {
          await refresh();
          toast.success("Room availability updated");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );

  return (
    <section
      aria-label={flat.name}
      className="rounded-xl border bg-card text-card-foreground"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-lg font-semibold">{flat.name}</h3>
          <p className="text-sm text-muted-foreground">
            {typeof flat.floor === "number" ? `Floor ${flat.floor} · ` : ""}
            <span className="font-medium text-primary">
              {formatRent(flat.rent)}
            </span>
          </p>
          {flat.description && (
            <p className="text-sm text-muted-foreground">{flat.description}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <AvailabilitySelect
            status={flat.status}
            label={`Availability of ${flat.name}`}
            disabled={updatingFlat}
            onChange={changeFlatStatus}
          />
          <Button variant="outline" size="sm" onClick={() => onEditFlat(flat)}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isLocked(flat.status)}
            title={
              isLocked(flat.status)
                ? "Occupied or reserved flats cannot be deleted"
                : undefined
            }
            onClick={() => onDeleteFlat(flat)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-3 border-t p-5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium">Rooms ({rooms.length})</h4>
          <Button variant="outline" size="sm" onClick={() => onAddRoom(flat)}>
            <Plus className="size-4" />
            Add room
          </Button>
        </div>

        {rooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No separate rooms. Add rooms if tenants can rent them individually.
          </p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {rooms.map((room) => (
              <li
                key={room.id}
                className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium">{room.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatRent(room.rent)}
                    {room.description ? ` · ${room.description}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <AvailabilitySelect
                    status={room.status}
                    label={`Availability of ${room.name}`}
                    disabled={updatingRoom}
                    onChange={(status) => changeRoomStatus(room, status)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditRoom(flat, room)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLocked(room.status)}
                    title={
                      isLocked(room.status)
                        ? "Occupied or reserved rooms cannot be deleted"
                        : undefined
                    }
                    onClick={() => onDeleteRoom(room)}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
