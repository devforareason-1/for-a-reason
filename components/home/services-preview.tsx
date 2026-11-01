import { ServiceCards } from "@/components/sections/service-cards";
import { Container } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesPreview() {
  return (
    <section className="py-section" aria-label="Services">
      <Container className="scroll-fade">
        <SectionHeading
          eyebrow="Our services"
          title={
            <>
              Different disciplines.
              <br />
              <span className="text-ember">One direction.</span>
            </>
          }
        />
        <div className="mt-12 md:mt-16">
          <ServiceCards />
        </div>
      </Container>
    </section>
  );
}
