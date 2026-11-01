import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/about-preview";
import { Hero } from "@/components/home/hero";
import { InsightsPreview } from "@/components/home/insights-preview";
import { Process } from "@/components/home/process";
import { SelectedWork } from "@/components/home/selected-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { Statement } from "@/components/home/statement";
import { ClosingCta } from "@/components/sections/closing-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.positioning}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: `${site.name} | ${site.positioning}`, description: site.description },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <SelectedWork />
      <ServicesPreview />
      <Process />
      <AboutPreview />
      <InsightsPreview />
      <ClosingCta />
    </>
  );
}
