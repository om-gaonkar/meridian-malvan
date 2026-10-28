import { siteConfig } from "@/config/site";
import type { ContentStatus, Faq } from "@/types/content";

/** On the live site only verified items are shown; previews also show placeholders. */
export function publishable<T extends { status: ContentStatus }>(items: readonly T[]): T[] {
  return siteConfig.isLive ? items.filter((item) => item.status === "verified") : [...items];
}

export function publishableFaqs(items: readonly Faq[]): Faq[] {
  return siteConfig.isLive ? items.filter((item) => item.answer !== null) : [...items];
}
