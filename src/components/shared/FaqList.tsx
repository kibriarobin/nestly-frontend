import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/constants/faq";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y rounded-xl border bg-card">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
