import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./three-worlds.css";
import "./premium-rebuild.css";
import "./ice-system.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import LenisProvider from "@/components/layout/LenisProvider";
import { SiteExperience } from "@/components/site/Experience";

const display = localFont({
  src: [
    {
      path: "../public/fonts/clash-display/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplay_Complete/Fonts/WEB/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

const body = localFont({
  src: "../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityasahai.com"),
  title: {
    default: "Aditya Sahai — Creative AI Operator",
    template: "%s — Aditya Sahai",
  },
  description:
    "Aditya Sahai is a Creative AI Operator from India building sharper brands, websites, content systems, sales stories, and AI-assisted creative workflows.",
  keywords: ["Creative AI Operator", "AI branding", "AI marketing", "creative direction", "founder personal branding", "content strategy", "sales stories", "FRROST Media", "Thinking Beyond Letter", "Aditya Sahai"],
  openGraph: {
    title: "Aditya Sahai — Creative AI Operator",
    description: "AI, taste, and storytelling for sharper brands, websites, content systems, and creative workflows.",
    url: "https://adityasahai.com",
    type: "website",
    images: [{ url: "/images/aditya-photo.png", width: 322, height: 292, alt: "Aditya Sahai, Creative AI Operator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sahai — Creative AI Operator",
    description: "AI, taste, and storytelling for sharper brands, websites, content systems, and creative workflows.",
  },
  alternates: { canonical: "https://adityasahai.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="grain antialiased">
        <SiteExperience />
        <LenisProvider>
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
