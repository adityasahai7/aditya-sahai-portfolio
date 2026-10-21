import type { Metadata, Viewport } from "next";
import { Archivo_Black, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";
import { Cursor, EasterEgg, Footer, Nav, Preloader, ScrollProgress, SmoothScroll } from "@/components/chrome/Chrome";
import { LINKS } from "@/lib/content";
import { FunDock, PullString, Torch } from "@/components/fun/Fun";

const display = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

const description = "Aditya Sahai is a Creative AI Operator from India. Creator, storyteller and builder behind Beyond Default, Thinking Beyond Club and FRROST Media.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adityasahai.com"),
  title: { default: "Aditya Sahai · Creative AI Operator", template: "%s · Aditya Sahai" },
  description,
  keywords: ["Aditya Sahai", "Creative AI Operator", "Beyond Default", "Thinking Beyond Club", "FRROST Media", "Thinking Beyond Letter", "AI creator India", "storyteller"],
  authors: [{ name: "Aditya Sahai", url: "https://adityasahai.com" }],
  openGraph: { title: "Aditya Sahai · Creative AI Operator", description, url: "https://adityasahai.com", siteName: "Aditya Sahai", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Aditya Sahai · Creative AI Operator", description, creator: "@adityasahai07" },
  alternates: { canonical: "https://adityasahai.com" },
};

export const viewport: Viewport = { themeColor: "#F7F1E7", width: "device-width", initialScale: 1 };

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": "https://adityasahai.com/#person", name: "Aditya Sahai", url: "https://adityasahai.com", jobTitle: "Creative AI Operator", image: "https://adityasahai.com/images/aditya-sahai.webp", description, sameAs: [LINKS.instagram, LINKS.youtube, LINKS.linkedin, LINKS.x, LINKS.tbc, LINKS.frrost] },
    { "@type": "WebSite", "@id": "https://adityasahai.com/#website", name: "Aditya Sahai", url: "https://adityasahai.com", publisher: { "@id": "https://adityasahai.com/#person" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <noscript><style>{".wipe{display:none}.mask-inner{transform:none!important}[style*='opacity:0']{opacity:1!important}"}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <EasterEgg />
        <Torch />
        <PullString />
        <FunDock />
        <svg className="grain" aria-hidden="true"><filter id="grain-f"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#grain-f)" /></svg>
      </body>
    </html>
  );
}
