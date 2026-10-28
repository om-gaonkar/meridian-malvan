import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: { name: string; path: string }[];
  tone?: "light" | "dark";
}) {
  const link = cn(
    "underline underline-offset-4",
    tone === "dark" ? "hover:text-white" : "hover:text-ocean",
  );
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-x-2 text-sm", tone === "dark" ? "text-white/70" : "text-ink-soft")}>
        <li>
          <Link href="/" className={link}>
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-x-2">
              <span aria-hidden="true">/</span>
              {last ? (
                <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={link}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
