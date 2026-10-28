import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "glass" | "text" | "textOnDark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.95rem] font-medium transition duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-sunset text-white shadow-[0_10px_24px_-10px_rgb(210_64_31/0.75)] hover:-translate-y-0.5 hover:bg-sunset-dark hover:shadow-[0_16px_30px_-12px_rgb(210_64_31/0.8)]",
  secondary: "border border-ink/20 bg-surface text-ink hover:-translate-y-0.5 hover:border-ocean hover:text-ocean",
  light: "bg-white text-ocean-deep hover:-translate-y-0.5 hover:bg-mist",
  glass:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/20",
  text: "min-h-0 rounded-md px-0 py-1 text-ocean underline decoration-1 underline-offset-4 hover:decoration-2",
  textOnDark: "min-h-0 rounded-md px-0 py-1 text-white underline decoration-1 underline-offset-4 hover:decoration-2",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
}

/** Internal paths use next/link; tel:, mailto: and external URLs use a plain anchor. */
export function ButtonLink({ href, variant = "primary", className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}
