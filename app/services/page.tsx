import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCards } from "@/components/sections/service-cards";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { Container, Eyebrow, Tag } from "@/components/ui/primitives";
import { ServiceIcon } from "@/components/ui/service-icon";
import { kindLabel, projects } from "@/content/projects";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: "Brand identity, digital experiences, social and content, and growth marketing, planned as one piece of work by one team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        arc
        title={
          <>
            Different disciplines.
            <br />
            <span className="text-ember">One direction.</span>
          </>
        }
      >
        <p>Strategy, design, technology and growth, working together to build stronger, more meaningful brands.</p>
      </PageHero>

      <section aria-label="Overview" className="pb-section">
        <Container>
          <ServiceCards />
        </Container>
      </section>

      {services.map((service) => {
        const examples = projects.filter((project) => project.services.includes(service.slug));
        return (
          <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-title`} className="py-section">
            <Container className="scroll-fade grid gap-x-8 gap-y-12 md:grid-cols-12">
              <Reveal className="md:col-span-12">
                <ServiceIcon slug={service.slug} className="mb-5 size-8 text-ember" />
                <Eyebrow dot={false} className="opacity-80">{service.name}</Eyebrow>
                <h2 id={`${service.slug}-title`} className="mt-5 max-w-4xl text-display font-bold">
                  {service.headline}
                </h2>
              </Reveal>

              <Reveal delay={0.08} className="md:col-span-5">
                <p className="text-lede">{service.explanation}</p>
                <Button asChild className="mt-8">
                  <Link href="/contact">
                    Discuss a project <ArrowGlyph />
                  </Link>
                </Button>
              </Reveal>

              <Reveal delay={0.12} className="grid gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
                <div>
                  <h3 className="mb-4 text-label font-medium uppercase opacity-70">What you get</h3>
                  <ul className="flex flex-col gap-2 border-t border-current/20 pt-4">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-label font-medium uppercase opacity-70">When it fits</h3>
                  <ul className="flex flex-col gap-3 border-t border-current/20 pt-4 text-sm leading-relaxed">
                    {service.scenarios.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {examples.length > 0 && (
                <Reveal className="border-t border-current/20 pt-6 md:col-span-12">
                  <h3 className="mb-4 text-label font-medium uppercase opacity-70">Related examples</h3>
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {examples.map((project) => (
                      <li key={project.slug} className="flex flex-wrap items-center gap-2.5">
                        <Link href={`/work/${project.slug}`} className="font-display text-xl font-bold underline-offset-4 hover:underline">
                          {project.name}
                        </Link>
                        <Tag>{project.sample ? `${kindLabel[project.kind]}, sample` : kindLabel[project.kind]}</Tag>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </Container>
          </section>
        );
      })}

      <ClosingCta />
    </>
  );
}
