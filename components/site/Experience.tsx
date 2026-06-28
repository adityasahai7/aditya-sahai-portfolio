"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function trackSiteEvent(eventName: string, metadata: Record<string, string> = {}) {
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, page: window.location.pathname, metadata }),
    keepalive: true,
  }).catch(() => undefined);
}

export function SiteExperience() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("as-loader-seen")) return;
    sessionStorage.setItem("as-loader-seen", "true");
    const revealTimer = window.setTimeout(() => setShowLoader(true), 0);
    trackSiteEvent("loader_seen");
    const timer = window.setTimeout(() => setShowLoader(false), 900);
    return () => { window.clearTimeout(revealTimer); window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setRouteLoading(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.origin !== window.location.origin || link.pathname === window.location.pathname) return;
      setRouteLoading(true);
      window.setTimeout(() => setRouteLoading(false), 1400);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className={`ice-route-progress ${routeLoading ? "is-active" : ""}`} aria-hidden="true" />
      {showLoader ? (
        <div className="ice-preloader" role="status" aria-label="Loading Aditya Sahai website">
          <div className="ice-preloader-inner">
            <span className="ice-preloader-mark">AS</span>
            <p>BLACK-ICE COMMAND ROOM</p>
            <div className="ice-preloader-line"><i /></div>
            <div className="ice-preloader-signals"><span /><span /><span /><span /></div>
            <div className="ice-preloader-phrases" aria-hidden="true"><b>INITIALIZING SIGNAL</b><b>LOADING OPERATOR SYSTEM</b><b>BUILDING THE STACK</b><b>READY</b></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function TrackedExternalLink({ href, eventName, className, children }: { href: string; eventName: string; className?: string; children: React.ReactNode }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={() => trackSiteEvent(eventName)}>{children}</a>;
}

export function TrackedInternalLink({ href, eventName, className, children }: { href: string; eventName: string; className?: string; children: React.ReactNode }) {
  return <Link href={href} className={className} onClick={() => trackSiteEvent(eventName)}>{children}</Link>;
}
