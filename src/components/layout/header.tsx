import { bookingHref, primaryNav } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { HeaderNav } from "./header-nav";

/** Floating glass bar. Fixed, so the hero and page banners start at the very top of the page. */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4">
      <Container className="max-w-6xl">
        <div className="header-glass relative flex h-16 items-center justify-between gap-4 rounded-2xl px-4 sm:px-5">
          <Logo />
          <HeaderNav links={primaryNav} bookingHref={bookingHref} />
        </div>
      </Container>
    </header>
  );
}
