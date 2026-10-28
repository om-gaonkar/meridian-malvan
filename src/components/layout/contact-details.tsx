import { Mail, MapPin, Phone } from "lucide-react";
import { formatAddress, phoneHref, siteConfig } from "@/config/site";
import { Pending } from "@/components/ui/pending";
import { cn } from "@/lib/utils";

const socialLabels = {
  instagram: "Instagram",
  facebook: "Facebook",
  googleBusinessProfile: "Google Business Profile",
} as const;

export function ContactDetails({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { contact, social } = siteConfig;
  const link = cn(
    "underline underline-offset-4 hover:no-underline",
    tone === "light" && "text-ocean",
  );
  const socials = (Object.keys(socialLabels) as (keyof typeof socialLabels)[]).filter((key) => social[key]);

  const rows = [
    {
      key: "address",
      icon: MapPin,
      show: Boolean(contact.address) || !siteConfig.isLive,
      body: contact.address ? formatAddress(contact.address) : <Pending>hotel address</Pending>,
    },
    {
      key: "phone",
      icon: Phone,
      show: Boolean(contact.phone) || !siteConfig.isLive,
      body: contact.phone ? (
        <a href={phoneHref(contact.phone)} className={link}>
          {contact.phone}
        </a>
      ) : (
        <Pending>phone number</Pending>
      ),
    },
    {
      key: "email",
      icon: Mail,
      show: Boolean(contact.email) || !siteConfig.isLive,
      body: contact.email ? (
        <a href={`mailto:${contact.email}`} className={link}>
          {contact.email}
        </a>
      ) : (
        <Pending>email address</Pending>
      ),
    },
  ].filter((row) => row.show);

  return (
    <address className="space-y-3 not-italic">
      {rows.map(({ key, icon: Icon, body }) => (
        <p key={key} className="flex items-start gap-3">
          <Icon className="mt-1 size-4 shrink-0" />
          <span>{body}</span>
        </p>
      ))}
      {socials.length > 0 ? (
        <p className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
          {socials.map((key) => (
            <a
              key={key}
              href={social[key] as string}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {socialLabels[key]}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </p>
      ) : null}
    </address>
  );
}
