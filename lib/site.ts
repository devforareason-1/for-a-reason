// Central site configuration. Contact channels come from the environment and are
// only rendered when set, so an unconfirmed address can never reach production.

const clean = (value: string | undefined) => value?.trim() || undefined;

export const site = {
  name: "For a Reason",
  brand: "for a reason.",
  tagline: "Make it mean something.",
  statement: "Nothing by accident.",
  positioning: "Independent Creative × Technology Studio",
  description:
    "For a Reason is a strategy-led creative and digital studio that builds brands, experiences and digital presence with intent.",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  },
} as const;

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: site.contact.linkedin },
  { label: "Instagram", href: site.contact.instagram },
].filter((link): link is { label: string; href: string } => Boolean(link.href));
