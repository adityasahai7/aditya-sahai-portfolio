"use client";

import { motion } from "framer-motion";

const ORBS = [
  { w: 900,  h: 900,  x: "-15%", y: "-10%", color: "rgba(110,158,255,0.055)", dur: 22, delay: 0 },
  { w: 600,  h: 600,  x: "75%",  y: "-5%",  color: "rgba(123,94,167,0.065)",  dur: 18, delay: 3 },
  { w: 500,  h: 500,  x: "60%",  y: "65%",  color: "rgba(77,255,223,0.040)",  dur: 25, delay: 7 },
  { w: 350,  h: 350,  x: "10%",  y: "70%",  color: "rgba(110,158,255,0.045)", dur: 20, delay: 4 },
  { w: 250,  h: 250,  x: "42%",  y: "38%",  color: "rgba(196,168,255,0.035)", dur: 16, delay: 9 },
];

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  orb.w,
            height: orb.h,
            left:   orb.x,
            top:    orb.y,
            background: `radial-gradient(circle at 40% 40%, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(2px)",
          }}
          animate={{
            x:     [0, 30, -20, 10, 0],
            y:     [0, -25, 15, -10, 0],
            scale: [1, 1.06, 0.97, 1.03, 1],
          }}
          transition={{
            duration:   orb.dur,
            delay:      orb.delay,
            repeat:     Infinity,
            ease:       "easeInOut",
            repeatType: "loop",
          }}
        />
      ))}

      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(110,158,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,158,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Corner vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 0% 0%, rgba(3,3,10,0.6), transparent 50%),
            radial-gradient(ellipse 100% 100% at 100% 100%, rgba(3,3,10,0.6), transparent 50%)
          `,
        }}
      />
    </div>
  );
}
