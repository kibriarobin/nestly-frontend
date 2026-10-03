import { z } from "zod";

export const positiveNumberField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .refine((value) => Number(value) > 0, `${label} must be a positive number`);

export const wholeNumberField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .refine(
      (value) => Number.isInteger(Number(value)),
      `${label} must be a whole number`,
    );
