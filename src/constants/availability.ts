import type { FlatStatus } from "@/types";

export const AVAILABILITY_OPTIONS: { value: FlatStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RESERVED", label: "Reserved" },
  { value: "OCCUPIED", label: "Occupied" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "INACTIVE", label: "Inactive" },
];

export function isAvailabilityStatus(
  value: string | undefined,
): value is FlatStatus {
  return AVAILABILITY_OPTIONS.some((option) => option.value === value);
}
