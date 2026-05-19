"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { to: 50,  suffix: "+",    prefix: "",  label: "Projects Delivered" },
  { to: 4,   suffix: " days", prefix: "~", label: "Avg. Delivery Time"  },
  { to: 12,  suffix: "h",    prefix: "<", label: "Response Time"       },
  { to: 100, suffix: "%",    prefix: "",  label: "Client Retention"    },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

function Counter({
  to,
  suffix,
  prefix,
  trigger,
}: {
  to: number;
  suffix: string;
  prefix: string;
  trigger: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger || !nodeRef.current) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EXPO,
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = prefix + Math.round(value) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [trigger, to, suffix, prefix]);

  return <span ref={nodeRef} suppressHydrationWarning>{prefix}0{suffix}</span>;
}

export default function StatsBar() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative bg-transparent py-16 md:py-24 overflow-hidden"
      aria-label="Stats"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EXPO }}
            >
              <div
                className="font-editorial italic leading-none"
                style={{
                  fontSize: "clamp(52px, 6.5vw, 92px)",
                  background:
                    "linear-gradient(135deg, #F2F2F4 0%, #6E9EFF 55%, #C4A8FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter
                  to={stat.to}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  trigger={inView}
                />
              </div>
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink/45">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 premium-divider-animated" />
    </section>
  );
}
