"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 position; varying vec2 vUv; void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`;

// Gooey metaball blob in TBC colours, wobbling with time and leaning toward the pointer.
const FRAG = `precision highp float;
varying vec2 vUv;
uniform float uTime; uniform vec2 uMouse; uniform float uAspect;
float blob(vec2 p, vec2 c, float r){ return r * r / max(dot(p - c, p - c), 0.0001); }
void main(){
  vec2 p = vUv - 0.5; p.x *= uAspect;
  vec2 m = (uMouse - 0.5) * vec2(uAspect, 1.0) * 0.35;
  float t = uTime * 0.6;
  float f = 0.0;
  f += blob(p, vec2(sin(t) * 0.12, cos(t * 1.3) * 0.1) + m * 0.6, 0.16);
  f += blob(p, vec2(cos(t * 0.8) * 0.2, sin(t * 0.9) * 0.16) + m, 0.12);
  f += blob(p, vec2(sin(t * 1.4 + 2.0) * 0.22, cos(t * 0.7 + 1.0) * 0.2), 0.11);
  f += blob(p, vec2(cos(t * 1.1 + 4.0) * 0.18, sin(t * 1.2 + 3.0) * 0.22) - m * 0.5, 0.1);
  vec3 red = vec3(0.945, 0.506, 0.475); vec3 yel = vec3(0.961, 0.831, 0.427);
  vec3 cya = vec3(0.612, 0.910, 0.949); vec3 fuc = vec3(0.898, 0.416, 0.651);
  float a = 0.5 + 0.5 * sin(t + p.x * 4.0); float b = 0.5 + 0.5 * cos(t * 0.7 + p.y * 5.0);
  vec3 col = mix(mix(red, fuc, a), mix(yel, cya, a), b);
  float edge = smoothstep(0.95, 1.05, f);
  float rim = smoothstep(0.95, 1.0, f) - smoothstep(1.0, 1.12, f);
  vec3 ink = vec3(0.125, 0.153, 0.153);
  col = mix(col, ink, rim * 0.9);
  gl_FragColor = vec4(col * edge, edge);
}`;

export function InkBlob() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = () => {};
    let cancelled = false;
    void import("ogl").then(({ Renderer, Program, Mesh, Triangle }) => {
      if (cancelled) return;
      const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      host.appendChild(gl.canvas);
      const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms: { uTime: { value: 0 }, uMouse: { value: [0.5, 0.5] }, uAspect: { value: 1 } }, transparent: true });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      const resize = () => { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height); program.uniforms.uAspect.value = r.width / Math.max(1, r.height); };
      resize();
      window.addEventListener("resize", resize);
      const target = [0.5, 0.5];
      const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); target[0] = (e.clientX - r.left) / r.width; target[1] = 1 - (e.clientY - r.top) / r.height; };
      window.addEventListener("pointermove", move, { passive: true });
      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
      io.observe(host);
      let raf = 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const m = program.uniforms.uMouse.value as number[];
        m[0] += (target[0] - m[0]) * 0.06; m[1] += (target[1] - m[1]) * 0.06;
        program.uniforms.uTime.value = reduce ? 1.5 : (now - t0) / 1000;
        renderer.render({ scene: mesh });
        if (reduce) cancelAnimationFrame(raf);
      };
      raf = requestAnimationFrame(loop);
      stop = () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); gl.getExtension("WEBGL_lose_context")?.loseContext(); gl.canvas.remove(); };
    }).catch(() => undefined);
    return () => { cancelled = true; stop(); };
  }, []);
  return <div ref={ref} className="ink-blob" aria-hidden="true" />;
}
