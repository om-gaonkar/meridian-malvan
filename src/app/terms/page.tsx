import { LegalDocument } from "@/components/layout/legal-document";
import { Pending } from "@/components/ui/pending";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms and conditions",
  description: "The terms for using the Meridian Malvan website and sending booking inquiries.",
  path: "/terms",
  noindex: !siteConfig.legal.reviewed,
});

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms and conditions"
      path="/terms"
      intro="The basics of using this website and of how inquiries work."
      sections={[
        {
          heading: "About this website",
          body: [
            `This website gives information about ${siteConfig.name} and lets you send booking inquiries. It is provided as is, and we may change or remove content at any time.`,
          ],
        },
        {
          heading: "Inquiries are not reservations",
          body: [
            "Sending an inquiry does not reserve a room. A stay is confirmed only when the hotel confirms it to you directly. This website does not take payments.",
          ],
        },
        {
          heading: "Rates, availability and information",
          body: [
            "Availability and rates are confirmed by the hotel when you inquire. We take care to keep information accurate, but descriptions of rooms, facilities and nearby attractions may change.",
          ],
        },
        {
          heading: "Third-party activities and links",
          body: [
            "Fort boats, water sports and other local activities are run by independent operators. Check their timings, prices and safety guidance directly. We are not responsible for third-party services or websites.",
          ],
        },
        {
          heading: "Cancellations, payments and liability",
          body: [<Pending key="policies">cancellation, payment and liability terms drafted by a legal professional</Pending>],
        },
        {
          heading: "Governing law",
          body: [<Pending key="law">governing law and jurisdiction</Pending>],
        },
      ]}
    />
  );
}
