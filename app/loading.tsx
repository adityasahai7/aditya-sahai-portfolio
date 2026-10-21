export default function Loading() {
  return (
    <div style={{ minHeight: "70svh", display: "grid", placeItems: "center" }} aria-busy="true">
      <span style={{ fontSize: 56, animation: "pulse 1s ease-in-out infinite" }}>🧠</span>
    </div>
  );
}
