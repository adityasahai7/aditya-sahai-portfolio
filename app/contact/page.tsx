import type { Metadata } from "next";
import { SaySection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aditya Sahai: story ideas, collabs, FRROST projects, podcasts or just a hi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero label="CONTACT 👋" lines={["LET'S", "TALK."]} lead="Story ideas, collabs, a FRROST project, a podcast invite or just a hi. I read every single note." emoji="💬" tone="cyan" accent={1} />
      <SaySection source="contact" />
    </>
  );
}
