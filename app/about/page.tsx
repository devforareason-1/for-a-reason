import { ArrowUpRight, Target, Users } from "lucide-react";
import Image from "next/image";
import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { founders, promise, purpose, strengths, values } from "@/content/studio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "For a Reason is a new studio from a team of technology professionals, combining engineering experience, creative curiosity, and strategic thinking.",
  path: "/about",
});

const valueIcons = { target: Target, users: Users, arrow: ArrowUpRight };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        image="/images/studio/architecture-b.jpg"
        title={
          <>
            Not another agency.
            <br />
            Another way of <span className="text-ember">thinking.</span>
          </>
        }
        footer={
          <ul className="flex flex-wrap gap-x-12 gap-y-4">
            {strengths.map((strength) => (
              <li key={strength} className="flex max-w-36 gap-3 font-display font-bold">
                <span aria-hidden="true" className="text-ember">/</span>
                {strength}
              </li>
            ))}
          </ul>
        }
      >
        <p>We&rsquo;re a team of technology professionals who believe design and engineering should work together to build brands, experiences and digital products that create real impact.</p>
      </PageHero>

      <section className="py-section" aria-labelledby="origin-title">
        <Container className="scroll-fade grid gap-x-8 gap-y-12 md:grid-cols-12">
          <Reveal className="md:col-span-12">
            <Eyebrow dot={false} className="opacity-80">Where we come from</Eyebrow>
            <h2 id="origin-title" className="mt-5 max-w-4xl text-display font-bold">
              A new studio, with years behind it.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-5 text-lede md:col-span-6">
            <p>Each of us has around five years of experience in the industry. The studio itself is new, and we&rsquo;d rather say so plainly than dress it up.</p>
            <p>What brought us together is a simple belief: great work doesn&rsquo;t happen by accident. It happens when the people thinking about a brand and the people engineering it are in the same conversation from the start.</p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col gap-8 md:col-span-5 md:col-start-8">
            <div>
              <h3 className="text-label font-medium uppercase opacity-70">Our purpose</h3>
              <p className="mt-3 font-display text-xl font-bold tracking-[-0.02em]">{purpose}</p>
            </div>
            <div>
              <h3 className="text-label font-medium uppercase opacity-70">Our promise</h3>
              <p className="mt-3 font-display text-xl font-bold tracking-[-0.02em]">{promise}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div aria-hidden="true" className="soft-edges relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/6]">
        <ParallaxImage src="/images/studio/architecture-c.jpg" alt="" sizes="100vw" />
      </div>

      {founders.length > 0 && (
        <section className="py-section" aria-labelledby="founders-title">
          <Container>
            <Reveal>
              <h2 id="founders-title" className="text-display font-bold">The people.</h2>
            </Reveal>
            <ul className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3">
              {founders.map((founder) => (
                <li key={founder.name}>
                  <Reveal>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-graphite">
                      <Image src={founder.portrait} alt={`Portrait of ${founder.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold">{founder.name}</h3>
                    <p className="mt-1 text-sm opacity-70">{founder.role}</p>
                    <p className="mt-3 leading-relaxed opacity-85">{founder.bio}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="band band-ivory py-section" aria-labelledby="values-title">
        <Container className="scroll-fade">
          <Reveal>
            <h2 id="values-title" className="text-display font-bold">Our values.</h2>
          </Reveal>
          <ul className="mt-10 flex flex-col gap-8 md:mt-14">
            {values.map((value, index) => {
              const Icon = valueIcons[value.icon];
              return (
                <li key={value.name}>
                  <Reveal delay={index * 0.05} className="flex items-start gap-5">
                    <Icon aria-hidden="true" strokeWidth={1.25} className="size-8 shrink-0 text-ember" />
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">{value.name}</h3>
                      <p className="mt-1 opacity-75">{value.detail}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
