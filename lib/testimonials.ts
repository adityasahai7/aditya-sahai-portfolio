import type { Tone } from "./content";

// HONESTY RULE: only real words from real people, added after Aditya approves them.
// To publish one, copy what they sent (from your inbox: topic "⭐ Testimonial") into this list.
export type Testimonial = {
  quote: string;
  name: string;
  role?: string; // e.g. "Founder, Glow Skin" or "Beyond Default viewer"
  link?: string; // their site or profile, optional
  tone?: Tone;
};

export const testimonials: Testimonial[] = [];
