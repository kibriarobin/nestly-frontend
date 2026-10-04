import { z } from "zod";
import { positiveNumberField, wholeNumberField } from "./common.validation";
import { roomSchema } from "./room.validation";

export const flatFieldsSchema = z.object({
  name: z.string().trim().min(1, "Flat name is required"),
  floor: wholeNumberField("Floor"),
  rent: positiveNumberField("Rent"),
  description: z.string().trim().min(1, "Description is required"),
});

export const flatSchema = flatFieldsSchema.extend({
  rooms: z.array(roomSchema),
});

export type FlatFieldsValues = z.infer<typeof flatFieldsSchema>;
export type FlatFormValues = z.infer<typeof flatSchema>;
