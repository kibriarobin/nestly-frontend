import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TONES = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
  info: "border-primary/30 bg-primary/10 text-primary",
  muted: "border-border bg-muted text-muted-foreground",
} as const;

const STATUS_TONE: Record<string, keyof typeof TONES> = {
  AVAILABLE: "success",
  APPROVED: "success",
  CONFIRMED: "success",
  PAID: "success",
  COMPLETED: "success",
  ACTIVE: "success",
  PENDING: "warning",
  UNDER_REVIEW: "warning",
  RESERVED: "warning",
  MAINTENANCE: "warning",
  OCCUPIED: "info",
  REJECTED: "danger",
  FAILED: "danger",
  SUSPENDED: "danger",
  BLOCKED: "danger",
  CANCELLED: "muted",
  INACTIVE: "muted",
  REFUNDED: "muted",
  DELETED: "muted",
  APPROVE: "success",
  UNBLOCK: "success",
  PAYMENT: "success",
  CREATE: "info",
  UPDATE: "info",
  REJECT: "danger",
  BLOCK: "danger",
  DELETE: "danger",
  LOGIN: "muted",
};

export default function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone = STATUS_TONE[status] ?? "muted";

  return (
    <Badge
      variant="outline"
      className={cn("capitalize", TONES[tone], className)}
    >
      {status.replace(/_/g, " ").toLowerCase()}
    </Badge>
  );
}
