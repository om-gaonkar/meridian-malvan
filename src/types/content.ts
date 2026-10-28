export interface NavLink {
  label: string;
  href: string;
}

/** A real, licensed photograph stored under /public/images. */
export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Address {
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2, e.g. "IN" */
  countryCode: string;
}

/** "placeholder" items are shown only on non-live (preview/dev) deployments. */
export type ContentStatus = "verified" | "placeholder";

export interface Room {
  slug: string;
  name: string;
  summary: string;
  description: string;
  occupancy: string;
  beds: string;
  amenities: string[];
  /** Indicative nightly rate in INR. Leave null until the hotel confirms pricing. */
  priceFromInr: number | null;
  image: ImageAsset | null;
  imageLabel: string;
  /** Only set true when the room has enough verified detail for its own page. */
  hasDetailPage: boolean;
  status: ContentStatus;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  status: ContentStatus;
}

export interface Experience {
  id: string;
  title: string;
  summary: string;
  details: string[];
  goodToKnow: string;
  /** Pages the facts were checked against (internal reference, not rendered). */
  sources: string[];
  image: ImageAsset | null;
}

export interface GalleryItem {
  id: string;
  image: ImageAsset | null;
  /** Describes the intended photo; used for the placeholder label. */
  label: string;
  /** CSS aspect-ratio, e.g. "4/3" */
  ratio: string;
  status: ContentStatus;
}

export interface Faq {
  id: string;
  question: string;
  /** null = answer not yet supplied; hidden on live deployments. */
  answer: string | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  source: string;
  sourceUrl?: string;
  date: string;
}
