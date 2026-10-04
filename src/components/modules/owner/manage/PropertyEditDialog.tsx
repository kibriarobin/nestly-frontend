"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormField } from "@/components/form";
import FormDialog from "@/components/shared/FormDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROPERTY_KEYS, useUpdateProperty } from "@/hooks";
import type { IPropertyDetail } from "@/types";
import { getErrorMessage } from "@/utils";
import { type PropertyFormValues, propertySchema } from "@/validation";

interface PropertyEditFormProps {
  property: IPropertyDetail;
  onDone: () => void;
}

function PropertyEditForm({ property, onDone }: PropertyEditFormProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: update } = useUpdateProperty();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property.title,
      address: property.address,
      city: property.city,
      description: property.description ?? "",
    },
  });

  const onSubmit = async (values: PropertyFormValues) => {
    try {
      await update({ id: property.id, payload: values });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PROPERTY_KEYS.detail(property.id),
        }),
        queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine }),
      ]);
      toast.success("Property updated");
      onDone();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormField id="edit-title" label="Title" error={errors.title?.message}>
        <Input
          id="edit-title"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
      </FormField>
      <FormField
        id="edit-address"
        label="Address"
        error={errors.address?.message}
      >
        <Input
          id="edit-address"
          aria-invalid={!!errors.address}
          {...register("address")}
        />
      </FormField>
      <FormField id="edit-city" label="City" error={errors.city?.message}>
        <Input
          id="edit-city"
          aria-invalid={!!errors.city}
          {...register("city")}
        />
      </FormField>
      <FormField
        id="edit-description"
        label="Description"
        error={errors.description?.message}
      >
        <Textarea
          id="edit-description"
          rows={4}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
      </FormField>
      <FormActions
        submitLabel="Save changes"
        submitting={isSubmitting}
        onCancel={onDone}
      />
    </form>
  );
}

interface PropertyEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: IPropertyDetail;
}

export default function PropertyEditDialog({
  open,
  onOpenChange,
  property,
}: PropertyEditDialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit property"
      description="Update the details tenants see on your listing."
    >
      {open && (
        <PropertyEditForm
          property={property}
          onDone={() => onOpenChange(false)}
        />
      )}
    </FormDialog>
  );
}
