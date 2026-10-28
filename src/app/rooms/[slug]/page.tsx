import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SiteImage } from "@/components/ui/site-image";
import { rooms } from "@/data/rooms";
import { publishable } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { formatInr } from "@/lib/utils";

// Room pages exist only for verified rooms flagged hasDetailPage in src/data/rooms.ts.
export const dynamicParams = false;

function findRoom(slug: string) {
  return publishable(rooms).find((room) => room.slug === slug && room.hasDetailPage);
}

export function generateStaticParams() {
  return publishable(rooms)
    .filter((room) => room.hasDetailPage)
    .map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) return {};
  return createMetadata({ title: room.name, description: room.summary, path: `/rooms/${room.slug}` });
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) notFound();

  return (
    <>
      <PageHero
        title={room.name}
        intro={room.summary}
        crumbs={[
          { name: "Rooms", path: "/rooms" },
          { name: room.name, path: `/rooms/${room.slug}` },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <SiteImage image={room.image} label={room.imageLabel} ratio="4/3" sizes="(min-width: 1024px) 55vw, 100vw" priority />
          <div>
            <p className="max-w-[60ch]">{room.description}</p>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="text-ink-soft">Sleeps</dt>
              <dd>{room.occupancy}</dd>
              <dt className="text-ink-soft">Beds</dt>
              <dd>{room.beds}</dd>
              {room.priceFromInr !== null ? (
                <>
                  <dt className="text-ink-soft">From</dt>
                  <dd>{formatInr(room.priceFromInr)} per night</dd>
                </>
              ) : null}
            </dl>
            {room.amenities.length > 0 ? (
              <>
                <h2 className="mt-8 text-2xl">In the room</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-sunset-dark">
                  {room.amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <ButtonLink href={`/contact?room=${encodeURIComponent(room.name)}#inquiry`} className="mt-8">
              Ask about availability
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
