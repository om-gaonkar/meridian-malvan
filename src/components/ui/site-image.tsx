import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  image: ImageAsset | null;
  /** What the photo should show; used to label the placeholder. */
  label: string;
  /** CSS aspect-ratio such as "4/3". Omit when the parent already has a height. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** "contain" shows the whole photo (lightbox); "cover" crops to fill (default). */
  fit?: "cover" | "contain";
  /** Tailwind radius class. */
  rounded?: string;
  className?: string;
}

/**
 * Real photo via next/image, or a clearly labelled placeholder when none has been supplied.
 * The wrapper reserves space up front (aspect ratio or parent height) so nothing shifts.
 * Inside a `.group`, the image eases in on hover (see .zoom-frame in globals.css).
 */
export function SiteImage({
  image,
  label,
  ratio,
  sizes,
  priority = false,
  fit = "cover",
  rounded = "rounded-2xl",
  className,
}: SiteImageProps) {
  const frame = cn(
    "zoom-frame relative overflow-hidden bg-mist",
    rounded,
    ratio ? "w-full" : "h-full w-full",
    className,
  );
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (image) {
    return (
      <div className={frame} style={style}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div className={frame} style={style} role="img" aria-label={`Placeholder image: ${label}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect width="400" height="300" fill="#0a4a55" />
        <rect y="170" width="400" height="130" fill="#062c36" />
        <path d="M200 0v300" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" />
        <path d="M130 170a70 70 0 0 1 140 0Z" fill="#ffb26b" />
        <path d="M0 170h400" stroke="#2dd4bf" strokeOpacity=".7" strokeWidth="1.5" />
        <path d="M150 192h100M170 212h60M185 232h30" stroke="#ffb26b" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
        Placeholder: {label}
      </span>
    </div>
  );
}
