import Link from "next/link";
import { ParallaxImage } from "@/components/motion/parallax";
import { Tag } from "@/components/ui/primitives";
import { kindLabel } from "@/content/projects";
import { serviceName } from "@/content/services";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  sizes: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  showSummary?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProjectLabels({ project }: { project: Project }) {
  return (
    <>
      <Tag>{kindLabel[project.kind]}</Tag>
      {project.sample && <Tag tone="ember">Sample entry</Tag>}
    </>
  );
}

export function ProjectCard({ project, sizes, aspect = "aspect-[4/3]", className, priority, showSummary, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-lg border border-ivory/15 bg-graphite/50 transition-colors duration-(--duration-base) hover:border-ember/70", className)}>
      <div className={cn("relative overflow-hidden", aspect)}>
        <ParallaxImage
          src={project.cover.src}
          alt={project.cover.alt}
          sizes={sizes}
          priority={priority}
          imageClassName="transition-transform duration-[1200ms] ease-studio group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 items-start justify-between gap-4 p-5 md:p-6">
        <div>
          <Heading className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
              {project.name}
            </Link>
          </Heading>
          <p className="mt-1 text-sm opacity-75">
            {project.industry} · {project.services.map(serviceName).join(", ")}
          </p>
          {showSummary && <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-75">{project.summary}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <ProjectLabels project={project} />
          </div>
        </div>
        <span aria-hidden="true" className="text-xl text-ember transition-transform duration-(--duration-base) ease-studio group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </div>
    </article>
  );
}
