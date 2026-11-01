import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom type scale, so text-display and text-ivory
// are not mistaken for the same utility group and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label", "lede", "heading", "display"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
