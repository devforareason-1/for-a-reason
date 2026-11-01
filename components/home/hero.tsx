import Link from "next/link";
import { ParallaxImage } from "@/components/motion/parallax";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { Eyebrow, TextLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";

// Entrance animation is pure CSS so the headline paints from server HTML, with no
// wait on hydration and no dependence on JavaScript.
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-clip pt-28 pb-16 md:pt-24 md:pb-24">
      <div aria-hidden="true" className="fade-left absolute right-0 bottom-0 -z-10 h-[46%] w-full overflow-hidden md:top-0 md:h-full md:w-[66%]">
        <ParallaxImage src="/images/studio/architecture.jpg" alt="" sizes="(min-width: 768px) 66vw, 100vw" priority />
      </div>

      <div className="scroll-fade-out mx-auto flex w-full max-w-site flex-1 flex-col justify-start px-gutter md:justify-center">
        <div className="max-w-3xl">
          <Eyebrow dot={false} className="animate-fade-rise opacity-80 [animation-delay:100ms]">
            {site.positioning}
          </Eyebrow>

          <h1 className="mt-6 font-display text-[clamp(3rem,6.7vw,7.75rem)] leading-[0.98] font-bold tracking-[-0.028em] md:mt-8">
            <span className="block overflow-clip pb-[0.04em]">
              <span className="block animate-line-rise [animation-delay:120ms]">Brands built</span>
            </span>
            <span className="block overflow-clip pb-[0.04em]">
              <span className="block animate-line-rise [animation-delay:200ms]">
                with <span className="text-ember">intention.</span>
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-rise text-lede opacity-90 [animation-delay:700ms] md:mt-8">
            We combine strategy, design, and technology to build brands and digital experiences that move businesses forward.
          </p>

          <div className="mt-8 flex animate-fade-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:850ms] md:mt-10">
            <Button asChild>
              <Link href="/contact">
                Start a Project <ArrowGlyph />
              </Link>
            </Button>
            <TextLink href="/work" className="text-sm">
              Explore Our Work
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
