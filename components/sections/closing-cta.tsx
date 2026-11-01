"use client";

import { m, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { ArrowGlyph, Button } from "@/components/ui/button";

interface ClosingCtaProps {
  headline?: [string, string];
  body?: string;
  cta?: string;
  href?: string;
}

const defaults = {
  headline: ["Have something in mind?", "Let’s make it mean something."] as [string, string],
  body: "Big idea, small beginning, or something in between. Tell us what you’re building.",
  cta: "Let’s Talk",
  href: "/contact",
};

function Copy({ headline, body, hidden }: { headline: [string, string]; body: string; hidden?: boolean }) {
  const Heading = hidden ? "p" : "h2";
  return (
    <div aria-hidden={hidden || undefined} className="mx-auto w-full max-w-site px-gutter">
      <Heading className="font-display text-[clamp(2.875rem,min(8.6vw,15svh),10rem)] leading-[0.94] font-bold tracking-[-0.038em] [text-wrap:wrap]">
        <span className="block">{headline[0]}</span>
        <span className="block">{headline[1]}</span>
      </Heading>
      <p className="mt-8 max-w-xl text-lede [text-wrap:wrap] md:mt-10">{body}</p>
    </div>
  );
}

// The site's closing move: the period from the logo swells until it fills the frame,
// then bleeds out into the footer. Two copies of the text sit in register, ivory on
// black and black on orange, so its soft edge recolours the words as it passes. Only
// the first is exposed to assistive tech; both must wrap identically to stay aligned.
// Growth waits until the stage has pinned, so its top edge is never seen. Under reduced
// motion or without JS it is simply a solid orange section.
export function ClosingCta({ headline = defaults.headline, body = defaults.body, cta = defaults.cta, href = defaults.href }: ClosingCtaProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const radius = useTransform(scrollYProgress, [0.5, 0.96], [-1, 180]);
  const edge = useTransform(radius, (value) => value + 14);
  const mask = useMotionTemplate`radial-gradient(circle at 86% 62%, #000 ${radius}vmax, transparent ${edge}vmax)`;

  return (
    <section ref={ref} className="relative mt-section h-[200svh]">
      <div className="sticky top-0 flex h-svh min-h-[36rem] flex-col justify-center overflow-clip">
        <div className="pb-24 md:pb-0">
          <Copy headline={headline} body={body} />
        </div>

        <m.div
          data-scroll-driven
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center bg-ember text-ink"
        >
          <div className="pb-24 md:pb-0">
            <Copy headline={headline} body={body} hidden />
          </div>
        </m.div>

        <div className="absolute inset-x-0 bottom-10 mx-auto w-full max-w-site px-gutter md:bottom-14">
          <div className="flex justify-start md:justify-end">
            <Button asChild variant="ivory" size="lg" className="before:bg-ink hover:text-ivory">
              <Link href={href}>
                {cta} <ArrowGlyph />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* The orange doesn't stop at a line: it burns down into the footer. */}
      <div aria-hidden="true" className="seam-ember pointer-events-none absolute inset-x-0 top-full z-10 h-[38svh]" />
    </section>
  );
}
