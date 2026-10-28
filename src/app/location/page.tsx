import { PageHero } from "@/components/layout/page-hero";
import { LocationDetails } from "@/components/sections/location-details";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Location and directions",
  description:
    "Where to find Meridian Malvan in Malvan, Maharashtra, with directions and the nearby attractions most visitors head for.",
  path: "/location",
});

export default function LocationPage() {
  return (
    <>
      <PageHero
        title="Location and directions"
        intro="Meridian Malvan is in Malvan, in Sindhudurg district on Maharashtra’s Konkan coast."
        crumbs={[{ name: "Location", path: "/location" }]}
      />
      <Section>
        <LocationDetails />
      </Section>
    </>
  );
}
