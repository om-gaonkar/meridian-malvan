import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export interface LegalSection {
  heading: string;
  body: React.ReactNode[];
}

export function LegalDocument({
  title,
  intro,
  path,
  sections,
}: {
  title: string;
  intro: string;
  path: string;
  sections: LegalSection[];
}) {
  const { reviewed, lastUpdated } = siteConfig.legal;

  return (
    <>
      <PageHero title={title} intro={intro} crumbs={[{ name: title, path }]} />
      <Section>
        <div className="max-w-[68ch]">
          {!reviewed ? (
            <p role="note" className="mb-10 rounded-2xl border border-line bg-mist/60 p-5 text-[0.95rem]">
              Draft text. It has not been reviewed by a legal professional and is not legal advice. Have
              it checked before relying on it.
            </p>
          ) : null}
          {sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          {lastUpdated ? <p className="text-sm text-ink-soft">Last updated {lastUpdated}.</p> : null}
        </div>
      </Section>
    </>
  );
}
