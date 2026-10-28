import { PageHero } from "@/components/layout/page-hero";
import { RoomGrid } from "@/components/sections/rooms-section";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Rooms and accommodation in Malvan",
  description:
    "Room types at Meridian Malvan, with occupancy and bed details. Send an inquiry to check availability for your dates in Malvan, Maharashtra.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
      <PageHero
        title="Rooms"
        intro="Choose a room type and ask about your dates. The hotel confirms availability and rates directly; this website does not show live availability."
        crumbs={[{ name: "Rooms", path: "/rooms" }]}
      />
      <Section>
        <h2 className="sr-only">Room types</h2>
        <RoomGrid />
      </Section>
    </>
  );
}
