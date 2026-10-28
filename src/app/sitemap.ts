import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { rooms } from "@/data/rooms";
import { publishable } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Non-production deployments expose nothing.
  if (!siteConfig.isLive) return [];

  const paths = ["/", "/rooms", "/experiences", "/gallery", "/about", "/location", "/contact"];
  if (siteConfig.legal.reviewed) paths.push("/privacy-policy", "/terms");

  const roomPaths = publishable(rooms)
    .filter((room) => room.hasDetailPage)
    .map((room) => `/rooms/${room.slug}`);

  return [...paths, ...roomPaths].map((path) => ({ url: absoluteUrl(path) }));
}
