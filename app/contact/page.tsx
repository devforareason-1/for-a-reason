import { EnquiryForm } from "@/components/contact/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { site, socialLinks } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Start a Project",
  description: "Tell For a Reason what you're building. A short enquiry form for brand, digital, content, and growth projects, in India and internationally.",
  path: "/contact",
});

export default function ContactPage() {
  const hasDirect = Boolean(site.contact.email) || socialLinks.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&rsquo;s build something worth <span className="text-ember">remembering.</span>
          </>
        }
      >
        <p>Tell us about your project and we&rsquo;ll get back to you soon.</p>
      </PageHero>

      <section aria-label="Project enquiry" className="pb-section">
        <Container>
          <div className="on-ivory rounded-xl bg-ivory p-6 text-ink md:p-10 lg:p-14">
            <EnquiryForm />
          </div>

          {hasDirect && (
            <aside className="mt-12">
              <h2 className="mb-4 text-label font-medium uppercase opacity-70">Or reach us directly</h2>
              <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="break-all underline-offset-4 hover:underline">
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </Container>
      </section>
    </>
  );
}
