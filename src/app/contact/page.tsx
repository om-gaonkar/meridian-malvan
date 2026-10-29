import { ContactDetails } from "@/components/layout/contact-details";
import { PageHero } from "@/components/layout/page-hero";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Section } from "@/components/ui/section";
import { hasContactDetails, siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { stagger } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Contact and booking inquiries",
  description:
    "Contact Meridian Malvan, Maharashtra, to plan your stay. Call +91 8104000199 or email meridianmalvan@gmail.com for room inquiries and reservations.",
  path: "/contact",
});

export default function ContactPage() {
  const { phone, email } = siteConfig.contact;

  return (
    <>
      <PageHero
        title="Contact and booking inquiries"
        intro="Tell us your dates and how many are travelling. The hotel checks availability and replies to you directly. No payment is taken on this website."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-10">
          <div className="reveal h-fit rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-8">
            <h2 className="text-2xl font-semibold">Contact details</h2>
            <div className="mt-5">
              {hasContactDetails() || !siteConfig.isLive ? (
                <ContactDetails />
              ) : (
                <p className="text-ink-soft">
                  The inquiry form is the best way to reach the hotel for now.
                </p>
              )}
            </div>
          </div>
          <div
            id="inquiry"
            className="reveal rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8"
            style={stagger(1)}
          >
            <h2 className="text-2xl font-semibold">Send an inquiry</h2>
            <div className="mt-6">
              <InquiryForm phone={phone} email={email} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
