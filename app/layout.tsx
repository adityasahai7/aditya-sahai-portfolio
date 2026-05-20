import type { Metadata } from "next";
import { Cormorant, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import AmbientBackground from "@/components/ui/AmbientBackground";
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
  title: "Aditya Sahai — AI Operator & Brand Strategist",
  description:
    "I build AI-powered brand systems that help solopreneurs, D2C brands, and agencies move faster, look premium, and grow — without the agency price tag. India-based. Global thinking.",
  keywords: ["AI Operator", "AI Brand Identity", "AI Content Systems", "UGC Ads", "Brand Strategy", "India", "Aditya Sahai", "Thinking Beyond"],
  openGraph: {
    title: "Aditya Sahai — AI Operator & Brand Strategist",
    description: "Agency-quality AI brand systems. Priced for startups.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sahai — AI Operator & Brand Strategist",
    description: "Agency-quality AI brand systems. Priced for startups.",
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
          <AmbientBackground />
          <GrainOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

