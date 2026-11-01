import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";
import type { CaseStudySection as CaseStudySectionData } from "@/content/types";
import { cn } from "@/lib/utils";

interface CaseSectionProps {
  label: string;
  section: CaseStudySectionData;
  surface?: "ink" | "ivory" | "graphite";
  imageSide?: "left" | "right";
}

const surfaces = {
  ink: "",
  ivory: "band band-ivory",
  graphite: "band band-graphite",
};

export function CaseSection({ label, section, surface = "ink", imageSide = "right" }: CaseSectionProps) {
  return (
    <section className={cn("py-section", surfaces[surface])}>
      <Container className="scroll-fade grid gap-x-8 gap-y-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <Eyebrow>{label}</Eyebrow>
        </Reveal>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-[clamp(2.25rem,4.6vw,5rem)] leading-none font-bold tracking-[-0.032em]">{section.heading}</h2>
        </Reveal>
        <Reveal delay={0.08} className={cn("flex flex-col gap-5 text-lede opacity-85 md:col-span-6", section.image && imageSide === "left" ? "md:order-last md:col-start-7 md:col-end-13" : "md:col-start-4")}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        {section.image && (
          <Reveal className="relative aspect-[3/2] overflow-hidden rounded-lg md:col-span-12">
            <ParallaxImage src={section.image.src} alt={section.image.alt} sizes="(min-width: 1760px) 1664px, 100vw" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
