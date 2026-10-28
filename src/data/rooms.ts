import type { Room } from "@/types/content";

/**
 * Add one object per REAL room type, with status "verified".
 * Placeholders below appear on preview deployments only and are never put in
 * structured data or the sitemap.
 *
 * Example of a verified entry:
 * {
 *   slug: "deluxe-double", name: "Deluxe Double", status: "verified",
 *   summary: "…", description: "…", occupancy: "Up to 2 adults", beds: "1 queen bed",
 *   amenities: ["Air conditioning", "…"], priceFromInr: null,
 *   image: { src: "/images/rooms/deluxe-double.jpg", alt: "…" }, imageLabel: "Deluxe Double",
 *   hasDetailPage: true,
 * }
 */
export const rooms: Room[] = [
  {
    slug: "room-type-one",
    name: "Room type to be confirmed",
    summary: "Placeholder. Replace with a verified room description in src/data/rooms.ts.",
    description: "",
    occupancy: "To be confirmed",
    beds: "To be confirmed",
    amenities: [],
    priceFromInr: null,
    image: null,
    imageLabel: "Room photograph",
    hasDetailPage: false,
    status: "placeholder",
  },
  {
    slug: "room-type-two",
    name: "Room type to be confirmed",
    summary: "Placeholder. Replace with a verified room description in src/data/rooms.ts.",
    description: "",
    occupancy: "To be confirmed",
    beds: "To be confirmed",
    amenities: [],
    priceFromInr: null,
    image: null,
    imageLabel: "Room photograph",
    hasDetailPage: false,
    status: "placeholder",
  },
];
