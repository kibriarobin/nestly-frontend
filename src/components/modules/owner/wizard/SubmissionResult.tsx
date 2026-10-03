import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

interface SubmissionResultProps {
  phase: "submitting" | "failed" | "done";
  created: number;
  total: number;
  errorMessage: string;
  onRetry: () => void;
  onStartOver: () => void;
}

export default function SubmissionResult({
  phase,
  created,
  total,
  errorMessage,
  onRetry,
  onStartOver,
}: SubmissionResultProps) {
  if (phase === "submitting") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border p-10 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <h2 className="text-lg font-semibold">Creating your listing…</h2>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={created}
          className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${total ? (created / total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {created} of {total} created
        </p>
      </div>
    );
  }

  if (phase === "failed") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/40 p-10 text-center">
        <TriangleAlert className="size-8 text-destructive" />
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-sm text-destructive">{errorMessage}</p>
        <p className="max-w-md text-sm text-muted-foreground">
          {created} of {total} items were created. Retrying continues from where
          it stopped, so nothing is duplicated.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button type="button" onClick={onRetry}>
            Retry
          </Button>
          <Link
            href="/owner"
            className={buttonVariants({ variant: "outline" })}
          >
            Go to my properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
      <CheckCircle2 className="size-10 text-success" />
      <h2 className="text-xl font-semibold">Property submitted</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        Your property, flats and rooms were created. An admin will review it and
        it will appear publicly once approved.
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <Link href="/owner" className={buttonVariants()}>
          Go to my properties
        </Link>
        <Button type="button" variant="outline" onClick={onStartOver}>
          Add another property
        </Button>
      </div>
    </div>
  );
}
