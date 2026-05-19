"use client";

export default function SectionDivider() {
  return (
    <div
      className="w-full container-main"
      aria-hidden="true"
    >
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(44,73,127,0.5) 20%, rgba(254,115,131,0.15) 50%, rgba(44,73,127,0.5) 80%, transparent)",
        }}
      />
    </div>
  );
}
