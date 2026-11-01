export interface Founder {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. */
  portrait: string;
}

// Empty until real people, titles and portraits are supplied. The About page renders
// its founders section only when this has entries. Nothing here should be invented.
export const founders: Founder[] = [];

// From the brand board.
export const purpose = "To help ambitious businesses build meaningful brands and digital experiences that create real impact.";
export const promise = "Strategy, design and technology. Everything we create, we do it for a reason.";

export const strengths = ["Engineering experience.", "Creative curiosity.", "Strategic thinking."];

export const values = [
  { name: "Intentional", detail: "Purpose in every decision.", icon: "target" },
  { name: "Collaborative", detail: "Built together, always.", icon: "users" },
  { name: "Progressive", detail: "Always learning, always evolving.", icon: "arrow" },
] as const;
