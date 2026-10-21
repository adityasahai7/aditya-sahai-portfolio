"use client";

import Link from "next/link";
import { useState } from "react";

export function Unsubscribe({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function go() {
    setState("loading");
    const r = await fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`, { method: "POST" });
    setState(r.ok ? "done" : "error");
  }
  if (state === "done") return (<><p style={{ fontSize: 80, margin: 0 }}>👋</p><h1 className="h-xl">YOU&apos;RE OUT.</h1><p className="lead" style={{ margin: "16px auto 30px" }}>No more letters. No hard feelings. You can always come back.</p><Link href="/" className="btn btn-yellow btn-lg">🏠 Back home</Link></>);
  return (
    <>
      <p style={{ fontSize: 80, margin: 0 }}>🥲</p>
      <h1 className="h-xl">LEAVING THE LETTER?</h1>
      <p className="lead" style={{ margin: "16px auto 30px" }}>One tap and you&apos;re off the list. No more Sunday emails.</p>
      {token ? <button type="button" className="btn btn-ink btn-lg" onClick={go} disabled={state === "loading"}>{state === "loading" ? "Unsubscribing…" : "Yes, unsubscribe me"}</button> : <p className="lead">This link is missing its token. Reply to any letter and I&apos;ll remove you by hand.</p>}
      {state === "error" && <p className="form-msg is-error" role="alert">That didn&apos;t work. Reply to any letter (or email adityasahai037@gmail.com) and I&apos;ll remove you.</p>}
    </>
  );
}
