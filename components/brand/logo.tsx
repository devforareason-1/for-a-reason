import paths from "./logo-paths.json";
import { cn } from "@/lib/utils";

// Official marks. logo-paths.json is generated from public/brand/FAR_Brand_Logos by
// `npm run logo`, so change the kit rather than the paths. Letters take currentColor,
// matching the kit's light and dark variants. Guidelines: never recolour the orange,
// use high-contrast surfaces only, and on an orange surface the period is ivory.

interface MarkProps {
  className?: string;
  /** For the orange surface variant only. */
  periodClassName?: string;
  title?: string;
  /** Draws the kit's own margin around the mark, for large placements near other elements. */
  clearSpace?: boolean;
}

function Mark({ mark, className, periodClassName, title = "for a reason.", clearSpace = false }: MarkProps & { mark: keyof typeof paths }) {
  const { width, height, letters, period, clearSpace: space } = paths[mark];
  const viewBox = clearSpace
    ? `${-space.left} ${-space.top} ${width + space.left + space.right} ${height + space.top + space.bottom}`
    : `0 0 ${width} ${height}`;
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className={cn("block h-auto", className)}>
      <path d={letters} fill="currentColor" />
      <path d={period} className={cn("fill-ember", periodClassName)} />
    </svg>
  );
}

export const Wordmark = (props: MarkProps) => <Mark mark="wordmark" {...props} />;
export const Monogram = (props: MarkProps) => <Mark mark="monogram" {...props} />;
