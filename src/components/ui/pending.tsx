import { siteConfig } from "@/config/site";

/**
 * Marks information the owner still has to supply. Visible on previews and in
 * development only, so production pages never show placeholder details.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  if (siteConfig.isLive) return null;
  return (
    <span className="inline-block border border-dashed border-sunset px-1.5 text-sm text-sunset-dark">
      Pending: {children}
    </span>
  );
}
