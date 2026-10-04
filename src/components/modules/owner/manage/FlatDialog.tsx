"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormField } from "@/components/form";
import FormDialog from "@/components/shared/FormDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROPERTY_KEYS, useCreateFlat, useUpdateFlat } from "@/hooks";
import type { IFlat } from "@/types";
import { getErrorMessage } from "@/utils";
import { type FlatFieldsValues, flatFieldsSchema } from "@/validation";

interface FlatFormProps {
  propertyId: string;
  flat?: IFlat;
  onDone: () => void;
}

function FlatForm({ propertyId, flat, onDone }: FlatFormProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: create } = useCreateFlat();
  const { mutateAsync: update } = useUpdateFlat();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FlatFieldsValues>({
    resolver: zodResolver(flatFieldsSchema),
    defaultValues: {
      name: flat?.name ?? "",
      floor: typeof flat?.floor === "number" ? String(flat.floor) : "",
      rent: flat?.rent ? String(Number(flat.rent)) : "",
      description: flat?.description ?? "",
    },
  });

  const onSubmit = async (values: FlatFieldsValues) => {
    const payload = {
      name: values.name,
      floor: Number(values.floor),
      rent: Number(values.rent),
      description: values.description,
    };

    try {
      if (flat) await update({ id: flat.id, payload });
      else await create({ propertyId, ...payload });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROPERTY_KEYS.detail(propertyId),
        }),
        queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine }),
      ]);
      toast.success(flat ? "Flat updated" : "Flat added");
      onDone();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormField id="flat-name" label="Flat name" error={errors.name?.message}>
        <Input
          id="flat-name"
          placeholder="e.g. Flat 3A"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="flat-floor" label="Floor" error={errors.floor?.message}>
          <Input
            id="flat-floor"
            type="number"
            aria-invalid={!!errors.floor}
            {...register("floor")}
          />
        </FormField>
        <FormField
          id="flat-rent"
          label="Monthly rent (BDT)"
          error={errors.rent?.message}
        >
          <Input
            id="flat-rent"
            type="number"
            min="0"
            aria-invalid={!!errors.rent}
            {...register("rent")}
          />
        </FormField>
      </div>
      <FormField
        id="flat-description"
        label="Description"
        error={errors.description?.message}
      >
        <Textarea
          id="flat-description"
          rows={3}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
      </FormField>
      <FormActions
        submitLabel={flat ? "Save changes" : "Add flat"}
        submitting={isSubmitting}
        onCancel={onDone}
      />
    </form>
  );
}

interface FlatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  flat?: IFlat;
}

export default function FlatDialog({
  open,
  onOpenChange,
  propertyId,
  flat,
}: FlatDialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={flat ? "Edit flat" : "Add a flat"}
      description={
        flat
          ? "Update this flat's details."
          : "Add another flat to this property."
      }
    >
      {open && (
        <FlatForm
          key={flat?.id ?? "new"}
          propertyId={propertyId}
          flat={flat}
          onDone={() => onOpenChange(false)}
        />
      )}
    </FormDialog>
  );
}
