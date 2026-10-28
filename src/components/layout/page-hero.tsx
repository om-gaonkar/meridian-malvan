import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/** Page banner for inner pages. Also emits the matching BreadcrumbList JSON-LD. */
export function PageHero({
  title,
  intro,
  crumbs,
}: {
  title: string;
  intro: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <header className="on-dark mesh-dark relative isolate overflow-hidden rounded-b-[2.5rem] pb-16 pt-36 text-white md:pb-24 md:pt-44">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div aria-hidden="true" className="blob -right-16 -top-10 size-96 bg-lagoon/25" />
      <div aria-hidden="true" className="blob -bottom-24 left-10 size-72 bg-sunset/25 [animation-delay:-7s]" />
      <Container className="relative">
        <div className="anim-fade-up">
          <Breadcrumbs items={crumbs} tone="dark" />
        </div>
        <h1 className="anim-fade-up mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl [--d:0.1s]">
          {title}
        </h1>
        <p className="anim-fade-up mt-6 max-w-[56ch] text-lg text-white/75 [--d:0.25s] md:text-xl">{intro}</p>
      </Container>
    </header>
  );
}
