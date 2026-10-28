import { Check } from "lucide-react";
import { amenities } from "@/data/amenities";
import { publishable } from "@/lib/content";
import { cn, stagger } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";

export function AmenitiesSection() {
  const list = publishable(amenities);
  if (list.length === 0) return null;

  return (
    <Section tone="mist" labelledBy="amenities-title">
      <SectionHeading id="amenities-title" title="Facilities at the hotel">
        Everything listed here is something the hotel provides.
      </SectionHeading>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((amenity, index) => (
          <li
            key={amenity.id}
            style={stagger(index)}
            className={cn(
              "reveal group rounded-3xl border border-line bg-surface p-7 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift",
              index === 0 && "lg:col-span-2",
            )}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-ocean-deep text-lagoon transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Check className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{amenity.name}</h3>
            <p className="mt-1.5 text-ink-soft">{amenity.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
