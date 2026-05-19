"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ background: "#050505", margin: 0, fontFamily: "sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(247,247,248,0.45)", marginBottom: "16px", fontFamily: "monospace" }}>
              Something went wrong
            </p>
            <button
              onClick={reset}
              style={{ fontSize: "13px", color: "#F7F7F8", border: "1px solid rgba(247,247,248,0.2)", padding: "10px 20px", borderRadius: "999px", background: "transparent", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
