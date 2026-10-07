import FaqList from "@/components/shared/FaqList";
import SectionHeading from "@/components/shared/SectionHeading";
import { FAQ } from "@/constants/faq";

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6">
      <SectionHeading
        title="Frequently asked questions"
        href="/faq"
        linkLabel="See all questions"
        align="center"
      />
      <FaqList items={FAQ.slice(0, 4)} />
    </section>
  );
}
