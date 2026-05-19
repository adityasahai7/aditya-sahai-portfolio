import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New palette
        void:    "#03030A",
        surface: "#07071A",
        ink:     "#EEEEF5",
        p1:      "#7B5EA7",
        p2:      "#9B6FD4",
        p3:      "#6E9EFF",
        p4:      "#4DFFDF",
        accent:  "#6E9EFF",
        warm:    "#C4A8FF",
        signal:  "#4DFFDF",
        // Extended accents
        orange:  "#FF6B35",
        coral:   "#FF4F4F",
        emerald: "#00E87A",
        // Legacy aliases
        bg:      "#03030A",
        smoke:   "#03030A",
        paper:   "#07071A",
        bone:    "#EEEEF5",
        tomato:  "#FF4444",
        acid:    "#6E9EFF",
        cobalt:  "#6E9EFF",
        butter:  "#C4A8FF",
        lilac:   "#C4A8FF",
      },
      fontFamily: {
        display:   ["var(--font-display)", "Inter", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        body:      ["var(--font-body)", "Inter", "sans-serif"],
        grotesk:   ["var(--font-body)", "Inter", "sans-serif"],
        mono:      ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(80px, 13vw, 220px)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(56px, 8vw, 130px)",  { lineHeight: "0.90", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(40px, 5.5vw, 90px)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(28px, 3vw, 52px)",   { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "body-xl":    ["clamp(20px, 1.8vw, 26px)", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
        "body-lg":    ["clamp(17px, 1.4vw, 20px)", { lineHeight: "1.65", letterSpacing: "0" }],
        "label":      ["11px",                      { lineHeight: "1",    letterSpacing: "0.18em" }],
        "marquee":    ["clamp(70px, 10vw, 160px)",  { lineHeight: "1",    letterSpacing: "-0.02em" }],
        // Legacy
        "hero":       ["clamp(72px, 11vw, 180px)",  { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "section":    ["clamp(48px, 7vw, 96px)",    { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "card-title": ["clamp(28px, 2.5vw, 44px)",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "body-base":  ["clamp(17px, 1.4vw, 19px)",  { lineHeight: "1.65", letterSpacing: "0" }],
        "eyebrow":    ["12px",                       { lineHeight: "1",    letterSpacing: "0.15em" }],
        "tag":        ["11px",                       { lineHeight: "1",    letterSpacing: "0.10em" }],
        "btn":        ["14px",                       { lineHeight: "1",    letterSpacing: "0.08em" }],
      },
      borderRadius: {
        "card":    "12px",
        "card-lg": "12px",
        "pill":    "999px",
        "btn":     "10px",
      },
      maxWidth: { "container": "1280px" },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #7B5EA7 0%, #6E9EFF 50%, #4DFFDF 100%)",
        "grad-text":    "linear-gradient(120deg, #C4A8FF 0%, #FFFFFF 45%, #8BC4FF 100%)",
        "grad-cta":     "linear-gradient(135deg, #6E9EFF, #4DFFDF)",
      },
      keyframes: {
        "pulse-dot": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%":     { opacity: "0.7", transform: "scale(0.85)" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":     { transform: "translateY(-14px) rotate(0.5deg)" },
          "66%":     { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.08)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-scroll": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "ticker": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "scan-line": {
          from: { transform: "translateY(-100%)" },
          to:   { transform: "translateY(100vh)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bob": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        "grain": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%":     { transform: "translate(-2%,-3%)" },
          "20%":     { transform: "translate(3%,2%)" },
          "30%":     { transform: "translate(-1%,4%)" },
          "40%":     { transform: "translate(4%,-1%)" },
          "50%":     { transform: "translate(-3%,1%)" },
          "60%":     { transform: "translate(2%,3%)" },
          "70%":     { transform: "translate(-4%,-2%)" },
          "80%":     { transform: "translate(1%,-3%)" },
          "90%":     { transform: "translate(3%,4%)" },
        },
      },
      animation: {
        "pulse-dot":      "pulse-dot 2s ease-in-out infinite",
        "float":          "float 6s ease-in-out infinite",
        "glow-pulse":     "glow-pulse 3s ease-in-out infinite",
        "fade-up":        "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "marquee-scroll": "marquee-scroll 30s linear infinite",
        "ticker":         "ticker 20s linear infinite",
        "scan-line":      "scan-line 7s linear infinite",
        "shimmer":        "shimmer 2.5s linear infinite",
        "bob":            "bob 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "expo":       "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-out":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "power4":     "cubic-bezier(0.22, 1, 0.36, 1)",
        "power4-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth":     "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
