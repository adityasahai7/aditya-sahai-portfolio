import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "moss" | "light";
  external?: boolean;
}) {
  const className = `ice-button ice-button-${variant}`;
  if (external) {
    return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} /></a>;
  }
  return <Link className={className} href={href}>{children}<ArrowUpRight size={16} /></Link>;
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "moss" | "dark" | "quiet" }) {
  return <span className={`ice-badge ice-badge-${tone}`}>{children}</span>;
}

export function SectionHeading({
  label,
  title,
  copy,
  invert = false,
}: {
  label: string;
  title: string;
  copy?: string;
  invert?: boolean;
}) {
  return (
    <header className={`ice-section-heading ${invert ? "is-invert" : ""}`}>
      <p className="ice-section-label">{label}</p>
      <h2>{title}</h2>
      {copy ? <p className="ice-section-copy">{copy}</p> : null}
    </header>
  );
}

export function IconCard({ title, copy, icon: Icon }: { title: string; copy: string; icon: LucideIcon }) {
  return (
    <article className="ice-card ice-feature-card">
      <span className="ice-icon"><Icon size={22} strokeWidth={1.8} /></span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`ice-page-hero ${dark ? "ice-page-hero-dark" : ""}`}>
      <div className="ice-container ice-page-hero-grid">
        <div>
          <p className="ice-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        {children ? <div className="ice-page-hero-aside">{children}</div> : null}
      </div>
    </section>
  );
}

export function StatusDot({ children }: { children: ReactNode }) {
  return <span className="ice-status"><i aria-hidden="true" />{children}</span>;
}
