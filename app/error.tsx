"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="page-hero" style={{ minHeight: "80svh", textAlign: "center" }}>
      <div className="wrap">
        <p style={{ fontSize: 80, margin: 0 }}>🫠</p>
        <h1 className="h-xl">WELL, THAT BROKE.</h1>
        <p className="lead" style={{ margin: "16px auto 30px" }}>Something went wrong on my side. Try again?</p>
        <button type="button" className="btn btn-ink btn-lg" onClick={reset}>Try again 🔁</button>
      </div>
    </section>
  );
}
