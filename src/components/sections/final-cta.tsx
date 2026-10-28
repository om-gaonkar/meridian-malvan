import { ArrowRight } from "lucide-react";
import { bookingHref, phoneHref, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  const { phone } = siteConfig.contact;

  return (
    <section aria-labelledby="final-cta-title" className="py-20 md:py-28">
      <Container>
        <div className="on-dark mesh-dark reveal relative isolate overflow-hidden rounded-[2rem] px-7 py-16 text-white md:rounded-[2.5rem] md:px-16 md:py-24">
          <div aria-hidden="true" className="blob -right-10 -top-20 size-96 bg-lagoon/30" />
          <div aria-hidden="true" className="blob -bottom-24 left-1/3 size-80 bg-sunset/30 [animation-delay:-8s]" />
          <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 id="final-cta-title" className="text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
                Planning a stay in Malvan?
              </h2>
              <p className="mt-5 max-w-[50ch] text-lg text-white/75">
                Send your dates and the number of guests. The hotel checks availability and replies to you
                directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={bookingHref}>
                Book your stay
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              {phone ? (
                <ButtonLink href={phoneHref(phone)} variant="glass">
                  Call {phone}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
