import Link from "next/link";
import { footerNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { ContactDetails } from "./contact-details";

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden rounded-t-[2.5rem] bg-ocean-night text-white">
      <div aria-hidden="true" className="blob -left-20 top-0 size-80 bg-lagoon/15" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-display text-[19vw] font-semibold leading-none tracking-tighter text-white/[0.04]"
      >
        Meridian
      </div>

      <Container className="grid gap-12 py-20 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-6 max-w-[34ch] text-white/75">
            {siteConfig.tagline}, on the Konkan coast of Sindhudurg district.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xl font-semibold">Explore</h2>
          <ul className="mt-5 space-y-2.5">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block text-white/80 transition duration-300 hover:translate-x-1 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <div className="mt-5">
            <ContactDetails tone="dark" />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-white hover:no-underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="underline underline-offset-4 hover:text-white hover:no-underline">
                Terms
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
