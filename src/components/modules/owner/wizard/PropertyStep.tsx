"use client";

import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PropertyWizardValues } from "@/validation";

export default function PropertyStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyWizardValues>();
  const e = errors.property;

  return (
    <div className="space-y-4">
      <FormField id="title" label="Title" error={e?.title?.message}>
        <Input
          id="title"
          placeholder="e.g. Sunrise Residency"
          aria-invalid={!!e?.title}
          {...register("property.title")}
        />
      </FormField>

      <FormField id="address" label="Address" error={e?.address?.message}>
        <Input
          id="address"
          autoComplete="street-address"
          aria-invalid={!!e?.address}
          {...register("property.address")}
        />
      </FormField>

      <FormField id="city" label="City" error={e?.city?.message}>
        <Input
          id="city"
          aria-invalid={!!e?.city}
          {...register("property.city")}
        />
      </FormField>

      <FormField
        id="description"
        label="Description"
        error={e?.description?.message}
      >
        <Textarea
          id="description"
          rows={4}
          aria-invalid={!!e?.description}
          {...register("property.description")}
        />
      </FormField>
    </div>
  );
}
