"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** One-shot focus-pull on entering the viewport: rises, fades and sharpens. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: duration.slow, ease, delay }}
    >
      {children}
    </m.div>
  );
}
