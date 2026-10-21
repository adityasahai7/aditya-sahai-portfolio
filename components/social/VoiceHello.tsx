"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sfx } from "@/components/fun/sound";

const MAX = 10;

/** Record a 10-second voice note for Aditya. It goes to his private admin page only. */
export function VoiceHello() {
  const [state, setState] = useState<"idle" | "recording" | "ready" | "sending" | "sent" | "error">("idle");
  const [secs, setSecs] = useState(0);
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  const rec = useRef<MediaRecorder | null>(null);
  const blob = useRef<Blob | null>(null);
  const timer = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => { window.clearInterval(timer.current); rec.current?.stream.getTracks().forEach((t) => t.stop()); }, []);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
      const r = new MediaRecorder(stream, mime ? { mimeType: mime, audioBitsPerSecond: 48_000 } : undefined);
      const chunks: Blob[] = [];
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = () => { stream.getTracks().forEach((t) => t.stop()); blob.current = new Blob(chunks, { type: r.mimeType }); setUrl(URL.createObjectURL(blob.current)); setState("ready"); };
      r.start();
      rec.current = r;
      setSecs(0); setState("recording"); sfx.click();
      const t0 = Date.now();
      timer.current = window.setInterval(() => { const s = (Date.now() - t0) / 1000; setSecs(s); if (s >= MAX) stop(); }, 100);
    } catch { setState("error"); setMsg("Mic blocked. Allow microphone access and try again."); }
  }
  function stop() { window.clearInterval(timer.current); if (rec.current?.state === "recording") rec.current.stop(); }
  async function send() {
    if (!blob.current) return;
    setState("sending");
    const b64 = await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).split(",")[1] ?? ""); fr.readAsDataURL(blob.current!); });
    const r = await fetch("/api/voice", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ audio: b64, mime: blob.current.type || "audio/webm", duration: Math.round(secs), name: nameRef.current?.value }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { setState("sent"); setMsg(j.message); sfx.pop(); } else { setState("error"); setMsg(j.error ?? "Couldn't send it."); }
  }

  return (
    <div className="voice">
      <p className="voice-title">🎙️ Or just say hi. Out loud.</p>
      <p className="voice-sub">Record up to {MAX} seconds. It lands in my private inbox. Nobody else hears it.</p>
      <div className="voice-row">
        {state === "recording" ? (
          <motion.button type="button" className="voice-btn is-rec" onClick={stop} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 0.9, repeat: Infinity }} aria-label="Stop recording">⏹</motion.button>
        ) : (
          <button type="button" className="voice-btn" onClick={start} disabled={state === "sending" || state === "sent"} aria-label="Start recording" data-cursor="RECORD">🎙️</button>
        )}
        <div className="voice-meter"><motion.span animate={{ width: `${Math.min(100, (secs / MAX) * 100)}%` }} /></div>
        <span className="voice-secs">{secs.toFixed(1)}s</span>
      </div>
      {state === "ready" && (
        <div className="voice-ready">
          <audio controls src={url} />
          <input ref={nameRef} className="voice-name" maxLength={40} placeholder="Your name (optional)" />
          <button type="button" className="btn btn-red btn-md" onClick={send}>Send to Aditya 📨</button>
          <button type="button" className="btn btn-paper btn-md" onClick={start}>Re-record</button>
        </div>
      )}
      {state === "sending" && <p className="form-msg">Sending… 📨</p>}
      {(state === "sent" || state === "error") && <p className={`form-msg ${state === "error" ? "is-error" : "is-ok"}`} role="status">{msg}</p>}
    </div>
  );
}
