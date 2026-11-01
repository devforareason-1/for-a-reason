import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/about", "/insights", "/contact"];
  // Sample case studies are noindexed, so they stay out of the sitemap too.
  const caseStudies = projects.filter((project) => !project.sample).map((project) => `/work/${project.slug}`);
  return [...pages, ...caseStudies].map((path) => ({ url: `${site.url}${path}` }));
}
