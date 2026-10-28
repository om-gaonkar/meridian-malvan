import { testimonials } from "@/data/testimonials";
import { stagger } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";

/** Renders nothing until genuine, attributable reviews exist in src/data/testimonials.ts. */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section labelledBy="testimonials-title">
      <SectionHeading id="testimonials-title" title="What guests say" />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {testimonials.map((t, index) => (
          <li key={t.id} className="reveal" style={stagger(index)}>
            <figure className="h-full rounded-3xl border border-line bg-surface p-8 shadow-soft">
              <blockquote className="font-display text-2xl font-medium leading-snug">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm text-ink-soft">
                {t.author}, via{" "}
                {t.sourceUrl ? (
                  <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {t.source}
                  </a>
                ) : (
                  t.source
                )}
                , {t.date}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
