import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The fill wipes up from the baseline on hover, the same full stop grown into a surface.
const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-md",
    "font-sans text-sm font-medium whitespace-nowrap select-none",
    "transition-colors duration-(--duration-base) ease-studio disabled:pointer-events-none disabled:opacity-50",
    "before:absolute before:inset-x-[-10%] before:bottom-0 before:-z-10 before:aspect-square before:translate-y-full before:rounded-full",
    "before:transition-transform before:duration-(--duration-base) before:ease-studio hover:before:translate-y-[15%]",
  ],
  {
    variants: {
      variant: {
        primary: "bg-ember text-ink before:bg-ivory",
        ivory: "bg-ivory text-ink before:bg-ember",
        ink: "bg-ink text-ivory before:bg-ember hover:text-ink",
        outline: "text-ivory ring-1 ring-ivory/35 ring-inset before:bg-ivory hover:text-ink",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** The ↗ on every call to action. Hidden from assistive tech: the label says it all. */
export function ArrowGlyph() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-(--duration-base) ease-studio group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
    >
      ↗
    </span>
  );
}
