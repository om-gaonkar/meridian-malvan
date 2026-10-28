import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { LocationDetails } from "./location-details";

export function LocationSection() {
  return (
    <Section tone="mist" labelledBy="location-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="location-title" title="Find us in Malvan">
          Address, directions and the places most visitors head for.
        </SectionHeading>
        <ButtonLink href="/location" variant="secondary">
          Location details
        </ButtonLink>
      </div>
      <div className="mt-12">
        <LocationDetails />
      </div>
    </Section>
  );
}
