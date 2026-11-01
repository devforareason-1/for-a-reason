import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";
import { Parallax } from "@/components/motion/parallax";
import { Container } from "@/components/ui/primitives";
import { navigation, site, socialLinks } from "@/lib/site";

export function Footer() {
  const hasContact = Boolean(site.contact.email) || socialLinks.length > 0;

  return (
    <footer className="pt-[38svh] pb-8">
      <Container className="scroll-fade-in">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-display text-heading font-bold md:col-span-6">
            {site.tagline}
            <br />
            <span className="opacity-50">{site.statement}</span>
          </p>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-8">
            <h2 className="mb-4 text-label font-medium uppercase opacity-60">Studio</h2>
            <ul className="flex flex-col gap-2.5">
              {[...navigation, { href: "/contact", label: "Start a Project" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-(--duration-fast) hover:text-ember">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasContact && (
            <div className="md:col-span-2">
              <h2 className="mb-4 text-label font-medium uppercase opacity-60">Contact</h2>
              <ul className="flex flex-col gap-2.5">
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="break-all transition-colors duration-(--duration-fast) hover:text-ember">
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="transition-colors duration-(--duration-fast) hover:text-ember">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Parallax distance={3} className="mt-8 md:mt-12">
          <Wordmark className="w-full" title={site.brand} clearSpace />
        </Parallax>

        <div className="mt-6 flex flex-wrap justify-between gap-x-8 gap-y-2 text-sm opacity-60">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.positioning}</p>
        </div>
      </Container>
    </footer>
  );
}
