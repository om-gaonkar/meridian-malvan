import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { publishableFaqs } from "@/lib/content";
import { stagger } from "@/lib/utils";
import { Pending } from "@/components/ui/pending";
import { Section, SectionHeading } from "@/components/ui/section";

export function FaqSection() {
  const items = publishableFaqs(faqs);
  if (items.length === 0) return null;

  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading id="faq-title" title="Questions before you book" />
        <div className="space-y-3">
          {items.map((item, index) => (
            <details
              key={item.id}
              style={stagger(index)}
              className="reveal group rounded-2xl border border-line bg-surface px-6 shadow-soft transition-shadow open:shadow-lift"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-ocean-deep transition duration-300 group-open:rotate-45 group-open:bg-ocean group-open:text-white">
                  <Plus className="size-5" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-ink-soft">
                {item.answer ?? <Pending>answer for this question</Pending>}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
