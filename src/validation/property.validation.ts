import { z } from "zod";
import { flatSchema } from "./flat.validation";

export const propertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be 150 characters or fewer"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export const propertyWizardSchema = z.object({
  property: propertySchema,
  flats: z.array(flatSchema).min(1, "Add at least one flat"),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
export type PropertyWizardValues = z.infer<typeof propertyWizardSchema>;
