"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { NavLink } from "@/types/content";
import { cn } from "@/lib/utils";

export function HeaderNav({ links, bookingHref }: { links: NavLink[]; bookingHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  }

  return (
    <div className="flex items-center gap-3" onKeyDown={handleKeyDown}>
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1 text-[0.95rem]">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5",
                    active && "bg-ocean/10 font-medium text-ocean-deep",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 mx-auto size-1.5 rounded-full bg-sunset"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ButtonLink href={bookingHref} className="hidden min-h-10 px-5 sm:inline-flex">
        Book your stay
      </ButtonLink>

      <button
        ref={toggleRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-xl bg-ink/5 text-ink transition-colors hover:bg-ink/10 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="anim-menu absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-2xl border border-line bg-surface p-3 shadow-lift lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-4 text-lg transition-colors hover:bg-ink/5",
                        active && "bg-ocean/10 font-medium text-ocean-deep",
                      )}
                    >
                      {link.label}
                      {active ? <span aria-hidden="true" className="size-2 rounded-full bg-sunset" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href={bookingHref} className="mt-2 w-full" onClick={() => setOpen(false)}>
              Book your stay
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
