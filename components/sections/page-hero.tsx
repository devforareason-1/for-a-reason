import type { ReactNode } from "react";
import { ParallaxImage } from "@/components/motion/parallax";
import { ArcLight } from "@/components/sections/arc-light";
import { Eyebrow } from "@/components/ui/primitives";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** A picture on the right of the hero. Without one, the arc of light is used if `arc`. */
  image?: string;
  arc?: boolean;
  footer?: ReactNode;
}

export function PageHero({ eyebrow, title, children, image, arc, footer }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-x-clip pt-32 pb-16 md:pt-44 md:pb-24">
      {image && (
        <div aria-hidden="true" className="fade-left absolute top-0 right-0 bottom-0 -z-10 w-full overflow-hidden opacity-40 md:w-[56%] md:opacity-100">
          <ParallaxImage src={image} alt="" sizes="(min-width: 768px) 56vw, 100vw" priority />
        </div>
      )}
      {arc && <ArcLight className="arc-page" />}
      <div className="scroll-fade-out mx-auto w-full max-w-site px-gutter">
        <Eyebrow dot={false} className="animate-fade-rise opacity-80">{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl animate-fade-rise font-display text-[clamp(2.75rem,6vw,6.5rem)] leading-[1] font-bold tracking-[-0.028em] [animation-delay:80ms] md:mt-8">{title}</h1>
        {children && <div className="mt-6 max-w-xl animate-fade-rise text-lede opacity-90 [animation-delay:200ms] md:mt-8">{children}</div>}
        {footer && <div className="mt-12 animate-fade-rise [animation-delay:300ms] md:mt-16">{footer}</div>}
      </div>
    </section>
  );
}
