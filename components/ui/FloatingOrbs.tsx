"use client";

import { motion } from "framer-motion";

interface FloatingOrbsProps {
  count?: number;
  intensity?: "low" | "medium" | "high";
}

const ORB_CONFIGS = [
  { size: 320, x: "5%",  y: "10%", color: "#6E9EFF", dur: 14, delay: 0   },
  { size: 200, x: "85%", y: "8%",  color: "#7B5EA7", dur: 18, delay: 2   },
  { size: 160, x: "70%", y: "75%", color: "#4DFFDF", dur: 12, delay: 5   },
  { size: 120, x: "15%", y: "80%", color: "#FF6B35", dur: 16, delay: 3   },
  { size: 80,  x: "50%", y: "45%", color: "#C4A8FF", dur: 10, delay: 7   },
  { size: 100, x: "60%", y: "30%", color: "#00E87A", dur: 13, delay: 4.5 },
];

export default function FloatingOrbs({ count = 3, intensity = "medium" }: FloatingOrbsProps) {
  const opacityMap = { low: 0.06, medium: 0.10, high: 0.16 };
  const op   = opacityMap[intensity];
  const orbs = ORB_CONFIGS.slice(0, count);

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => {
        const alpha = Math.round(op * 255).toString(16).padStart(2, "0");
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  orb.size,
              height: orb.size,
              left:   orb.x,
              top:    orb.y,
              background: `radial-gradient(circle at 35% 35%, ${orb.color}${alpha} 0%, transparent 70%)`,
              border: `1px solid ${orb.color}18`,
            }}
            animate={{
              y:     [0, -18, 8, -12, 0],
              x:     [0, 10, -6, 4, 0],
              scale: [1, 1.04, 0.98, 1.02, 1],
            }}
            transition={{
              duration:   orb.dur,
              delay:      orb.delay,
              repeat:     Infinity,
              ease:       "easeInOut",
              repeatType: "loop",
            }}
          />
        );
      })}
    </div>
  );
}
