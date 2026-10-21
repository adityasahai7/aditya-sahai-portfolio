"use client";

/** Tiny synthesized toy sounds (no audio files). Off by default; the dock toggles them. */
let ctx: AudioContext | null = null;
let enabled = false;

export function soundOn() { return enabled; }
export function setSound(on: boolean) {
  enabled = on;
  try { localStorage.setItem("as-sound", on ? "1" : "0"); } catch { /* ignore */ }
  if (on) void audio()?.resume();
}
export function loadSoundPref() {
  try { enabled = localStorage.getItem("as-sound") === "1"; } catch { enabled = false; }
  return enabled;
}

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain = 0.12, slide = 0) {
  if (!enabled) return;
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export const sfx = {
  pop: () => tone(520 + Math.random() * 260, 0.12, "sine", 0.16, 380),
  click: () => tone(1200, 0.04, "square", 0.04),
  switchOn: () => { tone(300, 0.08, "triangle", 0.12, 400); setTimeout(() => tone(900, 0.06, "sine", 0.08), 70); },
  switchOff: () => tone(700, 0.12, "triangle", 0.12, -500),
  boing: () => tone(180, 0.35, "sine", 0.18, 260),
};
