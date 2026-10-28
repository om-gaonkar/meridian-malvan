import { Container } from "./container";
import { cn, stagger } from "@/lib/utils";

type Tone = "canvas" | "mist" | "dark";

const tones: Record<Tone, string> = {
  canvas: "",
  mist: "bg-mist/70",
  dark: "on-dark mesh-dark relative isolate overflow-hidden text-white",
};

export function Section({
  id,
  labelledBy,
  tone = "canvas",
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-28", tones[tone], className)}>
      {tone === "dark" ? (
        <>
          <div aria-hidden="true" className="blob -left-24 top-10 size-80 bg-lagoon/25" />
          <div aria-hidden="true" className="blob -right-20 bottom-0 size-96 bg-sunset/25 [animation-delay:-6s]" />
        </>
      ) : null}
      <Container className="relative">{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  children,
  tone = "canvas",
}: {
  id: string;
  title: string;
  children?: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="reveal max-w-2xl">
      <h2 id={id} className="text-4xl font-semibold leading-[1.04] sm:text-5xl">
        {title}
      </h2>
      {children ? (
        <p
          style={stagger(1)}
          className={cn("mt-5 max-w-[56ch] text-lg", tone === "dark" ? "text-white/75" : "text-ink-soft")}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
