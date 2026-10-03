import { z } from "zod";
import { positiveNumberField } from "./common.validation";

export const roomSchema = z.object({
  name: z.string().trim().min(1, "Room name is required"),
  rent: positiveNumberField("Rent"),
  description: z.string().trim().min(1, "Description is required"),
});

export type RoomFormValues = z.infer<typeof roomSchema>;
