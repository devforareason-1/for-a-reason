"use client";

import { useState } from "react";
import { FilterPill } from "@/components/ui/filter-pill";
import { ProjectCard } from "@/components/work/project-card";
import { projects } from "@/content/projects";
import type { ServiceSlug } from "@/content/types";

const filters: { label: string; service: ServiceSlug }[] = [
  { label: "Branding", service: "brand-identity" },
  { label: "Web", service: "digital-experiences" },
  { label: "Social", service: "social-content" },
  { label: "Campaigns", service: "growth-marketing" },
];

export function ProjectFilters() {
  const [service, setService] = useState<ServiceSlug | null>(null);
  const visible = projects.filter((project) => !service || project.services.includes(service));
  const offered = filters.filter((filter) => projects.some((project) => project.services.includes(filter.service)));

  return (
    <>
      <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
        <FilterPill active={!service} onClick={() => setService(null)}>All</FilterPill>
        {offered.map((filter) => (
          <FilterPill key={filter.service} active={service === filter.service} onClick={() => setService(filter.service)}>
            {filter.label}
          </FilterPill>
        ))}
      </div>
      <p role="status" className="mt-4 text-sm opacity-70">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((project, index) => (
          <div key={project.slug} className="animate-page-in">
            <ProjectCard project={project} sizes="(min-width: 768px) 50vw, 100vw" priority={index === 0} headingLevel="h2" />
          </div>
        ))}
      </div>
    </>
  );
}
