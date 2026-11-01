import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { ProjectFilters } from "@/components/work/project-filters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description: "Ideas brought to life across brand, digital, content, and growth. Concept and internal projects are clearly labelled as such.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        arc
        title={
          <>
            Ideas brought
            <br />
            to <span className="text-ember">life.</span>
          </>
        }
      />
      <section aria-label="Projects" className="pb-section">
        <Container>
          <ProjectFilters />
        </Container>
      </section>
      <ClosingCta />
    </>
  );
}
