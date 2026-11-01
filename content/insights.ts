import type { InsightDraft } from "./types.ts";

// Working titles, not published articles. They render with an "In draft" label and
// no link. Replace with real entries and add a route when the writing exists.
export const insightCategories = ["Brand", "Design", "Tech", "Growth"] as const;

export const insightDrafts: InsightDraft[] = [
  {
    category: "Brand",
    title: "A brand is a list of things you refuse to do",
    premise: "Why the most useful page in any strategy is the one about what you will not be.",
    image: "/images/studio/architecture-b.jpg",
  },
  {
    category: "Design",
    title: "Whitespace is a budget decision",
    premise: "What restraint actually costs, and why it reads as confidence.",
    image: "/images/work/groundwork-detail-a.jpg",
  },
  {
    category: "Tech",
    title: "Performance is part of the brand",
    premise: "A slow page says something about you before the headline does.",
    image: "/images/work/the-full-stop-cover.jpg",
  },
  {
    category: "Tech",
    title: "When an animation has to earn its place",
    premise: "A working test for motion: if it explains nothing, it goes.",
    image: "/images/work/monsoon-archive-detail-a.jpg",
  },
  {
    category: "Growth",
    title: "Before you buy more traffic",
    premise: "The questions to answer about the visitors you already have.",
    image: "/images/work/kiln-house-cover.jpg",
  },
];
