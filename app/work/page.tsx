import type { Metadata } from "next";
import { Builds, Toolkit } from "@/components/home/Home";
import { SaySection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Work",
  description: "Things Aditya Sahai has built: Thinking Beyond Club, FRROST Media, Beyond Default and this website.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero label="THE WORK 🛠️" lines={["THINGS", "I BUILT."]} lead="Websites, a company, a show and a club. Built in public, with a lot of AI and even more taste-checking. Click anything to visit it." emoji="🛠️" tone="fuchsia" accent={1} />
      <Builds full />
      <Toolkit />
      <SaySection source="work" />
    </>
  );
}
