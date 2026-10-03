import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WizardSteps({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  return (
    <ol aria-label="Progress" className="flex items-center gap-2">
      {steps.map((label, index) => {
        const state =
          index < current ? "done" : index === current ? "current" : "todo";

        return (
          <li
            key={label}
            aria-current={state === "current" ? "step" : undefined}
            className="flex flex-1 items-center gap-2 last:flex-none"
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                state === "done" &&
                  "border-primary bg-primary text-primary-foreground",
                state === "current" && "border-primary text-primary",
                state === "todo" && "text-muted-foreground",
              )}
            >
              {state === "done" ? <Check className="size-4" /> : index + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                state === "todo" && "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <span className="h-px flex-1 bg-border" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
