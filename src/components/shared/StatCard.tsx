import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TONES = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
} as const;

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  href?: string;
  hint?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  href,
  hint,
}: StatCardProps) {
  const content = (
    <>
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          TONES[tone],
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
        {hint && <p className="text-xs text-primary">{hint}</p>}
      </div>
    </>
  );

  const base = "flex items-center gap-4 rounded-xl border bg-card p-5";

  return href ? (
    <Link href={href} className={cn(base, "transition-colors hover:bg-accent")}>
      {content}
    </Link>
  ) : (
    <div className={base}>{content}</div>
  );
}
