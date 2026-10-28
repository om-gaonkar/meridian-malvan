import { useSyncExternalStore } from "react";
import { todayInKolkata } from "./validation";

const subscribe = () => () => {};

/**
 * Today's date in Asia/Kolkata. Returns "" during server render and hydration so the
 * statically generated HTML never carries a stale build-time date.
 */
export function useToday(): string {
  return useSyncExternalStore(subscribe, () => todayInKolkata(), () => "");
}
