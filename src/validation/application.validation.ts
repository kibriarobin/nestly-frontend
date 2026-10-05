import { z } from "zod";

export const applicationSchema = z.object({
  message: z
    .string()
    .trim()
    .max(500, "Message must be 500 characters or fewer"),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;