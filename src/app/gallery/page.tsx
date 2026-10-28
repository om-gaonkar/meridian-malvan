import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { galleryItems } from "@/data/gallery";
import { publishable } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Photo gallery",
  description: "Photographs of Meridian Malvan and the Malvan coast in Maharashtra.",
  path: "/gallery",
});

export default function GalleryPage() {
  const items = publishable(galleryItems);

  return (
    <>
      <PageHero
        title="Gallery"
        intro="The hotel and the coast around it. Select a photograph to view it larger."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <Section>
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="max-w-xl rounded-3xl border border-line bg-surface p-7 shadow-soft">
            <p className="font-display text-2xl font-semibold">Photographs are on their way</p>
            <p className="mt-2 text-ink-soft">
              The gallery will fill up as the hotel’s own photography is added. Ask us for pictures of
              a particular room in your inquiry.
            </p>
            <ButtonLink href="/contact#inquiry" className="mt-5">
              Send an inquiry
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}
