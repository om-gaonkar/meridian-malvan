import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const DEFAULT_TITLE = `${siteConfig.name} | ${siteConfig.tagline}`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

interface PageSeo {
  /** Omit for the home page, which uses the default title. */
  title?: string;
  description: string;
  /** Canonical path, e.g. "/rooms". */
  path: string;
  noindex?: boolean;
}

export function createMetadata({ title, description, path, noindex = false }: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : DEFAULT_TITLE;
  const indexable = siteConfig.isLive && !noindex;
  const image = {
    url: "/og",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name}, ${siteConfig.tagline}`,
  };

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: siteConfig.isLive },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
