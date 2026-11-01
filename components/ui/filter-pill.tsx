import { cn } from "@/lib/utils";

export function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-pill border px-5 text-sm transition-colors duration-(--duration-fast)",
        // Inverts whatever surface it sits on, so it works on dark and on ivory.
        active ? "border-current bg-current" : "border-current/30 hover:border-current",
      )}
    >
      <span className={active ? "invert-pill" : undefined}>{children}</span>
    </button>
  );
}
