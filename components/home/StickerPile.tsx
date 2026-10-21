"use client";

import { useEffect, useRef } from "react";
import type { Tone } from "@/lib/content";
import { sfx } from "@/components/fun/sound";

type Item = { text: string; tone: Tone };

/**
 * DOM stickers driven by matter-js bodies. They drop in, bounce, and can be
 * grabbed and thrown with mouse or finger. Only the stickers capture touch,
 * so the page still scrolls normally around them.
 */
export function StickerPile({ items }: { items: Item[] }) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = box.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup = () => {};
    let cancelled = false;

    void import("matter-js").then((Matter) => {
      if (cancelled) return;
      const { Engine, Bodies, Body, Composite } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
      let W = root.clientWidth;
      let H = root.clientHeight;
      const wallOpts = { isStatic: true, restitution: 0.6, friction: 0.3 };
      const walls = [
        Bodies.rectangle(W / 2, H + 50, W * 3, 100, wallOpts),
        Bodies.rectangle(-50, H / 2, 100, H * 4, wallOpts),
        Bodies.rectangle(W + 50, H / 2, 100, H * 4, wallOpts),
        Bodies.rectangle(W / 2, -H * 1.6, W * 3, 100, wallOpts),
      ];
      Composite.add(engine.world, walls);

      const bodies = els.current.map((el, i) => {
        if (!el) return null;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const x = 60 + ((i * 137) % Math.max(1, W - 120));
        const y = reduce ? H - h / 2 - 10 - (i % 3) * h : -120 - i * 90;
        const b = Bodies.rectangle(x, y, w, h, { chamfer: { radius: Math.min(w, h) / 2.2 }, restitution: 0.55, friction: 0.4, frictionAir: 0.015, density: 0.002 });
        Body.setAngle(b, ((i % 5) - 2) * 0.18);
        Composite.add(engine.world, b);
        return b;
      });

      let downAt = { x: 0, y: 0, t: 0 };

      // Phones: tilt the phone and the stickers slide (gravity follows the device).
      const onTilt = (e: DeviceOrientationEvent) => {
        if (e.gamma == null) return;
        engine.gravity.x = Math.max(-1, Math.min(1, e.gamma / 35));
        engine.gravity.y = Math.max(0.35, Math.min(1.3, ((e.beta ?? 60) / 60)));
      };
      let tiltAsked = false;
      const askTilt = () => {
        if (tiltAsked) return;
        tiltAsked = true;
        const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
        if (DOE?.requestPermission) void DOE.requestPermission().then((r) => { if (r === "granted") window.addEventListener("deviceorientation", onTilt); }).catch(() => undefined);
      };
      if (window.matchMedia("(hover: none)").matches) window.addEventListener("deviceorientation", onTilt);

      // Scroll fast and the stickers jump.
      let lastY = window.scrollY;
      const onScroll = () => {
        const dy = window.scrollY - lastY;
        lastY = window.scrollY;
        if (Math.abs(dy) < 25 || window.scrollY > H) return;
        bodies.forEach((b) => { if (b) Body.setVelocity(b, { x: b.velocity.x + (Math.random() - 0.5) * 6, y: -Math.min(18, Math.abs(dy) * 0.35) }); });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // Drag: pointer captured on the sticker, body follows with velocity for throws.
      let drag: { i: number; ox: number; oy: number; lx: number; ly: number; vx: number; vy: number } | null = null;
      const rect = () => root.getBoundingClientRect();
      const downs = els.current.map((el, i) => {
        if (!el) return null;
        const onDown = (e: PointerEvent) => {
          const b = bodies[i];
          if (!b) return;
          el.setPointerCapture(e.pointerId);
          const r = rect();
          const px = e.clientX - r.left;
          const py = e.clientY - r.top;
          drag = { i, ox: px - b.position.x, oy: py - b.position.y, lx: px, ly: py, vx: 0, vy: 0 };
          downAt = { x: px, y: py, t: performance.now() };
          el.classList.add("is-grabbed");
          askTilt();
        };
        const onMove = (e: PointerEvent) => {
          if (!drag || drag.i !== i) return;
          const r = rect();
          const px = e.clientX - r.left;
          const py = e.clientY - r.top;
          drag.vx = px - drag.lx;
          drag.vy = py - drag.ly;
          drag.lx = px;
          drag.ly = py;
        };
        const onUp = () => {
          if (!drag || drag.i !== i) return;
          const b = bodies[i];
          const tap = Math.hypot(drag.lx - downAt.x, drag.ly - downAt.y) < 6 && performance.now() - downAt.t < 260;
          if (b) Body.setVelocity(b, tap ? { x: (Math.random() - 0.5) * 14, y: -22 } : { x: drag.vx * 0.9, y: drag.vy * 0.9 });
          if (b && tap) Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.5);
          sfx.pop();
          drag = null;
          el.classList.remove("is-grabbed");
        };
        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
        el.addEventListener("pointercancel", onUp);
        return () => {
          el.removeEventListener("pointerdown", onDown);
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerup", onUp);
          el.removeEventListener("pointercancel", onUp);
        };
      });

      // Mouse nudges nearby stickers like a breeze.
      const onHover = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || drag) return;
        const r = rect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        bodies.forEach((b) => {
          if (!b) return;
          const dx = b.position.x - px;
          const dy = b.position.y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) Body.applyForce(b, b.position, { x: (dx / Math.sqrt(d2 + 1)) * 0.012, y: -0.018 });
        });
      };
      root.addEventListener("pointermove", onHover);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
      io.observe(root);
      let last = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible) { last = now; return; }
        const dt = Math.min(32, now - last);
        last = now;
        if (drag) {
          const b = bodies[drag.i];
          if (b) {
            Body.setPosition(b, { x: drag.lx - drag.ox, y: drag.ly - drag.oy });
            Body.setVelocity(b, { x: 0, y: 0 });
            Body.setAngularVelocity(b, b.angularVelocity * 0.8);
          }
        }
        Engine.update(engine, dt);
        bodies.forEach((b, i) => {
          const el = els.current[i];
          if (!b || !el) return;
          el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${b.position.y - el.offsetHeight / 2}px) rotate(${b.angle}rad)`;
          el.style.opacity = "1";
        });
      };
      raf = requestAnimationFrame(loop);

      const onResize = () => {
        W = root.clientWidth;
        H = root.clientHeight;
        Body.setPosition(walls[0], { x: W / 2, y: H + 50 });
        Body.setPosition(walls[2], { x: W + 50, y: H / 2 });
        bodies.forEach((b) => {
          if (b && (b.position.x > W || b.position.y > H)) Body.setPosition(b, { x: W / 2, y: H / 3 });
        });
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("deviceorientation", onTilt);
        window.removeEventListener("scroll", onScroll);
        root.removeEventListener("pointermove", onHover);
        downs.forEach((off) => off?.());
        Engine.clear(engine);
      };
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  return (
    <div className="pile" ref={box} aria-hidden="true">
      {items.map((s, i) => (
        <span key={s.text} ref={(el) => { els.current[i] = el; }} className={`pile-sticker tone-${s.tone} ${s.text.length <= 2 ? "is-emoji" : ""}`} data-cursor="DRAG">
          {s.text}
        </span>
      ))}
    </div>
  );
}
