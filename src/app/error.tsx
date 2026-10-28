"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="pb-24 pt-44 md:pb-32 md:pt-52">
      <h1 className="text-5xl font-semibold sm:text-6xl">Something went wrong</h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
        The page couldn’t load. Try again, and if it keeps happening, contact the hotel directly.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
