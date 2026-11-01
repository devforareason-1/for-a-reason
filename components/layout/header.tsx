"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Step out of the way when reading down; come back on any scroll up.
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-(--duration-base) ease-studio focus-within:translate-y-0",
        hidden && "-translate-y-[170%]",
      )}
    >
      {/* Dark behind the nav, then dissolving: the page never meets a hard bar. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[170%] bg-ink/92 backdrop-blur-md transition-opacity duration-(--duration-base) mask-[linear-gradient(to_bottom,#000_58%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <Container className="relative flex h-18 items-center justify-between md:h-20">
        <Link href="/" aria-label="for a reason. Home" className="group -m-2 p-2">
          <Wordmark className="w-32 lg:w-40" title="for a reason." />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative flex items-center gap-1.5 py-2 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 rounded-full bg-ember transition-[transform,opacity] duration-(--duration-base) ease-studio",
                        active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                      )}
                    />
                    <span
                      className={cn(
                        "-ml-3 transition-[margin,opacity] duration-(--duration-base) ease-studio group-hover:ml-0 group-hover:opacity-100",
                        active ? "ml-0 opacity-100" : "opacity-75",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button asChild variant="ivory" size="sm">
            <Link href="/contact">
              Start a Project <ArrowGlyph />
            </Link>
          </Button>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
