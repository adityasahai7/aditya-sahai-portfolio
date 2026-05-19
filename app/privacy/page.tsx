"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EXPO = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  {
    title: "1. Information I Collect",
    body: `When you use the contact form on this website, I collect the information you voluntarily provide: your name, email address, project type, budget range, and message. I do not collect any information passively (no tracking pixels, no third-party analytics cookies, no fingerprinting). The only data I have about you is what you explicitly choose to send me.`,
  },
  {
    title: "2. How I Use Your Information",
    body: `I use the information you provide solely to respond to your inquiry and to understand your project needs. I do not use your information for advertising, profiling, or any automated decision-making. I will never sell, rent, or share your personal data with any third party for marketing purposes.`,
  },
  {
    title: "3. Contact Form Submissions",
    body: `When you submit the contact form, your message is delivered to me via a secure API endpoint. Your details are used only to respond to your inquiry. I may retain your contact information in order to follow up on your project request, but only for as long as reasonably necessary. You can request deletion of your information at any time by emailing me directly.`,
  },
  {
    title: "4. WhatsApp & External Links",
    body: `This website contains a direct link to WhatsApp for quick communication. If you choose to initiate a conversation via WhatsApp, that interaction is governed by WhatsApp's own Privacy Policy (Meta Platforms, Inc.). I have no control over how WhatsApp processes your data once you leave this site.`,
  },
  {
    title: "5. Cookies & Tracking",
    body: `This website does not use any tracking cookies or third-party analytics services. No data about your browsing behavior is collected or sold. If this changes in the future, this policy will be updated and you will be informed through a cookie consent banner.`,
  },
  {
    title: "6. Data Security",
    body: `I take reasonable technical measures to protect any information you submit. All form submissions are transmitted over HTTPS. However, no internet transmission is 100% secure, and I cannot guarantee absolute security. If you have concerns about sharing sensitive information, please reach out directly by email.`,
  },
  {
    title: "7. Your Rights",
    body: `You have the right to request access to any personal data I hold about you, to request correction or deletion of that data, and to withdraw consent for future communications at any time. To exercise any of these rights, email me at adityasahai037@gmail.com and I will respond within 7 business days.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `I may update this Privacy Policy from time to time to reflect changes in my practices or legal requirements. The date of the last update will always be shown at the top of this page. Continued use of this website after an update constitutes acceptance of the revised policy.`,
  },
  {
    title: "9. Contact",
    body: `If you have any questions about this Privacy Policy or how your data is handled, please contact me at:\n\nEmail: adityasahai037@gmail.com\nWhatsApp: +91 62071 26091\n\nI take privacy seriously and will always respond promptly to any concerns.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#03030A] text-[#EEEEF5]">
      {/* Nav back */}
      <div className="container mx-auto max-w-3xl px-6 pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6E9EFF]/70 hover:text-[#6E9EFF] transition-colors"
        >
          ← Back to Site
        </Link>
      </div>

      {/* Header */}
      <div className="container mx-auto max-w-3xl px-6 pt-10 pb-16">
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6E9EFF]/60 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          Thinking Beyond · Legal
        </motion.p>
        <motion.h1
          className="font-bold leading-tight mb-6"
          style={{ fontFamily: "'ClashDisplay', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.08 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="font-mono text-[11px] text-[#EEEEF5]/35 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Last updated: May 2026 · Effective immediately
        </motion.p>

        <motion.div
          className="mt-6 p-5 rounded-xl border border-[#6E9EFF]/15"
          style={{ background: "rgba(110,158,255,0.05)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
        >
          <p className="font-sans text-[15px] text-[#EEEEF5]/65 leading-relaxed">
            This website (thinkingbeyond.ai / adityasahai.com) is operated by Aditya Sahai, an independent AI Brand & Content Specialist trading as Thinking Beyond, based in India. This policy explains what data I collect, why, and how I use it.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-3xl px-6 pb-24">
        <div
          className="h-[1px] w-full mb-16"
          style={{ background: "linear-gradient(90deg, transparent, rgba(110,158,255,0.3), transparent)" }}
        />
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 * i, ease: EXPO }}
          >
            <h2
              className="font-semibold text-[#EEEEF5] mb-4"
              style={{ fontFamily: "'ClashDisplay', sans-serif", fontSize: "clamp(18px, 1.6vw, 22px)", letterSpacing: "-0.02em" }}
            >
              {s.title}
            </h2>
            <p className="font-sans text-[15px] text-[#EEEEF5]/58 leading-[1.75] whitespace-pre-line">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
