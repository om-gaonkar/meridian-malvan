import type { ImageAsset } from "@/types/content";

/**
 * Brand photography. Put licensed files in /public/images and replace null with e.g.
 *   { src: "/images/hero.jpg", alt: "Describe what the photo actually shows" }
 * While null, a clearly labelled placeholder is rendered instead of a stock image.
 */
export const heroImage: ImageAsset | null = {
  src: "/images/hotel-hero.jpeg",
  alt: "Exterior view of Meridian Malvan hotel",
};
export const aboutImage: ImageAsset | null = null;
