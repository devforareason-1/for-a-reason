import { Glow, Parallax, ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow, TextLink } from "@/components/ui/primitives";

export function AboutPreview() {
  return (
    <section className="relative isolate overflow-x-clip py-section" aria-labelledby="about-title">
      <Glow className="top-[30%] -left-[18vw] size-[60vw]" tone="amber" distance={20} />
      <Container className="scroll-fade grid gap-x-8 gap-y-14 md:grid-cols-12">
        <Reveal className="md:col-span-12">
          <Eyebrow dot={false} className="opacity-80">About us</Eyebrow>
        </Reveal>
        <Reveal className="md:col-span-12">
          <h2 id="about-title" className="text-display font-bold">
            <Parallax axis="x" distance={1.5}>Creative minds.</Parallax>
            <Parallax axis="x" distance={-1.5} className="text-ember">Technical instincts.</Parallax>
          </h2>
        </Reveal>
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite md:col-span-6 md:aspect-[3/2]">
          <ParallaxImage src="/images/studio/architecture-b.jpg" alt="A concrete building with glass walls lit orange from within." sizes="(min-width: 768px) 50vw, 100vw" />
        </Reveal>
        <Reveal delay={0.1} className="self-end md:col-span-5 md:col-start-8">
          <p className="text-lede">
            For a Reason is built by a team of experienced technology professionals who believe design and engineering should work together. To us they were never separate conversations.
          </p>
          <p className="mt-5 opacity-75">We&rsquo;re a new studio and we won&rsquo;t pretend otherwise. What we bring is years inside the industry, and a team where the people shaping the idea are also the ones building it.</p>
          <TextLink href="/about" className="mt-8">
            More about the studio
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
