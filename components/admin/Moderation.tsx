"use client";

import { useState } from "react";

type WallNote = { id: string; emoji: string; note: string; name: string | null; status: string; created_at: string };
type Voice = { id: string; name: string | null; mime: string; audio_base64: string; duration_seconds: number | null; status: string; created_at: string };

async function act(kind: "wall" | "voice", id: string, status: string) {
  const r = await fetch("/api/admin/moderate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, id, status }) });
  return r.ok;
}

export function Moderation({ wall, voices }: { wall: WallNote[]; voices: Voice[] }) {
  const [notes, setNotes] = useState(wall);
  const [vs, setVs] = useState(voices);
  return (
    <div className="composer">
      <h2 className="h-md">📌 Wall notes waiting · {notes.filter((n) => n.status === "pending").length}</h2>
      {notes.filter((n) => n.status === "pending").map((n) => (
        <div key={n.id} className="mod-row">
          <span style={{ fontSize: 28 }}>{n.emoji}</span>
          <span style={{ flex: 1 }}><b>{n.note}</b>{n.name ? <small> · {n.name}</small> : null}</span>
          <button type="button" className="btn btn-mint btn-sm" onClick={async () => { if (await act("wall", n.id, "approved")) setNotes((x) => x.map((y) => (y.id === n.id ? { ...y, status: "approved" } : y))); }}>✅ Approve</button>
          <button type="button" className="btn btn-paper btn-sm" onClick={async () => { if (await act("wall", n.id, "rejected")) setNotes((x) => x.map((y) => (y.id === n.id ? { ...y, status: "rejected" } : y))); }}>🗑️ Reject</button>
        </div>
      ))}
      <h2 className="h-md" style={{ marginTop: 20 }}>🎙️ Voice hellos · {vs.filter((v) => v.status === "new").length} new</h2>
      {vs.map((v) => (
        <div key={v.id} className="mod-row">
          <span style={{ flex: 1 }}><b>{v.name || "Someone"}</b> <small>· {new Date(v.created_at).toLocaleString("en-IN")} · {v.duration_seconds ?? "?"}s {v.status === "new" ? "· 🆕" : ""}</small></span>
          <audio controls src={`data:${v.mime};base64,${v.audio_base64}`} onPlay={async () => { if (v.status === "new" && (await act("voice", v.id, "heard"))) setVs((x) => x.map((y) => (y.id === v.id ? { ...y, status: "heard" } : y))); }} />
        </div>
      ))}
      {!vs.length && <p>No voice notes yet.</p>}
    </div>
  );
}
