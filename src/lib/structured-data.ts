import { siteConfig } from "@/config/site";
import { amenities } from "@/data/amenities";
import { galleryItems } from "@/data/gallery";
import { heroImage } from "@/data/media";
import { absoluteUrl } from "./seo";

const opt = <T extends object>(condition: unknown, value: T): T | Record<string, never> =>
  condition ? value : {};

/**
 * One @graph on the home page only (WebSite + Hotel) so there are never duplicate or
 * conflicting entities. Fields appear only when verified in src/config/site.ts or
 * src/data; placeholders are never included.
 */
export function homeJsonLd() {
  const { contact, social, priceRange } = siteConfig;
  const hotelId = `${siteConfig.url}/#hotel`;

  const images = [
    heroImage?.src,
    ...galleryItems.filter((g) => g.status === "verified").map((g) => g.image?.src),
  ]
    .filter((src): src is string => Boolean(src))
    .map((src) => absoluteUrl(src));

  const verifiedAmenities = amenities.filter((a) => a.status === "verified");
  const sameAs = Object.values(social).filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "en-IN",
        publisher: { "@id": hotelId },
      },
      {
        "@type": "Hotel",
        "@id": hotelId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        currenciesAccepted: siteConfig.currency,
        ...opt(contact.address, {
          address: contact.address && {
            "@type": "PostalAddress",
            streetAddress: contact.address.streetAddress,
            addressLocality: contact.address.locality,
            addressRegion: contact.address.region,
            postalCode: contact.address.postalCode,
            addressCountry: contact.address.countryCode,
          },
        }),
        ...opt(contact.phone, { telephone: contact.phone }),
        ...opt(contact.email, { email: contact.email }),
        ...opt(contact.geo, {
          geo: contact.geo && {
            "@type": "GeoCoordinates",
            latitude: contact.geo.latitude,
            longitude: contact.geo.longitude,
          },
        }),
        ...opt(priceRange, { priceRange }),
        ...opt(images.length > 0, { image: images }),
        ...opt(sameAs.length > 0, { sameAs }),
        ...opt(verifiedAmenities.length > 0, {
          amenityFeature: verifiedAmenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a.name,
            value: true,
          })),
        }),
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
