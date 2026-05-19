"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EXPO = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  {
    title: "1. Services",
    body: `Aditya Sahai, trading as Thinking Beyond, provides AI-powered brand identity, content systems, UGC ad creatives, strategy audits, personal branding, and related consulting services. All services are project-based and custom-scoped. No two engagements are identical. Specific deliverables, timelines, and pricing are agreed upon before work commences and documented in a separate project brief or proposal.`,
  },
  {
    title: "2. Engagement & Payment",
    body: `All work is initiated only after written confirmation of the project scope and payment terms. A deposit is typically required before work begins, with the remainder due upon delivery or at agreed milestones. Payment terms will be specified per engagement. Late payments may result in paused work or delivery delays. All prices are exclusive of GST unless otherwise stated.`,
  },
  {
    title: "3. Intellectual Property",
    body: `Upon receipt of full and final payment, all deliverables produced specifically for your project become your property. This includes brand identities, written content, ad scripts, strategy documents, and any other custom-created assets. Thinking Beyond retains the right to display completed work in its portfolio and case studies unless you request otherwise in writing. Any third-party assets used (fonts, stock images, AI-generated elements) remain subject to their respective licenses, which will be communicated to you where relevant.`,
  },
  {
    title: "4. Revisions & Scope",
    body: `Each project includes a defined number of revision rounds as specified in the project brief. Requests beyond the agreed scope will be quoted separately. Revisions must be requested within 14 days of delivery. After this period, the project is considered complete and closed. Additional changes will be treated as new work.`,
  },
  {
    title: "5. Client Responsibilities",
    body: `You agree to provide accurate, timely, and complete information needed for the project (brand details, ICP, goals, assets, feedback). Delays caused by late or incomplete information from your side may push delivery timelines. Thinking Beyond is not liable for results affected by inaccurate or withheld information.`,
  },
  {
    title: "6. Confidentiality",
    body: `Any confidential business information you share during our engagement will be treated with strict confidentiality. I will not share your proprietary data, brand strategy, or business information with any third party without your explicit consent. If required, a formal Non-Disclosure Agreement can be signed upon request.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `Thinking Beyond's total liability for any claim arising from services rendered shall not exceed the amount paid for the specific project in question. I am not liable for indirect, incidental, or consequential damages, including loss of profits, revenue, or business opportunity. Results from marketing, advertising, and brand strategy work depend on many factors outside my control, and no specific outcomes are guaranteed.`,
  },
  {
    title: "8. Cancellation & Refunds",
    body: `If you cancel a project after work has begun, the deposit is non-refundable. Any work completed up to the point of cancellation will be charged at a prorated rate. If I am unable to complete the agreed work due to circumstances on my end, you will receive a full refund of any amounts paid for uncompleted work.`,
  },
  {
    title: "9. Governing Law",
    body: `These terms are governed by the laws of India. Any disputes arising from services rendered by Thinking Beyond shall first be attempted to be resolved informally. If unresolved, disputes will be subject to the jurisdiction of the courts of India.`,
  },
  {
    title: "10. Changes to These Terms",
    body: `These terms may be updated from time to time. The most current version will always be available on this page. Continuing to engage with Thinking Beyond after an update constitutes acceptance of the revised terms.`,
  },
  {
    title: "11. Contact",
    body: `For questions about these terms or your engagement:\n\nEmail: adityasahai037@gmail.com\nWhatsApp: +91 62071 26091`,
  },
];

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#03030A] text-[#EEEEF5]">
      <div className="container mx-auto max-w-3xl px-6 pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6E9EFF]/70 hover:text-[#6E9EFF] transition-colors"
        >
          ← Back to Site
        </Link>
      </div>

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
          Terms of Service
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
            These Terms of Service govern all projects and engagements with Aditya Sahai (Thinking Beyond). By initiating a project, you agree to these terms. Please read them carefully.
          </p>
        </motion.div>
      </div>

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
