"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteImage } from "@/components/ui/site-image";
import type { GalleryItem } from "@/types/content";

/** Thumbnails open in a native <dialog>: focus is trapped, Esc closes, focus returns to the thumbnail. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : items[active];

  function open(index: number) {
    setActive(index);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setActive((index) => (index === null ? index : (index + delta + items.length) % items.length));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, index) => {
          const name = item.image?.alt ?? item.label;
          return (
            <li key={item.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => open(index)}
                aria-haspopup="dialog"
                aria-label={`View larger: ${name}`}
                className="group block w-full overflow-hidden rounded-2xl text-left shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <SiteImage
                  image={item.image}
                  label={item.label}
                  ratio={item.ratio}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        onClose={() => setActive(null)}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="gallery-dialog on-dark m-auto w-[min(94vw,64rem)] max-w-none overflow-hidden rounded-3xl bg-ocean-night p-0 text-white backdrop:bg-ocean-night/85 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <p aria-live="polite" className="text-sm">
                Image {(active ?? 0) + 1} of {items.length}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10"
                aria-label="Close image viewer"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative h-[68svh]">
              <SiteImage
                image={current.image}
                label={current.label}
                sizes="94vw"
                fit="contain"
                className="bg-ocean-night"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/40 transition-colors hover:bg-white/10 px-3"
              >
                <ChevronLeft className="size-5" />
                Previous
              </button>
              <p className="min-w-0 flex-1 text-center text-sm">{current.image?.alt ?? current.label}</p>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/40 transition-colors hover:bg-white/10 px-3"
              >
                Next
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
