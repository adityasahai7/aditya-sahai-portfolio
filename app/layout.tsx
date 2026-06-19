import type { Metadata } from "next";
import { Cormorant, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./three-worlds.css";
import "./premium-rebuild.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import LenisProvider from "@/components/layout/LenisProvider";

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

const editorial = Cormorant({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = localFont({
  src: "../public/fonts/satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityasahai.com"),
  title: {
    default: "Aditya Sahai — The Creative Operator File",
    template: "%s — Aditya Sahai",
  },
  description:
    "Aditya Sahai is a Creative AI Operator from India writing about AI branding, AI marketing, creative direction, founder brands, sales stories, articles, newsletters, FRROST Media, and Thinking Beyond.",
  keywords: ["Creative AI Operator", "AI branding", "AI marketing", "creative direction", "founder personal branding", "content strategy", "sales stories", "FRROST Media", "Thinking Beyond Letter", "Aditya Sahai"],
  openGraph: {
    title: "Aditya Sahai — The Creative Operator File",
    description: "A bio-first personal brand, article archive, newsletter home, and creative operator file for AI branding, marketing, sales stories, and creative direction.",
    url: "https://adityasahai.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sahai — The Creative Operator File",
    description: "AI branding, AI marketing, sales stories, creative direction, articles, newsletters, and FRROST Media.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">
        <LenisProvider>
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
