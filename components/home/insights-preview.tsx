import { InsightList } from "@/components/insights/insight-list";
import { Reveal } from "@/components/motion/reveal";
import { Container, TextLink } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";

export function InsightsPreview() {
  return (
    <section className="py-section" aria-label="Insights">
      <Container className="scroll-fade">
        <SectionHeading eyebrow="Insights" title={<>Ideas worth <span className="text-ember">sharing.</span></>}>
          <p>What we&rsquo;re writing at the moment. Nothing here is published yet, and the titles may change before it is.</p>
        </SectionHeading>
        <div className="mt-12 md:mt-16">
          <InsightList limit={3} />
        </div>
        <Reveal className="mt-10 flex justify-end">
          <TextLink href="/insights">All topics</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
