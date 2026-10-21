"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`;
const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D tMap; uniform float uTime; uniform vec3 uDrops[8]; uniform float uAspect;
void main(){
  vec2 uv = vUv;
  vec2 off = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    vec3 d = uDrops[i];
    float age = uTime - d.z;
    if (d.z < 0.0 || age > 2.4) continue;
    vec2 p = (uv - d.xy) * vec2(uAspect, 1.0);
    float dist = length(p);
    float front = age * 0.42;
    float ring = exp(-pow((dist - front) * 18.0, 2.0));
    float fade = (1.0 - age / 2.4);
    off += normalize(p + 0.0001) * sin((dist - front) * 60.0) * ring * fade * 0.018;
  }
  vec4 col = texture2D(tMap, uv + off);
  float shine = length(off) * 14.0;
  gl_FragColor = vec4(col.rgb + shine * 0.35, col.a);
}`;

/**
 * Your photo, but water: tap or move over it and ripples spread out. With no ripples
 * the shader samples the image untouched, so at rest it is exactly the photo.
 */
export function RipplePhoto({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let cancelled = false;
    void import("ogl").then(({ Renderer, Program, Mesh, Triangle, Texture }) => {
      if (cancelled) return;
      const renderer = new Renderer({ alpha: true, dpr: Math.min(2, window.devicePixelRatio) });
      const gl = renderer.gl;
      gl.canvas.className = "ripple-canvas";
      host.appendChild(gl.canvas);
      const texture = new Texture(gl, { generateMipmaps: false });
      const img = new window.Image();
      img.onload = () => { texture.image = img; host.classList.add("is-ready"); };
      img.src = src;
      const drops = new Array(24).fill(-1);
      const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms: { tMap: { value: texture }, uTime: { value: 0 }, uDrops: { value: drops }, uAspect: { value: 1 } } });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      const resize = () => { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height); program.uniforms.uAspect.value = r.width / Math.max(1, r.height); };
      resize();
      window.addEventListener("resize", resize);
      const t0 = performance.now();
      let next = 0;
      let lastDrop = 0;
      const drop = (e: PointerEvent, force = false) => {
        const now = (performance.now() - t0) / 1000;
        if (!force && now - lastDrop < 0.12) return;
        lastDrop = now;
        const r = host.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
        drops[next * 3] = x; drops[next * 3 + 1] = y; drops[next * 3 + 2] = now;
        next = (next + 1) % 8;
      };
      const move = (e: PointerEvent) => drop(e);
      const down = (e: PointerEvent) => drop(e, true);
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerdown", down);
      let raf = 0;
      const loop = (now: number) => { raf = requestAnimationFrame(loop); program.uniforms.uTime.value = (now - t0) / 1000; renderer.render({ scene: mesh }); };
      raf = requestAnimationFrame(loop);
      stop = () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); host.removeEventListener("pointermove", move); host.removeEventListener("pointerdown", down); gl.getExtension("WEBGL_lose_context")?.loseContext(); gl.canvas.remove(); };
    }).catch(() => undefined);
    return () => { cancelled = true; stop(); };
  }, [src]);
  return (
    <div ref={ref} className="ripple-photo" data-cursor="SPLASH">
      <Image src={src} alt={alt} width={520} height={520} sizes="(max-width: 860px) 80vw, 440px" />
    </div>
  );
}
