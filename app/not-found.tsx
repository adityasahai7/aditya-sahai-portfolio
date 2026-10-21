import Link from "next/link";
import { FlipText } from "@/components/motion/kit";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "90svh", textAlign: "center" }}>
      <div className="dot-grid" aria-hidden="true" />
      <div className="wrap" style={{ position: "relative" }}>
        <p className="h-mega" style={{ margin: 0 }}><FlipText text="404" /></p>
        <h1 className="h-lg" style={{ marginTop: 10 }}>THIS PAGE THOUGHT BEYOND DEFAULT. 🫥</h1>
        <p className="lead" style={{ margin: "16px auto 30px" }}>It went somewhere I can&apos;t find. Let&apos;s go home.</p>
        <Link href="/" className="btn btn-yellow btn-lg">🏠 Back home</Link>
      </div>
    </section>
  );
}
