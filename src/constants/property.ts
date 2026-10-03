import type { PropertyStatus } from "@/types";

export const PROPERTY_STATUSES: PropertyStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
];

export const PROPERTY_SORT = {
  newest: { label: "Newest first", sortBy: "createdAt", sortOrder: "desc" },
  oldest: { label: "Oldest first", sortBy: "createdAt", sortOrder: "asc" },
  "title-asc": { label: "Title A-Z", sortBy: "title", sortOrder: "asc" },
  "title-desc": { label: "Title Z-A", sortBy: "title", sortOrder: "desc" },
} as const;

export type PropertySortKey = keyof typeof PROPERTY_SORT;

export function isPropertySortKey(
  value: string | undefined,
): value is PropertySortKey {
  return !!value && value in PROPERTY_SORT;
}
