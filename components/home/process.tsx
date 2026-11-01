"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { processSteps } from "@/content/process";

// A sticky headline with the five steps scrolling past it. An orange line fills as you
// read, which is all the "infographic" this needs. No pinning, no hijacked scroll.
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-section" aria-labelledby="process-title">
      <Container className="scroll-fade grid gap-x-8 gap-y-16 md:grid-cols-12">
        <div className="md:sticky md:top-28 md:col-span-6 md:self-start">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="process-title" className="mt-8 text-display font-bold">
            Nothing by accident<span className="text-ember">.</span>
          </h2>
        </div>

        <ol ref={ref} className="relative md:col-span-5 md:col-start-8">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-ivory/20" />
          <m.span
            aria-hidden="true"
            data-scroll-driven
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-ember"
          />
          {processSteps.map((step) => (
            <li key={step.number} className="relative pb-16 pl-10 last:pb-0 md:pb-28 md:pl-14">
              <span aria-hidden="true" className="absolute top-2.5 left-0 size-[11px] rounded-full bg-ember" />
              <p className="text-sm tabular-nums opacity-60">{step.number}</p>
              <h3 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-none font-bold tracking-[-0.032em]">{step.name}</h3>
              <p className="mt-4 max-w-prose text-lede opacity-75">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
