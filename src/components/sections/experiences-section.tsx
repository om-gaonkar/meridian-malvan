import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import { ButtonLink } from "@/components/ui/button";
import { ExperienceIcon } from "@/components/ui/experience-icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { stagger } from "@/lib/utils";

export function ExperiencesSection() {
  return (
    <Section tone="dark" labelledBy="experiences-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="experiences-title" title="Around Malvan" tone="dark">
          The fort, the beaches and the food are why most people come. Here is what to know before you go.
        </SectionHeading>
        <ButtonLink href="/experiences" variant="glass">
          All experiences
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {experiences.map((item, index) => (
          <li key={item.id} className="reveal" style={stagger(index)}>
            <article className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 focus-within:border-lagoon hover:border-white/25 hover:bg-white/10 focus-within:bg-white/10">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-lagoon transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-lagoon group-hover:text-ocean-night">
                <ExperienceIcon id={item.id} className="size-6" />
              </span>
              <h3 className="mt-8 text-2xl font-semibold leading-tight">
                <Link
                  href={`/experiences#${item.id}`}
                  className="after:absolute after:inset-0 after:rounded-3xl"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-white/70">{item.summary}</p>
              <span
                aria-hidden="true"
                className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-medium text-lagoon"
              >
                Read more
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
              </span>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
