export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "#F4EFE6" }}
    >
      <p
        className="font-mono text-[12px] tracking-[0.2em] select-none"
        style={{ color: "rgba(15,14,12,0.3)" }}
      >
        AS.
      </p>
    </div>
  );
}
