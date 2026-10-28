import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDirectionsUrl, siteConfig } from "@/config/site";
import { experiences } from "@/data/experiences";
import { ButtonLink } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";
import { ContactDetails } from "@/components/layout/contact-details";

export function LocationDetails() {
  const directionsUrl = getDirectionsUrl();
  const embedUrl = siteConfig.contact.googleMapsEmbedUrl;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
      <div className="reveal space-y-8 rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-8">
        <ContactDetails />

        <div>
          {directionsUrl ? (
            <ButtonLink href={directionsUrl}>
              Get directions
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </ButtonLink>
          ) : (
            <Pending>directions link (add the address or Google Maps URL in src/config/site.ts)</Pending>
          )}
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold">Nearby attractions</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {experiences.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/experiences#${item.id}`}
                  className="inline-flex rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-ocean-deep transition-colors hover:bg-ocean hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[48ch] text-sm text-ink-soft">
            Distances and travel times from the hotel will be added once the address is confirmed.
          </p>
        </div>
      </div>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`Map showing the location of ${siteConfig.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="reveal h-80 w-full rounded-3xl border border-line shadow-soft lg:h-full lg:min-h-96"
        />
      ) : !siteConfig.isLive ? (
        <div className="reveal flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-sunset p-6 text-center text-sm text-sunset-dark">
          Map placeholder. Set contact.googleMapsEmbedUrl in src/config/site.ts to show an embedded map.
        </div>
      ) : null}
    </div>
  );
}
