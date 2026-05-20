"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";
import BookCallCard from "@/components/ui/BookCallCard";
import Scramble from "@/components/ui/Scramble";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const headRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(headRef, { once: true, amount: 0.4 });
  const [scramblingDone, setScramblingDone] = useState(false);

  return (
    <section
      className="relative bg-transparent section-pad overflow-hidden"
      id="contact"
      data-section="contact"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      {/* Ambient orbs */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420, right: "-6%", top: "5%",
          background: "radial-gradient(circle, rgba(110,158,255,0.10) 0%, rgba(110,158,255,0.03) 55%, transparent 100%)",
          border: "1px solid rgba(110,158,255,0.07)",
        }}
        animate={{ y: [0, -28, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260, height: 260, left: "8%", bottom: "10%",
          background: "radial-gradient(circle, rgba(110,158,255,0.06) 0%, rgba(110,158,255,0.02) 55%, transparent 100%)",
          border: "1px solid rgba(110,158,255,0.05)",
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      <div className="container-main relative z-10">
        {/* Headline */}
        <div ref={headRef} className="mb-16 md:mb-20">
          <motion.p
            className="eyebrow text-accent/75 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
            transition={{ duration: 0.6, ease: EXPO }}
          >
            Let&apos;s Work Together
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h2
              className="leading-none"
              style={{ fontSize: "clamp(52px,8vw,120px)" }}
              initial={{ y: "105%" }}
              animate={{ y: inView ? "0%" : "105%" }}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.08 }}
            >
              <span className="font-display font-semibold text-ink">Got a brand </span>
              <em className="font-editorial italic gradient-text-cycle">
                <Scramble text="to build?" trigger={inView} speed={30} />
              </em>
            </motion.h2>
          </div>

          <motion.p
            className="font-body text-body-lg text-ink/58 max-w-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.3 }}
          >
            Tell me what you&apos;re building. I&apos;ll tell you exactly how AI can supercharge it. Reply within 12 hours.
          </motion.p>
        </div>

        {/* 55/45 split */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 xl:gap-20">
          {/* Left: Form */}
          <motion.div
            className="glass-panel rounded-card p-6 md:p-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: EXPO }}
          >
            <ContactForm />
          </motion.div>

          {/* Right: Book a call */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EXPO }}
          >
            <BookCallCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
