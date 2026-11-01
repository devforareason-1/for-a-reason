import type { Service, ServiceSlug } from "./types.ts";

export const services: Service[] = [
  {
    slug: "brand-identity",
    name: "Brand Identity",
    summary: "Brand strategy, naming, visual identities, brand systems, guidelines.",
    short: "Strategy, naming, visual identity, guidelines",
    headline: "A point of view, made visible.",
    explanation:
      "An identity is a set of decisions a business can keep making without us in the room. We start with what the brand believes, then build the name, the marks, and the system that let it say so consistently.",
    deliverables: ["Brand strategy", "Naming", "Logo and visual identity", "Brand systems", "Guidelines"],
    scenarios: [
      "You are launching and want to start with a real foundation.",
      "The business has outgrown the identity it started with.",
      "Your team needs a system it can apply without guessing.",
    ],
  },
  {
    slug: "digital-experiences",
    name: "Digital Experiences",
    summary: "Web design, web development, e-commerce, UI/UX, interactive experiences.",
    short: "Websites, products, e-commerce, UI/UX",
    headline: "Designed and engineered by the same people.",
    explanation:
      "Most sites lose something between the design file and the browser. We come from engineering, so craft and code get decided together: what it feels like, how fast it loads, and how it holds up after launch.",
    deliverables: ["Web design", "Web development", "E-commerce", "UI/UX", "Interactive experiences"],
    scenarios: [
      "Your website no longer reflects the quality of your business.",
      "You need something a template cannot do.",
      "You sell online and the experience is costing you customers.",
    ],
  },
  {
    slug: "social-content",
    name: "Social & Content",
    summary: "Social media strategy, content design, campaigns, creative direction, ongoing management.",
    short: "Strategy, content, design, management",
    headline: "Show up with something to say.",
    explanation:
      "Consistency without a point of view is just noise on a schedule. We set the direction first, then design content and campaigns that sound like the brand and could not belong to anyone else.",
    deliverables: ["Social media strategy", "Content design", "Campaigns", "Creative direction", "Ongoing management"],
    scenarios: [
      "You post regularly and it still does not feel like you.",
      "You have a launch and need a campaign behind it.",
      "Your team has ideas but no system to carry them.",
    ],
  },
  {
    slug: "growth-marketing",
    name: "Growth & Marketing",
    summary: "SEO, digital strategy, performance campaigns, conversion optimization.",
    short: "SEO, performance marketing, campaigns",
    headline: "Attention is earned, then measured.",
    explanation:
      "Growth work is only as honest as what it measures. We connect search, campaigns, and conversion to the numbers that matter to your business, and we tell you plainly what is and is not working.",
    deliverables: ["SEO", "Digital strategy", "Performance campaigns", "Conversion optimization"],
    scenarios: [
      "The site looks right, but too few of the right people find it.",
      "You are spending on campaigns without a clear picture of the return.",
      "Visitors arrive and leave without taking the next step.",
    ],
  },
];

export const serviceName = (slug: ServiceSlug) => services.find((service) => service.slug === slug)?.name ?? slug;
