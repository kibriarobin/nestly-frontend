"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyWizardValues } from "@/validation";
import { createEmptyRoom } from "./defaults";

interface FlatFieldsProps {
  index: number;
  onRemove: () => void;
}

export default function FlatFields({ index, onRemove }: FlatFieldsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PropertyWizardValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `flats.${index}.rooms`,
  });
  const e = errors.flats?.[index];

  return (
    <section
      aria-label={`Flat ${index + 1}`}
      className="space-y-4 rounded-xl border p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">Flat {index + 1}</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="size-4" />
          Remove flat
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          id={`flat-${index}-name`}
          label="Flat name"
          error={e?.name?.message}
          className="sm:col-span-1"
        >
          <Input
            id={`flat-${index}-name`}
            placeholder="e.g. Flat 3A"
            aria-invalid={!!e?.name}
            {...register(`flats.${index}.name`)}
          />
        </FormField>
        <FormField
          id={`flat-${index}-floor`}
          label="Floor"
          error={e?.floor?.message}
        >
          <Input
            id={`flat-${index}-floor`}
            type="number"
            aria-invalid={!!e?.floor}
            {...register(`flats.${index}.floor`)}
          />
        </FormField>
        <FormField
          id={`flat-${index}-rent`}
          label="Monthly rent (BDT)"
          error={e?.rent?.message}
        >
          <Input
            id={`flat-${index}-rent`}
            type="number"
            min="0"
            aria-invalid={!!e?.rent}
            {...register(`flats.${index}.rent`)}
          />
        </FormField>
      </div>

      <FormField
        id={`flat-${index}-description`}
        label="Description"
        error={e?.description?.message}
      >
        <Textarea
          id={`flat-${index}-description`}
          rows={2}
          aria-invalid={!!e?.description}
          {...register(`flats.${index}.description`)}
        />
      </FormField>

      <div className="space-y-3 border-t pt-4">
        <div>
          <h4 className="text-sm font-medium">Rooms (optional)</h4>
          <p className="text-xs text-muted-foreground">
            Add rooms if tenants can rent them individually.
          </p>
        </div>

        {fields.map((room, roomIndex) => {
          const re = e?.rooms?.[roomIndex];
          return (
            <div
              key={room.id}
              className="space-y-3 rounded-lg border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Room {roomIndex + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(roomIndex)}
                >
                  <Trash2 className="size-4" />
                  Remove
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  id={`flat-${index}-room-${roomIndex}-name`}
                  label="Room name"
                  error={re?.name?.message}
                >
                  <Input
                    id={`flat-${index}-room-${roomIndex}-name`}
                    aria-invalid={!!re?.name}
                    {...register(`flats.${index}.rooms.${roomIndex}.name`)}
                  />
                </FormField>
                <FormField
                  id={`flat-${index}-room-${roomIndex}-rent`}
                  label="Monthly rent (BDT)"
                  error={re?.rent?.message}
                >
                  <Input
                    id={`flat-${index}-room-${roomIndex}-rent`}
                    type="number"
                    min="0"
                    aria-invalid={!!re?.rent}
                    {...register(`flats.${index}.rooms.${roomIndex}.rent`)}
                  />
                </FormField>
              </div>
              <FormField
                id={`flat-${index}-room-${roomIndex}-description`}
                label="Description"
                error={re?.description?.message}
              >
                <Textarea
                  id={`flat-${index}-room-${roomIndex}-description`}
                  rows={2}
                  aria-invalid={!!re?.description}
                  {...register(`flats.${index}.rooms.${roomIndex}.description`)}
                />
              </FormField>
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(createEmptyRoom())}
        >
          <Plus className="size-4" />
          Add room
        </Button>
      </div>
    </section>
  );
}
