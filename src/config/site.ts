import { CURRENCY, HOTEL_NAME, TIME_ZONE } from "./constants";
import type { Address, NavLink } from "@/types/content";

// ---------------------------------------------------------------------------
// Environment-derived values
// ---------------------------------------------------------------------------

const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "example.com",
  "example.org",
  "example.net",
  "your-domain.com",
  "yourdomain.com",
];

function parseRealOrigin(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase();
    const blocked = BLOCKED_HOSTS.some((b) => host === b || host.endsWith(`.${b}`));
    return blocked ? null : url.origin;
  } catch {
    return null;
  }
}

const indexingEnabled = process.env.ALLOW_INDEXING === "true";
const configuredOrigin = parseRealOrigin(process.env.NEXT_PUBLIC_SITE_URL);

function resolveSiteUrl(): string {
  if (configuredOrigin) {
    if (indexingEnabled && !configuredOrigin.startsWith("https://")) {
      throw new Error("ALLOW_INDEXING=true requires NEXT_PUBLIC_SITE_URL to use https.");
    }
    return configuredOrigin;
  }
  if (indexingEnabled) {
    throw new Error(
      "ALLOW_INDEXING=true requires NEXT_PUBLIC_SITE_URL to be your real production domain (not localhost or a placeholder).",
    );
  }
  // Non-indexed builds only: previews and local development.
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
}

// ---------------------------------------------------------------------------
// Typed business configuration
// ---------------------------------------------------------------------------

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  /** True only on the production deployment (ALLOW_INDEXING=true). */
  isLive: boolean;
  locale: string;
  currency: string;
  timeZone: string;
  contact: {
    phone: string | null;
    email: string | null;
    address: Address | null;
    geo: { latitude: number; longitude: number } | null;
    /** Share link from the Google Business Profile / Google Maps listing. */
    googleMapsUrl: string | null;
    /** The src of Google's "Embed a map" iframe. Optional. */
    googleMapsEmbedUrl: string | null;
  };
  /** Full https URLs. Leave null until the profile exists. */
  social: {
    instagram: string | null;
    facebook: string | null;
    googleBusinessProfile: string | null;
  };
  booking: {
    /** Set to an external booking engine URL later. null = use the on-site inquiry form. */
    externalUrl: string | null;
  };
  /** e.g. "₹₹". Leave null unless verified. */
  priceRange: string | null;
  legal: {
    /** Flip to true only after a qualified professional has reviewed the legal pages. */
    reviewed: boolean;
    lastUpdated: string | null;
    operatorName: string | null;
  };
}

export const siteConfig: SiteConfig = {
  name: HOTEL_NAME,
  tagline: "Hotel in Malvan, Maharashtra",
  description:
    "Meridian Malvan is a hotel in Malvan, Maharashtra, on the Konkan coast. Send an inquiry to plan your stay near the sea fort, beaches and Malvani food.",
  url: resolveSiteUrl(),
  isLive: indexingEnabled,
  locale: "en-IN",
  currency: CURRENCY,
  timeZone: TIME_ZONE,

  // TODO(owner): fill these in with VERIFIED details. Anything left null is
  // hidden on the live site and shown as a "Pending" marker on previews.
  contact: {
    phone: null,
    email: null,
    address: null,
    geo: null,
    googleMapsUrl: null,
    googleMapsEmbedUrl: null,
  },
  social: {
    instagram: null,
    facebook: null,
    googleBusinessProfile: null,
  },
  booking: { externalUrl: null },
  priceRange: null,
  legal: { reviewed: false, lastUpdated: null, operatorName: null },
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [...primaryNav, { label: "About", href: "/about" }];

export const bookingHref = siteConfig.booking.externalUrl ?? "/contact#inquiry";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function formatAddress(address: Address): string {
  return [address.streetAddress, address.locality, `${address.region} ${address.postalCode}`.trim()]
    .filter(Boolean)
    .join(", ");
}

export function hasContactDetails(): boolean {
  const { phone, email, address } = siteConfig.contact;
  return Boolean(phone || email || address);
}

export function getDirectionsUrl(): string | null {
  const { googleMapsUrl, geo, address } = siteConfig.contact;
  if (googleMapsUrl) return googleMapsUrl;
  if (geo) return `https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`;
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${HOTEL_NAME}, ${formatAddress(address)}`)}`;
  }
  return null;
}
