export type ProjectKind = "client" | "concept" | "internal";

export type ServiceSlug = "brand-identity" | "digital-experiences" | "social-content" | "growth-marketing";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  image?: ProjectImage;
}

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** Editable sample copy, labelled as such wherever it appears and kept out of search. */
  sample: boolean;
  /** Unpublished entries never render, route or appear in the sitemap. */
  published: boolean;
  featured?: boolean;
  industry: string;
  services: ServiceSlug[];
  year?: string;
  summary: string;
  cover: ProjectImage;
  challenge: CaseStudySection;
  approach: CaseStudySection;
  process: CaseStudySection;
  execution: CaseStudySection;
  /** Only ever populated with results the client has verified. Omitted otherwise. */
  outcomes?: string[];
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  summary: string;
  /** The brand board's one-liner, for compact placements. */
  short: string;
  headline: string;
  explanation: string;
  deliverables: string[];
  scenarios: string[];
}

export interface ProcessStep {
  number: string;
  name: string;
  description: string;
}

export interface InsightDraft {
  category: string;
  title: string;
  premise: string;
  /** Path under /public. */
  image: string;
}
