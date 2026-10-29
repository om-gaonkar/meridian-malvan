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
    slug: "deluxe-double-room",
    name: "Deluxe double room",
    summary: "A comfortable room with balcony designed for a relaxing stay in Malvan .",
    description: "",
    occupancy: "Up to 3 adults",
    beds: "1 queen bed",
    amenities: [ "Air conditioning",
      "Private bathroom", "balcony"],
    priceFromInr: null,
     image: {
      src: "/images/rooms/room-F8-pic-3.jpeg",
      alt: "Interior of the deluxe double room at Meridian Malvan",
    },
    imageLabel: "Room photograph",
    hasDetailPage: false,
    status: "verified",
  },
 {
    slug: "deluxe-family-room",
    name: "Deluxe family room",
    summary: "A comfortable room with balcony designed for a relaxing stay in Malvan .",
    description: "",
    occupancy: "Up to 4 adults",
    beds: "1 queen bed + 1 mattress",
    amenities: [ "Air conditioning",
      "Private bathroom","balcony"],
    priceFromInr: null,
     image: {
      src: "/images/rooms/room-F7-pic-4.jpeg",
      alt: "Interior of the deluxe double room at Meridian Malvan",
    },
    imageLabel: "Room photograph",
    hasDetailPage: false,
    status: "verified",
  },
  {
    slug: "deluxe-Group-Hall",
    name: "Deluxe Group Hall",
    summary: "A comfortable room with balcony designed for a relaxing stay in Malvan .",
    description: "",
    occupancy: "Up to 8 adults",
    beds: "1 queen bed + 4 mattress",
    amenities: [ "Air conditioning",
      "Private bathroom","balcony"],
    priceFromInr: null,
     image: {
      src: "/images/rooms/room-F6-pic-2.jpeg",
      alt: "Interior of the deluxe double room at Meridian Malvan",
    },
    imageLabel: "Room photograph",
    hasDetailPage: false,
    status: "verified",
  },
];
