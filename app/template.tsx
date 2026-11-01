import type { ReactNode } from "react";

// Templates remount on navigation, which gives every route a short CSS fade-in
// without holding the outgoing page or adding any client code.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
