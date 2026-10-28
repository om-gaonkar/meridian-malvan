import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { formatInr, cn } from "@/lib/utils";
import type { Room } from "@/types/content";

export function RoomCard({ room }: { room: Room }) {
  const placeholder = room.status === "placeholder";

  return (
    <article
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-3xl border bg-surface shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift",
        placeholder ? "border-dashed border-sunset" : "border-line",
      )}
    >
      <div className="p-2.5 pb-0">
        <SiteImage
          image={room.image}
          label={room.imageLabel}
          ratio="4/3"
          rounded="rounded-2xl"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold leading-snug">{room.name}</h3>
        <p className="mt-2 text-ink-soft">{room.summary}</p>

        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[0.95rem]">
          <dt className="text-ink-soft">Sleeps</dt>
          <dd>{room.occupancy}</dd>
          <dt className="text-ink-soft">Beds</dt>
          <dd>{room.beds}</dd>
          {room.amenities.length > 0 ? (
            <>
              <dt className="text-ink-soft">Includes</dt>
              <dd>{room.amenities.join(", ")}</dd>
            </>
          ) : null}
          {room.priceFromInr !== null ? (
            <>
              <dt className="text-ink-soft">From</dt>
              <dd className="font-medium">{formatInr(room.priceFromInr)} per night</dd>
            </>
          ) : null}
        </dl>
        {room.priceFromInr !== null ? (
          <p className="mt-2 text-sm text-ink-soft">Rates vary by date. The hotel confirms the price when you inquire.</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <ButtonLink
            href={`/contact?room=${encodeURIComponent(room.name)}#inquiry`}
            variant="secondary"
            className="min-h-11"
            aria-label={`Ask about availability for ${room.name}`}
          >
            Ask about availability
          </ButtonLink>
          {room.hasDetailPage ? (
            <ButtonLink href={`/rooms/${room.slug}`} variant="text" aria-label={`View details for ${room.name}`}>
              View room
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
