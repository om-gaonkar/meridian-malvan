import { AmenitiesSection } from "@/components/sections/amenities-section";
import { BookingBar } from "@/components/sections/booking-bar";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { GallerySection } from "@/components/sections/gallery-section";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { LocationSection } from "@/components/sections/location-section";
import { Marquee } from "@/components/sections/marquee";
import { RoomsSection } from "@/components/sections/rooms-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { homeJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({ description: siteConfig.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <BookingBar />
      <Intro />
      <Marquee />
      <RoomsSection />
      <AmenitiesSection />
      <ExperiencesSection />
      <GallerySection />
      <LocationSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
