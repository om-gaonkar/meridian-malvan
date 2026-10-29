import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** The mark: a sun resting on the horizon, crossed by the meridian line at noon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 4v24" stroke="white" strokeWidth="1.5" strokeOpacity=".9" />
      <path d="M8 20a8 8 0 0 1 16 0Z" className="fill-glow" />
      <path d="M4 20h24" stroke="white" strokeWidth="1.5" />
      <path
        d="M10 24h12"
        stroke="white"
        strokeWidth="1.25"
        strokeOpacity=".5"
      />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn(
        "group inline-flex items-center gap-3",
        tone === "dark" ? "text-white" : "text-ink",
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105",
          tone === "dark" ? "bg-white/10" : "",
        )}
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={40}
          height={40}
          priority
          className="size-10 object-contain transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105"
        />
      </span>
      <span className="font-display text-xl font-semibold leading-none tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}
