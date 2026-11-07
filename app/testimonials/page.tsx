import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageKit";
import { TestimonialForm, TestimonialWall } from "@/components/social/Testimonials";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials and reviews from people who have worked with Aditya Sahai.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero label="TESTIMONIALS ⭐" lines={["REVIEWS FROM", "PEOPLE."]} lead="Real reviews from people I've worked with." emoji="⭐" tone="fuchsia" accent={1} />
      <section className="page-section" data-room="paper">
        <div className="wrap"><TestimonialWall items={testimonials} /></div>
      </section>
      <section className="page-section tm-leave" data-room="yellow">
        <div className="wrap tm-leave-grid">
          <div>
            <p className="label"><span className="label-dot" />LEAVE A REVIEW</p>
            <h2 className="h-xl">WORKED<br />WITH ME?</h2>
            <p className="lead">Leave a review. It comes straight to me, and I add it here.</p>
          </div>
          <TestimonialForm />
        </div>
      </section>
    </>
  );
}
