import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;