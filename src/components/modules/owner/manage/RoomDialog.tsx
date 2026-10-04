"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormField } from "@/components/form";
import FormDialog from "@/components/shared/FormDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROPERTY_KEYS, useCreateRoom, useUpdateRoom } from "@/hooks";
import type { IRoom } from "@/types";
import { getErrorMessage } from "@/utils";
import { type RoomFormValues, roomSchema } from "@/validation";

interface RoomFormProps {
  propertyId: string;
  flatId: string;
  room?: IRoom;
  onDone: () => void;
}

function RoomForm({ propertyId, flatId, room, onDone }: RoomFormProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: create } = useCreateRoom();
  const { mutateAsync: update } = useUpdateRoom();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: room?.name ?? "",
      rent: room?.rent ? String(Number(room.rent)) : "",
      description: room?.description ?? "",
    },
  });

  const onSubmit = async (values: RoomFormValues) => {
    const payload = {
      name: values.name,
      rent: Number(values.rent),
      description: values.description,
    };

    try {
      if (room) await update({ id: room.id, payload });
      else await create({ flatId, ...payload });

      await queryClient.invalidateQueries({
        queryKey: PROPERTY_KEYS.detail(propertyId),
      });
      toast.success(room ? "Room updated" : "Room added");
      onDone();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormField id="room-name" label="Room name" error={errors.name?.message}>
        <Input
          id="room-name"
          placeholder="e.g. Room 1"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </FormField>
      <FormField
        id="room-rent"
        label="Monthly rent (BDT)"
        error={errors.rent?.message}
      >
        <Input
          id="room-rent"
          type="number"
          min="0"
          aria-invalid={!!errors.rent}
          {...register("rent")}
        />
      </FormField>
      <FormField
        id="room-description"
        label="Description"
        error={errors.description?.message}
      >
        <Textarea
          id="room-description"
          rows={3}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
      </FormField>
      <FormActions
        submitLabel={room ? "Save changes" : "Add room"}
        submitting={isSubmitting}
        onCancel={onDone}
      />
    </form>
  );
}

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  flatId: string;
  flatName: string;
  room?: IRoom;
}

export default function RoomDialog({
  open,
  onOpenChange,
  propertyId,
  flatId,
  flatName,
  room,
}: RoomDialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={room ? "Edit room" : "Add a room"}
      description={`Room inside ${flatName}.`}
    >
      {open && (
        <RoomForm
          key={room?.id ?? "new"}
          propertyId={propertyId}
          flatId={flatId}
          room={room}
          onDone={() => onOpenChange(false)}
        />
      )}
    </FormDialog>
  );
}
