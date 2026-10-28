import { LegalDocument } from "@/components/layout/legal-document";
import { Pending } from "@/components/ui/pending";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

// Legal pages stay noindex (and out of the sitemap) until siteConfig.legal.reviewed is true.
export const metadata = createMetadata({
  title: "Privacy policy",
  description: "How Meridian Malvan handles the information you send through its website inquiry form.",
  path: "/privacy-policy",
  noindex: !siteConfig.legal.reviewed,
});

export default function PrivacyPolicyPage() {
  const operator = siteConfig.legal.operatorName ?? siteConfig.name;
  const email = siteConfig.contact.email;

  return (
    <LegalDocument
      title="Privacy policy"
      path="/privacy-policy"
      intro="What we collect when you contact us through this website, and what we do with it."
      sections={[
        {
          heading: "Who we are",
          body: [
            <>
              This website is operated by {operator}. You can contact us at{" "}
              {email ?? <Pending>privacy contact email</Pending>}.
            </>,
          ],
        },
        {
          heading: "What we collect",
          body: [
            "When you send an inquiry we collect your name, email address, optional phone number, travel dates, number of guests, any room you selected and your message.",
            "To limit spam, the server briefly counts requests per IP address. This count is not stored with your inquiry.",
          ],
        },
        {
          heading: "How we use it",
          body: ["We use your details to reply to your inquiry and to discuss a stay you have asked about."],
        },
        {
          heading: "Who receives it",
          body: [
            <>
              Inquiries are delivered to the hotel team through the email or booking system the operator has
              set up. <Pending>names of the email and hosting providers used</Pending>
            </>,
          ],
        },
        {
          heading: "How long we keep it",
          body: [<Pending key="retention">retention period for inquiries</Pending>],
        },
        {
          heading: "Cookies and third parties",
          body: [
            "This website does not set advertising cookies. If analytics or other third-party services are added later, this policy must be updated first.",
            "If an embedded Google map is shown, Google may set cookies when it loads.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can ask us to show, correct or delete the information you sent by writing to the contact address above. Indian data-protection law may give you further rights; a qualified adviser should confirm what applies.",
          ],
        },
        {
          heading: "Changes",
          body: ["We will update this page when our practices change."],
        },
      ]}
    />
  );
}
