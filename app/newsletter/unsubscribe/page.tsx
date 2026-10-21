import type { Metadata } from "next";
import { Unsubscribe } from "@/components/forms/Unsubscribe";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false, follow: false } };

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <section className="page-hero" style={{ minHeight: "85svh", textAlign: "center" }}>
      <div className="dot-grid" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative" }}><Unsubscribe token={token} /></div>
    </section>
  );
}
