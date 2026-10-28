import type { CSSProperties } from "react";
import { CURRENCY } from "@/config/constants";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDisplayDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Sets the --i custom property used by .reveal and .hero-word to stagger entrances. */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
