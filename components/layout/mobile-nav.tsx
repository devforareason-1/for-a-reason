"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { Monogram } from "@/components/brand/logo";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { navigation, site, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

// Radix Dialog supplies the focus trap, Escape handling and aria wiring.
// The open animation is the full stop again: a circle opening from the menu button.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="-mr-2 grid size-11 place-items-center md:hidden" aria-label="Open menu">
        <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink text-ivory data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in md:hidden"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex h-18 shrink-0 items-center justify-between px-gutter">
            <Link href="/" onClick={close} aria-label="for a reason. Home" className="-m-2 p-2">
              <Monogram className="w-10" title="for a reason." />
            </Link>
            <Dialog.Close className="-mr-2 grid size-11 place-items-center" aria-label="Close menu">
              <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-gutter py-8">
            <ul className="flex flex-col gap-1">
              {[...navigation, { href: "/contact", label: "Contact" }].map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn("block py-2 font-display text-3xl font-medium tracking-[-0.02em]", !active && "opacity-75")}
                    >
                      {item.label}
                      {active && <span aria-hidden="true" className="text-ember">.</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 flex-col gap-6 px-gutter pb-8">
            <Button asChild size="lg" className="w-full">
              <Link href="/contact" onClick={close}>
                Start a Project <ArrowGlyph />
              </Link>
            </Button>
            {(site.contact.email || socialLinks.length > 0) && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                  </li>
                )}
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
