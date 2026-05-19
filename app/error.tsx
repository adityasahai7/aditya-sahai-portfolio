"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="min-h-screen bg-smoke flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink/45 mb-4">
          Something went wrong
        </p>
<button
          onClick={reset}
          className="font-grotesk text-[13px] text-ink border border-ink/20 px-5 py-2.5 rounded-full hover:bg-ink hover:text-smoke transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
