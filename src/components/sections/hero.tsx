import { Fragment } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { bookingHref, siteConfig } from "@/config/site";
import { heroImage } from "@/data/media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SiteImage } from "@/components/ui/site-image";
import { stagger } from "@/lib/utils";
import { HeroScene } from "./hero-scene";

const HEADLINE = ["Stay", "in", "Malvan,", "on", "the", "Konkan", "coast"];
const ACCENT_FROM = 5;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-ocean-night text-white">
      <div className="absolute inset-0 -z-10">
        {heroImage ? (
          // Likely LCP element: prioritised, never lazy-loaded.
          <div className="ken-burns absolute inset-0">
            <SiteImage image={heroImage} label="Hero photograph" sizes="100vw" priority rounded="rounded-none" />
          </div>
        ) : (
          <HeroScene />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-night/75 via-ocean-night/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ocean-night/70 to-transparent" />
      </div>

      {!heroImage && !siteConfig.isLive ? (
        <p className="absolute right-4 top-24 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink sm:right-6">
          Placeholder scene: add a hero photograph in src/data/media.ts
        </p>
      ) : null}

      <Container className="flex min-h-[100svh] flex-col justify-end pb-32 pt-40 md:pb-40">
        <div className="max-w-3xl">
          <p className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
            <MapPin className="size-4 text-lagoon" />
            Malvan, Sindhudurg, Maharashtra
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {HEADLINE.map((word, index) => (
              <Fragment key={word}>
                <span className="hero-word">
                  <span
                    style={stagger(index)}
                    className={
                      index >= ACCENT_FROM
                        ? "bg-gradient-to-r from-lagoon to-glow bg-clip-text text-transparent"
                        : undefined
                    }
                  >
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <p className="anim-fade-up mt-6 max-w-[48ch] text-lg text-white/80 [--d:0.9s] md:text-xl">
            Meridian Malvan is a hotel in a town known for its sea fort, its beaches and Malvani cooking.
          </p>

          <div className="anim-fade-up mt-9 flex flex-wrap items-center gap-3 [--d:1.05s]">
            <ButtonLink href={bookingHref}>
              Book your stay
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/rooms" variant="glass">
              See the rooms
            </ButtonLink>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-36 right-8 hidden h-16 w-px overflow-hidden bg-white/25 md:block"
        >
          <span className="scroll-cue-bar block h-full w-full bg-white" />
        </div>
      </Container>
    </section>
  );
}
