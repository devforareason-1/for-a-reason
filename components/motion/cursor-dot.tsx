"use client";

import { useEffect, useRef } from "react";

// A small full stop trailing the pointer, growing over anything clickable. It sits on
// top of the native cursor rather than replacing it. Fine pointers only, never with
// reduced motion, and nothing is rendered visibly until the pointer first moves.
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    const supported = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!dot || !supported.matches) return;

    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;
    let scale = 1;
    let currentScale = 1;
    let frame = 0;
    let visible = false;

    const tick = () => {
      currentX += (x - currentX) * 0.22;
      currentY += (y - currentY) * 0.22;
      currentScale += (scale - currentScale) * 0.16;
      dot.style.transform = `translate3d(${currentX - 5}px, ${currentY - 5}px, 0) scale(${currentScale})`;
      const settled = Math.abs(x - currentX) < 0.1 && Math.abs(y - currentY) < 0.1 && Math.abs(scale - currentScale) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        currentX = x;
        currentY = y;
        dot.style.opacity = "1";
      }
      const target = event.target instanceof Element ? event.target : null;
      scale = target?.closest("a, button, label, [role='button']") ? 3.2 : 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-70 size-2.5 rounded-full bg-ember opacity-0 mix-blend-difference transition-opacity duration-(--duration-fast)"
    />
  );
}
