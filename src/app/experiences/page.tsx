import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { ExperienceIcon } from "@/components/ui/experience-icon";
import { Section } from "@/components/ui/section";
import { SiteImage } from "@/components/ui/site-image";
import { bookingHref } from "@/config/site";
import { experiences } from "@/data/experiences";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Things to do in Malvan and the Konkan coast",
  description:
    "Sindhudurg Fort, Tarkarli and Devbag beaches, snorkelling and scuba, and Malvani food: what to know before you visit Malvan.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        title="Experiences in Malvan and on the Konkan coast"
        intro="A short guide to the fort, the beaches and the food. These are local attractions and independent operators; Meridian Malvan does not run them unless this site says so."
        crumbs={[{ name: "Experiences", path: "/experiences" }]}
      />
      <Section>
        <ul className="space-y-6">
          {experiences.map((item) => (
            <li key={item.id} className="reveal">
              <article
                id={item.id}
                className="group grid gap-8 rounded-3xl border border-line bg-surface p-7 shadow-soft transition duration-500 hover:shadow-lift sm:p-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
              >
                <div>
                  <span className="grid size-14 place-items-center rounded-2xl bg-ocean-deep text-lagoon transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <ExperienceIcon id={item.id} className="size-6" />
                  </span>
                  <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">{item.title}</h2>
                  <p className="mt-3 max-w-[40ch] text-ink-soft">{item.summary}</p>
                  {item.image ? (
                    <div className="mt-6">
                      <SiteImage image={item.image} label={item.title} ratio="4/3" sizes="(min-width: 1024px) 35vw, 100vw" />
                    </div>
                  ) : null}
                </div>
                <div className="max-w-[62ch] space-y-4 text-lg">
                  {item.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="rounded-2xl bg-mist p-5 text-base">
                    <span className="font-semibold">Good to know. </span>
                    {item.goodToKnow}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="on-dark mesh-dark reveal relative isolate mt-12 overflow-hidden rounded-3xl px-7 py-12 text-white sm:px-12">
          <div aria-hidden="true" className="blob -right-10 -top-16 size-72 bg-lagoon/25" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[40ch] font-display text-2xl font-semibold leading-snug sm:text-3xl">
              Want help planning around the season and the tides? Ask when you send your inquiry.
            </p>
            <ButtonLink href={bookingHref}>
              Book your stay
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
