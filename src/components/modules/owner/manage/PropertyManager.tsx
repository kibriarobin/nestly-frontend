"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, DoorOpen, MapPin, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import { DetailSkeleton } from "@/components/skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { PROPERTY_STATUS_NOTE } from "@/constants/property";
import {
  PROPERTY_KEYS,
  useDeleteFlat,
  useDeleteProperty,
  useDeleteRoom,
  useGetMe,
  usePropertyDetail,
} from "@/hooks";
import { cn } from "@/lib/utils";
import type { IFlat, IRoom } from "@/types";
import { getErrorMessage } from "@/utils";
import FlatDialog from "./FlatDialog";
import FlatPanel from "./FlatPanel";
import PropertyEditDialog from "./PropertyEditDialog";
import RoomDialog from "./RoomDialog";

type DeleteTarget =
  | { kind: "property" }
  | { kind: "flat"; flat: IFlat }
  | { kind: "room"; room: IRoom };

export default function PropertyManager({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const { data, isPending, isError, error } = usePropertyDetail(id);

  const { mutate: removeProperty, isPending: removingProperty } =
    useDeleteProperty();
  const { mutate: removeFlat, isPending: removingFlat } = useDeleteFlat();
  const { mutate: removeRoom, isPending: removingRoom } = useDeleteRoom();

  const [editingProperty, setEditingProperty] = useState(false);
  const [flatDialog, setFlatDialog] = useState<{ flat?: IFlat } | null>(null);
  const [roomDialog, setRoomDialog] = useState<{
    flat: IFlat;
    room?: IRoom;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.detail(id) }),
      queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine }),
    ]);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    const fail = (err: unknown) => {
      toast.error(getErrorMessage(err));
      setDeleteTarget(null);
    };
    const done = async (message: string) => {
      await refresh();
      toast.success(message);
      setDeleteTarget(null);
    };

    if (deleteTarget.kind === "property") {
      removeProperty(id, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine });
          toast.success("Property deleted");
          router.push("/owner");
        },
        onError: fail,
      });
    } else if (deleteTarget.kind === "flat") {
      removeFlat(deleteTarget.flat.id, {
        onSuccess: () => done("Flat deleted"),
        onError: fail,
      });
    } else {
      removeRoom(deleteTarget.room.id, {
        onSuccess: () => done("Room deleted"),
        onError: fail,
      });
    }
  };

  if (isPending) return <DetailSkeleton wide />;

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Could not load this property"
        description={getErrorMessage(error)}
        action={
          <Link
            href="/owner"
            className={buttonVariants({ variant: "outline" })}
          >
            Back to my properties
          </Link>
        }
      />
    );
  }

  const property = data.data;

  if (me?.data && property.ownerId !== me.data.id) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="This is not your property"
        description="You can only manage properties that you own."
        action={
          <Link
            href="/owner"
            className={buttonVariants({ variant: "outline" })}
          >
            Back to my properties
          </Link>
        }
      />
    );
  }

  const flats = property.flats;
  const note = PROPERTY_STATUS_NOTE[property.status];

  const deleteCopy = (() => {
    if (!deleteTarget) return { title: "", description: "" };
    if (deleteTarget.kind === "property") {
      return {
        title: "Delete this property?",
        description: `"${property.title}" and everything inside it will be hidden. Properties with active bookings cannot be deleted.`,
      };
    }
    if (deleteTarget.kind === "flat") {
      return {
        title: "Delete this flat?",
        description: `"${deleteTarget.flat.name}" and its rooms will be removed. Occupied or reserved flats cannot be deleted.`,
      };
    }
    return {
      title: "Delete this room?",
      description: `"${deleteTarget.room.name}" will be removed. Occupied or reserved rooms cannot be deleted.`,
    };
  })();

  return (
    <div className="space-y-8">
      <Link
        href="/owner"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-3",
        )}
      >
        <ArrowLeft className="size-4" />
        Back to my properties
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {property.title}
            </h1>
            <StatusBadge status={property.status} />
          </div>
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {property.address}, {property.city}
          </p>
          {property.description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {property.description}
            </p>
          )}
          {note && <p className="text-xs text-warning">{note}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          {property.status === "APPROVED" && (
            <Link
              href={`/properties/${property.id}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              View public page
            </Link>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingProperty(true)}
          >
            Edit details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteTarget({ kind: "property" })}
          >
            Delete property
          </Button>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Flats ({flats.length})</h2>
          <Button size="sm" onClick={() => setFlatDialog({})}>
            <Plus className="size-4" />
            Add flat
          </Button>
        </div>

        {flats.length === 0 ? (
          <EmptyState
            icon={DoorOpen}
            title="No flats yet"
            description="Add a flat to let tenants find and apply for it."
            action={<Button onClick={() => setFlatDialog({})}>Add flat</Button>}
          />
        ) : (
          <div className="space-y-4">
            {flats.map((flat) => (
              <FlatPanel
                key={flat.id}
                flat={flat}
                propertyId={id}
                onEditFlat={(target) => setFlatDialog({ flat: target })}
                onDeleteFlat={(target) =>
                  setDeleteTarget({ kind: "flat", flat: target })
                }
                onAddRoom={(target) => setRoomDialog({ flat: target })}
                onEditRoom={(target, room) =>
                  setRoomDialog({ flat: target, room })
                }
                onDeleteRoom={(room) => setDeleteTarget({ kind: "room", room })}
              />
            ))}
          </div>
        )}
      </section>

      <PropertyEditDialog
        open={editingProperty}
        onOpenChange={setEditingProperty}
        property={property}
      />

      <FlatDialog
        open={flatDialog !== null}
        onOpenChange={(open) => {
          if (!open) setFlatDialog(null);
        }}
        propertyId={id}
        flat={flatDialog?.flat}
      />

      <RoomDialog
        open={roomDialog !== null}
        onOpenChange={(open) => {
          if (!open) setRoomDialog(null);
        }}
        propertyId={id}
        flatId={roomDialog?.flat.id ?? ""}
        flatName={roomDialog?.flat.name ?? ""}
        room={roomDialog?.room}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title={deleteCopy.title}
        description={deleteCopy.description}
        pending={removingProperty || removingFlat || removingRoom}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
