import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/shared/FaqList";
import { buttonVariants } from "@/components/ui/button";
import { FAQ } from "@/constants/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about renting flats and rooms, applying, paying and listing a property on Nestly.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Frequently asked questions
        </h1>
        <p className="text-muted-foreground">
          Everything you need to know about renting and listing on Nestly.
        </p>
      </div>
      <FaqList items={FAQ} />
      <div className="space-y-3 rounded-xl border bg-card p-6 text-center">
        <p className="font-medium">Still have a question?</p>
        <Link href="/contact" className={buttonVariants()}>
          Contact us
        </Link>
      </div>
    </div>
  );
}
