"use client";

import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { PropertyWizardValues } from "@/validation";
import { createEmptyFlat } from "./defaults";
import FlatFields from "./FlatFields";

export default function FlatsStep() {
  const { control } = useFormContext<PropertyWizardValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "flats" });

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Add at least one flat to continue.
        </p>
      )}

      {fields.map((field, index) => (
        <FlatFields
          key={field.id}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append(createEmptyFlat())}
      >
        <Plus className="size-4" />
        {fields.length === 0 ? "Add a flat" : "Add another flat"}
      </Button>
    </div>
  );
}
