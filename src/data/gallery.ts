import type { GalleryItem } from "@/types/content";

/**
 * Add real photos as { id, image: { src, alt }, label, ratio, status: "verified" }.
 * The placeholders show the intended shots and appear on preview deployments only.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    image: {
      src: "/images/gallery/MM-exterior-6.jpeg",
      alt: "Exterior view of Meridian Malvan hotel",
    },
    label: "Hotel exterior",
    ratio: "4/3",
    status: "verified",
  },
  {
    id: "g2",
    image: {
      src: "/images/gallery/MM-exterior-2.jpeg",
      alt: "Exterior view of Meridian Malvan hotel",
    },
    label: "Guest room",
    ratio: "3/4",
    status: "placeholder",
  },
  {
    id: "g3",
    image: {
      src: "/images/gallery/MM-banner-1.jpeg",
      alt: "Exterior view of Meridian Malvan hotel",
    },
    label: "Common area",
    ratio: "4/3",
    status: "placeholder",
  },
  // {
  //   id: "g4",
  //   image: null,
  //   label: "Malvan coastline",
  //   ratio: "3/2",
  //   status: "placeholder",
  // },
  // {
  //   id: "g5",
  //   image: null,
  //   label: "Dining",
  //   ratio: "1/1",
  //   status: "placeholder",
  // },
  // {
  //   id: "g6",
  //   image: null,
  //   label: "View from the hotel",
  //   ratio: "3/4",
  //   status: "placeholder",
  // },
];
