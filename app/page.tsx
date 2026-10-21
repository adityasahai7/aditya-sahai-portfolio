import { Builds, Hero, HomeRefresh, Operator, Ribbons, ShowTeaser, Sides, Worlds, WritingTeaser, WhatIDo } from "@/components/home/Home";
import { LetterSection, SaySection } from "@/components/home/Blocks";
import { Desk } from "@/components/home/Desk";
import { articles } from "@/lib/operator-content";

export default function HomePage() {
  const featured = articles.filter((a) => a.featured).map(({ slug, title, excerpt, category, readingTime }) => ({ slug, title, excerpt, category, readingTime }));
  return (
    <>
      <HomeRefresh />
      <Hero />
      <Ribbons />
      <Operator />
      <WhatIDo />
      <Sides />
      <ShowTeaser />
      <Worlds />
      <Desk />
      <Builds />
      <WritingTeaser articles={featured} />
      <LetterSection source="home" />
      <SaySection source="home" />
    </>
  );
}
