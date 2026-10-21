"use client";

/** Small helpers for drawing share images in the site's style. */
export function fonts() {
  const css = getComputedStyle(document.documentElement);
  const pick = (v: string, fb: string) => (css.getPropertyValue(v).trim() || fb);
  return { display: pick("--font-display", "Impact"), body: pick("--font-body", "system-ui"), mono: pick("--font-mono", "monospace") };
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A neo-brutal box: hard ink shadow + ink outline. */
export function brutalBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, r = 24, shadow = 12) {
  ctx.fillStyle = "#202727";
  roundRect(ctx, x + shadow, y + shadow, w, h, r); ctx.fill();
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, r); ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = "#202727"; ctx.stroke();
}

export function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, yy); line = w; yy += lineH; }
    else line = test;
  }
  if (line) ctx.fillText(line, x, yy);
  return yy + lineH;
}

export function dotGrid(ctx: CanvasRenderingContext2D, w: number, h: number, bg = "#F7F1E7") {
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(32,39,39,0.15)";
  for (let y = 20; y < h; y += 36) for (let x = 20; x < w; x += 36) { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill(); }
}

/** Download, or open the phone share sheet when available. */
export async function shareCanvas(canvas: HTMLCanvasElement, filename: string, text: string) {
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
  if (!blob) return;
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try { await nav.share({ files: [file], text }); return; } catch { /* cancelled */ }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
