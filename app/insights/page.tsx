import { InsightList } from "@/components/insights/insight-list";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "What the studio is thinking about across brand strategy, design, web development, digital experiences, and business growth.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        image="/images/studio/architecture.jpg"
        title={
          <>
            Ideas worth
            <br />
            <span className="text-ember">sharing.</span>
          </>
        }
      >
        <p>Thoughts on branding, design, technology and business growth. We haven&rsquo;t published yet, so here&rsquo;s what we&rsquo;re working on. Titles may still change.</p>
      </PageHero>
      <section aria-label="Articles in draft" className="band band-ivory py-section">
        <Container>
          <InsightList filterable />
        </Container>
      </section>
      <ClosingCta />
    </>
  );
}
