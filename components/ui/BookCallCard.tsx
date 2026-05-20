"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import DraggableSticker from "@/components/ui/DraggableSticker";
import { useRef } from "react";

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/aditya-sahai-6939b8362", label: "LinkedIn"  },
  { Icon: Twitter,   href: "https://x.com/adityasahai07",                        label: "Twitter/X" },
  { Icon: Instagram, href: "https://instagram.com/adityasahai37",                label: "Instagram" },
  { Icon: Youtube,   href: "https://youtube.com/@adityasahai37",                 label: "YouTube"   },
];

export default function BookCallCard() {
  const stickerAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-card-lg p-10 md:p-12"
        style={{
          background:
            "linear-gradient(145deg, rgba(110,158,255,0.22), rgba(110,158,255,0.08) 48%, rgba(255,255,255,0.04))",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 28px 90px -36px rgba(0,0,0,0.9), 0 0 90px -48px rgba(110,158,255,0.5)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Decorative tomato triangle top-right */}
        <svg
          className="absolute top-0 right-0"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <polygon points="0,0 120,0 120,120" fill="#6E9EFF" opacity="0.45" />
        </svg>

        {/* Content */}
        <div className="relative z-10">
          <p className="eyebrow text-accent/70 mb-4">Prefer to talk?</p>

          <h3
            className="font-editorial italic text-ink leading-none mb-4"
            style={{ fontSize: "clamp(44px,5vw,72px)" }}
          >
            20 minutes. No pitch.
          </h3>

          <p className="font-grotesk text-[16px] text-ink/64 mb-8 max-w-xs">
            One call. I map where AI gives your brand the most leverage. You leave with clarity — and a plan.
          </p>

          {/* WhatsApp CTA */}
          <MagneticButton
            className="w-full block"
            as="a"
            href="https://wa.me/916207126091?text=Hi%20Aditya%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="flex flex-col items-center justify-center gap-1 w-full py-5 rounded-card font-grotesk font-medium text-ink hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, #6E9EFF, #6BA8FF)",
                color: "#050505",
                boxShadow: "0 18px 70px -32px rgba(110,158,255,0.7)",
              }}
            >
              <span className="flex items-center gap-2 text-[16px] tracking-tight">
                <MessageCircle size={18} strokeWidth={2} />
                Chat on WhatsApp
              </span>
              <span className="font-mono text-[12px] text-black/45 tracking-widest">
                +91 62071 26091
              </span>
            </span>
          </MagneticButton>

          {/* Divider */}
          <div className="my-6 h-px bg-ink/15" />

          {/* Social links */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-ink/45 tracking-[0.12em] uppercase mr-2">
              Find me on
            </span>
            {SOCIALS.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(110,158,255,0.18), rgba(196,168,255,0.12))",
                  border: "1px solid rgba(110,158,255,0.25)",
                  color: "rgba(238,238,245,0.85)",
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: -8,
                  background: "linear-gradient(135deg, rgba(110,158,255,0.4), rgba(196,168,255,0.3))",
                  color: "#fff",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
              >
                <Icon size={15} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating sticker cluster next to card */}
      <div
        ref={stickerAreaRef}
        className="absolute -right-16 top-0 h-full w-32 hidden xl:block"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div style={{ pointerEvents: "auto", position: "relative", height: "100%" }}>
          <DraggableSticker
            shape="pill"
            bgColor="#6E9EFF"
            textColor="#050505"
            label="REPLY < 12HRS"
            size={44}
            initialX={10}
            initialY={60}
            initialRotate={-12}
            bobDelay={0.2}
            constraintsRef={stickerAreaRef as React.RefObject<HTMLElement>}
          />
          <DraggableSticker
            shape="circle"
            bgColor="#C4A8FF"
            size={56}
            initialX={-10}
            initialY={160}
            initialRotate={8}
            bobDelay={0.8}
            constraintsRef={stickerAreaRef as React.RefObject<HTMLElement>}
          />
          <DraggableSticker
            shape="circle"
            bgColor="#6BA8FF"
            textColor="#050505"
            label="★"
            size={44}
            initialX={20}
            initialY={260}
            initialRotate={0}
            bobDelay={1.4}
            constraintsRef={stickerAreaRef as React.RefObject<HTMLElement>}
          />
        </div>
      </div>
    </div>
  );
}
