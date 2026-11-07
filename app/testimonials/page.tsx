import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageKit";
import { TestimonialForm, TestimonialWall } from "@/components/social/Testimonials";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Kind words",
  description: "What people say about working with Aditya Sahai and about his work. Only real words, checked before they go up.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero label="KIND WORDS 💌" lines={["IN THEIR", "WORDS."]} lead="What people say about working with me and about the things I make. Every word here is real, from a real person, and checked before it goes up." emoji="💌" tone="fuchsia" accent={1} />
      <section className="page-section" data-room="paper">
        <div className="wrap"><TestimonialWall items={testimonials} /></div>
      </section>
      <section className="page-section tm-leave" data-room="yellow">
        <div className="wrap tm-leave-grid">
          <div>
            <p className="label"><span className="label-dot" />LEAVE YOURS</p>
            <h2 className="h-xl">WORKED<br />WITH ME?</h2>
            <p className="lead">Or watched something of mine that stuck with you? Write a line or two. It comes straight to me, and nothing goes up until I&apos;ve read it.</p>
          </div>
          <TestimonialForm />
        </div>
      </section>
    </>
  );
}
