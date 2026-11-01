import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, children, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5 md:gap-6", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow dot={false} className="opacity-80">{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal>
        <h2 className="max-w-5xl text-display font-bold">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.1} className="max-w-2xl text-lede opacity-80">
          {children}
        </Reveal>
      )}
    </div>
  );
}
