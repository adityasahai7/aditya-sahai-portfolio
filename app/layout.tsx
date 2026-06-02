import type { Metadata } from "next";
import { Cormorant, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
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
  title: "Aditya Sahai — Creative AI Operator",
  description:
    "AI Operator helping brands identify useful AI solutions, build smarter systems, and grow with leverage in the AI era.",
  keywords: ["AI Operator", "Creative AI Operator", "AI Solutions", "AI Workflows", "Brand Systems", "India", "Aditya Sahai", "Thinking Beyond"],
  openGraph: {
    title: "Aditya Sahai — Creative AI Operator",
    description: "Identify the opportunity. Build the system. Grow with leverage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sahai — Creative AI Operator",
    description: "Identify the opportunity. Build the system. Grow with leverage.",
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
