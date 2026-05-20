"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageLoader    from "@/components/layout/PageLoader";
import Navbar        from "@/components/layout/Navbar";
import MarqueeBand   from "@/components/layout/MarqueeBand";
import Footer        from "@/components/layout/Footer";
import Hero          from "@/components/sections/Hero";
import KineticTags   from "@/components/sections/KineticTags";
import AIApproach    from "@/components/sections/AIApproach";
import SelectedWork  from "@/components/sections/SelectedWork";
import SocialProof   from "@/components/sections/SocialProof";
import Contact       from "@/components/sections/Contact";
import CustomCursor  from "@/components/ui/CustomCursor";
import SectionFlash  from "@/components/ui/SectionFlash";
import ScrollProgress from "@/components/ui/ScrollProgress";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <SectionFlash />
      <ScrollProgress />
      <Navbar />

      <motion.main
        initial={{ filter: "blur(18px)", opacity: 0 }}
        animate={loaded ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* ── HERO ── */}
        <Hero loaded={loaded} />

        {/* ── MARQUEE #1 ── */}
        <MarqueeBand
          text="★ AI OPERATOR ✦ BRAND SYSTEMS THAT SCALE ★ OUTCOMES IN DAYS ✦ NOT AN AGENCY ✦ BETTER THAN ONE ✦ "
          bgColor="rgba(110, 158, 255, 0.05)"
          textColor="rgba(242, 242, 244, 0.55)"
          speed={12}
          sectionId="marquee1"
        />

        {/* ── KINETIC INTERLUDE ── */}
        <KineticTags />

        {/* ── AI APPROACH ── */}
        <AIApproach />

        {/* ── MARQUEE #2 ── */}
        <MarqueeBand
          text="✦ AI IS LEVERAGE, NOT A SHORTCUT ★ THINKING BEYOND THE BRIEF ✦ BRAND SYSTEMS ✦ BUILT TO CONVERT ✦ "
          bgColor="rgba(110, 158, 255, 0.03)"
          textColor="rgba(242, 242, 244, 0.50)"
          speed={10}
          sectionId="marquee2"
        />

        {/* ── SELECTED WORK ── */}
        <SelectedWork />

        {/* ── MARQUEE #3 ── */}
        <MarqueeBand
          text="✦ D2C BRANDS ★ SOLOPRENEURS ★ COACHES ✦ AGENCIES ✦ MSME ✦ INDIA & GLOBAL ✦ "
          bgColor="rgba(110, 158, 255, 0.05)"
          textColor="rgba(242, 242, 244, 0.55)"
          speed={11}
          sectionId="marquee3"
        />

        {/* ── SOCIAL PROOF ── */}
        <SocialProof />

        {/* ── CONTACT ── */}
        <Contact />
      </motion.main>

      <Footer />
    </>
  );
}
