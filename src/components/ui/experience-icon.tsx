import { Compass, Landmark, Umbrella, UtensilsCrossed, Waves, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "sindhudurg-fort": Landmark,
  "tarkarli-devbag": Umbrella,
  "water-sports": Waves,
  "malvani-food": UtensilsCrossed,
};

export function ExperienceIcon({ id, className }: { id: string; className?: string }) {
  const Icon = icons[id] ?? Compass;
  return <Icon className={className} />;
}
