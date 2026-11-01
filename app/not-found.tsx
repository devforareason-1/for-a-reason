import type { Metadata } from "next";
import Link from "next/link";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center pt-24 pb-16">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-8 font-display text-[clamp(3rem,11vw,12rem)] leading-[0.92] font-bold tracking-[-0.038em]">
          This one really was an accident<span className="text-ember">.</span>
        </h1>
        <Button asChild size="lg" className="mt-12">
          <Link href="/">
            Back to the homepage <ArrowGlyph />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
