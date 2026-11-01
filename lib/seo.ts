import type { Metadata } from "next";
import { site, socialLinks } from "@/lib/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export function pageMetadata({ title, description, path, image, noindex }: PageMetaInput): Metadata {
  const images = image ? [{ url: image, width: 1920, height: 1200, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: path, siteName: site.name, type: "website", images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

// Only facts we can stand behind: no address, ratings, founding date or reviews.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.tagline,
    description: site.description,
    logo: `${site.url}/brand/FAR_Brand_Logos/png/wordmark_dark.png`,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(socialLinks.length ? { sameAs: socialLinks.map((link) => link.href) } : {}),
  };
}
