"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { LINKS } from "@/lib/content";
import { Label, MaskLines } from "@/components/motion/kit";
import { unlock } from "@/components/fun/achievements";
import { sfx } from "@/components/fun/sound";

// Isometric projection helpers (x → right-down, y → left-down, z → up).
const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
const P = (x: number, y: number, z: number) => [(x - y) * C, (x + y) * S - z] as const;
const pts = (list: (readonly [number, number])[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
const INK = "#202727";

function Box({ x, y, z, w, d, h, top, left, right }: { x: number; y: number; z: number; w: number; d: number; h: number; top: string; left: string; right: string }) {
  const t = pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]);
  const l = pts([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)]);
  const r = pts([P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)]);
  return (
    <g stroke={INK} strokeWidth={2.2} strokeLinejoin="round">
      <polygon points={l} fill={left} />
      <polygon points={r} fill={right} />
      <polygon points={t} fill={top} />
    </g>
  );
}

type Item = { id: string; label: string; emoji: string; href: string; ext?: boolean; at: readonly [number, number]; render: () => React.ReactNode };

export function Desk() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const clicked = useRef(new Set<string>());

  const items: Item[] = [
    { id: "laptop", label: "My builds", emoji: "💻", href: "/work", at: P(150, 120, 90), render: () => (<>
      <Box x={110} y={95} z={60} w={110} d={70} h={5} top="#e9e3d6" left="#cfc7b6" right="#ddd5c4" />
      <polygon points={pts([P(110, 95, 65), P(220, 95, 65), P(220, 95, 140), P(110, 95, 140)])} fill="#2b3333" stroke={INK} strokeWidth={2.2} />
      <polygon points={pts([P(117, 95, 72), P(213, 95, 72), P(213, 95, 133), P(117, 95, 133)])} fill="#9CE8F2" stroke={INK} strokeWidth={1.5} />
      <text x={P(165, 95, 98)[0]} y={P(165, 95, 98)[1]} fontSize={22} textAnchor="middle">🛠️</text>
    </>) },
    { id: "camera", label: "Beyond Default on YouTube", emoji: "🎥", href: LINKS.youtube, ext: true, at: P(300, 60, 150), render: () => (<>
      <line x1={P(300, 70, 60)[0]} y1={P(300, 70, 60)[1]} x2={P(300, 70, 120)[0]} y2={P(300, 70, 120)[1]} stroke={INK} strokeWidth={4} />
      <line x1={P(285, 60, 60)[0]} y1={P(285, 60, 60)[1]} x2={P(300, 70, 120)[0]} y2={P(300, 70, 120)[1]} stroke={INK} strokeWidth={3} />
      <line x1={P(315, 82, 60)[0]} y1={P(315, 82, 60)[1]} x2={P(300, 70, 120)[0]} y2={P(300, 70, 120)[1]} stroke={INK} strokeWidth={3} />
      <Box x={278} y={52} z={120} w={46} d={34} h={34} top="#F18179" left="#d9665e" right="#e8746b" />
      <circle cx={P(301, 86, 137)[0]} cy={P(301, 86, 137)[1]} r={12} fill="#202727" stroke={INK} strokeWidth={2} />
      <circle cx={P(301, 86, 137)[0]} cy={P(301, 86, 137)[1]} r={5} fill="#9CE8F2" />
      <circle cx={P(318, 54, 158)[0]} cy={P(318, 54, 158)[1]} r={4} fill="#ff4b3e" />
    </>) },
    { id: "books", label: "My writing", emoji: "📚", href: "/articles", at: P(60, 220, 110), render: () => (<>
      <Box x={30} y={190} z={60} w={70} d={50} h={16} top="#F5D46D" left="#d9b84f" right="#e8c75e" />
      <Box x={35} y={194} z={76} w={62} d={44} h={14} top="#E56AA6" left="#c5508a" right="#d65e98" />
      <Box x={28} y={192} z={90} w={68} d={46} h={15} top="#BDEFD5" left="#9fd3b8" right="#ade1c6" />
    </>) },
    { id: "chai", label: "Say hi", emoji: "☕", href: "/contact", at: P(250, 210, 110), render: () => (<>
      <Box x={235} y={195} z={60} w={30} d={30} h={34} top="#5a3b25" left="#e9e3d6" right="#fffaf2" />
      <path d={`M ${P(265, 205, 85)[0]} ${P(265, 205, 85)[1]} q 14 2 6 16`} fill="none" stroke={INK} strokeWidth={3} />
      {[0, 1, 2].map((i) => (
        <motion.path key={i} d={`M ${P(245 + i * 6, 205, 100)[0]} ${P(245 + i * 6, 205, 100)[1]} c -6 -10 6 -14 0 -26`} fill="none" stroke="#9aa" strokeWidth={2.5} strokeLinecap="round"
          animate={{ opacity: [0, 0.8, 0], y: [0, -10, -20] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6 }} />
      ))}
    </>) },
    { id: "plant", label: "Thinking Beyond Club", emoji: "🪴", href: "/thinking-beyond-club", at: P(20, 60, 160), render: () => (<>
      <Box x={10} y={40} z={60} w={34} d={34} h={34} top="#5a3b25" left="#c96b4f" right="#d97b5f" />
      {[[-18, -40], [10, -52], [26, -34], [-4, -60]].map(([dx, dy], i) => {
        const [bx, by] = P(27, 57, 94);
        return <ellipse key={i} cx={bx + dx} cy={by + dy} rx={10} ry={22} fill={i % 2 ? "#38A997" : "#BDEFD5"} stroke={INK} strokeWidth={2} transform={`rotate(${dx * 1.5} ${bx + dx} ${by + dy})`} />;
      })}
    </>) },
    { id: "chart", label: "FRROST Media", emoji: "📈", href: "/frrost-media", at: P(210, 20, 190), render: () => (<>
      <polygon points={pts([P(180, 10, 90), P(260, 10, 90), P(260, 10, 170), P(180, 10, 170)])} fill="#FFFAF2" stroke={INK} strokeWidth={2.5} />
      <polyline points={pts([P(190, 10, 105), P(205, 10, 125), P(220, 10, 118), P(235, 10, 145), P(250, 10, 160)])} fill="none" stroke="#38A997" strokeWidth={4} strokeLinecap="round" />
      <line x1={P(220, 10, 170)[0]} y1={P(220, 10, 170)[1]} x2={P(220, 10, 180)[0]} y2={P(220, 10, 180)[1]} stroke={INK} strokeWidth={2} />
    </>) },
    { id: "mic", label: "Voice hello", emoji: "🎙️", href: "/contact", at: P(330, 180, 140), render: () => (<>
      <Box x={318} y={170} z={60} w={26} d={26} h={6} top="#2b3333" left="#202727" right="#2b3333" />
      <line x1={P(331, 183, 66)[0]} y1={P(331, 183, 66)[1]} x2={P(331, 183, 110)[0]} y2={P(331, 183, 110)[1]} stroke={INK} strokeWidth={4} />
      <ellipse cx={P(331, 183, 122)[0]} cy={P(331, 183, 122)[1]} rx={13} ry={18} fill="#E56AA6" stroke={INK} strokeWidth={2.5} />
    </>) },
    { id: "letter", label: "The Letter", emoji: "💌", href: "/newsletter", at: P(160, 260, 80), render: () => (<>
      <polygon points={pts([P(130, 240, 61), P(195, 240, 61), P(195, 285, 61), P(130, 285, 61)])} fill="#FFFAF2" stroke={INK} strokeWidth={2.2} />
      <polyline points={pts([P(130, 240, 61), P(162, 262, 61), P(195, 240, 61)])} fill="none" stroke={INK} strokeWidth={2} />
      <circle cx={P(162, 262, 61)[0]} cy={P(162, 262, 61)[1]} r={6} fill="#F18179" stroke={INK} strokeWidth={1.5} />
    </>) },
  ];

  function go(it: Item) {
    sfx.pop();
    clicked.current.add(it.id);
    if (clicked.current.size >= 3) unlock("desk");
    if (it.ext) window.open(it.href, "_blank", "noopener");
    else router.push(it.href);
  }

  const vb = "-300 -150 640 470";
  return (
    <section className="desk" data-room="cyan">
      <div className="wrap">
        <Label>WELCOME TO MY DESK 🖥️</Label>
        <MaskLines lines={["CLICK", "ANYTHING."]} className="h-xl" accent={1} />
        <p className="lead" style={{ marginTop: 14 }}>This is where it all happens. Every object goes somewhere.</p>
      </div>
      <div className="desk-stage">
        <motion.svg viewBox={vb} className="desk-svg" initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 14 }}>
          <Box x={0} y={0} z={20} w={360} d={300} h={40} top="#F5D46D" left="#d9b84f" right="#e8c75e" />
          {[[10, 10], [340, 10], [10, 280], [340, 280]].map(([x, y], i) => <Box key={i} x={x} y={y} z={-90} w={12} d={12} h={110} top="#202727" left="#202727" right="#2b3333" />)}
          {items.map((it) => (
            <motion.g key={it.id} className="desk-item" onPointerEnter={() => { setHover(it.id); sfx.click(); }} onPointerLeave={() => setHover(null)} onClick={() => go(it)}
              whileHover={{ y: -10 }} animate={hover === it.id ? { rotate: [0, -3, 3, 0] } : { rotate: 0 }} transition={{ y: { type: "spring", stiffness: 300, damping: 12 }, rotate: { duration: 0.45 } }} style={{ cursor: "pointer" }} role="link" aria-label={it.label} tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && go(it)}>
              {it.render()}
            </motion.g>
          ))}
          <AnimatePresence>
            {hover && (() => {
              const it = items.find((x) => x.id === hover)!;
              return (
                <motion.g key={hover} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} pointerEvents="none">
                  <rect x={it.at[0] - 90} y={it.at[1] - 58} width={180} height={34} rx={17} fill="#FFFAF2" stroke={INK} strokeWidth={2.5} />
                  <text x={it.at[0]} y={it.at[1] - 36} textAnchor="middle" fontSize={15} fontWeight={800} fill={INK} fontFamily="var(--body)">{it.emoji} {it.label} →</text>
                </motion.g>
              );
            })()}
          </AnimatePresence>
        </motion.svg>
      </div>
    </section>
  );
}
