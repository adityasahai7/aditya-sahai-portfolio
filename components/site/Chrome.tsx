"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, socialLinks } from "@/lib/site-content";
import { ButtonLink } from "@/components/site/UI";
import { TrackedExternalLink } from "@/components/site/Experience";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="ice-nav-wrap">
      <nav className="ice-nav ice-container" aria-label="Primary navigation">
        <Link className="ice-wordmark" href="/" onClick={() => setOpen(false)} aria-label="Aditya Sahai home">
          <span>AS</span>
          <b>Aditya Sahai</b>
        </Link>
        <button
          className="ice-menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div className={`ice-nav-links ${open ? "is-open" : ""}`} id="mobile-navigation">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              className={pathname === href ? "is-active" : ""}
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <ButtonLink href="/contact">Send a Note</ButtonLink>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const footerLinks = [
    ["Home", "/"],
    ...navigation,
    ["Beyond Default", "/beyond-default"],
    ["Thinking Beyond Club", "/thinking-beyond-club"],
    ["Privacy", "/privacy"],
    ["Terms", "/terms"],
  ] as const;

  return (
    <footer className="ice-footer">
      <div className="ice-container ice-footer-grid">
        <div className="ice-footer-lead">
          <span className="ice-footer-mark">AS</span>
          <h2>Thinking Beyond Average.</h2>
          <p>AI made average output free. Taste is the moat.</p>
          <small>Aditya Sahai · Creative AI Operator · India</small>
        </div>
        <div>
          <p className="ice-footer-label">Navigate</p>
          <div className="ice-footer-links">
            {footerLinks.map(([label, href]) => <Link href={href} key={`${label}-${href}`}>{label}</Link>)}
          </div>
        </div>
        <div>
          <p className="ice-footer-label">Connect</p>
          <div className="ice-footer-links">
            {socialLinks.map(([label, href]) => <a href={href} key={label} target="_blank" rel="noreferrer">{label}</a>)}
            <TrackedExternalLink href={EXTERNAL_LINKS.frrostMedia} eventName="frrost_visit_click">FRROST Media — Studio Layer</TrackedExternalLink>
            <a href="mailto:adityasahai037@gmail.com">Email</a>
            <a href="https://wa.me/916207126091" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="ice-container ice-footer-bottom"><span>© {new Date().getFullYear()} Aditya Sahai</span><span>Built in public from India.</span></div>
    </footer>
  );
}

export function SiteShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`ice-site ${className}`}><SiteNav />{children}<SiteFooter /></div>;
}
