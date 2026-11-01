import { Reveal } from "@/components/motion/reveal";
import { Container, TextLink } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="py-section" aria-label="Selected work">
      <Container className="scroll-fade">
        <SectionHeading title="Proof, not promises.">
          <p>A selection of ideas brought to life.</p>
        </SectionHeading>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {lead && (
            <Reveal className="md:col-span-3">
              <ProjectCard project={lead} sizes="(min-width: 1760px) 1664px, 100vw" aspect="aspect-[4/3] md:aspect-[21/9]" showSummary />
            </Reveal>
          )}
          {rest.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} sizes="(min-width: 768px) 33vw, 100vw" showSummary />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-end">
          <TextLink href="/work">All work</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
