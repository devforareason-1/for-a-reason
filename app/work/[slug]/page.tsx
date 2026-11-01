import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { CaseSection } from "@/components/work/case-section";
import { ProjectLabels } from "@/components/work/project-card";
import { getProject, nextProject, projects } from "@/content/projects";
import { serviceName } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.cover.src,
    noindex: project.sample,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = nextProject(project.slug);

  return (
    <article>
      {!project.sample && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.name,
              description: project.summary,
              url: `${site.url}/work/${project.slug}`,
              image: `${site.url}${project.cover.src}`,
              creator: { "@type": "Organization", name: site.name, url: site.url },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <header className="pt-32 pb-10 md:pt-44 md:pb-14">
        <Container>
          <Eyebrow dot={false} className="opacity-80">Case study</Eyebrow>
          <h1 className="mt-6 animate-fade-rise font-display text-[clamp(2.75rem,6vw,6.5rem)] leading-[1] font-bold tracking-[-0.028em]">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-lede opacity-90">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ProjectLabels project={project} />
          </div>
          {project.sample && (
            <p className="mt-8 max-w-3xl border-l-2 border-ember pl-4 text-sm leading-relaxed">
              <strong className="font-semibold">This is a sample entry.</strong> It shows how a case study is presented on this site. It does not describe commissioned client work, and any brand named here is fictional unless stated otherwise. No results are claimed.
            </p>
          )}
        </Container>
      </header>

      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
        <ParallaxImage src={project.cover.src} alt={project.cover.alt} priority sizes="100vw" />
      </div>

      <Container>
        <ul aria-label="Services delivered" className="flex flex-wrap gap-x-8 gap-y-2 py-6 text-sm font-medium">
          {project.services.map((service) => (
            <li key={service}>{serviceName(service)}</li>
          ))}
          <li className="opacity-60">{project.industry}</li>
          {project.year && <li className="opacity-60">{project.year}</li>}
        </ul>
      </Container>

      <CaseSection label="The challenge" section={project.challenge} surface="ivory" />
      <CaseSection label="Strategy & approach" section={project.approach} />
      <CaseSection label="Design process" section={project.process} surface="ivory" />
      <CaseSection label="Final execution" section={project.execution} />

      {project.outcomes && project.outcomes.length > 0 && (
        <section className="py-section">
          <Container className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <Eyebrow>Verified outcomes</Eyebrow>
            </Reveal>
            <ul className="flex flex-col gap-4 font-display text-heading font-bold md:col-span-9">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {next && (
        <nav aria-label="Next project" className="group relative isolate">
          <div className="soft-edges absolute inset-0 -z-10 overflow-hidden opacity-40 transition-opacity duration-[1200ms] ease-studio group-hover:opacity-70">
            <Image src={next.cover.src} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <Container className="py-40 md:py-56">
            <p className="text-label font-medium uppercase">Next project</p>
            <Link href={`/work/${next.slug}`} className="mt-5 block font-display text-[clamp(2.75rem,6vw,6.5rem)] leading-[1] font-bold tracking-[-0.028em] after:absolute after:inset-0">
              {next.name} <span aria-hidden="true" className="text-ember">↗</span>
            </Link>
          </Container>
        </nav>
      )}

      <ClosingCta />
    </article>
  );
}
