import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/primitives";

export function Statement() {
  return (
    <section className="band band-ivory overflow-x-clip py-section" aria-labelledby="statement-title">
      <Container className="scroll-fade">
        <Reveal>
          <h2 id="statement-title" className="font-display text-[clamp(3rem,7.4vw,8.5rem)] leading-[0.98] font-bold tracking-[-0.028em]">
            <Parallax axis="x" distance={1.5}>Good work</Parallax>
            <Parallax axis="x" distance={-1.5}>
              isn&rsquo;t an <span className="text-ember">accident.</span>
            </Parallax>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 max-w-2xl md:mt-10">
          <p className="text-lede">
            Every identity, every interaction, every line of code — built with purpose. We bring creative thinking and technical precision together to make brands matter.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
