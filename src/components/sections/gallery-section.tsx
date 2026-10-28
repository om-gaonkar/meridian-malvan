import { galleryItems } from "@/data/gallery";
import { publishable } from "@/lib/content";
import { stagger } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { SiteImage } from "@/components/ui/site-image";

export function GallerySection() {
  const items = publishable(galleryItems).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <Section labelledBy="gallery-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="gallery-title" title="Gallery">
          The hotel and the Malvan coast around it.
        </SectionHeading>
        <ButtonLink href="/gallery" variant="secondary">
          View the full gallery
        </ButtonLink>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, index) => (
          <li key={item.id} className="reveal group" style={stagger(index)}>
            <div className="overflow-hidden rounded-2xl shadow-soft transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lift">
              <SiteImage
                image={item.image}
                label={item.label}
                ratio="4/3"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
