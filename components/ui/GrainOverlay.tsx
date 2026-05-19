"use client";

export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 999, transform: "translateZ(0)" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.03,
          mixBlendMode: "overlay",
          animation: "grain 1.5s steps(1) infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
