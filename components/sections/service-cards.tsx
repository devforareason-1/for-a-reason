import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { services } from "@/content/services";

export function ServiceCards() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
      {services.map((service, index) => (
        <li key={service.slug}>
          <Reveal delay={index * 0.05} className="h-full">
            <Link
              href={`/services#${service.slug}`}
              className="group flex h-full items-start gap-5 rounded-lg border border-ivory/15 bg-graphite/50 p-6 transition-colors duration-(--duration-base) hover:border-ember/70 md:p-8"
            >
              <ServiceIcon slug={service.slug} className="size-8 shrink-0 text-ember md:size-10" />
              <span className="flex-1">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">{service.name}</h3>
                <span className="mt-2 block leading-relaxed opacity-75">{service.summary}</span>
              </span>
              <span aria-hidden="true" className="self-end text-xl text-ember transition-transform duration-(--duration-base) ease-studio group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
