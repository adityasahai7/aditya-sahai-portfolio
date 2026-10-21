"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/components/motion/core";
import { unlock } from "./achievements";

const INKS = ["#202727", "#F18179", "#176D70", "#E56AA6", "#F5D46D", "#38A997"];

/** Doodle mode: draw on the page with a marker, then save your doodle as a PNG. */
export function DoodleLayer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ink, setInk] = useState(INKS[1]);
  const [size, setSize] = useState(8);
  const strokes = useRef(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio);
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    getLenis()?.stop();
    document.documentElement.classList.add("doodling");
    return () => { getLenis()?.start(); document.documentElement.classList.remove("doodling"); };
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let drawing = false;
    let lx = 0, ly = 0;
    const down = (e: PointerEvent) => { drawing = true; lx = e.clientX; ly = e.clientY; c.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!drawing) return;
      const pressure = e.pressure && e.pressure !== 0.5 ? e.pressure : 1;
      ctx.strokeStyle = ink;
      ctx.lineWidth = size * pressure;
      ctx.beginPath(); ctx.moveTo(lx, ly);
      ctx.quadraticCurveTo(lx, ly, (lx + e.clientX) / 2, (ly + e.clientY) / 2);
      ctx.lineTo(e.clientX, e.clientY); ctx.stroke();
      lx = e.clientX; ly = e.clientY;
    };
    const up = () => { if (drawing) { strokes.current += 1; if (strokes.current >= 3) unlock("doodle"); } drawing = false; };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    return () => { c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); c.removeEventListener("pointercancel", up); };
  }, [ink, size]);

  function save() {
    const c = ref.current;
    if (!c) return;
    const out = document.createElement("canvas");
    out.width = c.width; out.height = c.height;
    const o = out.getContext("2d")!;
    o.fillStyle = "#F7F1E7"; o.fillRect(0, 0, out.width, out.height);
    o.drawImage(c, 0, 0);
    o.font = `bold ${28 * (c.width / window.innerWidth)}px monospace`; o.fillStyle = "#202727";
    o.fillText("doodled on adityasahai.com ✏️", 24 * (c.width / window.innerWidth), out.height - 24 * (c.width / window.innerWidth));
    const a = document.createElement("a");
    a.download = "my-doodle-adityasahai.png"; a.href = out.toDataURL("image/png"); a.click();
  }

  return (
    <>
      <canvas ref={ref} className="doodle-canvas" aria-label="Doodle canvas" />
      <motion.div className="doodle-bar" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <b>✏️ Doodle mode</b>
        {INKS.map((c) => <button key={c} type="button" className={`ink ${ink === c ? "is-on" : ""}`} style={{ background: c }} onClick={() => setInk(c)} aria-label={`Ink ${c}`} />)}
        <input type="range" min={3} max={30} value={size} onChange={(e) => setSize(+e.target.value)} aria-label="Marker size" />
        <button type="button" className="btn btn-yellow btn-sm" onClick={() => { const c = ref.current; c?.getContext("2d")?.clearRect(0, 0, c.width, c.height); }}>🧽 Clear</button>
        <button type="button" className="btn btn-mint btn-sm" onClick={save}>💾 Save PNG</button>
        <button type="button" className="btn btn-ink btn-sm" onClick={onClose}>Done</button>
      </motion.div>
    </>
  );
}
