import type { Metadata } from "next";
import { Quiz } from "@/components/fun/Quiz";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Which side of Aditya are you?",
  description: "Six quick questions. Find out if you're the Storyteller, the Builder, the Explorer or one of the other sides, and share your card.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <>
      <PageHero label="THE QUIZ 🧭" lines={["WHICH SIDE", "OF ME ARE YOU?"]} lead="Six quick questions. Seven possible answers. One shareable card for your story. Go." emoji="🧭" tone="cyan" accent={1} />
      <section className="page-section" data-room="paper" style={{ paddingTop: 40 }}>
        <div className="wrap"><Quiz /></div>
      </section>
    </>
  );
}
