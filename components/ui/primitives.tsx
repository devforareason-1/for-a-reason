import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-site px-gutter", className)} {...props} />;
}

/** Small uppercase label, with the brand's period as its marker. */
export function Eyebrow({ className, children, dot = true, ...props }: ComponentProps<"p"> & { dot?: boolean }) {
  return (
    <p className={cn("flex items-center gap-2.5 text-label font-medium uppercase", className)} {...props}>
      {dot && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-ember" />}
      {children}
    </p>
  );
}

/** Quiet inline link whose underline draws in, for secondary actions. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 font-medium",
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-bottom bg-no-repeat pb-1",
        "transition-[background-size] duration-(--duration-base) ease-studio hover:bg-[length:0%_1px]",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Status chip. Used to keep sample and concept work impossible to mistake for client work. */
export function Tag({ className, children, tone = "line" }: { className?: string; children: ReactNode; tone?: "line" | "ember" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-[0.6875rem] leading-none font-medium whitespace-nowrap",
        tone === "line" ? "ring-1 ring-current/30 ring-inset" : "bg-ember text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
