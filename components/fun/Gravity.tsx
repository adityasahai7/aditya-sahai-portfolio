"use client";

import { useEffect } from "react";
import { getLenis } from "@/components/motion/core";
import { sfx } from "./sound";

const PICK = "h1, h2, h3, .btn, .sticker, .label, .card, .deal-card, .wid-card, .bento-card, .side-card, .op-card, .show-card, .note, .chip, .lead, .hero-photo, .hero-title, .clock, .door-frame, .creed span, .world-cloud span, .reaction, .say-direct a, .letter-promises li";

/**
 * Gravity switch: everything visible on screen falls into a pile you can throw around.
 * Toggle off and it all flies back home.
 */
export function Gravity({ on }: { on: boolean }) {
  useEffect(() => {
    if (!on) return;
    let stop = () => {};
    let cancelled = false;
    void import("matter-js").then((Matter) => {
      if (cancelled) return;
      const { Engine, Bodies, Body, Composite } = Matter;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
      const wall = { isStatic: true, restitution: 0.4, friction: 0.5 };
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + 40, W * 2, 80, wall),
        Bodies.rectangle(-40, H / 2, 80, H * 3, wall),
        Bodies.rectangle(W + 40, H / 2, 80, H * 3, wall),
      ]);

      // Pick visible, leaf-ish elements (skip anything inside an already-picked element).
      const all = Array.from(document.querySelectorAll<HTMLElement>(`#main ${PICK}, .footer ${PICK}`));
      const picked: HTMLElement[] = [];
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > H || r.width < 8 || r.height < 8 || r.width > W * 0.98) continue;
        if (picked.some((p) => p.contains(el) || el.contains(p))) continue;
        picked.push(el);
        if (picked.length >= 45) break;
      }
      const items = picked.map((el) => {
        const r = el.getBoundingClientRect();
        const body = Bodies.rectangle(r.left + r.width / 2, r.top + r.height / 2, r.width, r.height, { restitution: 0.3, friction: 0.4, frictionAir: 0.01, chamfer: { radius: Math.min(12, r.height / 3) } });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        Composite.add(engine.world, body);
        el.style.transition = "none";
        el.style.willChange = "transform";
        el.dataset.gravity = "1";
        return { el, body, x0: r.left + r.width / 2, y0: r.top + r.height / 2, prev: el.style.transform };
      });

      // Drag + throw.
      let drag: { i: number; ox: number; oy: number; lx: number; ly: number; vx: number; vy: number } | null = null;
      const down = (e: PointerEvent) => {
        const i = items.findIndex((it) => it.el.contains(e.target as Node));
        if (i < 0) return;
        e.preventDefault();
        const b = items[i].body;
        drag = { i, ox: e.clientX - b.position.x, oy: e.clientY - b.position.y, lx: e.clientX, ly: e.clientY, vx: 0, vy: 0 };
      };
      const move = (e: PointerEvent) => { if (!drag) return; drag.vx = e.clientX - drag.lx; drag.vy = e.clientY - drag.ly; drag.lx = e.clientX; drag.ly = e.clientY; };
      const up = () => { if (!drag) return; Body.setVelocity(items[drag.i].body, { x: drag.vx, y: drag.vy }); drag = null; sfx.pop(); };
      const blockClick = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("[data-gravity]")) { e.preventDefault(); e.stopPropagation(); } };
      window.addEventListener("pointerdown", down, true);
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerup", up);
      document.addEventListener("click", blockClick, true);

      getLenis()?.stop();
      document.documentElement.classList.add("gravity-on");
      sfx.boing();

      let raf = 0;
      let last = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(32, now - last);
        last = now;
        if (drag) { const b = items[drag.i].body; Body.setPosition(b, { x: drag.lx - drag.ox, y: drag.ly - drag.oy }); Body.setVelocity(b, { x: 0, y: 0 }); }
        Engine.update(engine, dt);
        for (const it of items) it.el.style.transform = `translate(${it.body.position.x - it.x0}px, ${it.body.position.y - it.y0}px) rotate(${it.body.angle}rad)`;
      };
      raf = requestAnimationFrame(loop);

      stop = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointerdown", down, true);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.removeEventListener("click", blockClick, true);
        for (const it of items) {
          it.el.style.transition = "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)";
          it.el.style.transform = it.prev;
          delete it.el.dataset.gravity;
          window.setTimeout(() => { it.el.style.transition = ""; it.el.style.willChange = ""; }, 950);
        }
        Engine.clear(engine);
        getLenis()?.start();
        document.documentElement.classList.remove("gravity-on");
        sfx.switchOn();
      };
    });
    return () => { cancelled = true; stop(); };
  }, [on]);
  return null;
}
