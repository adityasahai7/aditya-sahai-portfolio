import type { Metadata } from "next";
import { Wall } from "@/components/social/Wall";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "The Wall",
  description: "Leave a sticker and a line on Aditya Sahai's wall. Every note is read before it goes up.",
  alternates: { canonical: "/wall" },
};

export default function WallPage() {
  return (
    <>
      <PageHero label="THE WALL 🧱" lines={["LEAVE A", "STICKER."]} lead="Pick a sticker, write one line, pin it. I read every note before it goes up, so be nice (or funny). You can drag the notes around." emoji="📌" tone="yellow" accent={1} />
      <section className="page-section" data-room="paper" style={{ paddingTop: 30 }}>
        <div className="wrap"><Wall /></div>
      </section>
    </>
  );
}
