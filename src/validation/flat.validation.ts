import { z } from "zod";
import { positiveNumberField, wholeNumberField } from "./common.validation";
import { roomSchema } from "./room.validation";

export const flatSchema = z.object({
  name: z.string().trim().min(1, "Flat name is required"),
  floor: wholeNumberField("Floor"),
  rent: positiveNumberField("Rent"),
  description: z.string().trim().min(1, "Description is required"),
  rooms: z.array(roomSchema),
});

export type FlatFormValues = z.infer<typeof flatSchema>;
