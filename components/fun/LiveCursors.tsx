"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { unlock } from "./achievements";
import { sfx } from "./sound";

type Peer = { id: string; x: number; y: number; emoji: string; color: string; city: string | null; path: string; at: number };
const EMOJIS = ["🦊", "🐼", "🐸", "🦄", "🐙", "🐯", "🐧", "🐨", "🦁", "🐵", "🐶", "🐱"];
const COLORS = ["#F18179", "#9CE8F2", "#F5D46D", "#BDEFD5", "#E56AA6", "#38A997"];

/**
 * Live visitors: other people on the site right now appear as little cursors with
 * an animal + rough city. Click one to wave. No names, no data stored. Supabase Realtime broadcast.
 */
export function LiveCursors() {
  const pathname = usePathname();
  const [peers, setPeers] = useState<Record<string, Peer>>({});
  const [waves, setWaves] = useState<{ id: number; x: number; y: number; from: string }[]>([]);
  const channel = useRef<RealtimeChannel | null>(null);
  const me = useRef({ id: "", emoji: "", color: "", city: null as string | null });
  const path = useRef(pathname);
  useEffect(() => { path.current = pathname; }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup = () => {};
    void (async () => {
      const res = await fetch("/api/live-config").catch(() => null);
      const data = res?.ok ? ((await res.json()) as { config: { url: string; key: string } | null; city: string | null }) : null;
      if (!data?.config || cancelled) return;
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(data.config.url, data.config.key, { auth: { persistSession: false } });
      me.current = { id: crypto.randomUUID().slice(0, 8), emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], color: COLORS[Math.floor(Math.random() * COLORS.length)], city: data.city };
      const ch = supabase.channel("site-cursors", { config: { broadcast: { self: false } } });
      ch.on("broadcast", { event: "move" }, ({ payload }) => {
        const p = payload as Peer;
        setPeers((all) => ({ ...all, [p.id]: { ...p, at: Date.now() } }));
      })
        .on("broadcast", { event: "leave" }, ({ payload }) => setPeers((all) => { const next = { ...all }; delete next[(payload as { id: string }).id]; return next; }))
        .on("broadcast", { event: "wave" }, ({ payload }) => {
          const w = payload as { to: string; from: string; x: number; y: number };
          if (w.to !== me.current.id) return;
          const id = Date.now();
          setWaves((all) => [...all, { id, x: w.x, y: w.y, from: w.from }]);
          sfx.pop();
          window.setTimeout(() => setWaves((all) => all.filter((x) => x.id !== id)), 2600);
        })
        .subscribe();
      channel.current = ch;

      let last = 0;
      const send = (x: number, y: number) => {
        const now = performance.now();
        if (now - last < 70) return;
        last = now;
        void ch.send({ type: "broadcast", event: "move", payload: { ...me.current, x: x / window.innerWidth, y: (y + window.scrollY) / document.documentElement.scrollHeight, path: path.current } });
      };
      const move = (e: PointerEvent) => send(e.clientX, e.clientY);
      window.addEventListener("pointermove", move, { passive: true });
      const prune = window.setInterval(() => setPeers((all) => Object.fromEntries(Object.entries(all).filter(([, p]) => Date.now() - p.at < 15_000))), 4000);
      const bye = () => void ch.send({ type: "broadcast", event: "leave", payload: { id: me.current.id } });
      window.addEventListener("pagehide", bye);
      cleanup = () => { bye(); window.removeEventListener("pointermove", move); window.removeEventListener("pagehide", bye); window.clearInterval(prune); void supabase.removeChannel(ch); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);

  const here = Object.values(peers).filter((p) => p.path === pathname);
  const total = Object.keys(peers).length;
  const [docH, setDocH] = useState(1);
  useEffect(() => {
    const measure = () => setDocH(document.documentElement.scrollHeight);
    const first = window.setTimeout(measure, 0);
    const id = window.setInterval(measure, 3000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, [pathname]);

  function wave(p: Peer) {
    void channel.current?.send({ type: "broadcast", event: "wave", payload: { to: p.id, from: `${me.current.emoji}${me.current.city ? ` from ${me.current.city}` : ""}`, x: 0.5, y: 0.2 } });
    unlock("wave");
    sfx.pop();
  }

  return (
    <>
      <div className="live-layer" aria-hidden="true">
        {here.map((p) => (
          <motion.button key={p.id} type="button" className="live-cursor" style={{ ["--c" as string]: p.color }} animate={{ left: `${p.x * 100}%`, top: p.y * docH }} transition={{ type: "spring", stiffness: 300, damping: 30 }} onClick={() => wave(p)} title="Wave 👋" tabIndex={-1}>
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 2l7 19 2.5-7.5L20 11z" fill={p.color} stroke="#202727" strokeWidth="2" strokeLinejoin="round" /></svg>
            <span>{p.emoji} {p.city ? `someone from ${p.city}` : "someone"} · wave 👋</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {total > 0 && (
          <motion.div className="live-count" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <i className="clock-dot" />👀 {total} {total === 1 ? "other person is" : "other people are"} here right now
          </motion.div>
        )}
        {waves.map((w) => (
          <motion.div key={w.id} className="wave-toast" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: [0, -20, 20, -20, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            👋 <b>{w.from}</b> waved at you!
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
