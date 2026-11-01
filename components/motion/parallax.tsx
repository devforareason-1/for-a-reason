"use client";

import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children?: ReactNode;
  className?: string;
  /** Travel either side of centre, in vh (axis y) or vw (axis x). Negative reverses it. */
  distance?: number;
  axis?: "x" | "y";
}

/** Drifts an element against the scroll while it crosses the viewport, centred at rest. */
export function Parallax({ children, className, distance = 6, axis = "y" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const unit = axis === "y" ? "vh" : "vw";
  const value = useTransform(scrollYProgress, [0, 1], [`${distance}${unit}`, `${-distance}${unit}`]);

  return (
    <m.div ref={ref} data-scroll-driven className={className} style={axis === "y" ? { y: value } : { x: value }}>
      {children}
    </m.div>
  );
}

/** For things already on screen at load, like the hero: at rest at the top of the page. */
export function ScrollDrift({ children, className, x = 0, y = 0 }: { children: ReactNode; className?: string; x?: number; y?: number }) {
  const { scrollY } = useScroll();
  const driftX = useTransform(scrollY, [0, 900], [0, x]);
  const driftY = useTransform(scrollY, [0, 900], [0, y]);

  return (
    <m.span data-scroll-driven className={cn("block", className)} style={{ x: driftX, y: driftY }}>
      {children}
    </m.span>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
}

/** Fills a positioned frame, with the picture sliding inside it. Frame must clip overflow. */
export function ParallaxImage({ src, alt, sizes, priority, imageClassName }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="absolute inset-0">
      <m.div data-scroll-driven style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      </m.div>
    </div>
  );
}

/** Soft ambient light that drifts behind content, blurring where one section ends. */
export function Glow({ className, distance = 16, tone = "ember" }: { className?: string; distance?: number; tone?: "ember" | "amber" | "coral" }) {
  const colors = { ember: "rgb(255_106_0/0.2)", amber: "rgb(255_181_107/0.13)", coral: "rgb(255_77_46/0.17)" };
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute -z-10", className)}>
      <Parallax distance={distance} className="size-full">
        <div className="size-full rounded-full" style={{ background: `radial-gradient(closest-side, ${colors[tone].replaceAll("_", " ")}, transparent)` }} />
      </Parallax>
    </div>
  );
}
