import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="pb-24 pt-44 md:pb-32 md:pt-52">
      <h1 className="anim-fade-up text-5xl font-semibold sm:text-6xl">That page isn’t here</h1>
      <p className="anim-fade-up mt-5 max-w-[52ch] text-lg text-ink-soft [--d:0.1s]">
        The link may be old or mistyped. Head back to the homepage or see the rooms.
      </p>
      <div className="anim-fade-up mt-8 flex flex-wrap gap-3 [--d:0.2s]">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/rooms" variant="secondary">
          See rooms
        </ButtonLink>
      </div>
    </Container>
  );
}
