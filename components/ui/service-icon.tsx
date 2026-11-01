import { ChartNoAxesColumn, Layers, Monitor, Play, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/content/types";

// The line icons from the design system, one per pillar. Always decorative: the service
// name sits beside them.
const icons: Record<ServiceSlug, LucideIcon> = {
  "brand-identity": Layers,
  "digital-experiences": Monitor,
  "social-content": Play,
  "growth-marketing": ChartNoAxesColumn,
};

export function ServiceIcon({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Icon = icons[slug];
  return <Icon aria-hidden="true" strokeWidth={1.25} className={className} />;
}
