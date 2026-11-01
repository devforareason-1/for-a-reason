import type { Project, ProjectKind } from "./types.ts";

// All entries below are editable samples. The brands are fictional, nothing here
// describes commissioned work, and none of them carries results. To add real work:
// set kind: "client", sample: false, and only fill `outcomes` with verified results.
const img = (name: string, alt: string) => ({ src: `/images/work/${name}.jpg`, alt });

const allProjects: Project[] = [
  {
    slug: "monsoon-archive",
    name: "Monsoon Archive",
    kind: "concept",
    sample: true,
    published: true,
    featured: true,
    industry: "Culture & Heritage",
    services: ["digital-experiences", "brand-identity"],
    summary:
      "What would a public archive of a season feel like? A concept for a slow, navigable home for a century of rain.",
    cover: img("monsoon-archive-cover", "Fine lines of rain falling through a low band of orange light."),
    challenge: {
      heading: "An archive that nobody browses is a storage unit.",
      body: [
        "Cultural archives tend to be built for people who already know what they are looking for. This concept starts from the opposite visitor: someone curious, with ten minutes and no search term.",
        "The brief we set ourselves was to make wandering the primary interaction, without losing the rigour a real collection needs.",
      ],
    },
    approach: {
      heading: "Organise by feeling first, catalogue second.",
      body: [
        "Rather than a search box, the entry point is the season itself. Records are grouped by the moment they capture: the first rain, the flood, the clearing.",
        "Catalogue data stays one step away for anyone who wants it, so researchers lose nothing.",
      ],
      image: img("monsoon-archive-detail-a", "A band of orange light high on the left, seen through rain."),
    },
    process: {
      heading: "One line, drawn thousands of times.",
      body: [
        "The identity grew from a single hairline, the smallest unit of rain. Repeated, it becomes texture, navigation, and timeline.",
        "We prototyped the navigation in the browser early, because the feel of the wander could not be judged from a static frame.",
      ],
    },
    execution: {
      heading: "Quiet, and then all at once.",
      body: [
        "The result is a dark, unhurried interface in which light is reserved for the record you are looking at. It remains a concept: designed to test an idea, not delivered for a client.",
      ],
      image: img("monsoon-archive-detail-b", "Rain over a glowing horizon, with a dark foreground."),
    },
  },
  {
    slug: "kiln-house",
    name: "Kiln House",
    kind: "concept",
    sample: true,
    published: true,
    industry: "Craft & Retail",
    services: ["brand-identity", "digital-experiences", "social-content"],
    summary:
      "A concept identity and shop for a studio pottery, built around the one thing a photograph cannot show: heat.",
    cover: img("kiln-house-cover", "Nested brick arches lit from within by an orange fire."),
    challenge: {
      heading: "Handmade work, flattened by a product grid.",
      body: [
        "Small craft brands are often sold through interfaces designed for commodities. Every bowl becomes a thumbnail, and the reason it costs what it costs disappears.",
      ],
    },
    approach: {
      heading: "Sell the firing, not the catalogue.",
      body: [
        "Each batch comes out of the kiln once, so the concept treats every drop as a small event with a story, a date, and a limit, instead of an endless inventory.",
      ],
      image: img("kiln-house-detail-a", "Arches receding into the dark, lit from the left."),
    },
    process: {
      heading: "A mark shaped by the kiln's door.",
      body: [
        "The arch became the system's core shape: logo, image crop, and packaging die-line all come from the same geometry, so the brand holds together at any size.",
      ],
    },
    execution: {
      heading: "Warm, slow, and specific.",
      body: [
        "A shop that reads more like a studio journal, with content templates that let a small team keep it alive between firings. This is a concept project and has not been commissioned or launched.",
      ],
      image: img("kiln-house-detail-b", "A vast arch glowing from below, seen from close up."),
    },
  },
  {
    slug: "groundwork",
    name: "Groundwork",
    kind: "concept",
    sample: true,
    published: true,
    industry: "Architecture & Construction",
    services: ["digital-experiences", "growth-marketing"],
    summary:
      "A concept for an engineering-led building firm whose best work is everything you never see once a project is finished.",
    cover: img("groundwork-cover", "A concrete colonnade with orange light falling between the columns."),
    challenge: {
      heading: "The most important work ends up underground.",
      body: [
        "Technical firms often have strong reputations offline and almost no presence online. Their buyers search carefully, compare slowly, and distrust anything that looks like advertising.",
      ],
    },
    approach: {
      heading: "Be the most useful result in the search.",
      body: [
        "The concept pairs a clear site structure with plain, specific technical content, so the firm's expertise is what earns attention instead of slogans.",
      ],
      image: img("groundwork-detail-a", "Wide concrete columns with low orange light on the left."),
    },
    process: {
      heading: "Structure before surface.",
      body: [
        "We mapped what buyers need to answer at each stage before designing a single page, and let that decide the architecture of the site.",
      ],
    },
    execution: {
      heading: "A site with the temperament of the firm.",
      body: [
        "Measured, legible, and direct: heavy type, exposed structure, and a clear route to a conversation. A concept, shown here as a sample of how we would approach the problem.",
      ],
      image: img("groundwork-detail-b", "Many narrow columns with light gathering at the centre."),
    },
  },
  {
    slug: "the-full-stop",
    name: "The Full Stop",
    kind: "internal",
    sample: true,
    published: true,
    industry: "Creative Studio",
    services: ["digital-experiences", "brand-identity"],
    summary:
      "Our own website, built around the smallest element of our identity: the orange period at the end of our name.",
    cover: img("the-full-stop-cover", "A thin arc of orange light curving across a black frame."),
    challenge: {
      heading: "A new studio has no back catalogue to hide behind.",
      body: [
        "A studio's own site is the one project where nobody else can be blamed. Without years of work to show, the site itself has to demonstrate the thinking.",
      ],
    },
    approach: {
      heading: "Take one small idea very seriously.",
      body: [
        "A full stop is a decision: the sentence is finished, and this is what we meant. So the period from our name became the single organising idea of the site.",
      ],
      image: img("the-full-stop-detail-a", "An arc of orange light rising from the lower left of a dark frame."),
    },
    process: {
      heading: "One device, used with restraint.",
      body: [
        "The period marks sections and interactions along the way, then fills the screen in the closing call to action. An arc of light, the rim of that same dot at enormous scale, carries the atmosphere around it.",
      ],
    },
    execution: {
      heading: "You are looking at it.",
      body: [
        "Built with Next.js, with motion that carries meaning and content that stands without it, for visitors who prefer reduced motion and for those on slower connections.",
      ],
      image: img("the-full-stop-detail-b", "A wide arc of orange light across the bottom of a dark frame."),
    },
  },
  {
    // Awaiting confirmed content and permission. Not rendered, routed, or listed until
    // `published` is true and the sections below hold approved copy.
    slug: "sahyadri-steel-studio",
    name: "Sahyadri Steel Studio — Digital Experience",
    kind: "client",
    sample: false,
    published: false,
    industry: "To be confirmed",
    services: ["digital-experiences"],
    summary: "To be confirmed.",
    cover: img("groundwork-cover", "To be replaced with approved project imagery."),
    challenge: { heading: "To be confirmed.", body: [] },
    approach: { heading: "To be confirmed.", body: [] },
    process: { heading: "To be confirmed.", body: [] },
    execution: { heading: "To be confirmed.", body: [] },
  },
];

export const projects = allProjects.filter((project) => project.published);

export const featuredProjects = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export function nextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const kindLabel: Record<ProjectKind, string> = {
  client: "Client project",
  concept: "Concept project",
  internal: "Internal project",
};

