import StatusBadge from "@/components/shared/StatusBadge";
import {
  AVAILABILITY_OPTIONS,
  isAvailabilityStatus,
} from "@/constants/availability";
import type { FlatStatus } from "@/types";

const LOCKED: FlatStatus[] = ["RESERVED", "OCCUPIED"];
const MANUAL = AVAILABILITY_OPTIONS.filter(
  (option) => !LOCKED.includes(option.value),
);

interface AvailabilitySelectProps {
  status: FlatStatus;
  label: string;
  disabled?: boolean;
  onChange: (next: FlatStatus) => void;
}

export default function AvailabilitySelect({
  status,
  label,
  disabled,
  onChange,
}: AvailabilitySelectProps) {
  if (LOCKED.includes(status)) {
    return (
      <span title="Set automatically by bookings">
        <StatusBadge status={status} />
      </span>
    );
  }

  return (
    <select
      aria-label={label}
      value={status}
      disabled={disabled}
      onChange={(e) => {
        const next = e.target.value;
        if (isAvailabilityStatus(next)) onChange(next);
      }}
      className="h-8 rounded-md border border-input bg-transparent px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
    >
      {MANUAL.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
