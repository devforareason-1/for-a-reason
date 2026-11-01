import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CursorDot } from "@/components/motion/cursor-dot";
import { MotionProvider } from "@/components/motion/provider";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// One family, per the brand kit. The optical size axis is what gives large text the
// Inter Display cut the wordmark is drawn from; body sizes keep the text cut.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.positioning}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="grain">
        <noscript>
          <style>{`[data-reveal],[data-scroll-driven]{opacity:1!important;transform:none!important;filter:none!important;mask-image:none!important;-webkit-mask-image:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-pill bg-ivory px-5 py-3 text-sm font-medium text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CursorDot />
        </MotionProvider>
      </body>
    </html>
  );
}
