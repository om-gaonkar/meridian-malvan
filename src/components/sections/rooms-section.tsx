import { rooms } from "@/data/rooms";
import { publishable } from "@/lib/content";
import { bookingHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { stagger } from "@/lib/utils";
import { RoomCard } from "./room-card";

export function RoomGrid({ limit }: { limit?: number }) {
  const list = publishable(rooms).slice(0, limit);

  if (list.length === 0) {
    return (
      <div className="max-w-xl rounded-3xl border border-line bg-surface p-7 shadow-soft">
        <p className="font-display text-2xl font-semibold">Room details are being added</p>
        <p className="mt-2 text-ink-soft">
          Send an inquiry with your dates and group size and the hotel will tell you which rooms are
          available.
        </p>
        <ButtonLink href={bookingHref} className="mt-5">
          Send an inquiry
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((room, index) => (
        <li key={room.slug} className="reveal flex" style={stagger(index)}>
          <RoomCard room={room} />
        </li>
      ))}
    </ul>
  );
}

export function RoomsSection() {
  return (
    <Section labelledBy="rooms-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="rooms-title" title="Rooms">
          Ask about availability for your dates. Rates are confirmed by the hotel when you inquire.
        </SectionHeading>
        <ButtonLink href="/rooms" variant="text">
          All rooms
        </ButtonLink>
      </div>
      <div className="mt-12">
        <RoomGrid limit={3} />
      </div>
    </Section>
  );
}
