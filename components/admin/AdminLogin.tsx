"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (response.ok) { router.refresh(); return; }
    const body = await response.json(); setError(body.error || "Could not sign in."); setLoading(false);
  }
  return <form className="contact-form" style={{ maxWidth: 460 }} onSubmit={submit}><p className="label">🔒 PROTECTED AREA</p><h1 className="h-md">Studio Admin</h1><label className="field"><span>Password</span><input type="password" name="password" autoComplete="current-password" required /></label><button className="btn btn-ink btn-lg" type="submit" disabled={loading}>{loading ? "Checking…" : "Open dashboard 🔑"}</button>{error ? <p className="form-msg is-error" role="alert">{error}</p> : null}</form>;
}

export function AdminLogout() {
  const router = useRouter();
  async function logout() { await fetch("/api/admin/session", { method: "DELETE" }); router.refresh(); }
  return <button className="btn btn-paper btn-md" type="button" onClick={logout}>Sign out 👋</button>;
}
