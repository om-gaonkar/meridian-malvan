import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { stagger } from "@/lib/utils";

const FACTS = ["Sindhudurg district", "Konkan coast", "Arabian Sea"];

export function Intro() {
  return (
    <Section labelledBy="intro-title">
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <h2
          id="intro-title"
          className="reveal text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl"
        >
          A town you plan around the sea
        </h2>
        <div className="reveal max-w-[60ch] space-y-5 text-lg text-ink-soft" style={stagger(1)}>
          <p>
            Malvan sits on the Sindhudurg coast of Maharashtra, facing an island fort, a working fishing
            harbour and some of the region’s best-known beaches. Meridian Malvan is a place to stay while
            you take it all in.
          </p>
          <p>
            We aim for a comfortable base and straightforward local advice: when the sea is calm enough
            for the fort, what to order at a Malvani table, which stretch of coast suits the day.
          </p>
          <ul className="flex flex-wrap gap-2 pt-2">
            {FACTS.map((fact) => (
              <li key={fact} className="rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-ocean-deep">
                {fact}
              </li>
            ))}
          </ul>
          <p className="flex flex-wrap gap-x-6 gap-y-1 pt-2">
            <ButtonLink href="/about" variant="text">
              About the hotel
            </ButtonLink>
            <ButtonLink href="/location" variant="text">
              Where we are
            </ButtonLink>
          </p>
        </div>
      </div>
    </Section>
  );
}
