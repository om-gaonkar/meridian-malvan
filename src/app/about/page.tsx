import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/ui/section";
import { SiteImage } from "@/components/ui/site-image";
import { bookingHref } from "@/config/site";
import { aboutImage } from "@/data/media";
import { createMetadata } from "@/lib/seo";
import { stagger } from "@/lib/utils";

export const metadata = createMetadata({
  title: "About the hotel",
  description:
    "Meridian Malvan is a hotel in Malvan, Maharashtra. Read how we think about hospitality and the Konkan coast we stay on.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Meridian Malvan"
        intro="A hotel in Malvan, Maharashtra, for guests who come for the coast."
        crumbs={[{ name: "About", path: "/about" }]}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="reveal rounded-3xl border border-line bg-surface p-8 shadow-soft sm:p-10">
            <h2 className="text-3xl font-semibold sm:text-4xl">How we think about hospitality</h2>
            <p className="mt-5 text-lg text-ink-soft">
              A good stay is mostly small things done reliably: a clean, comfortable room, clear answers
              before you arrive and honest advice once you are here. If the sea is too rough for the
              fort, you should hear it from us before you reach the jetty.
            </p>
          </article>
          <article
            className="reveal rounded-3xl border border-line bg-surface p-8 shadow-soft sm:p-10"
            style={stagger(1)}
          >
            <h2 className="text-3xl font-semibold sm:text-4xl">Rooted in the Konkan</h2>
            <p className="mt-5 text-lg text-ink-soft">
              The Konkan coast has its own architecture in laterite stone, its own cooking and its own
              calendar of tides and monsoons. We want guests to leave knowing a little more about the
              place than when they arrived.
            </p>
          </article>
        </div>

        {aboutImage ? (
          <div className="reveal mt-6">
            <SiteImage image={aboutImage} label="The hotel" ratio="21/9" rounded="rounded-3xl" sizes="(min-width: 1152px) 1100px, 100vw" />
          </div>
        ) : null}

        <p className="mt-8">
          <Pending>owner-approved About copy, in the hotel’s own words</Pending>
        </p>
        <ButtonLink href={bookingHref} className="mt-8">
          Book your stay
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </Section>
    </>
  );
}
