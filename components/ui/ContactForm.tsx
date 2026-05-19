"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactFormData } from "@/types";

const schema = z.object({
  name:        z.string().min(2, "Name required"),
  email:       z.string().email("Valid email required"),
  projectType: z.string().min(1, "Select a project type"),
  budget:      z.string().min(1, "Select a budget"),
  message:     z.string().min(20, "At least 20 characters"),
});

type Status = "idle" | "loading" | "success" | "error";

function FloatField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="floating-label-group">
      {children}
      <label>{label}</label>
      <div className="underline-bar" />
      {error && (
        <p className="font-mono text-[10px] text-tomato mt-1 tracking-wider">{error}</p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* Name */}
      <FloatField label="Your Name" error={errors.name?.message}>
        <input
          type="text"
          placeholder=" "
          {...register("name")}
          autoComplete="name"
          className="form-input-glow"
          data-cursor="text"
        />
      </FloatField>

      {/* Email */}
      <FloatField label="Email Address" error={errors.email?.message}>
        <input
          type="email"
          placeholder=" "
          {...register("email")}
          autoComplete="email"
          className="form-input-glow"
          data-cursor="text"
        />
      </FloatField>

      {/* Project type */}
      <FloatField label="Project Type" error={errors.projectType?.message}>
        <select
          {...register("projectType")}
          className={`form-input-glow ${watch("projectType") ? "has-value" : ""}`}
          defaultValue=""
        >
          <option value="" disabled />
          {["AI Brand Identity", "Content System", "UGC Ad Creatives", "AI Automation", "Strategy Audit", "Personal Brand", "Something Else"].map(
            (t) => <option key={t} value={t}>{t}</option>
          )}
        </select>
      </FloatField>

      {/* Budget */}
      <FloatField label="Budget Range" error={errors.budget?.message}>
        <select
          {...register("budget")}
          className={`form-input-glow ${watch("budget") ? "has-value" : ""}`}
          defaultValue=""
        >
          <option value="" disabled />
          {["Under ₹25K", "₹25K–75K", "₹75K–1.5L", "₹1.5L+", "Let's talk"].map(
            (b) => <option key={b} value={b}>{b}</option>
          )}
        </select>
      </FloatField>

      {/* Message */}
      <FloatField label="Tell Me About Your Project" error={errors.message?.message}>
        <textarea
          rows={4}
          placeholder=" "
          {...register("message")}
          style={{ resize: "none" }}
          className="form-input-glow"
          data-cursor="text"
        />
      </FloatField>

      {/* Submit */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="relative overflow-hidden px-10 py-5 rounded-pill font-mono text-btn tracking-[0.15em] uppercase text-bone"
          style={{
            background: "linear-gradient(135deg, #6E9EFF, #6BA8FF 58%, #C4A8FF)",
            color: "#050505",
            boxShadow: "0 18px 70px -26px rgba(110,158,255,0.7)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{  scale: 0.98 }}
          onHoverStart={(e) => {
            const btn = e.target as HTMLButtonElement;
            if (btn.closest("button")?.disabled) return;
          }}
        >
          {/* Tomato radial fill on hover */}
          <motion.span
            className="absolute inset-0 rounded-pill pointer-events-none"
            style={{ background: "rgba(255,255,255,0.38)", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2.5, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
          <span className="relative z-10 flex items-center gap-3">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  SEND IT →
                </motion.span>
              )}
              {status === "loading" && (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1">
                  SENDING
                  {[0,1,2].map((i) => (
                    <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}>
                      .
                    </motion.span>
                  ))}
                </motion.span>
              )}
              {status === "success" && (
                <motion.span key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#050505" }}>
                  ✓ GOT IT — REPLY IN 12HRS
                </motion.span>
              )}
              {status === "error" && (
                <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  FAILED — TRY AGAIN
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </form>
  );
}
