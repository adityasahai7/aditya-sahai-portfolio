import { ImageResponse } from "next/og";

export const alt = "Aditya Sahai · Creative AI Operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const sticker = (text: string, bg: string, rotate: number, extra: Record<string, string | number> = {}) => (
  <div style={{ display: "flex", padding: "12px 24px", background: bg, border: "4px solid #202727", borderRadius: 999, fontSize: 30, fontWeight: 800, transform: `rotate(${rotate}deg)`, boxShadow: "6px 6px 0 #202727", ...extra }}>{text}</div>
);

async function archivoBlack(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap")).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Share card for WhatsApp / LinkedIn / X: TBC palette, big name, title sticker. */
export default async function OpenGraphImage() {
  const font = await archivoBlack();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", background: "#F7F1E7", backgroundImage: "radial-gradient(rgba(32,39,39,0.18) 2px, transparent 2px)", backgroundSize: "34px 34px", color: "#202727", position: "relative", fontFamily: "Archivo Black" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>HI, I&apos;M 👋</div>
        <div style={{ display: "flex", fontSize: 170, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>ADITYA</div>
        <div style={{ display: "flex", fontSize: 170, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, color: "#176D70" }}>SAHAI</div>
        <div style={{ display: "flex", marginTop: 34 }}>{sticker("⚡ CREATIVE AI OPERATOR", "#F5D46D", -3, { fontSize: 38 })}</div>
        <div style={{ position: "absolute", right: 70, top: 80, display: "flex", flexDirection: "column", gap: 26, alignItems: "flex-end" }}>
          {sticker("Storyteller ✍️", "#F18179", 6)}
          {sticker("Builder 🛠️", "#BDEFD5", -5)}
          {sticker("Think Beyond Default 🧠", "#9CE8F2", 4)}
          {sticker("🎬 Beyond Default", "#E56AA6", -4)}
        </div>
        <div style={{ position: "absolute", left: 80, bottom: 40, display: "flex", fontSize: 26, fontWeight: 700 }}>adityasahai.com · For Good, Towards Greatness ✨</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] : undefined },
  );
}
