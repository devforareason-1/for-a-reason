import { ScrollDrift } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

interface ArcLightProps {
  /** Sets where the circle sits. See the .arc-* presets in globals.css. */
  className?: string;
  drift?: number;
}

// The brand board's graphic element: the rim of a dark circle, lit from behind.
// Pure CSS, and dissolved at the top so it never runs behind the navigation.
export function ArcLight({ className, drift = 120 }: ArcLightProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
      <ScrollDrift y={drift} className="size-full">
        <span className={cn("arc-light block size-full animate-page-in", className)} />
      </ScrollDrift>
    </div>
  );
}
