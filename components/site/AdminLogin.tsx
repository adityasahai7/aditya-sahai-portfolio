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
  return <form className="ice-form" onSubmit={submit}><div><p className="ice-section-label">PROTECTED AREA</p><h1>Studio Admin</h1><p>Enter the private dashboard password.</p></div><label><span>Password</span><input type="password" name="password" autoComplete="current-password" required /></label><button className="ice-button ice-button-primary" type="submit" disabled={loading}>{loading ? "Checking…" : "Open Dashboard"}</button>{error ? <p className="ice-form-message is-error" role="alert">{error}</p> : null}</form>;
}

export function AdminLogout() {
  const router = useRouter();
  async function logout() { await fetch("/api/admin/session", { method: "DELETE" }); router.refresh(); }
  return <button className="ice-button ice-button-light" type="button" onClick={logout}>Sign out</button>;
}
